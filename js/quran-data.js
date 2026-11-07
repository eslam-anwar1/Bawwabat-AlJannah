/**
 * بوابة الجنة - بنك بيانات القرآن الكريم الشامل
 * يشمل فهرس الـ 114 سورة، نصوص السور المحبوبة والتكرار للتحفيظ، وقائمة المقرئين
 */

const RawhQuranData = {
  reciters: [
    {
      id: "alafasy",
      name: "الشيخ مشاري راشد العفاسي",
      style: "تلاوة عذبة وخاشعة وممتازة للتحفيظ",
      server: "https://cdn.mp3quran.net/audio/mishary-alafasy/r1/"
    },
    {
      id: "husary",
      name: "الشيخ محمود خليل الحصري",
      style: "ترتيل هادئ متقن - مخصص ومثالي للتحفيظ",
      server: "https://cdn.mp3quran.net/audio/mahmoud-husary/r1/"
    },
    {
      id: "minshawi",
      name: "الشيخ محمد صديق المنشاوي",
      style: "خشوع وسكينة القلوب",
      server: "https://cdn.mp3quran.net/audio/muhammad-minshawi/r1/"
    },
    {
      id: "abdulbasit",
      name: "الشيخ عبد الباسط عبد الصمد",
      style: "صوت ذهبي وتجويد أسطوري خاشع",
      server: "https://cdn.mp3quran.net/audio/abdulbasit-abdulsamad/r3/"
    },
    {
      id: "maher",
      name: "الشيخ ماهر المعيقلي",
      style: "تلاوة خاشعة مؤثرة من الحرم المكي",
      server: "https://cdn.mp3quran.net/audio/maher-muaiqly/r1/"
    },
    {
      id: "ghamdi",
      name: "الشيخ سعد الغامدي",
      style: "تلاوة هادئة ووقورة ترتاح لها النفوس",
      server: "https://cdn.mp3quran.net/audio/saad-ghamdi/r1/"
    }
  ],

  // فهرس سور القرآن الكريم الـ 114 كاملة
  surahs: [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", verses: 7, type: "مكية", page: 1 },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", verses: 286, type: "مدنية", page: 2 },
    { number: 3, name: "آل عمران", englishName: "Ali 'Imran", verses: 200, type: "مدنية", page: 50 },
    { number: 4, name: "النساء", englishName: "An-Nisa", verses: 176, type: "مدنية", page: 77 },
    { number: 5, name: "المائدة", englishName: "Al-Ma'idah", verses: 120, type: "مدنية", page: 106 },
    { number: 6, name: "الأنعام", englishName: "Al-An'am", verses: 165, type: "مكية", page: 128 },
    { number: 7, name: "الأعراف", englishName: "Al-A'raf", verses: 206, type: "مكية", page: 151 },
    { number: 8, name: "الأنفال", englishName: "Al-Anfal", verses: 75, type: "مدنية", page: 177 },
    { number: 9, name: "التوبة", englishName: "At-Tawbah", verses: 129, type: "مدنية", page: 187 },
    { number: 10, name: "يونس", englishName: "Yunus", verses: 109, type: "مكية", page: 208 },
    { number: 11, name: "هود", englishName: "Hud", verses: 123, type: "مكية", page: 221 },
    { number: 12, name: "يوسف", englishName: "Yusuf", verses: 111, type: "مكية", page: 235 },
    { number: 13, name: "الرعد", englishName: "Ar-Ra'd", verses: 43, type: "مدنية", page: 249 },
    { number: 14, name: "إبراهيم", englishName: "Ibrahim", verses: 52, type: "مكية", page: 255 },
    { number: 15, name: "الحجر", englishName: "Al-Hijr", verses: 99, type: "مكية", page: 262 },
    { number: 16, name: "النحل", englishName: "An-Nahl", verses: 128, type: "مكية", page: 267 },
    { number: 17, name: "الإسراء", englishName: "Al-Isra", verses: 111, type: "مكية", page: 282 },
    { number: 18, name: "الكهف", englishName: "Al-Kahf", verses: 110, type: "مكية", page: 293 },
    { number: 19, name: "مريم", englishName: "Maryam", verses: 98, type: "مكية", page: 305 },
    { number: 20, name: "طه", englishName: "Taha", verses: 135, type: "مكية", page: 312 },
    { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", verses: 112, type: "مكية", page: 322 },
    { number: 22, name: "الحج", englishName: "Al-Hajj", verses: 78, type: "مدنية", page: 332 },
    { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", verses: 118, type: "مكية", page: 342 },
    { number: 24, name: "النور", englishName: "An-Nur", verses: 64, type: "مدنية", page: 350 },
    { number: 25, name: "الفرقان", englishName: "Al-Furqan", verses: 77, type: "مكية", page: 359 },
    { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", verses: 227, type: "مكية", page: 367 },
    { number: 27, name: "النمل", englishName: "An-Naml", verses: 93, type: "مكية", page: 377 },
    { number: 28, name: "القصص", englishName: "Al-Qasas", verses: 88, type: "مكية", page: 385 },
    { number: 29, name: "العنكبوت", englishName: "Al-'Ankabut", verses: 69, type: "مكية", page: 396 },
    { number: 30, name: "الروم", englishName: "Ar-Rum", verses: 60, type: "مكية", page: 404 },
    { number: 31, name: "لقمان", englishName: "Luqman", verses: 34, type: "مكية", page: 411 },
    { number: 32, name: "السجدة", englishName: "As-Sajdah", verses: 30, type: "مكية", page: 415 },
    { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", verses: 73, type: "مدنية", page: 418 },
    { number: 34, name: "سبأ", englishName: "Saba", verses: 54, type: "مكية", page: 428 },
    { number: 35, name: "فاطر", englishName: "Fatir", verses: 45, type: "مكية", page: 434 },
    { number: 36, name: "يس", englishName: "Ya-Sin", verses: 83, type: "مكية", page: 440 },
    { number: 37, name: "الصافات", englishName: "As-Saffat", verses: 182, type: "مكية", page: 446 },
    { number: 38, name: "ص", englishName: "Sad", verses: 88, type: "مكية", page: 453 },
    { number: 39, name: "الزمر", englishName: "Az-Zumar", verses: 75, type: "مكية", page: 458 },
    { number: 40, name: "غافر", englishName: "Ghafir", verses: 85, type: "مكية", page: 467 },
    { number: 41, name: "فصلت", englishName: "Fussilat", verses: 54, type: "مكية", page: 477 },
    { number: 42, name: "الشورى", englishName: "Ash-Shura", verses: 53, type: "مكية", page: 483 },
    { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", verses: 89, type: "مكية", page: 489 },
    { number: 44, name: "الدخان", englishName: "Ad-Dukhan", verses: 59, type: "مكية", page: 496 },
    { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", verses: 37, type: "مكية", page: 499 },
    { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", verses: 35, type: "مكية", page: 502 },
    { number: 47, name: "محمد", englishName: "Muhammad", verses: 38, type: "مدنية", page: 507 },
    { number: 48, name: "الفتح", englishName: "Al-Fath", verses: 29, type: "مدنية", page: 511 },
    { number: 49, name: "الحجرات", englishName: "Al-Hujurat", verses: 18, type: "مدنية", page: 515 },
    { number: 50, name: "ق", englishName: "Qaf", verses: 45, type: "مكية", page: 518 },
    { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", verses: 60, type: "مكية", page: 520 },
    { number: 52, name: "الطور", englishName: "At-Tur", verses: 49, type: "مكية", page: 523 },
    { number: 53, name: "النجم", englishName: "An-Najm", verses: 62, type: "مكية", page: 526 },
    { number: 54, name: "القمر", englishName: "Al-Qamar", verses: 55, type: "مكية", page: 528 },
    { number: 55, name: "الرحمن", englishName: "Ar-Rahman", verses: 78, type: "مدنية", page: 531 },
    { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", verses: 96, type: "مكية", page: 534 },
    { number: 57, name: "الحديد", englishName: "Al-Hadid", verses: 29, type: "مدنية", page: 537 },
    { number: 58, name: "المجادلة", englishName: "Al-Mujadila", verses: 22, type: "مدنية", page: 542 },
    { number: 59, name: "الحشر", englishName: "Al-Hashr", verses: 24, type: "مدنية", page: 545 },
    { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", verses: 13, type: "مدنية", page: 549 },
    { number: 61, name: "الصف", englishName: "As-Saff", verses: 14, type: "مدنية", page: 551 },
    { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", verses: 11, type: "مدنية", page: 553 },
    { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", verses: 11, type: "مدنية", page: 554 },
    { number: 64, name: "التغابن", englishName: "At-Taghabun", verses: 18, type: "مدنية", page: 556 },
    { number: 65, name: "الطلاق", englishName: "At-Talaq", verses: 12, type: "مدنية", page: 558 },
    { number: 66, name: "التحريم", englishName: "At-Tahrim", verses: 12, type: "مدنية", page: 560 },
    { number: 67, name: "الملك", englishName: "Al-Mulk", verses: 30, type: "مكية", page: 562 },
    { number: 68, name: "القلم", englishName: "Al-Qalam", verses: 52, type: "مكية", page: 564 },
    { number: 69, name: "الحاقة", englishName: "Al-Haqqah", verses: 52, type: "مكية", page: 566 },
    { number: 70, name: "المعارج", englishName: "Al-Ma'arij", verses: 44, type: "مكية", page: 568 },
    { number: 71, name: "نوح", englishName: "Nuh", verses: 28, type: "مكية", page: 570 },
    { number: 72, name: "الجن", englishName: "Al-Jinn", verses: 28, type: "مكية", page: 572 },
    { number: 73, name: "المزمل", englishName: "Al-Muzzammil", verses: 20, type: "مكية", page: 574 },
    { number: 74, name: "المدثر", englishName: "Al-Muddaththir", verses: 56, type: "مكية", page: 575 },
    { number: 75, name: "القيامة", englishName: "Al-Qiyamah", verses: 40, type: "مكية", page: 577 },
    { number: 76, name: "الإنسان", englishName: "Al-Insan", verses: 31, type: "مدنية", page: 578 },
    { number: 77, name: "المرسلات", englishName: "Al-Mursalat", verses: 50, type: "مكية", page: 580 },
    { number: 78, name: "النبأ", englishName: "An-Naba", verses: 40, type: "مكية", page: 582 },
    { number: 79, name: "النازعات", englishName: "An-Nazi'at", verses: 46, type: "مكية", page: 583 },
    { number: 80, name: "عبس", englishName: "'Abasa", verses: 42, type: "مكية", page: 585 },
    { number: 81, name: "التكوير", englishName: "At-Takwir", verses: 29, type: "مكية", page: 586 },
    { number: 82, name: "الانفطار", englishName: "Al-Infitar", verses: 19, type: "مكية", page: 587 },
    { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", verses: 36, type: "مكية", page: 587 },
    { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", verses: 25, type: "مكية", page: 589 },
    { number: 85, name: "البروج", englishName: "Al-Buruj", verses: 22, type: "مكية", page: 590 },
    { number: 86, name: "الطارق", englishName: "At-Tariq", verses: 17, type: "مكية", page: 591 },
    { number: 87, name: "الأعلى", englishName: "Al-A'la", verses: 19, type: "مكية", page: 591 },
    { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", verses: 26, type: "مكية", page: 592 },
    { number: 89, name: "الفجر", englishName: "Al-Fajr", verses: 30, type: "مكية", page: 593 },
    { number: 90, name: "البلد", englishName: "Al-Balad", verses: 20, type: "مكية", page: 594 },
    { number: 91, name: "الشمس", englishName: "Ash-Shams", verses: 15, type: "مكية", page: 595 },
    { number: 92, name: "الليل", englishName: "Al-Layl", verses: 21, type: "مكية", page: 595 },
    { number: 93, name: "الضحى", englishName: "Ad-Duha", verses: 11, type: "مكية", page: 596 },
    { number: 94, name: "الشرح", englishName: "Ash-Sharh", verses: 8, type: "مكية", page: 596 },
    { number: 95, name: "التين", englishName: "At-Tin", verses: 8, type: "مكية", page: 597 },
    { number: 96, name: "العلق", englishName: "Al-'Alaq", verses: 19, type: "مكية", page: 597 },
    { number: 97, name: "القدر", englishName: "Al-Qadr", verses: 5, type: "مكية", page: 598 },
    { number: 98, name: "البينة", englishName: "Al-Bayyinah", verses: 8, type: "مدنية", page: 598 },
    { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", verses: 8, type: "مدنية", page: 599 },
    { number: 100, name: "العاديات", englishName: "Al-'Adiyat", verses: 11, type: "مكية", page: 599 },
    { number: 101, name: "القارعة", englishName: "Al-Qari'ah", verses: 11, type: "مكية", page: 600 },
    { number: 102, name: "التكاثر", englishName: "At-Takathur", verses: 8, type: "مكية", page: 600 },
    { number: 103, name: "العصر", englishName: "Al-'Asr", verses: 3, type: "مكية", page: 601 },
    { number: 104, name: "الهمزة", englishName: "Al-Humazah", verses: 9, type: "مكية", page: 601 },
    { number: 105, name: "الفيل", englishName: "Al-Fil", verses: 5, type: "مكية", page: 601 },
    { number: 106, name: "قريش", englishName: "Quraysh", verses: 4, type: "مكية", page: 602 },
    { number: 107, name: "الماعون", englishName: "Al-Ma'un", verses: 7, type: "مكية", page: 602 },
    { number: 108, name: "الكوثر", englishName: "Al-Kawthar", verses: 3, type: "مكية", page: 602 },
    { number: 109, name: "الكافرون", englishName: "Al-Kafirun", verses: 6, type: "مكية", page: 603 },
    { number: 110, name: "النصر", englishName: "An-Nasr", verses: 3, type: "مدنية", page: 603 },
    { number: 111, name: "المسد", englishName: "Al-Masad", verses: 5, type: "مكية", page: 603 },
    { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", verses: 4, type: "مكية", page: 604 },
    { number: 113, name: "الفلق", englishName: "Al-Falaq", verses: 5, type: "مكية", page: 604 },
    { number: 114, name: "الناس", englishName: "An-Nas", verses: 6, type: "مكية", page: 604 }
  ],

  // نصوص السور والآيات العظيمة المحفوظة محلياً لسرعة القراءة بدون إنترنت
  surahTexts: {
    1: {
      name: "سورة الفاتحة",
      bismillah: false,
      ayahs: [
        { num: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
        { num: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
        { num: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ" },
        { num: 4, text: "مَالِكِ يَوْمِ الدِّينِ" },
        { num: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
        { num: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
        { num: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ" }
      ]
    },
    67: {
      name: "سورة الملك (المنجية من عذاب القبر)",
      bismillah: true,
      ayahs: [
        { num: 1, text: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ" },
        { num: 2, text: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ" },
        { num: 3, text: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ" },
        { num: 4, text: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ" },
        { num: 5, text: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ" }
      ]
    },
    93: {
      name: "سورة الضحى (سكينة وجبر الخواطر)",
      bismillah: true,
      ayahs: [
        { num: 1, text: "وَالضُّحَىٰ" },
        { num: 2, text: "وَاللَّيْلِ إِذَا سَجَىٰ" },
        { num: 3, text: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ" },
        { num: 4, text: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ" },
        { num: 5, text: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ" },
        { num: 6, text: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ" },
        { num: 7, text: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ" },
        { num: 8, text: "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ" },
        { num: 9, text: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ" },
        { num: 10, text: "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ" },
        { num: 11, text: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ" }
      ]
    },
    94: {
      name: "سورة الشرح",
      bismillah: true,
      ayahs: [
        { num: 1, text: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ" },
        { num: 2, text: "وَوَضَعْنَا عَنكَ وِزْرَكَ" },
        { num: 3, text: "الَّذِي أَنقَضَ ظَهْرَكَ" },
        { num: 4, text: "وَرَفَعْنَا لَكَ ذِكْرَكَ" },
        { num: 5, text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا" },
        { num: 6, text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا" },
        { num: 7, text: "فَإِذَا فَرَغْتَ فَانصَبْ" },
        { num: 8, text: "وَإِلَىٰ رَبِّكَ فَارْغَب" }
      ]
    },
    95: {
      name: "سورة التين",
      bismillah: true,
      ayahs: [
        { num: 1, text: "وَالتِّينِ وَالزَّيْتُونِ" },
        { num: 2, text: "وَطُورِ سِينِينَ" },
        { num: 3, text: "وَهَٰذَا الْبَلَدِ الْأَمِينِ" },
        { num: 4, text: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ" },
        { num: 5, text: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ" },
        { num: 6, text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ" },
        { num: 7, text: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ" },
        { num: 8, text: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ" }
      ]
    },
    97: {
      name: "سورة القدر",
      bismillah: true,
      ayahs: [
        { num: 1, text: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ" },
        { num: 2, text: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ" },
        { num: 3, text: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ" },
        { num: 4, text: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ" },
        { num: 5, text: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ" }
      ]
    },
    103: {
      name: "سورة العصر",
      bismillah: true,
      ayahs: [
        { num: 1, text: "وَالْعَصْرِ" },
        { num: 2, text: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ" },
        { num: 3, text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ" }
      ]
    },
    105: {
      name: "سورة الفيل",
      bismillah: true,
      ayahs: [
        { num: 1, text: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ" },
        { num: 2, text: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ" },
        { num: 3, text: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ" },
        { num: 4, text: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ" },
        { num: 5, text: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ" }
      ]
    },
    106: {
      name: "سورة قريش",
      bismillah: true,
      ayahs: [
        { num: 1, text: "لِإِيلَافِ قُرَيْشٍ" },
        { num: 2, text: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ" },
        { num: 3, text: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ" },
        { num: 4, text: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ" }
      ]
    },
    107: {
      name: "سورة الماعون",
      bismillah: true,
      ayahs: [
        { num: 1, text: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ" },
        { num: 2, text: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ" },
        { num: 3, text: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ" },
        { num: 4, text: "فَوَيْلٌ لِّلْمُصَلِّينَ" },
        { num: 5, text: "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ" },
        { num: 6, text: "الَّذِينَ هُمْ يُرَاءُونَ" },
        { num: 7, text: "وَيَمْنَعُونَ الْمَاعُونَ" }
      ]
    },
    108: {
      name: "سورة الكوثر",
      bismillah: true,
      ayahs: [
        { num: 1, text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ" },
        { num: 2, text: "فَصَلِّ لِرَبِّكَ وَانْحَرْ" },
        { num: 3, text: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ" }
      ]
    },
    109: {
      name: "سورة الكافرون",
      bismillah: true,
      ayahs: [
        { num: 1, text: "قُلْ يَا أَيُّهَا الْكَافِرُونَ" },
        { num: 2, text: "لَا أَعْبُدُ مَا تَعْبُدُونَ" },
        { num: 3, text: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ" },
        { num: 4, text: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ" },
        { num: 5, text: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ" },
        { num: 6, text: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ" }
      ]
    },
    110: {
      name: "سورة النصر",
      bismillah: true,
      ayahs: [
        { num: 1, text: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ" },
        { num: 2, text: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا" },
        { num: 3, text: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا" }
      ]
    },
    111: {
      name: "سورة المسد",
      bismillah: true,
      ayahs: [
        { num: 1, text: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ" },
        { num: 2, text: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ" },
        { num: 3, text: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ" },
        { num: 4, text: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ" },
        { num: 5, text: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ" }
      ]
    },
    112: {
      name: "سورة الإخلاص (تعدل ثلث القرآن)",
      bismillah: true,
      ayahs: [
        { num: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ" },
        { num: 2, text: "اللَّهُ الصَّمَدُ" },
        { num: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
        { num: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" }
      ]
    },
    113: {
      name: "سورة الفلق",
      bismillah: true,
      ayahs: [
        { num: 1, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ" },
        { num: 2, text: "مِن شَرِّ مَا خَلَقَ" },
        { num: 3, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ" },
        { num: 4, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ" },
        { num: 5, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ" }
      ]
    },
    114: {
      name: "سورة الناس",
      bismillah: true,
      ayahs: [
        { num: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ" },
        { num: 2, text: "مَلِكِ النَّاسِ" },
        { num: 3, text: "إِلَٰهِ النَّاسِ" },
        { num: 4, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ" },
        { num: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ" },
        { num: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ" }
      ]
    }
  },

  // بنك التفسير الميسر الموثوق للآيات الكريمة
  tafsir: {
    1: {
      1: "أبتدئ قراءتي مستعيناً بالله مستحضراً رحمته الواسعة التي وسعت كل شيء.",
      2: "الثناء الكامل والشكر الخالص لله وحده، خالق العوالم ومربيها بنعمه.",
      3: "الذي وسعت رحمته كل شيء في الدنيا، والرحيم بالمؤمنين في الآخرة.",
      4: "المالك المتصرف ليوم الحساب والجزاء الذي لا ملك فيه لأحد سواه.",
      5: "نخصك وحدك بالعبادة، ونطلب العون منك وحدك في جميع شؤوننا.",
      6: "دلّنا ووفقنا وثبتنا على الصراط المستقيم وهو دين الإسلام الواضح.",
      7: "طريق الذين أنعمت عليهم من النبيين والصديقين، غير المغضوب عليهم ولا الضالين."
    },
    78: {
      1: "عن أي شأن عظيم وكبير يتساءل هؤلاء المشركون ويتجادلون؟",
      2: "عن القرآن العظيم وخبر البعث والنشور والقيامة بعد الموت.",
      3: "الذي هم فيه مختلفون ومشككون بين مصدق ومكذب.",
      4: "سيعلمون عاقبة تكذيبهم قريباً حين يرون عذاب الله عياناً.",
      5: "ثم سيعلمون يقيناً صدق ما جاء به النبي ﷺ وما أنزل الله في كتابه."
    },
    93: {
      1: "أقسم الله تعالى بأول النهار وضوء الشمس الساطع.",
      2: "وأقسم بالليل إذا سكن وظلم واشتد ظلامه.",
      3: "ما تركك ربك يا محمد وما أبغضك منذ اختارك واصطفاك بالرسالة.",
      4: "وللدار الآخرة وما فيها من النعيم والكرامة خير لك من دار الدنيا الزائلة.",
      5: "ولسوف يعطيك ربك من الشفاعة والدرجات العلى حتى ترضى وتطيب نفسك."
    },
    94: {
      1: "ألم نفسح لك صدرك وننوره بالحكمة ونشرحه بنور النبوة والإيمان؟",
      2: "وحططنا وخففنا عنك حملك الثقيل الذي كان يثقل ظهرك؟",
      3: "الذي أثقل ظهرك فخففناه عنك برحمتنا وفضلنا.",
      4: "ورفعنا لك ذكرك بأن قُرن اسمك الشريف مع اسم الله في الأذان والشهادتين.",
      5: "فإن مع الشدة والضيق يسراً عظيماً وفرجاً قريباً.",
      6: "إن مع العسر الواحد يسراً مضاعفاً لا يغلبه عسر أبداً.",
      7: "فإذا فرغت من أعمالك الدنيوية فاجتهد وأقبل على عبادة ربك ودعائه.",
      8: "وإلى ربك وحده فارغب واطلب منه الفضل والرحمة والمغفرة."
    },
    97: {
      1: "إنا ابتدأنا إنزال القرآن الكريم في ليلة القدر المباركة من شهر رمضان.",
      2: "وما أعلمك يا محمد ما هي ليلة القدر وما عظيم شأنها وفضلها؟",
      3: "العمل الصالح والعبادة في ليلة القدر خير من عبادة ألف شهر ليس فيها ليلة قدر.",
      4: "تتنزل الملائكة ومعهم جبريل عليه السلام بالبركة والرحمة وقضاء كل أمر حكيم.",
      5: "هي سلام وأمان وطمأنينة للمؤمنين حتى مطلع الفجر."
    },
    108: {
      1: "إنا أعطيناك يا محمد الخير الكثير الدائم، ومنه نهر الكوثر في الجنة.",
      2: "فأخلص لربك صلاتك كلها، وانحر ذبيحتك له وحده شكراً لنعمه.",
      3: "إن مبغضك وعدوك هو المنقطع ذكره وعقبه والمحروم من كل خير وبركة."
    },
    110: {
      1: "إذا تم فتح مكة ودخل الناس في دين الله أفواجاً وظهرت راية الحق والتوحيد.",
      2: "ورأيت الناس يقبلون على الإسلام جماعات تلو جماعات بعد طول محنة.",
      3: "فاختم دعوتك وحياتك بتسبيح الله وحمده واستغفاره، إنه كان تواباً على عباده المستغفرين."
    },
    112: {
      1: "قل يا محمد: الله واحد أحد لا شريك له ولا نظير ولا مثيل.",
      2: "الله الذي تصمد إليه الخلائق وتقصده في جميع حوائجها ورغائبها.",
      3: "لم يلد وليس له ولد، ولم يولد وليس له والد.",
      4: "ولم يكن له مكافئ ولا مماثل في ذاته ولا أسمائه ولا صفاته."
    },
    113: {
      1: "قل أعوذ وأعتصم برب الفلق، وهو الصبح وفالقه بنوره.",
      2: "من شر جميع ما خلق من الإنس والجن والدواب والشرور.",
      3: "ومن شر الليل إذا أظلم ودخل في كل شيء.",
      4: "ومن شر السواحر اللاتي ينفثن في عقد السحر للإيذاء.",
      5: "ومن شر كل حاسد إذا حسد وتمنى زوال نعمة غيره."
    },
    114: {
      1: "قل أعوذ وألتجئ برب الناس وخالقهم ومدبر أمورهم.",
      2: "ملك الناس المتصرف فيهم بعدله وحكمته.",
      3: "إله الناس ومعبودهم الحق الذي لا معبود سواه.",
      4: "من شر الشيطان الوسواس الذي يوسوس عند الغفلة ويخنس ويختفي عند ذكر الله.",
      5: "الذي يبث الشكوك والخواطر الرديئة في صدور الناس.",
      6: "من شياطين الإنس والجن على السواء."
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhQuranData = RawhQuranData;
}
