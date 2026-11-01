const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function createWav(filename, durationSec, sampleRate, generatorFn) {
  const numSamples = Math.floor(durationSec * sampleRate);
  const blockAlign = 2; // 16-bit mono
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = generatorFn(t, durationSec);
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  const filePath = path.join(audioDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated audio: ${filename} (${buffer.length} bytes)`);
}

const SR = 22050;

// 1. Water Drop
createWav('water_drop.wav', 0.35, SR, (t) => {
  const env = Math.exp(-t * 18);
  const freq = 600 + 900 * (1 - Math.exp(-t * 25));
  return Math.sin(2 * Math.PI * freq * t) * env;
});

// 2. Tasbeeh Click
createWav('tasbeeh_click.wav', 0.12, SR, (t) => {
  const env = Math.exp(-t * 40);
  return (Math.sin(2 * Math.PI * 880 * t) * 0.7 + Math.sin(2 * Math.PI * 1760 * t) * 0.3) * env;
});

// 3. Success Chime
createWav('success_chime.wav', 0.8, SR, (t) => {
  const env = Math.exp(-t * 4);
  const s1 = Math.sin(2 * Math.PI * 523.25 * t);
  const s2 = t > 0.15 ? Math.sin(2 * Math.PI * 659.25 * t) : 0;
  const s3 = t > 0.30 ? Math.sin(2 * Math.PI * 783.99 * t) : 0;
  const s4 = t > 0.45 ? Math.sin(2 * Math.PI * 1046.50 * t) : 0;
  return (s1 + s2 + s3 + s4) * 0.3 * env;
});

// 4. Prayer Bell
createWav('prayer_bell.wav', 1.5, SR, (t) => {
  const env = Math.exp(-t * 2.5);
  const f = Math.sin(2 * Math.PI * 440 * t);
  const h1 = Math.sin(2 * Math.PI * 880 * t) * 0.5;
  const h2 = Math.sin(2 * Math.PI * 1320 * t) * 0.25;
  return (f + h1 + h2) * 0.4 * env;
});

// 5. Peace Tone
createWav('peace_tone.wav', 3.0, SR, (t) => {
  const env = Math.exp(-t * 0.8);
  const f1 = Math.sin(2 * Math.PI * 392.00 * t);
  const f2 = Math.sin(2 * Math.PI * 493.88 * t) * 0.6;
  const f3 = Math.sin(2 * Math.PI * 587.33 * t) * 0.4;
  return (f1 + f2 + f3) * 0.35 * env;
});

// 6. نشيد أمي يا نبع الحنان (بدون إيقاع - لحن دافئ عذب)
createWav('nasheed_mother.wav', 8.0, SR, (t) => {
  // Melodic progression: C - G - Am - F
  const notes = [
    { freq: 261.63, dur: 1.0 }, // C
    { freq: 329.63, dur: 1.0 }, // E
    { freq: 392.00, dur: 1.0 }, // G
    { freq: 440.00, dur: 1.0 }, // A
    { freq: 392.00, dur: 1.0 }, // G
    { freq: 349.23, dur: 1.0 }, // F
    { freq: 329.63, dur: 1.0 }, // E
    { freq: 261.63, dur: 1.0 }  // C
  ];
  const step = Math.min(notes.length - 1, Math.floor(t));
  const cur = notes[step];
  const localT = t - step;
  const env = Math.sin(Math.PI * (localT / cur.dur));
  const s = Math.sin(2 * Math.PI * cur.freq * t) + 0.3 * Math.sin(4 * Math.PI * cur.freq * t);
  return s * 0.4 * Math.max(0, env);
});

// 7. نشيد صلاتي يا صلاتي نور حياتي (بدون إيقاع - لحن مبهج)
createWav('nasheed_prayer.wav', 8.0, SR, (t) => {
  // Joyful upbeat melody: G - A - B - C - B - A - G - D
  const notes = [
    { freq: 392.00, dur: 1.0 },
    { freq: 440.00, dur: 1.0 },
    { freq: 493.88, dur: 1.0 },
    { freq: 523.25, dur: 1.0 },
    { freq: 493.88, dur: 1.0 },
    { freq: 440.00, dur: 1.0 },
    { freq: 392.00, dur: 1.0 },
    { freq: 293.66, dur: 1.0 }
  ];
  const step = Math.min(notes.length - 1, Math.floor(t));
  const cur = notes[step];
  const localT = t - step;
  const env = Math.sin(Math.PI * (localT / cur.dur));
  const s = Math.sin(2 * Math.PI * cur.freq * t) + 0.25 * Math.sin(3 * Math.PI * cur.freq * t);
  return s * 0.4 * Math.max(0, env);
});

// 8. نشيد أركان الإسلام الخمسة (بدون إيقاع)
createWav('nasheed_arkan.wav', 6.0, SR, (t) => {
  const notes = [
    { freq: 261.63, dur: 1.2 },
    { freq: 293.66, dur: 1.2 },
    { freq: 329.63, dur: 1.2 },
    { freq: 349.23, dur: 1.2 },
    { freq: 392.00, dur: 1.2 }
  ];
  const step = Math.min(notes.length - 1, Math.floor(t / 1.2));
  const cur = notes[step];
  const localT = t - step * 1.2;
  const env = Math.sin(Math.PI * (localT / 1.2));
  return Math.sin(2 * Math.PI * cur.freq * t) * 0.4 * Math.max(0, env);
});

// 9. نشيد طلع البدر علينا (عذب خاشع)
createWav('nasheed_badr.wav', 8.0, SR, (t) => {
  // Tala'a al-Badru 'Alayna traditional mode
  const freqs = [329.63, 349.23, 392.00, 440.00, 392.00, 349.23, 329.63, 293.66];
  const step = Math.min(freqs.length - 1, Math.floor(t));
  const f = freqs[step];
  const env = Math.sin(Math.PI * (t - step));
  const s = Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * (f * 1.5) * t);
  return s * 0.35 * Math.max(0, env);
});

// 10. تلاوة القرآن الكريم وسكينة الفاتحة وآية الكرسي
createWav('quran_fatihah.wav', 10.0, SR, (t) => {
  // Spiritual Maqam Bayati meditation
  const bayati = [293.66, 311.13, 349.23, 392.00, 440.00, 392.00, 349.23, 311.13, 293.66, 261.63];
  const step = Math.min(bayati.length - 1, Math.floor(t));
  const f = bayati[step];
  const env = Math.sin(Math.PI * (t - step));
  const harmonic = Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2 * t);
  return harmonic * 0.35 * Math.max(0, env);
});

console.log('ALL audio tracks created successfully!');
