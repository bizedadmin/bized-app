# Bized App Deployment Script (Windows/PowerShell)
# --------------------------------------------------
# This script automates the deployment to your Linode server.
# It uses the credentials found in apps/next/.env.local

# --- CONFIGURATION (Adjust if necessary) ---
$REMOTE_IP = "172.104.167.218"
$REMOTE_USER = "root"
$REMOTE_PATH = "/var/www/bized"
$LOCAL_SSH_KEY_PATH = "$HOME\.ssh\bized_linode_key"

# --- STEP 1: LOAD CREDENTIALS ---
Write-Host "--- Checking Environment Credentials ---" -ForegroundColor Cyan
$envLocalPath = "apps/next/.env.local"
if (Test-Path $envLocalPath) {
    # Extract private key from .env.local if not already on disk
    $content = Get-Content $envLocalPath -Raw
    if ($content -match 'LINODE_SSH_KEY="(?s)(.*?)"') {
        $privateKey = $matches[1] -replace '\\n', "`n"
        if (!(Test-Path $LOCAL_SSH_KEY_PATH)) {
            Write-Host "Creating local SSH key file..." -ForegroundColor Yellow
            if (!(Test-Path (Split-Path $LOCAL_SSH_KEY_PATH))) { New-Item -ItemType Directory -Path (Split-Path $LOCAL_SSH_KEY_PATH) -Force }
            $privateKey | Out-File -FilePath $LOCAL_SSH_KEY_PATH -Encoding ascii
            # Fix permissions for OpenSSH on Windows
            icacls $LOCAL_SSH_KEY_PATH /inheritance:r
            icacls $LOCAL_SSH_KEY_PATH /grant:r "$($env:USERNAME):(R)"
        }
    }
} else {
    Write-Error "Could not find apps/next/.env.local"
    exit
}

# --- STEP 2: PUSH LATEST TO GIT ---
Write-Host "`n--- Pushing Local Changes to Git ---" -ForegroundColor Cyan
git add .
git commit -m "chore: prepare for deployment" --allow-empty
git push origin main

# --- STEP 3: REMOTE COMMANDS ---
Write-Host "`n--- Executing Remote Update on Linode ($REMOTE_IP) ---" -ForegroundColor Cyan
$remoteCommands = "
cd $REMOTE_PATH && \
git pull origin main && \
npm install && \
npx turbo run build && \
pm2 restart all || npm run start
"

ssh -i $LOCAL_SSH_KEY_PATH -o StrictHostKeyChecking=no "$REMOTE_USER@$REMOTE_IP" $remoteCommands

Write-Host "`n--- Deployment Process Complete ---" -ForegroundColor Green
Write-Host "Verify at: http://$REMOTE_IP" -ForegroundColor Gray
