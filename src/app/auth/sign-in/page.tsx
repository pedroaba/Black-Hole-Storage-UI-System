import { Metadata } from 'next'
import Image from 'next/image'

import BlackHoleImage from '@/assets/cartoon-black-hole-07.webp'

import { SignInForm } from './components/sign-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="min-w-screen grid min-h-screen grid-cols-6">
      <section className="col-span-4 flex min-h-full flex-col justify-between py-8 pl-8">
        <div>
          <h1 className="font-anta text-4xl text-zinc-50">
            Black Hole Storage
          </h1>
          <article className="mt-14 max-w-[80%] space-y-8 text-zinc-300">
            <p className="text-justify font-kode text-2xl">
              Navegue pelo cosmos do armazenamento digital com Black Hole
              Storage. Entre em um universo onde seus arquivos são preservados
              como segredos do próprio <b>buraco negro.</b>
            </p>
            <p className="font-kode text-2xl">
              Bem-vindo à <b>escuridão segura.</b>
            </p>
          </article>
        </div>
        <span className="mt-auto text-xs font-bold text-zinc-700">
          Todos os direitos reservados &copy; Pedro Augusto Barbosa Aparecido
        </span>
        <Image
          className="absolute left-0 top-0 -z-[999999999] h-screen w-screen"
          src={BlackHoleImage}
          // quality={1}
          width={1000}
          height={1000}
          alt="Black Hole background image"
        />
      </section>
      <section className="col-span-2 flex flex-col justify-center gap-4 bg-neutral-950 p-12">
        <div className="mb-12 flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl text-zinc-50">Login</h1>
          <p className="w-96 text-center font-kode text-base text-zinc-50">
            Atravesse o horizonte de eventos! Faça login no{' '}
            <b>
              <u>Black Hole Storage</u>
            </b>{' '}
            e explore seus arquivos.
          </p>
        </div>
        <SignInForm />
      </section>
    </div>
  )
}
