import * as XLSX from 'xlsx'

const STORAGE_KEY = 'ubs_guild_applicants_v1'

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
      instagram: true,
      linkedin: true,
      tiktok: true,
      proofFileName: 'proof_ubsc.png'
    },
    proofExplomate: {
      twitter: true,
      instagram: true,
      proofFileName: 'proof_explomate.png'
    }
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

export const saveApplicant = (applicantData) => {
  try {
    const existing = getApplicants()
    const newEntry = {
      id: `UBS-${new Date().getFullYear()}-${String(existing.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      ...applicantData
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
