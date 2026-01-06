# Base Image: NVIDIA CUDA 11.8 (Rock Solid Standard)
FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04

# Remove interaction for apt
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install Python 3.10 & System Deps
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    libgl1-mesa-glx \
    libglib2.0-0 \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Fix python alias
RUN ln -s /usr/bin/python3.10 /usr/bin/python

# Upgrade Pip
RUN python -m pip install --no-cache-dir --upgrade pip

# 1. Install PyTorch (Specific CUDA index)
RUN python -m pip install --no-cache-dir \
    torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 \
    --index-url https://download.pytorch.org/whl/cu118

# 2. Install Other Deps (Default PyPI)
# 2. Install Other Deps (Default PyPI)
# Added huggingface_hub for auto-downloading SAM3 checkpoints
RUN python -m pip install --no-cache-dir \
    fastapi uvicorn opencv-python numpy \
    hydra-core iopath fvcore omegaconf pycocotools "timm>=1.0.17" \
    einops matplotlib scipy \
    psutil av ftfy regex pandas \
    decord python-multipart huggingface_hub

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Run the server
CMD ["python", "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8000"]
