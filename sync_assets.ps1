$src = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_App"
$dest = "C:\Users\samsung\Desktop\Bawwabat_AlJannah_App\android\app\src\main\assets\www"

# Copy main files
Copy-Item "$src\index.html" "$dest\index.html" -Force
Copy-Item "$src\manifest.json" "$dest\manifest.json" -Force
Copy-Item "$src\sw.js" "$dest\sw.js" -Force
Copy-Item "$src\README_GOOGLE_PLAY.md" "$dest\README_GOOGLE_PLAY.md" -Force

# Copy css
Copy-Item -Recurse "$src\css\*" "$dest\css\" -Force

# Copy js
Copy-Item -Recurse "$src\js\*" "$dest\js\" -Force

# Copy assets
Copy-Item -Recurse "$src\assets\*" "$dest\assets\" -Force

Write-Host "Assets synchronized successfully to $dest"
