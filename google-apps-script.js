/**
 * ==============================================================================
 * UMB BLOCKCHAIN SOCIETY (UBS) — GOOGLE APPS SCRIPT WEBHOOK FOR GOOGLE SHEETS
 * ==============================================================================
 * 
 * PANDUAN CEPAT SETUP GOOGLE SHEETS (Hanya butuh 1-2 menit):
 * 
 * 1. Buka Google Sheets baru di Google Drive Anda (misal beri judul: "Data Pendaftaran UMB Blockchain Society").
 * 2. Di menu atas Google Sheets, klik: "Extensions" (Ekstensi) > "Apps Script".
 * 3. Hapus semua kode default yang ada di editor Apps Script, lalu PASTE SELURUH KODE DI BAWAH INI.
 * 4. Klik tombol "Deploy" (Terapkan) berwarna biru di kanan atas > Pilih "New deployment" (Penerapan baru).
 * 5. Klik ikon Gerigi (Select type) > Pilih "Web app".
 * 6. Atur konfigurasi berikut:
 *    - Description: "UBS Invitation Webhook"
 *    - Execute as: "Me" (Email Google Anda)
 *    - Who has access: "Anyone" (Siapa saja, bahkan anonim - agar form di website bisa mengirim data tanpa login Google).
 * 7. Klik "Deploy" > Izinkan akses akun Google Anda ("Authorize access").
 * 8. Copy "Web app URL" yang diberikan (berakhiran /exec).
 * 9. Buka halaman `/admin` di website UBS > Klik "Pengaturan Google Sheets" > Paste Webhook URL & Link Google Sheet Anda!
 * 
 * Selesai! Setiap mahasiswa yang mendaftar di web otomatis langsung masuk ke Google Sheet Anda secara realtime!
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create Header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Registration ID",
        "Nama Lengkap",
        "NIM",
        "Tanggal Lahir",
        "Universitas",
        "Cabang Kampus",
        "Fakultas",
        "Program Studi",
        "Angkatan",
        "Email",
        "No WhatsApp",
        "Track Minat Blockchain",
        "Bukti Follow UBSC",
        "Bukti Follow Explomate"
      ]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#D4AF37").setFontColor("#05070B");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    // Append Row
    sheet.appendRow([
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.id || "UBS-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900),
      data.fullName || "",
      "'" + (data.nim || ""), // Beri tanda petik agar format NIM tidak terpotong nol di depan
      data.birthDate || "",
      data.university || "Universitas Mercu Buana",
      data.campusBranch || "",
      data.faculty || "",
      data.major || "",
      data.cohortYear || "",
      data.email || "",
      "'" + (data.whatsapp || ""), // Format nomor WA
      data.track || "",
      data.proofUbsc || "Verified",
      data.proofExplomate || "Verified"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Data pendaftar berhasil disimpan ke Google Sheets" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", service: "UBS Google Sheets Webhook API" }))
    .setMimeType(ContentService.MimeType.JSON);
}
