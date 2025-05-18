# Country Explorer - Google Authentication Setup Script (PowerShell)
# This script helps you set up your Google Authentication configuration

Write-Host "Setting up Google Authentication Configuration for Country Explorer" -ForegroundColor Green
Write-Host "----------------------------------------------------"
Write-Host ""
Write-Host "Please create a project in Google Cloud Console: https://console.cloud.google.com/" -ForegroundColor Yellow
Write-Host "1. Create a new project"
Write-Host "2. Go to APIs & Services > OAuth consent screen"
Write-Host "3. Set up the OAuth consent screen"
Write-Host "4. Go to APIs & Services > Credentials"
Write-Host "5. Create an OAuth 2.0 Client ID"
Write-Host "6. Add http://localhost:3000 as an authorized JavaScript origin"
Write-Host ""
Write-Host "Enter your Google Client ID:" -ForegroundColor Yellow

$clientId = Read-Host "Client ID"

Write-Host ""
Write-Host "Updating googleAuth.js with your configuration..." -ForegroundColor Cyan

# Read the file content
$filePath = ".\src\services\googleAuth.js"
$fileContent = Get-Content -Path $filePath -Raw

# Replace the Client ID
$updatedContent = $fileContent -replace "const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'", "const CLIENT_ID = '$clientId'"

# Write back to the file
$updatedContent | Out-File -FilePath $filePath -Encoding utf8

Write-Host "Google Authentication configuration has been set up successfully!" -ForegroundColor Green
Write-Host "You can now run 'npm start' to start your application." -ForegroundColor Green
