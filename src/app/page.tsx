import { redirect, RedirectType } from 'next/navigation'

export default function Home() {
  redirect('/auth/sign-in', RedirectType.replace)
}
