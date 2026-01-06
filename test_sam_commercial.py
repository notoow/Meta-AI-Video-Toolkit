import torch
import sys
import os
from segment_anything import sam_model_registry, SamPredictor
import numpy as np

# Configuration
CHECKPOINT_PATH = r"C:\Users\USER\Desktop\notoow_program\MetaOpenSourcesUsage\checkpoints\sam_vit_h_4b8939.pth"
MODEL_TYPE = "vit_h"

def main():
    print("--- SAM Commercial Tool Prototype Test ---")
    
    # Check Hardware
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Running on: {device.upper()}")
    if device == "cpu":
        print("Warning: Running on CPU will be slow. A GPU is recommended for commercial use.")

    # Load Model
    if not os.path.exists(CHECKPOINT_PATH):
        print(f"Error: Checkpoint not found at {CHECKPOINT_PATH}")
        print("Please run setup_sam_commercial.ps1 first.")
        return

    print("Loading SAM Model... (This might take a moment)")
    try:
        sam = sam_model_registry[MODEL_TYPE](checkpoint=CHECKPOINT_PATH)
        sam.to(device=device)
        predictor = SamPredictor(sam)
        print("✅ SAM Model Loaded Successfully!")
        print("Ready to integrate with Video Editor API.")
    except Exception as e:
        print(f"❌ Failed to load model: {e}")

if __name__ == "__main__":
    main()
