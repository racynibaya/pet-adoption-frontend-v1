import { useState, type ReactNode } from 'react'
import {
  apiGetMe,
  apiLogin,
  apiLogout,
  ApiError,
  setToken,
} from '@/services/api'
import { StaffAuthContext, type StaffUser } from './useStaffAuth'

export function StaffAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = sessionStorage.getItem('staff-token')
    if (token) setToken(token)
    return sessionStorage.getItem('staff-auth') === '1'
  })

  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    const stored = sessionStorage.getItem('staff-user')
    if (!stored) return null
    const parsed = JSON.parse(stored) as Partial<StaffUser> & {
      shelterId?: number | null
    }
    return {
      id: parsed.id!,
      name: parsed.name!,
      email: parsed.email!,
      role: parsed.role!,
      initials: parsed.initials!,
      shelterIds:
        parsed.shelterIds ??
        (parsed.shelterId != null ? [parsed.shelterId] : []),
    }
  })

  const [loginError, setLoginError] = useState('')

  async function login(email: string, password: string): Promise<boolean> {
    setLoginError('')
    try {
      const authRes = await apiLogin(email, password)
      setToken(authRes.accessToken)
      sessionStorage.setItem('staff-token', authRes.accessToken)

      const meRes = await apiGetMe()
      const u = meRes.data

      if (u.role !== 'STAFF' && u.role !== 'ADMIN') {
        setLoginError('This account does not have staff access.')
        setToken(null)
        sessionStorage.removeItem('staff-token')
        return false
      }

      const staffUserData: StaffUser = {
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role,
        initials: `${u.firstName[0]}${u.lastName[0]}`.toUpperCase(),
        shelterIds: u.shelterStaffs?.map((s) => s.shelterId) ?? [],
      }

      setIsAuthenticated(true)
      setStaffUser(staffUserData)
      sessionStorage.setItem('staff-auth', '1')
      sessionStorage.setItem('staff-user', JSON.stringify(staffUserData))

      return true
    } catch (err) {
      if (err instanceof ApiError) {
        setLoginError(
          err.status === 401 ? 'Invalid email or password.' : err.message,
        )
      } else {
        setLoginError(
          'Could not connect to the server. Make sure the backend is running.',
        )
      }
      return false
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiLogout()
    } catch {
      /* ignore */
    }
    setToken(null)
    setIsAuthenticated(false)
    setStaffUser(null)
    sessionStorage.removeItem('staff-auth')
    sessionStorage.removeItem('staff-token')
    sessionStorage.removeItem('staff-user')
  }

  return (
    <StaffAuthContext.Provider
      value={{ isAuthenticated, staffUser, loginError, login, logout }}
    >
      {children}
    </StaffAuthContext.Provider>
  )
}
