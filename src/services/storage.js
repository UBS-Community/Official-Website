/**
 * UBS Google Sheets Direct Submission Service
 * 
 * Data pendaftaran langsung dikirim ke Google Sheets via Google Apps Script Webhook.
 */

// Google Apps Script Webhook URL resmi komunitas UBS (Live & Active)
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyKXBOP4_QSEclgID_EhO-fOPoGWC9W53fSF3k7Era9E3EloeW_Qw6oXVKHKZOCp4i-BQ/exec'

/**
 * Kirim data pendaftar langsung ke Google Sheets
 */
export const submitToGoogleSheet = async (applicantData) => {
  const registrationId = `UBS-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`

  const params = new URLSearchParams()
  params.append('action', 'addApplicant')
  params.append('timestamp', new Date().toISOString())
  params.append('id', registrationId)
  params.append('fullName', applicantData.fullName || '')
  params.append('nim', applicantData.nim || '')
  params.append('birthDate', applicantData.birthDate || '')
  params.append('university', applicantData.universityType === 'mercubuana' ? 'Universitas Mercu Buana' : (applicantData.universityName || ''))
  params.append('campusBranch', applicantData.universityType === 'mercubuana' ? (applicantData.campusBranch || '') : 'External')
  params.append('faculty', applicantData.faculty || '')
  params.append('major', applicantData.major || '')
  params.append('cohortYear', applicantData.cohortYear || '')
  params.append('email', applicantData.email || '')
  params.append('whatsapp', applicantData.whatsapp || '')
  params.append('track', applicantData.trackLabel || applicantData.track || '')
  params.append('proofUbsc', applicantData.proofUbsc ? JSON.stringify(applicantData.proofUbsc) : 'Verified')
  params.append('proofExplomate', applicantData.proofExplomate ? JSON.stringify(applicantData.proofExplomate) : 'Verified')

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    return { success: true, id: registrationId }
  } catch (err) {
    console.error('[UBS] Google Sheets submission error:', err)
    return { success: false, id: registrationId, error: err.message }
  }
}
