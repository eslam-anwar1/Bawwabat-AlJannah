$ErrorActionPreference = "Stop"

$ROOT = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_App"
$JAVA_HOME = "$ROOT\tools\jdk17\jdk17.0.21_0"
$env:JAVA_HOME = $JAVA_HOME
$env:PATH = "$JAVA_HOME\bin;$env:PATH"

$JAVA = "$JAVA_HOME\bin\java.exe"
$JAVAC = "$JAVA_HOME\bin\javac.exe"
$JAR = "$JAVA_HOME\bin\jar.exe"
$JARSIGNER = "$JAVA_HOME\bin\jarsigner.exe"
$AAPT2 = "$ROOT\tools\build-tools\android-14\aapt2.exe"
$D8_BAT = "$ROOT\tools\build-tools\android-14\d8.bat"
$ANDROID_JAR = "$ROOT\tools\android.jar"
$BUNDLETOOL = "$ROOT\tools\bundletool.jar"
$KEYSTORE = "$ROOT\bawwabat-aljannah-release.keystore"
$WORK = "$ROOT\tools\build_work"

Write-Host "=== Starting Bawwabat Al-Jannah AAB Release Build ==="

# Clean work dir
if (Test-Path $WORK) {
    Remove-Item -Recurse -Force $WORK
}
New-Item -ItemType Directory -Path "$WORK\compiled_res" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\gen" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\classes" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\dex" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\proto_extracted" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\base_module\manifest" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\base_module\dex" -Force | Out-Null
New-Item -ItemType Directory -Path "$WORK\base_module\assets" -Force | Out-Null

Write-Host "[1/8] Compiling Android Resources with AAPT2..."
& $AAPT2 compile --dir "$ROOT\android\app\src\main\res" -o "$WORK\compiled_res.zip"
if ($LASTEXITCODE -ne 0) { throw "AAPT2 compile failed" }

Write-Host "[2/8] Linking Resources in Proto format (for AAB)..."
& $AAPT2 link --proto-format -I $ANDROID_JAR --manifest "$ROOT\android\app\src\main\AndroidManifest.xml" -o "$WORK\linked_res.apk" "$WORK\compiled_res.zip" --auto-add-overlay --java "$WORK\gen"
if ($LASTEXITCODE -ne 0) { throw "AAPT2 link failed" }

Write-Host "[3/8] Compiling Java Sources (MainActivity & R.java)..."
$javaFiles = @(
    "$ROOT\android\app\src\main\java\com\rawh\islamic\MainActivity.java",
    "$WORK\gen\com\rawh\islamic\R.java"
)
& $JAVAC -cp $ANDROID_JAR -sourcepath "$ROOT\android\app\src\main\java;$WORK\gen" -d "$WORK\classes" $javaFiles
if ($LASTEXITCODE -ne 0) { throw "javac compilation failed" }

Write-Host "[4/8] Generating classes.dex with D8..."
$classFiles = (Get-ChildItem -Path "$WORK\classes" -Recurse -Filter *.class | Select-Object -ExpandProperty FullName)
& $D8_BAT $classFiles --lib $ANDROID_JAR --output "$WORK\dex"
if ($LASTEXITCODE -ne 0) { throw "d8 compilation failed" }

Write-Host "[5/8] Assembling Base Module Structure..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("$WORK\linked_res.apk", "$WORK\proto_extracted")

# Copy Manifest
Copy-Item "$WORK\proto_extracted\AndroidManifest.xml" "$WORK\base_module\manifest\AndroidManifest.xml" -Force

# Copy resources.pb
if (Test-Path "$WORK\proto_extracted\resources.pb") {
    Copy-Item "$WORK\proto_extracted\resources.pb" "$WORK\base_module\resources.pb" -Force
}

# Copy res folder if present
if (Test-Path "$WORK\proto_extracted\res") {
    Copy-Item -Recurse "$WORK\proto_extracted\res" "$WORK\base_module\res" -Force
}

# Copy classes.dex
Copy-Item "$WORK\dex\classes.dex" "$WORK\base_module\dex\classes.dex" -Force

# Copy Assets (Offline Web Application)
Copy-Item -Recurse "$ROOT\android\app\src\main\assets\*" "$WORK\base_module\assets\" -Force

# Zip into base.zip using jar.exe to ensure forward slashes
$baseZip = "$WORK\base.zip"
if (Test-Path $baseZip) { Remove-Item -Force $baseZip }
Push-Location "$WORK\base_module"
& $JAR -cMf "$baseZip" *
Pop-Location
Write-Host "Base module zip created: $((Get-Item $baseZip).Length) bytes"

Write-Host "[6/8] Building Final Android App Bundle (.aab) with Bundletool..."
$aabOutput = "$ROOT\app-release.aab"
if (Test-Path $aabOutput) { Remove-Item -Force $aabOutput }
& $JAVA -jar $BUNDLETOOL build-bundle --modules=$baseZip --output=$aabOutput
if ($LASTEXITCODE -ne 0) { throw "bundletool build-bundle failed" }
Write-Host "Unsigned AAB created: $((Get-Item $aabOutput).Length) bytes"

Write-Host "[7/8] Signing AAB with Production Keystore..."
& $JARSIGNER -keystore $KEYSTORE -storepass "AlJannahPass2026!" -keypass "AlJannahPass2026!" -sigalg SHA256withRSA -digestalg SHA-256 $aabOutput bawwabat_aljannah
if ($LASTEXITCODE -ne 0) { throw "jarsigner signing failed" }

Write-Host "Verifying signature..."
& $JARSIGNER -verify $aabOutput
if ($LASTEXITCODE -ne 0) { throw "jarsigner verification failed" }

Write-Host "Validating bundle structure with Bundletool..."
& $JAVA -jar $BUNDLETOOL validate --bundle=$aabOutput
if ($LASTEXITCODE -ne 0) { throw "bundletool validation failed" }

Write-Host "[8/8] Generating Universal APK for Instant Testing..."
$apksArchive = "$WORK\universal.apks"
if (Test-Path $apksArchive) { Remove-Item -Force $apksArchive }
& $JAVA -jar $BUNDLETOOL build-apks --bundle=$aabOutput --output=$apksArchive --ks=$KEYSTORE --ks-pass="pass:AlJannahPass2026!" --ks-key-alias="bawwabat_aljannah" --key-pass="pass:AlJannahPass2026!" --mode=universal
if ($LASTEXITCODE -ne 0) { throw "bundletool build-apks failed" }

# Extract universal.apk
$apkOutput = "$ROOT\app-release.apk"
if (Test-Path $apkOutput) { Remove-Item -Force $apkOutput }
$zip = [System.IO.Compression.ZipFile]::OpenRead($apksArchive)
$entry = $zip.Entries | Where-Object { $_.FullName -eq "universal.apk" }
if ($entry) {
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $apkOutput, $true)
}
$zip.Dispose()

# Copy to final destinations on Desktop
$destAab = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_Release.aab"
$destApk = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_Release.apk"
Copy-Item -Path $aabOutput -Destination $destAab -Force
Copy-Item -Path $apkOutput -Destination $destApk -Force

Write-Host "`n======================================================="
Write-Host "SUCCESS: Signed AAB & APK Packages Generated Successfully!"
Write-Host "Play Store AAB: $destAab ($((Get-Item $destAab).Length) bytes)"
Write-Host "Direct Install APK: $destApk ($((Get-Item $destApk).Length) bytes)"
Write-Host "Project AAB: $aabOutput"
Write-Host "======================================================="
