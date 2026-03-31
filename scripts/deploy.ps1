# Bized App Deployment Script (Windows/PowerShell)
# --------------------------------------------------
# This script automates the deployment to your Linode server.
# It uses the credentials found in apps/next/.env.local

# --- CONFIGURATION (Defaults) ---
$REMOTE_IP = "172.104.167.218"
$REMOTE_USER = "root"
$REMOTE_PATH = "/var/www/bized"
$LOCAL_SSH_KEY_PATH = "$HOME\.ssh\bized_linode_key"

# --- STEP 1: LOAD CREDENTIALS from .env.local ---
Write-Host "--- Checking Environment Credentials ---" -ForegroundColor Cyan
$envLocalPath = "apps/next/.env.local"
if (Test-Path $envLocalPath) {
    $content = Get-Content $envLocalPath -Raw
    
    # Extract IP if present (LINODE_IP="..." or extract from MONGODB_URI)
    if ($content -match 'LINODE_IP="(.+?)"' -or $content -match 'LINODE_IP=(.+)') {
        $REMOTE_IP = $matches[1].Trim()
    } elseif ($content -match '@([\d\.]+):') {
        $REMOTE_IP = $matches[1]
    }
    
    # Extract Remote Path if present (LINODE_REMOTE_PATH="...")
    if ($content -match 'LINODE_REMOTE_PATH="(.+?)"' -or $content -match 'LINODE_REMOTE_PATH=(.+)') {
        $REMOTE_PATH = $matches[1].Trim()
    }

    # Extract private key from .env.local
    if ($content -match 'LINODE_SSH_KEY="(?s)(.*?)"') {
        $privateKey = $matches[1] -replace '\\n', "`n" -replace "`r", ""
        
        # Always check if we need to update the key file
        if (!(Test-Path (Split-Path $LOCAL_SSH_KEY_PATH))) { New-Item -ItemType Directory -Path (Split-Path $LOCAL_SSH_KEY_PATH) -Force }
        
        $currentKey = ""
        if (Test-Path $LOCAL_SSH_KEY_PATH) { $currentKey = Get-Content $LOCAL_SSH_KEY_PATH -Raw }
        
        if ($privateKey.Trim() -ne $currentKey.Trim()) {
            Write-Host "Updating local SSH key file..." -ForegroundColor Yellow
            $privateKey.Trim() | Out-File -FilePath $LOCAL_SSH_KEY_PATH -Encoding ascii
            # Fix permissions for OpenSSH on Windows
            icacls $LOCAL_SSH_KEY_PATH /inheritance:r
            icacls $LOCAL_SSH_KEY_PATH /grant:r "$($env:USERNAME):(R)"
        }
    }
} else {
    Write-Error "Could not find apps/next/.env.local"
    exit
}

Write-Host "Using Remote: $REMOTE_USER@$REMOTE_IP (Path: $REMOTE_PATH)" -ForegroundColor Gray

# --- STEP 2: PUSH LATEST TO GIT ---
Write-Host "`n--- Pushing Local Changes to Git ---" -ForegroundColor Cyan
git add .
git commit -m "chore: prepare for deployment" --allow-empty
git push origin main

# --- STEP 3: REMOTE COMMANDS ---
Write-Host "`n--- Executing Remote Update on Linode ($REMOTE_IP) ---" -ForegroundColor Cyan
$remoteCommands = "
cd $REMOTE_PATH && \
git fetch origin main && \
git reset --hard origin/main && \
npm install && \
npx turbo run build && \
(pm2 delete bized-app || true) && \
(fuser -k 3000/tcp || true) && \
pm2 start 'npm run start' --name bized-app
"

ssh -i $LOCAL_SSH_KEY_PATH -o StrictHostKeyChecking=no "$REMOTE_USER@$REMOTE_IP" $remoteCommands

Write-Host "`n--- Deployment Process Complete ---" -ForegroundColor Green
Write-Host "Verify at: http://$REMOTE_IP" -ForegroundColor Gray

