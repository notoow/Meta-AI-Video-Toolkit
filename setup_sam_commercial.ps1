# Setup Script for Commercial SAM Tool
# This script installs dependencies and downloads the required model weights.

$workspaceDir = "C:\Users\USER\Desktop\notoow_program\MetaOpenSourcesUsage"
$samDir = "$workspaceDir\segment-anything"
$checkpointDir = "$workspaceDir\checkpoints"

# 1. Install Dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
pip install opencv-python pycocotools matplotlib onnxruntime onnx
# Install SAM in editable mode
Set-Location $samDir
pip install -e .

# 2. Download Model Weights (ViT-H: Huge model for best quality)
if (-not (Test-Path $checkpointDir)) {
    New-Item -ItemType Directory -Path $checkpointDir | Out-Null
}

$checkpointUrl = "https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth"
$checkpointPath = "$checkpointDir\sam_vit_h_4b8939.pth"

if (-not (Test-Path $checkpointPath)) {
    Write-Host "Downloading SAM ViT-H Checkpoint (This may take a while)..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $checkpointUrl -OutFile $checkpointPath
    Write-Host "Download Complete!" -ForegroundColor Green
}
else {
    Write-Host "Checkpoint already exists." -ForegroundColor Green
}

Write-Host "Setup Completed! You are ready to make money." -ForegroundColor Cyan
