Add-Type -AssemblyName System.Drawing

function Create-CircularIcon {
    param(
        [string]$srcPath,
        [string]$destPath,
        [int]$size
    )

    $src = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $margin = 2
    $diameter = $size - ($margin * 2)
    $path.AddEllipse($margin, $margin, $diameter, $diameter)
    $g.SetClip($path)

    $g.DrawImage($src, 0, 0, $size, $size)
    $g.ResetClip()

    # Draw gold luxury border around the circle
    $goldColor = [System.Drawing.Color]::FromArgb(218, 165, 32)
    $penWidth = [Math]::Max(2, [int]($size * 0.018))
    $pen = New-Object System.Drawing.Pen($goldColor, $penWidth)
    $g.DrawEllipse($pen, $margin + [int]($penWidth/2), $margin + [int]($penWidth/2), $diameter - $penWidth, $diameter - $penWidth)

    $destDir = [System.IO.Path]::GetDirectoryName($destPath)
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }

    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $pen.Dispose()
    $path.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
    Write-Host "Created: $destPath"
}

$srcFile = 'C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\assets\icons\app-icon-3d.jpg'

Create-CircularIcon -srcPath $srcFile -destPath 'C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\assets\icons\app-icon-circular.png' -size 512
Create-CircularIcon -srcPath $srcFile -destPath 'C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\assets\icons\icon-512.png' -size 512
Create-CircularIcon -srcPath $srcFile -destPath 'C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\assets\icons\icon-192.png' -size 192
Create-CircularIcon -srcPath $srcFile -destPath 'C:\Users\samsung\Desktop\أيقونة_تطبيق_بوابة_الجنة_الدائرية.png' -size 512

# Android Mipmaps
$resBase = 'C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\android\app\src\main\res'
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-mdpi\ic_launcher.png" -size 48
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-mdpi\ic_launcher_round.png" -size 48
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-hdpi\ic_launcher.png" -size 72
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-hdpi\ic_launcher_round.png" -size 72
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xhdpi\ic_launcher.png" -size 96
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xhdpi\ic_launcher_round.png" -size 96
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xxhdpi\ic_launcher.png" -size 144
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xxhdpi\ic_launcher_round.png" -size 144
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xxxhdpi\ic_launcher.png" -size 192
Create-CircularIcon -srcPath $srcFile -destPath "$resBase\mipmap-xxxhdpi\ic_launcher_round.png" -size 192

Write-Host "All circular icons generated successfully!"
