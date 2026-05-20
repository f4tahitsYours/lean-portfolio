# 📁 Folder Sertifikat Work Experience

## Cara Menambahkan Sertifikat Work Experience

### 1. Upload File Sertifikat
Letakkan file sertifikat untuk Work Experience di folder ini:
```
public/experience/
├── GCA_Facilitator_Certificate.pdf
├── Bangkit_ML_Specialist_Certificate.pdf
└── FPMP_Intern_Certificate.pdf
```

### 2. Nama File yang Sudah Digunakan di Code

Berdasarkan code di `App.tsx`, nama file yang digunakan:

1. **Google Cloud Arcade Facilitator**
   - File: `GCA_Facilitator_Certificate.pdf`
   - Button: "View Certificate" di Experience section

2. **Machine Learning Specialist (Bangkit)**
   - File: `Bangkit_ML_Specialist_Certificate.pdf`
   - Button: "View Certificate" di Experience section

3. **Intern at Seksi FPMP (BPMP NTT)**
   - File: `FPMP_Intern_Certificate.pdf`
   - Button: "View Certificate" di Experience section

### 3. Format File
- ✅ PDF (.pdf) - **Recommended**
- ✅ Gambar (.jpg, .jpeg, .png)

### 4. Cara Kerja
File akan otomatis tersedia di:
```
http://localhost:3001/experience/nama-file.pdf
```

### 5. Contoh Struktur
```
public/
├── certificates/        # Untuk Licenses & Certifications section
│   ├── dicoding_javascript_basic.pdf
│   └── ... (15 sertifikat)
└── experience/         # Untuk Work Experience section
    ├── README.md (file ini)
    ├── GCA_Facilitator_Certificate.pdf
    ├── Bangkit_ML_Specialist_Certificate.pdf
    └── FPMP_Intern_Certificate.pdf
```

## Tips
- Pastikan nama file **sama persis** dengan yang di code
- Gunakan nama tanpa spasi (gunakan underscore `_`)
- Compress PDF jika ukuran terlalu besar (max 5 MB)
