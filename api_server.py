
# ==============================================================================
#  PAKURI AI SERVER - SAM 3 (Meta AI Video Toolkit)
#  "The Real Deal" - No Mock, No CV Tricks, Just AI.
# ==============================================================================
import sys
import os
import shutil
import logging
import time
import numpy as np
import cv2
import torch
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, List

# --- LOGGING SETUP ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("PakuriAI")

# --- PATH SETUP ---
# Ensure 'sam3-main' is in sys.path so we can import 'sam3'
current_dir = os.path.dirname(os.path.abspath(__file__))
sam3_dir = os.path.join(current_dir, "sam3-main")
if sam3_dir not in sys.path:
    sys.path.append(sam3_dir)
    logger.info(f"📂 Added to sys.path: {sam3_dir}")

# Adding inner 'sam3' just in case
sam3_inner = os.path.join(sam3_dir, "sam3")
if sam3_inner not in sys.path:
    sys.path.append(sam3_inner)

# --- SAM 3 IMPORTS ---
SAM3_AVAILABLE = False
try:
    # Use the builder used in example notebooks
    from sam3.model_builder import build_sam3_video_predictor
    SAM3_AVAILABLE = True
    logger.info("✅ SAM 3 Library Import Successful")
except ImportError as e:
    logger.error(f"❌ SAM 3 Library NOT Found: {e}")
    logger.error("   Make sure 'sam3-main' folder exists and dependencies are installed.")

# --- GLOBAL VARIABLES ---
app = FastAPI()
video_predictor = None

# --- MODELS ---
class SegmentationRequest(BaseModel):
    file_path: str
    prompt: Optional[str] = "center"
    start_time: float = 0.0
    duration: Optional[float] = None

# --- LIFESPAN (Startup/Shutdown) ---
@app.on_event("startup")
async def startup_event():
    global video_predictor
    logger.info("🚀 Starting Pakuri AI Server (Real AI Mode)...")
    
    if SAM3_AVAILABLE:
        logger.info("📥 Initializing SAM 3 Video Predictor...")
        logger.info("   NOTE: This will DOWNLOAD the official checkpoint from Hugging Face if not found.")
        logger.info("   Please wait, this might take a few minutes depending on network speed...")
        
        try:
            if torch.cuda.is_available():
                device = "cuda"
                logger.info(f"   Using GPU: {torch.cuda.get_device_name(0)}")
            else:
                device = "cpu"
                logger.warning("   ⚠️ GPU not found! Using CPU (Will be painfully slow)")
            
            # BUILD PREDICTOR (Standard Way)
            # Passing checkpoint_path=None triggers auto-download from HF (facebook/sam3)
            # load_from_HF=True is default in model_builder.py
            
            video_predictor = build_sam3_video_predictor(
                checkpoint_path=None, # Let it auto-download!
                device=device
            )
            
            logger.info("✅ SAM 3 Real Model Loaded & Ready!")
            
        except Exception as e:
            logger.error(f"❌ Failed to initialize SAM 3: {e}")
            logger.error("   Possible causes: Network blocked, HuggingFace down, or Incompatible Torch.")
            import traceback
            traceback.print_exc()
    else:
        logger.error("❌ SAM 3 Library is missing. AI features will NOT work.")

# --- UTILS ---
def cleanup_file(path: str):
    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception as e:
        logger.warning(f"Failed to cleanup {path}: {e}")

# --- ENDPOINTS ---
@app.get("/")
def health_check():
    status = "running"
    if not video_predictor:
        status = "model_not_loaded"
    return {"status": status, "ai_engine": "SAM 3 Official", "gpu": torch.cuda.is_available()}

@app.post("/segment/local_file")
async def segment_local_video(req: SegmentationRequest, background_tasks: BackgroundTasks):
    global video_predictor
    
    if not video_predictor:
        logger.error("Request received but AI model is not ready.")
        raise HTTPException(status_code=503, detail="AI Model not loaded (Check server logs)")
        
    if not os.path.exists(req.file_path):
        raise HTTPException(status_code=404, detail=f"File not found: {req.file_path}")
        
    logger.info(f"🎬 Processing Request: {req.file_path} (Start: {req.start_time}s)")
    
    try:
        # 1. Output Setup
        output_filename = f"seg_{int(time.time())}.mp4"
        output_path = os.path.abspath(output_filename)
        
        # Open Input Video to get specs
        cap = cv2.VideoCapture(req.file_path)
        if not cap.isOpened():
            raise HTTPException(status_code=400, detail="Cannot read video file")
            
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Calculate Frame Range
        start_frame = int(req.start_time * fps)
        
        # If duration is 0 or None, default to 5 seconds to avoid processing hour-long videos by mistake
        process_duration = req.duration if (req.duration and req.duration > 0) else 5.0
        duration_frames = int(process_duration * fps)
        
        end_frame = min(total_frames, start_frame + duration_frames)
        
        # Sanity check
        if start_frame >= total_frames:
            start_frame = 0
            end_frame = min(total_frames, int(5 * fps))
            
        logger.info(f"   Frame Range: {start_frame} to {end_frame} ({end_frame - start_frame} frames)")
        
        # Open Output Video Writer
        # 'mp4v' is generally compatible
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        # 2. SAM 3 Session Start (Using handle_request API)
        logger.info("   Starting AI Session...")
        response = video_predictor.handle_request(dict(
            type="start_session",
            resource_path=req.file_path
        ))
        session_id = response["session_id"]
        
        # 3. Add Prompt (Center Click on Start Frame)
        logger.info("   Adding Prompt (Center Click)...")
        cx, cy = width / 2.0, height / 2.0
        
        # Important: prompt frame_index is relative to the start of the video
        video_predictor.handle_request(dict(
            type="add_prompt",
            session_id=session_id,
            frame_index=start_frame, 
            obj_id=1,
            points=[[cx, cy]],
            point_labels=[1]
        ))
        
        # 4. Propagate & Collect Masks
        logger.info("   Propagating masks...")
        
        generated_masks = {}
        
        # Stream results
        stream_req = dict(
            type="propagate_in_video",
            session_id=session_id,
            start_frame_index=start_frame,
            max_frame_num_to_track=(end_frame - start_frame),
            propagation_direction="forward" # Only go forward from click
        )
        
        for result in video_predictor.handle_stream_request(stream_req):
            f_idx = result["frame_index"]
            outputs = result["outputs"]
            
            # Extract Mask
            mask = None
            try:
                if "video_res_masks" in outputs:
                    # [1, H, W]
                    mask_raw = outputs["video_res_masks"][0]
                    mask = (mask_raw > 0.0).cpu().numpy().squeeze()
                elif "pred_masks" in outputs:
                    mask_raw = outputs["pred_masks"][0] 
                    mask = (mask_raw > 0.0).cpu().numpy().squeeze()
            except Exception as e:
                pass
            
            if mask is not None:
                generated_masks[f_idx] = mask
        
        logger.info(f"   AI Done. Rendering {len(generated_masks)} frames to video...")
        
        # 5. Render Loop
        cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
        curr_frame_idx = start_frame
        
        while curr_frame_idx < end_frame and cap.isOpened():
            ret, frame = cap.read()
            if not ret: break
            
            if curr_frame_idx in generated_masks:
                mask = generated_masks[curr_frame_idx]
                
                # Resize check (just in case model output stricture differs)
                if mask.shape != (height, width):
                    mask = cv2.resize(mask.astype(np.uint8), (width, height), interpolation=cv2.INTER_NEAREST)
                
                # Apply Mask: Keep Object, Black Background
                # Convert mask to 3 channel for multiplication
                mask_3ch = np.stack([mask]*3, axis=-1).astype(np.uint8)
                result_frame = frame * mask_3ch
                
                out.write(result_frame)
            else:
                # If AI lost the object or framing issue -> Show nothing (Black)
                # This emphasizes "Nukki" (Cutout) failures as blank rather than background.
                black_frame = np.zeros_like(frame)
                out.write(black_frame)
            
            curr_frame_idx += 1
            
        # Cleanup Session
        video_predictor.handle_request(dict(type="close_session", session_id=session_id))
        cap.release()
        out.release()
        
        logger.info(f"✅ Render Complete: {output_path}")
        
        background_tasks.add_task(cleanup_file, output_path)
        return FileResponse(output_path, media_type="video/mp4", filename="segment_result.mp4")

    except Exception as e:
        logger.error(f"❌ Processing Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
