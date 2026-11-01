const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname);
const androidAssets = path.join(rootDir, 'android', 'app', 'src', 'main', 'assets', 'www');
const desktopDir = path.join(process.env.USERPROFILE || 'C:\\Users\\samsung', 'Desktop');

// New App Name folders
const desktopAppDir = path.join(desktopDir, 'Bawwabat_AlJannah_App');
const desktopZipPath = path.join(desktopDir, 'تطبيق_بوابة_الجنة_الإسلامي_المتكامل.zip');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'android') {
      continue;
    }
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('1. Mirroring web files to Android assets folder...');
copyDirRecursive(rootDir, androidAssets);

console.log('2. Mirroring project to Desktop folder: ' + desktopAppDir);
if (!fs.existsSync(desktopAppDir)) {
  fs.mkdirSync(desktopAppDir, { recursive: true });
}

function copyFullProject(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFullProject(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyFullProject(rootDir, desktopAppDir);

console.log('3. Creating release ZIP archive on Desktop: ' + desktopZipPath);
try {
  if (fs.existsSync(desktopZipPath)) {
    fs.unlinkSync(desktopZipPath);
  }
  // Use PowerShell Compress-Archive
  const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path '${desktopAppDir}\\*' -DestinationPath '${desktopZipPath}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });
  console.log('Zip file created successfully at:', desktopZipPath);
} catch (e) {
  console.error('ZIP creation notice:', e.message);
}

// Also update Rawh_App folder if it exists so both are up to date
const oldAppDir = path.join(desktopDir, 'Rawh_App');
if (fs.existsSync(oldAppDir)) {
  copyFullProject(rootDir, oldAppDir);
}

console.log('SUCCESS: All packaging for Bawwabat Al-Jannah completed!');
