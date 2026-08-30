/**
 * UBS Google Sheets Direct Submission Service
 * 
 * Konsep seperti Google Forms: data langsung dikirim ke Google Sheets
 * via Google Apps Script Webhook. Tidak perlu admin page atau localStorage.
 * 
 * SETUP:
 * 1. Buka Google Sheets baru > Extensions > Apps Script
 * 2. Paste kode dari file google-apps-script.js
 * 3. Deploy > New Deployment > Web App (Anyone can access)
 * 4. Ganti WEBHOOK_URL di bawah dengan URL Web App yang dihasilkan
 */

// ⚡ GANTI URL INI dengan URL Web App Google Apps Script kamu!
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_REAL_WEBHOOK_URL/exec'

/**
 * Kirim data pendaftar langsung ke Google Sheets
 * Mirip cara kerja Google Forms submit
 */
export const submitToGoogleSheet = async (applicantData) => {
  const registrationId = `UBS-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`

  const payload = {
    action: 'addApplicant',
    timestamp: new Date().toISOString(),
    id: registrationId,
    fullName: applicantData.fullName,
    nim: applicantData.nim,
    birthDate: applicantData.birthDate,
    university: applicantData.universityType === 'mercubuana'
      ? 'Universitas Mercu Buana'
      : applicantData.universityName,
    campusBranch: applicantData.universityType === 'mercubuana'
      ? applicantData.campusBranch
      : 'Luar UMB',
    faculty: applicantData.faculty,
    major: applicantData.major,
    cohortYear: applicantData.cohortYear,
    email: applicantData.email,
    whatsapp: applicantData.whatsapp,
    track: applicantData.trackLabel || applicantData.track,
    proofUbsc: applicantData.proofUbsc
      ? JSON.stringify(applicantData.proofUbsc)
      : 'Verified',
    proofExplomate: applicantData.proofExplomate
      ? JSON.stringify(applicantData.proofExplomate)
      : 'Verified'
  }

  // Jika URL masih sample/placeholder, simulasi saja
  if (WEBHOOK_URL.includes('REPLACE_WITH_YOUR_REAL')) {
    console.log('[UBS] Demo mode: Data would be sent to Google Sheets:', payload)
    return { success: true, id: registrationId, simulated: true }
  }

  try {
    // POST ke Google Apps Script Web App
    // mode: 'no-cors' agar browser bisa kirim ke domain Google tanpa CORS issue
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    return { success: true, id: registrationId }
  } catch (err) {
    console.error('[UBS] Google Sheets submission error:', err)
    return { success: false, id: registrationId, error: err.message }
  }
}
