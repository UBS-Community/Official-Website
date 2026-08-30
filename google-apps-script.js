/**
 * ==============================================================================
 * UMB BLOCKCHAIN SOCIETY (UBS) — GOOGLE APPS SCRIPT WEBHOOK FOR GOOGLE SHEETS
 * ==============================================================================
 * 
 * ⚠️ PENTING AGAR DATA BISA MASUK OTOMATIS:
 * Saat melakukan Deploy di Google Apps Script:
 * 1. "Execute as" (Jalankan sebagai)  -> Pilih: "Me" (Email Anda)
 * 2. "Who has access" (Akses)        -> Pilih: "Anyone" (Siapa saja)  <-- WAJIB PILIH INI!
 * 
 * Jika "Who has access" dipilih "Only myself", Google akan memblokir kiriman form dari website!
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

    var data = {};
    
    // 1. Coba baca dari URL parameters / Form Data (paling reliable)
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    }
    
    // 2. Coba baca dari JSON body jika ada
    if (e && e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        data = Object.assign({}, data, parsed);
      } catch (err) {
        // Bukan JSON, gunakan parameter biasa
      }
    }

    // Append Row ke Google Sheets
    sheet.appendRow([
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.id || "UBS-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      data.fullName || data.name || "",
      "'" + (data.nim || ""), // Beri tanda petik agar format NIM tidak terpotong nol di depan
      data.birthDate || "",
      data.university || "Universitas Mercu Buana",
      data.campusBranch || "",
      data.faculty || "",
      data.major || "",
      data.cohortYear || "",
      data.email || "",
      "'" + (data.whatsapp || ""), // Format nomor WA
      data.track || data.trackLabel || "",
      data.proofUbsc || "Verified",
      data.proofExplomate || "Verified"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Data berhasil disimpan" }))
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
  // Tangani juga jika dikirim via GET
  if (e && e.parameter && (e.parameter.fullName || e.parameter.nim)) {
    return doPost(e);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", service: "UBS Google Sheets Webhook API" }))
    .setMimeType(ContentService.MimeType.JSON);
}
