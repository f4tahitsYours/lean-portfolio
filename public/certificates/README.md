# 📁 Folder Sertifikat

## Cara Menambahkan Sertifikat

### 1. Upload File Sertifikat
Letakkan semua file sertifikat Anda (PDF atau gambar) di folder ini:
```
public/certificates/
├── dicoding_javascript_basic.pdf
├── dicoding_python_basic.pdf
├── dicoding_sql_basic.pdf
├── dicoding_datascience_basic.pdf
├── dicoding_ai_basic.pdf
├── msib_kampus_merdeka.pdf
├── deeplearning_nlp_specialization.pdf
├── google_data_analytics.pdf
├── google_it_automation.pdf
├── tensorflow_advanced_techniques.pdf
├── tensorflow_data_deployment.pdf
└── ... (sertifikat lainnya)
```

### 2. Format File yang Didukung
- ✅ PDF (.pdf)
- ✅ Gambar (.jpg, .jpeg, .png)

### 3. Penamaan File
Gunakan nama file yang sama dengan yang ada di `src/certificatesData.ts`

Contoh:
- `dicoding_javascript_basic.pdf`
- `Bangkit_ML_Specialist_Certificate.pdf`
- `GCA_Facilitator_Certificate.pdf`

### 4. Ukuran File
Disarankan:
- PDF: maksimal 5 MB per file
- Gambar: maksimal 2 MB per file

### 5. Setelah Upload
File akan otomatis tersedia di:
```
http://localhost:3001/certificates/nama-file.pdf
```

## Contoh Struktur
```
public/
└── certificates/
    ├── README.md (file ini)
    ├── dicoding_javascript_basic.pdf
    ├── dicoding_python_basic.pdf
    └── ... (sertifikat lainnya)
```

## Tips
- Compress PDF jika ukuran terlalu besar
- Gunakan nama file tanpa spasi (gunakan underscore atau dash)
- Pastikan nama file sama dengan yang di certificatesData.ts
