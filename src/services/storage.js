import * as XLSX from 'xlsx'

// Storage keys & Google Sheets configuration
const STORAGE_KEY = 'ubs_guild_applicants_v1'
const GOOGLE_SHEET_CONFIG_KEY = 'ubs_google_sheet_config_v1'

// Default Google Sheets Webhook URL & Live Sheet URL
// Pettingi grup can easily customize these in the /admin portal or through this file
export const DEFAULT_SHEET_CONFIG = {
  webhookUrl: 'https://script.google.com/macros/s/AKfycbz_SAMPLE_UBS_WEBHOOK_ENDPOINT/exec',
  liveSheetUrl: 'https://docs.google.com/spreadsheets/d/1SAMPLE_SPREADSHEET_ID/edit?usp=sharing'
}

export const getGoogleSheetConfig = () => {
  try {
    const raw = localStorage.getItem(GOOGLE_SHEET_CONFIG_KEY)
    if (!raw) return DEFAULT_SHEET_CONFIG
    return { ...DEFAULT_SHEET_CONFIG, ...JSON.parse(raw) }
  } catch (e) {
    return DEFAULT_SHEET_CONFIG
  }
}

export const saveGoogleSheetConfig = (newConfig) => {
  try {
    const current = getGoogleSheetConfig()
    const merged = { ...current, ...newConfig }
    localStorage.setItem(GOOGLE_SHEET_CONFIG_KEY, JSON.stringify(merged))
    return merged
  } catch (e) {
    console.error('Failed to save Google Sheet config:', e)
    return DEFAULT_SHEET_CONFIG
  }
}

// Default sample data for demo/testing if storage is empty
const defaultSampleData = [
  {
    id: 'UBS-2026-001',
    createdAt: new Date().toISOString(),
    fullName: 'Rayhan Aziel Abbrar',
    nim: '41522010099',
    birthDate: '2003-05-14',
    universityType: 'mercubuana',
    universityName: 'Universitas Mercu Buana',
    campusBranch: 'Meruya',
    faculty: 'Fakultas Ilmu Komputer',
    major: 'Teknik Informatika',
    cohortYear: '2022',
    email: 'rayhan@student.mercubuana.ac.id',
    whatsapp: '081234567890',
    track: 'developer',
    trackLabel: 'Developer & Smart Contract',
    proofUbsc: {
      ig: '@zhao.leihan',
      linkedin: 'Rayhan Aziel',
      tiktok: '@rayhan',
      hasScreenshot: true
    },
    proofExplomate: {
      x: '@explomate_fan',
      ig: '@rayhan',
      hasScreenshot: true
    },
    syncedToSheet: true
  }
]

export const getApplicants = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSampleData))
      return defaultSampleData
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to load applicants:', err)
    return defaultSampleData
  }
}

/**
 * Send applicant record to Google Sheets via Apps Script Webhook
 */
export const sendToGoogleSheet = async (applicantData) => {
  const config = getGoogleSheetConfig()
  if (!config.webhookUrl || config.webhookUrl.includes('SAMPLE_')) {
    console.log('Google Sheets Webhook URL is in demo/sample mode.')
    return { success: true, simulated: true }
  }

  try {
    const payload = {
      action: 'addApplicant',
      timestamp: new Date().toISOString(),
      id: applicantData.id,
      fullName: applicantData.fullName,
      nim: applicantData.nim,
      birthDate: applicantData.birthDate,
      university: applicantData.universityType === 'mercubuana' ? 'Universitas Mercu Buana' : applicantData.universityName,
      campusBranch: applicantData.universityType === 'mercubuana' ? applicantData.campusBranch : 'Luar UMB',
      faculty: applicantData.faculty,
      major: applicantData.major,
      cohortYear: applicantData.cohortYear,
      email: applicantData.email,
      whatsapp: applicantData.whatsapp,
      track: applicantData.trackLabel || applicantData.track,
      proofUbsc: applicantData.proofUbsc ? JSON.stringify(applicantData.proofUbsc) : 'Verified',
      proofExplomate: applicantData.proofExplomate ? JSON.stringify(applicantData.proofExplomate) : 'Verified'
    }

    // Use mode: 'no-cors' so browser can send to Google Apps Script smoothly
    await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    return { success: true }
  } catch (err) {
    console.warn('Google Sheet sync attempt error:', err)
    return { success: false, error: err.message }
  }
}

export const saveApplicant = async (applicantData) => {
  try {
    const existing = getApplicants()
    const newEntry = {
      id: `UBS-${new Date().getFullYear()}-${String(existing.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      ...applicantData,
      syncedToSheet: false
    }

    // Attempt real-time sync to Google Sheets
    try {
      const sheetResult = await sendToGoogleSheet(newEntry)
      newEntry.syncedToSheet = sheetResult.success
    } catch (e) {
      console.warn('Sync to Google Sheet skipped or offline:', e)
    }

    const updated = [newEntry, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newEntry
  } catch (err) {
    console.error('Failed to save applicant:', err)
    throw err
  }
}

export const deleteApplicant = (id) => {
  try {
    const existing = getApplicants()
    const filtered = existing.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return filtered
  } catch (err) {
    console.error('Failed to delete applicant:', err)
    return getApplicants()
  }
}

export const exportApplicantsToExcel = (data = null, customFilename = '') => {
  const dataset = data || getApplicants()
  
  // Format into clean spreadsheet rows
  const rows = dataset.map((item, index) => ({
    'No': index + 1,
    'Registration ID': item.id,
    'Timestamp': new Date(item.createdAt).toLocaleString('id-ID'),
    'Nama Lengkap': item.fullName,
    'NIM': item.nim,
    'Tanggal Lahir': item.birthDate,
    'Universitas': item.universityType === 'mercubuana' ? 'Universitas Mercu Buana' : (item.universityName || 'Lainnya'),
    'Cabang Kampus': item.universityType === 'mercubuana' ? item.campusBranch : 'N/A (Luar UMB)',
    'Fakultas': item.faculty,
    'Program Studi': item.major,
    'Angkatan': item.cohortYear,
    'Email': item.email,
    'No WhatsApp': item.whatsapp,
    'Fokus Track Blockchain': item.trackLabel || item.track,
    'Bukti Follow UBSC (IG/LI/TT)': item.proofUbsc ? 'Verified' : 'Pending',
    'Bukti Follow Explomate (X/IG)': item.proofExplomate ? 'Verified' : 'Pending'
  }))

  const worksheet = XLSX.utils.json_to_sheet(rows)

  // Set column widths
  const colWidths = [
    { wch: 5 },  // No
    { wch: 18 }, // ID
    { wch: 22 }, // Timestamp
    { wch: 26 }, // Name
    { wch: 16 }, // NIM
    { wch: 15 }, // BirthDate
    { wch: 26 }, // Univ
    { wch: 18 }, // Branch
    { wch: 28 }, // Faculty
    { wch: 24 }, // Major
    { wch: 10 }, // Cohort
    { wch: 32 }, // Email
    { wch: 18 }, // WA
    { wch: 28 }, // Track
    { wch: 26 }, // Proof UBSC
    { wch: 28 }  // Proof Explomate
  ]
  worksheet['!cols'] = colWidths

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pendaftar UBS')

  const dateStr = new Date().toISOString().slice(0, 10)
  const filename = customFilename || `Data_Pendaftar_UBS_Community_${dateStr}.xlsx`

  XLSX.writeFile(workbook, filename)
  return filename
}
