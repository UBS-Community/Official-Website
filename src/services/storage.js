/**
 * UBS Google Sheets Direct Submission Service
 * 
 * Konsep seperti Google Forms: data langsung dikirim ke Google Sheets
 * via Google Apps Script Webhook.
 */

// Google Apps Script Webhook URL resmi komunitas UBS
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyAfiiRsD2coIku_cadv2BBTZ0QiixH3qba0Zn1RJrkiyMuswk-60pfPNoR7N1GSuvrSQ/exec'

/**
 * Kirim data pendaftar langsung ke Google Sheets
 * Mirip cara kerja Google Forms submit
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
    // Kirim menggunakan URLSearchParams dengan POST & mode: 'no-cors'
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
