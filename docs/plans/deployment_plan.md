# Linode Deployment Plan & Instructions

This document outlines the deployment strategy for the Bized universal monorepo on Linode.

## Infrastructure Details
- **Production Server**: Linode VPS (`172.104.167.218`)
- **Primary Configuration**: Next.js server configured for port **3000** (as per recent fix to resolve unstyled page issue).
- **Environment Variables**: Managed in `apps/next/.env.local` (local copy) and matching `.env` files on the production server.

## Automated Deployment Script (`/scripts/deploy.ps1`)
We've implemented a custom PowerShell script that:
1.  **Extracts your SSH Key**: Automatically pulls the `LINODE_SSH_KEY` from `.env.local` and stores it in your local `.ssh/` folder if not already present.
2.  **Syncs Git**: Ensures all your local styling and port configuration changes are pushed to GitHub (`origin/main`).
3.  **Remotely Executes Update**: Logs into the Linode server as `root` and executes:
    -   `git pull`: Updates the server-side code.
    -   `npm install`: Updates dependencies.
    -   `turbo run build`: Rebuilds the styled Next.js app and universal packages.
    -   `pm2 restart`: Restarts the live processes to reflect the new port configuration.

## How to Deploy
Open PowerShell in the root of your project and run:
```powershell
.\scripts\deploy.ps1
```

## Manual Verification
After deployment, verify that the site remains correctly styled at:
- `http://bized.app`
- `http://172.104.167.218:3000`

> **Note**: If you change the deployment path on the server, update the `$REMOTE_PATH` variable in `scripts/deploy.ps1`.
