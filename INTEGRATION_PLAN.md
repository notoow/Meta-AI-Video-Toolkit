# Meta Open Source Integration Plan for Video Creation Tool

## Goal
Build a cutting-edge video creation tool leveraging Meta's state-of-the-art open source AI models. The tool will feature automated segmentation, AI-generated assets (video/audio), and high-quality assessment standards.

## Integrated Technologies

### 1. Visual Understanding & Manipulation (SAM 3)
*   **Source**: `sam3`
*   **Role**: **"The Smart Selector"**
*   **Implementation**:
    *   **Auto-Rotoscoping**: Allow users to type "person in red shirt" to instantly separate them from the background.
    *   **Smart Eraser**: Remove unwanted objects from video frames automatically.
    *   **Effect Masking**: Apply color correction or filters only to specific objects (e.g., "make the car neon blue").

### 2. Generative Audio & Music (AudioCraft)
*   **Source**: `audiocraft` (MusicGen, AudioGen, EnCodec)
*   **Role**: **"The Sound Studio"**
*   **Implementation**:
    *   **Text-to-BGM**: Users describe the mood ("cinematic dramatic buildup") and the tool generates unique background music.
    *   **Auto-SFX**: Analyze video content (using SAM 3 or other vision models) and automatically generate matching sound effects (e.g., footsteps, glass breaking).
    *   **Compression**: Use EnCodec for efficient project storage.

### 3. Generative Video Assets (Make-A-Video)
*   **Source**: `make-a-video-pytorch`
*   **Role**: **"The Footage Generator"**
*   **Implementation**:
    *   **B-Roll Generation**: When users lack footage, they can generate short clips to fill gaps.
    *   **Dynamic Backgrounds**: Generate moving abstract backgrounds for text overlays.

### 4. Quality Assurance (Movie Gen Bench)
*   **Source**: `MovieGenBench`
*   **Role**: **"The Quality Standard"**
*   **Implementation**:
    *   **Prompt Optimization**: Use the benchmark's prompt library to guide users in writing effective text prompts.
    *   **Output Evaluation**: Internally score generated assets to ensure they meet high standards before presenting them to the user.

## Architecture Guidelines
*   **Backend**: Python (FastAPI/Flask) to host the PyTorch models. GPU support is critical.
*   **Frontend**: React/Next.js for a responsive, modern video editing interface.
*   **Communication**: WebSocket or Polling for long-running generation tasks.

## Next Steps
1.  **Prototype Backend (SAM 3)**:
    *   Set up Python server using the `sam3-main` codebase.
    *   Implement video segmentation endpoint.
    *   **Note**: Using SAM 3 for internal use allows for faster development and better performance out-of-the-box.
2.  **Prototype Frontend (Premiere Plugin)**:
    *   Create `Smart Selector` plugin for Adobe Premiere Pro.
    *   Implement "Export Clip -> API -> Import Result" workflow.
3.  **Connect**: Link the plugin to the SAM 3 backend.
