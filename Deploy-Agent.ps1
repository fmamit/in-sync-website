<#
.SYNOPSIS
    Deploy the In-Sync Service Agent to a client portal.

.DESCRIPTION
    Copies agent module files to a target portal repo and shows a diff of
    proposed App.jsx/App.tsx changes. Does NOT auto-commit or auto-deploy.

.PARAMETER TargetRepo
    Path to the target portal's repository root.

.PARAMETER ProjectName
    The portal's project name (e.g. 'rapidmoney', 'paisaasaarthi').

.EXAMPLE
    .\Deploy-Agent.ps1 -TargetRepo "C:\repos\rapidmoney-portal" -ProjectName "rapidmoney"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$TargetRepo,

    [Parameter(Mandatory = $true)]
    [string]$ProjectName
)

$ErrorActionPreference = "Stop"
$SourceRepo = $PSScriptRoot

# --- Validate paths ---
if (-not (Test-Path $TargetRepo)) {
    Write-Error "Target repo not found: $TargetRepo"
    exit 1
}

if (-not (Test-Path "$TargetRepo\src")) {
    Write-Error "No 'src' folder found in target repo. Is this a React project?"
    exit 1
}

Write-Host "`n=== In-Sync Service Agent Deployer ===" -ForegroundColor Cyan
Write-Host "Source:  $SourceRepo"
Write-Host "Target:  $TargetRepo"
Write-Host "Project: $ProjectName`n"

# --- Step 1: Copy ServiceAgent component files ---
Write-Host "[1/3] Copying ServiceAgent component files..." -ForegroundColor Yellow

$agentDir = "$TargetRepo\src\components\ServiceAgent"
if (-not (Test-Path $agentDir)) {
    New-Item -ItemType Directory -Path $agentDir -Force | Out-Null
}

Copy-Item "$SourceRepo\src\components\ServiceAgent\FloatingAgent.tsx" "$agentDir\FloatingAgent.tsx" -Force
Copy-Item "$SourceRepo\src\components\ServiceAgent\ServiceAgent.css" "$agentDir\ServiceAgent.css" -Force
Copy-Item "$SourceRepo\src\components\ServiceAgent\supabaseAgent.ts" "$agentDir\supabaseAgent.ts" -Force

Write-Host "  Copied: FloatingAgent.tsx, ServiceAgent.css, supabaseAgent.ts" -ForegroundColor Green

# --- Step 2: Copy Support pages ---
Write-Host "[2/3] Copying Support pages..." -ForegroundColor Yellow

$pagesDir = "$TargetRepo\src\pages"
if (-not (Test-Path $pagesDir)) {
    New-Item -ItemType Directory -Path $pagesDir -Force | Out-Null
}

Copy-Item "$SourceRepo\src\pages\SupportPage.tsx" "$pagesDir\SupportPage.tsx" -Force
Copy-Item "$SourceRepo\src\pages\SupportAdmin.tsx" "$pagesDir\SupportAdmin.tsx" -Force

Write-Host "  Copied: SupportPage.tsx, SupportAdmin.tsx" -ForegroundColor Green

# --- Step 3: Show proposed App.jsx/App.tsx changes ---
Write-Host "[3/3] Analyzing App file for required changes..." -ForegroundColor Yellow

# Find the App file
$appFile = $null
foreach ($candidate in @("$TargetRepo\src\App.tsx", "$TargetRepo\src\App.jsx")) {
    if (Test-Path $candidate) {
        $appFile = $candidate
        break
    }
}

if (-not $appFile) {
    Write-Warning "Could not find App.tsx or App.jsx in $TargetRepo\src\"
    Write-Host "`nManual steps required:" -ForegroundColor Red
    Write-Host "  1. Import FloatingAgent and add the FloatingAgent component to your app root"
    Write-Host "  2. Import SupportPage and SupportAdmin, add /support and /support/admin routes"
    Write-Host "`nFiles have been copied. Review and deploy manually."
    exit 0
}

Write-Host "  Found: $appFile`n"

$appContent = Get-Content $appFile -Raw
$changes = @()

# Check if FloatingAgent import already exists
if ($appContent -notmatch "FloatingAgent") {
    $changes += @{
        Type = "import"
        Description = "Add FloatingAgent import"
        Line = 'import FloatingAgent from "@/components/ServiceAgent/FloatingAgent";'
    }
    $changes += @{
        Type = "component"
        Description = "Add <FloatingAgent /> component"
        Line = '<FloatingAgent />'
    }
}
else {
    Write-Host "  FloatingAgent already imported - skipping." -ForegroundColor DarkGray
}

# Check if SupportPage import already exists
if ($appContent -notmatch "SupportPage") {
    $changes += @{
        Type = "import"
        Description = "Add SupportPage import"
        Line = 'import SupportPage from "./pages/SupportPage";'
    }
    $changes += @{
        Type = "route"
        Description = 'Add /support route'
        Line = '<Route path="/support" element={<SupportPage />} />'
    }
}
else {
    Write-Host "  SupportPage already imported - skipping." -ForegroundColor DarkGray
}

# Check if SupportAdmin import already exists
if ($appContent -notmatch "SupportAdmin") {
    $changes += @{
        Type = "import"
        Description = "Add SupportAdmin import"
        Line = 'import SupportAdmin from "./pages/SupportAdmin";'
    }
    $changes += @{
        Type = "route"
        Description = 'Add /support/admin route'
        Line = '<Route path="/support/admin" element={<SupportAdmin />} />'
    }
}
else {
    Write-Host "  SupportAdmin already imported - skipping." -ForegroundColor DarkGray
}

if ($changes.Count -eq 0) {
    Write-Host "`nAll imports and routes already present. No App file changes needed." -ForegroundColor Green
    Write-Host "`nDeployment complete. Review files and deploy when ready."
    exit 0
}

# --- Show diff ---
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  PROPOSED CHANGES TO: $(Split-Path $appFile -Leaf)" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

foreach ($change in $changes) {
    $color = switch ($change.Type) {
        "import" { "Magenta" }
        "component" { "Blue" }
        "route" { "Green" }
    }
    Write-Host "  + [$($change.Type)] $($change.Description)" -ForegroundColor $color
    Write-Host "    $($change.Line)" -ForegroundColor DarkGray
}

Write-Host "`n=========================================" -ForegroundColor Cyan

# --- Ask for confirmation ---
Write-Host "`nDifferent portals have different App file structures." -ForegroundColor Yellow
Write-Host "Review the changes above carefully before applying.`n" -ForegroundColor Yellow

$confirm = Read-Host "Apply these changes to $($appFile)? (y/n)"

if ($confirm -ne "y") {
    Write-Host "`nAborted. Files have been copied but App file was NOT modified." -ForegroundColor Yellow
    Write-Host "Apply the changes above manually to avoid a broken build."
    exit 0
}

# --- Apply changes ---
$lines = Get-Content $appFile

# Find last import line
$lastImportIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "^import ") {
        $lastImportIdx = $i
    }
}

# Add imports after last import
$importLines = ($changes | Where-Object { $_.Type -eq "import" } | ForEach-Object { $_.Line })
if ($importLines.Count -gt 0 -and $lastImportIdx -ge 0) {
    $before = $lines[0..$lastImportIdx]
    $after = $lines[($lastImportIdx + 1)..($lines.Count - 1)]
    $lines = $before + $importLines + $after
    Write-Host "  Added $($importLines.Count) import(s) after line $($lastImportIdx + 1)" -ForegroundColor Green
}

# Re-read to find insertion points for component and routes
$content = $lines -join "`n"

# Add FloatingAgent component - insert just before Routes tag
$componentChanges = $changes | Where-Object { $_.Type -eq "component" }
if ($componentChanges.Count -gt 0) {
    if ($content -match "(\s*)<Routes") {
        $indent = $Matches[1]
        $content = $content -replace "(\s*<Routes)", "${indent}<FloatingAgent />`n`$1"
        Write-Host "  Added FloatingAgent component before Routes" -ForegroundColor Green
    }
    elseif ($content -match "(\s*)<BrowserRouter") {
        $indent = $Matches[1]
        $content = $content -replace "(\s*<BrowserRouter)", "${indent}<FloatingAgent />`n`$1"
        Write-Host "  Added FloatingAgent component before BrowserRouter" -ForegroundColor Green
    }
}

# Add routes - insert before catch-all route or before closing Routes tag
$routeChanges = $changes | Where-Object { $_.Type -eq "route" }
if ($routeChanges.Count -gt 0) {
    $routeBlock = ($routeChanges | ForEach-Object { "          $($_.Line)" }) -join "`n"

    $inserted = $false
    # Try before catch-all
    if ($content -match '<Route path="\*"') {
        $content = $content -replace '(\s*<Route path="\*")', "`n$routeBlock`n`$1"
        $inserted = $true
    }
    # Fallback: before </Routes>
    if (-not $inserted -and $content -match '</Routes>') {
        $content = $content -replace '</Routes>', "$routeBlock`n        </Routes>"
        $inserted = $true
    }

    if ($inserted) {
        Write-Host "  Added $($routeChanges.Count) route(s)" -ForegroundColor Green
    }
    else {
        Write-Host "  Could not find insertion point for routes - add manually" -ForegroundColor Red
    }
}

# Write the updated file
$content | Set-Content $appFile -Encoding UTF8
Write-Host "`nApp file updated successfully." -ForegroundColor Green

# --- Summary ---
Write-Host "`n=== DEPLOYMENT SUMMARY ===" -ForegroundColor Cyan
Write-Host "Project: $ProjectName"
Write-Host "Files copied:"
Write-Host "  src/components/ServiceAgent/FloatingAgent.tsx"
Write-Host "  src/components/ServiceAgent/ServiceAgent.css"
Write-Host "  src/components/ServiceAgent/supabaseAgent.ts"
Write-Host "  src/pages/SupportPage.tsx"
Write-Host "  src/pages/SupportAdmin.tsx"
Write-Host "App file: Modified"
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. Set VITE_AGENT_API_URL in Azure Static Web Apps env settings"
Write-Host "  2. Add '$ProjectName' domain to ALLOWED_ORIGINS on agent backend"
Write-Host "  3. Review changes, then commit and deploy"
Write-Host "  4. Verify: widget appears, /support loads, ticket has project_name='$ProjectName'"
Write-Host ""
