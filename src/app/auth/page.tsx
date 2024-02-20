import { redirect } from 'next/navigation'
import { AuthOptions, getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export default async function AuthPage() {
  const session = await getServerSession(authOptions as AuthOptions)

  if (session?.user) {
    redirect('/driver/home')
  } else {
    redirect('/auth/sign-in')
  }
}
