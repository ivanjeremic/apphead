import type { AuthResult, AuthSession, AuthUser, SignInWithPasswordArgs } from "../auth-service.js"

export interface PasswordProviderOptions {
  sessionTtlMs?: number
}

export function SignInWithPassword(opts?: PasswordProviderOptions) {
  const users = new Map<string, AuthUser>()
  const emailIndex = new Map<string, string>()
  const sessions = new Map<string, AuthSession>()
  const sessionTtlMs = opts?.sessionTtlMs

  const uuid = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36)

  const makeError = (code: string, message: string, details?: unknown) => ({ code, message, details })

  const signInWithPassword = async (
    args: SignInWithPasswordArgs
  ): Promise<AuthResult<{ session: AuthSession; user: AuthUser }>> => {
    const email = args.email.trim().toLowerCase()
    if (!email) return { data: null, error: makeError("INVALID_EMAIL", "email is required") }
    if (!args.password) return { data: null, error: makeError("INVALID_PASSWORD", "password is required") }

    const now = Date.now()
    let userId = emailIndex.get(email)
    let user = userId ? users.get(userId) : undefined

    if (!user) {
      userId = uuid()
      user = { id: userId, email, createdAt: new Date(now), updatedAt: new Date(now) }
      users.set(userId, user)
      emailIndex.set(email, userId)
    }

    const session: AuthSession = {
      id: uuid(),
      userId: user.id,
      user,
      createdAt: new Date(now),
      ...(sessionTtlMs ? { expiresAt: new Date(now + sessionTtlMs) } : {})
    }
    sessions.set(session.id, session)

    return { data: { session, user }, error: null }
  }

  const signOut = async (sessionId: string): Promise<void> => {
    sessions.delete(sessionId)
  }

  const getSession = async (
    sessionId: string
  ): Promise<AuthResult<{ session: AuthSession | null }>> => {
    const s = sessions.get(sessionId)
    if (!s) return { data: { session: null }, error: null }
    if (s.expiresAt && s.expiresAt.getTime() <= Date.now()) {
      sessions.delete(sessionId)
      return { data: { session: null }, error: null }
    }
    return { data: { session: s }, error: null }
  }

  const getUser = async (userId: string): Promise<AuthResult<{ user: AuthUser | null }>> => {
    const u = users.get(userId)
    return { data: { user: u ?? null }, error: null }
  }

  return {
    name: "password" as const,
    signInWithPassword,
    signOut,
    getSession,
    getUser
  }
}
