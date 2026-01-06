# Meta AI Video Toolkit

**The Ultimate All-in-One AI Video Production Suite powered by Meta's State-of-the-Art Models.**

![License: Apache 2.0 / CC-BY-NC](https://img.shields.io/badge/License-Mixed-yellow.svg)
![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)
![Docker Ready](https://img.shields.io/badge/Docker-Ready-green.svg)

---

## Overview

**Meta AI Video Toolkit** is a comprehensive open-source framework that integrates Meta's most powerful AI models into a unified workflow for video creators and developers. It provides a seamless bridge between advanced AI research and practical video editing tools like **Adobe Premiere Pro**.

Stop juggling multiple repositories. We bring them all together.

## Key Features

*   **Smart Segmentation (SAM 3)**: Instantly separate objects from video backgrounds with text prompts or clicks. (Auto-Rotoscoping)
*   **GenAI Audio (AudioCraft)**: Generate royalty-free background music (`MusicGen`) and sound effects (`AudioGen`) that perfectly match your scene.
*   **AI Footage Generation (Make-A-Video)**: Create B-roll and fill-in footage from text descriptions when you run out of shots.
*   **Premiere Pro Integration**: Includes a production-ready **Adobe Premiere Pro Panel** to run AI tasks directly from your timeline.
*   **One-Click Deployment**: Dockerized backend ensures valid environment setup with GPU acceleration out of the box.

## Included Modules

| Module | Engine | Functionality | Status |
| :--- | :--- | :--- | :--- |
| **Smart Selector** | **SAM 3 / SAM 1** | Video Object Tracking & Segmentation | **Active** |
| **Sound Studio** | **AudioCraft** | Text-to-Music & Text-to-SFX | *Coming Soon* |
| **Footage Gen** | **Make-A-Video** | Text-to-Video Generation | *Planned* |
| **Quality Check** | **MovieGen Bench** | Automated Output Quality Scoring | *Integrated* |

## Installation

### Option A: For End-Users (Local Mode)
1.  Run `install_plugin.bat` to install the Premiere Pro extension.
2.  Run `start_pakuri_ai.bat` to launch the AI Engine locally.
3.  Open Premiere Pro -> Window -> Extensions -> **Smart Selector**.

### Option B: For Enterprise (Central Server)
1.  Deploy this repo on a GPU Server using `docker-compose up -d`.
2.  Distribute the `smart-selector-plugin` folder to client workstations.
3.  Configure plugins to point to the server IP.

## ⚖️ License & Commercial Use

> **⚠️ IMPORTANT**: This repository contains code and weights from various Meta Research projects, each with its own license.

*   **Toolkit Core / Plugins**: MIT License (Commercial Use Allowed).
*   **SAM 1**: Apache 2.0 (Commercial Use Allowed).
*   **SAM 3 / AudioCraft Weights**: **CC-BY-NC 4.0** (Non-Commercial Research Use Only).
    *   *For commercial deployment, please switch the engine configuration to use SAM 1 and train your own AudioCraft models.*
