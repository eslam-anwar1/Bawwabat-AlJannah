Add-Type -AssemblyName System.IO.Compression.FileSystem

$aabSrc = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\app-release.aab"
$aabDest1 = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_Release.aab"

Copy-Item -Path $aabSrc -Destination $aabDest1 -Force

# Extract universal.apk
$apksZip = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\tools\test_apks.apks"
$apkDest = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_Release.apk"
$zip = [System.IO.Compression.ZipFile]::OpenRead($apksZip)
$entry = $zip.Entries | Where-Object { $_.FullName -eq "universal.apk" }
if ($entry) {
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $apkDest, $true)
    Write-Host "Extracted universal.apk successfully!"
}
$zip.Dispose()

Write-Host "Files deployed to Desktop:"
Get-Item $aabDest1 | Select-Object Name, Length, FullName
Get-Item $apkDest | Select-Object Name, Length, FullName
