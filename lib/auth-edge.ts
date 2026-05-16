export interface JWTPayload {
  userId: string
  email: string
  role: 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH' | 'manager' | 'fan' | 'player' | 'coach'
  name: string
  exp?: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

function base64UrlToUint8Array(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

function decodePayload(payload: string): JWTPayload | null {
  try {
    const bytes = base64UrlToUint8Array(payload)
    const json = new TextDecoder().decode(bytes)
    return JSON.parse(json) as JWTPayload
  } catch {
    return null
  }
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const [header, payload, signature] = token.split('.')

  if (!header || !payload || !signature) {
    return null
  }

  const key = await crypto.subtle.importKey(
    'raw',
    toArrayBuffer(new TextEncoder().encode(JWT_SECRET)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const expectedSignature = base64UrlToUint8Array(signature)
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    toArrayBuffer(expectedSignature),
    toArrayBuffer(new TextEncoder().encode(`${header}.${payload}`))
  )

  if (!isValid) {
    return null
  }

  const decoded = decodePayload(payload)
  if (!decoded) {
    return null
  }

  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    return null
  }

  return decoded
}
