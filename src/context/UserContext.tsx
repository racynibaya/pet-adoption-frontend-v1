import { useState, type ReactNode } from 'react'
import { apiGetMe, apiLogout, setToken } from '@/services/api'
import { UserContext, type AdopterUser } from './useUser'

const STORAGE_KEY_TOKEN = 'koda-user-token'
const STORAGE_KEY_USER = 'koda-user'

function readStoredUser(): AdopterUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_USER)
    return raw ? (JSON.parse(raw) as AdopterUser) : null
  } catch {
    return null
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [adopter, setAdopter] = useState<AdopterUser | null>(() => {
    const token = sessionStorage.getItem(STORAGE_KEY_TOKEN)
    if (token) setToken(token)
    return readStoredUser()
  })

  async function signIn(token: string): Promise<boolean> {
    setToken(token)
    sessionStorage.setItem(STORAGE_KEY_TOKEN, token)

    try {
      const me = await apiGetMe()
      const u = me.data

      if (u.role !== 'USER') {
        // Not an adopter — clear and bail
        setToken(null)
        sessionStorage.removeItem(STORAGE_KEY_TOKEN)
        return false
      }

      const adopterData: AdopterUser = {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`.trim(),
        email: u.email,
        initials: `${u.firstName[0] ?? ''}${u.lastName[0] ?? ''}`.toUpperCase(),
        isVerified: u.isVerified,
        address: u.address ?? null,
        phoneNumber: u.phoneNumber ?? null,
        joinedAt: new Date().toISOString(),
      }

      setAdopter(adopterData)
      sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(adopterData))
      return true
    } catch {
      setToken(null)
      sessionStorage.removeItem(STORAGE_KEY_TOKEN)
      return false
    }
  }

  async function signOut(): Promise<void> {
    try { await apiLogout() } catch { /* ignore */ }
    setToken(null)
    setAdopter(null)
    sessionStorage.removeItem(STORAGE_KEY_TOKEN)
    sessionStorage.removeItem(STORAGE_KEY_USER)
  }

  return (
    <UserContext.Provider value={{ isAuthenticated: adopter !== null, adopter, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}
