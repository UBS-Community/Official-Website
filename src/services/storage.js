/**
 * UBS Google Sheets Direct Submission Service
 * 
 * Konsep seperti Google Forms: data langsung dikirim ke Google Sheets
 * via Google Apps Script Webhook. Tidak perlu admin page atau localStorage.
 */

// Google Apps Script Webhook URL resmi komunitas UBS
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyAfiiRsD2coIku_cadv2BBTZ0QiixH3qba0Zn1RJrkiyMuswk-60pfPNoR7N1GSuvrSQ/exec'

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
      : 'External',
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

  try {
    // POST ke Google Apps Script Web App
    // mode: 'no-cors' agar browser bisa kirim ke domain Google tanpa CORS issue
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    return { success: true, id: registrationId }
  } catch (err) {
    console.error('[UBS] Google Sheets submission error:', err)
    return { success: false, id: registrationId, error: err.message }
  }
}
