import sys
import os

# Add sam3-main to path
sys.path.append(os.path.join(os.getcwd(), "sam3-main"))

try:
    print("Attempting to import sam3.model_builder...")
    from sam3.model_builder import build_sam3_video_predictor
    print("SUCCESS: SAM 3 Imported!")
except ImportError as e:
    print(f"FAILURE: {e}")
except Exception as e:
    print(f"FAILURE: {e}")
