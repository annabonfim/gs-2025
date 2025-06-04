'use server'

import { type ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export function setUserCookie(cookieStore: ResponseCookies, userId: string) {
  cookieStore.set('userId', userId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 dia
  })
}

export function getUserIdFromCookie(cookieStore: ResponseCookies): string | null {
  return cookieStore.get('userId')?.value || null
}

export function clearUserCookie(cookieStore: ResponseCookies) {
  cookieStore.delete('userId')
}