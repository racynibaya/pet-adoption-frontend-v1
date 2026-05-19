export interface Activity {
  id: string
  actor: string
  verb: string
  subject: string
  time: string
  tone: 'amber' | 'teal' | 'rose'
}

export interface ShelterRow {
  name: string
  city: string
  count: number
}

export interface AdminDashboardStats {
  total: number
  available: number
  pending: number
  adopted: number
  rate: number
  pendingApps: number
}

export interface SparkData {
  points: number[]
  max: number
}
