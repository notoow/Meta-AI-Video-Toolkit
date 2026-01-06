# Development Log & Decision History

## 📅 Project History (2025-12-31 ~ 2026-01-05)
**Session Goal**: Integrate Meta's open-source AI models into a video creation tool for internal & commercial use.

### 1. Key Decisions
*   **Engine Selection**:
    *   **Internal Prototype**: Use **SAM 3** (@meta/sam3) for superior performance and video memory capabilities.
    *   **Commercial Release**: Plan to switch to **SAM 1 (Apache 2.0)** + **FastSAM** + **Tracker (XMem)** combination to avoid licensing issues (CC-BY-NC).
*   **Architecture**:
    *   **Hybrid Deployment**: Central NAS Server (Docker) for office use + Standalone Local Package (Native Python) for individual use.
    *   **Frontend**: Adobe Premiere Pro Plugin (CEP) with a "Smart Selector" panel.
    *   **Backend**: FastAPI Python Server (MOCK mode implemented for testing).
*   **Branding**:
    *   Project Name: **Meta-AI-Video-Toolkit** (SEO optimized).
    *   Internal Code Name: `Pakuri-Engine`.

### 2. Implementation Status
*   ✅ **Analyzed**: SAM 3, Make-A-Video, AudioCraft (MusicGen/AudioGen), Movie Gen Bench.
*   ✅ **Downloaded**: SAM 1 (segment-anything), SAM 3, AudioCraft source codes.
*   ✅ **Created**:
    *   `smart-selector-plugin`: Premiere Pro extension source code.
    *   `api_server.py`: Video processing backend (FastAPI).
    *   `start_pakuri_ai.bat`: One-click server reuse script (No-Docker Mode).
    *   `install_plugin.bat`: One-click plugin installer (Registry Debug Mode included).
    *   `README_BROTHER.txt`: User-friendly manual.
*   ✅ **Security**: Added "INTERNAL USE ONLY" warning banner to the plugin UI.

### 3. Folder Structure Update
*   **@meta**: Original source codes (SAM 3, AudioCraft, etc.)
*   **@@check_this_out**: Analysis reports (Markdown).
*   **Root**: Operational scripts and documentation.

### 4. Next Action Items
*   **Manual Rename**: Rename folder `MetaOpenSourcesUsage` -> `Meta-AI-Video-Toolkit` in Windows Explorer.
*   **Actual Testing**: Run `start_pakuri_ai.bat` and test the plugin in Premiere Pro.
*   **Model Training**: Train a custom model for AudioCraft to enable commercial music generation.

---
### 📅 Project History (2026-01-06)
*   **Major Milestone**: Successfully connected "Smart Selector" plugin to Adobe Premiere Pro.
    *   **Issue**: `CSInterface` reference error due to Node.js integration conflicts.
    *   **Fix**: Implemented "Hybrid Fail-Safe Loader" (Require + Script Injection).
    *   **Result**: Valid "Ping/Pong" communication established.
*   **Documentation**: Detailed log saved to `docs/260106_PREMIERE_INTEGRATION_LOG.md` and archived to `@@check_this_out`.
*   **Next**: Installing SAM 3 dependencies (PyTorch) to enable real AI processing.

---
*Recorded by Antigravity Agent.*
