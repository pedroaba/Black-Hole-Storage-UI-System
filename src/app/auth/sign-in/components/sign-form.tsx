'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'É necessário que você entre com um email',
    })
    .email({
      message: 'Entre com um email válido',
    }),
  password: z
    .string({
      required_error: 'Insira a sua senha',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
})

export type SignInSchema = z.infer<typeof signInSchema>

export interface SignInFormProps {
  callbackUrl?: string | null
}

export function SignInForm({ callbackUrl }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [hasFocusOnPasswordInput, setPasswordInputFocus] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const router = useRouter()

  async function handleSignIn({ email, password }: SignInSchema) {
    try {
      const auth = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (auth?.error) {
        return toast('Erro na Autenticação', {
          description: `Aconteceu um erro na hora da autenticação: ${auth.error}`,
        })
      }

      if (callbackUrl) {
        return router.push(callbackUrl)
      }

      router.push('/driver/home')
    } catch (e) {
      return toast('Erro na Autenticação', {
        description: 'Aconteceu um erro na hora da autenticação',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xl text-zinc-50">E-mail</FormLabel>
              <FormControl>
                <Input
                  className="bg-foreground text-zinc-400 placeholder:text-zinc-600"
                  placeholder="jhondoe@email.com..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xl text-zinc-50">Senha</FormLabel>
              <FormControl>
                <div
                  data-focus={hasFocusOnPasswordInput}
                  className="flex overflow-hidden rounded-md border border-input ring-offset-background data-[focus=true]:ring-2 data-[focus=true]:ring-ring data-[focus=true]:ring-offset-2"
                >
                  <Input
                    onFocus={() => setPasswordInputFocus(true)}
                    className="rounded-none border-0 bg-foreground text-zinc-400 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    placeholder=""
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    onBlur={() => setPasswordInputFocus(false)}
                  />
                  <Button
                    size="icon"
                    type="button"
                    className="w-12 bg-transparent hover:bg-transparent"
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="form">
          Entrar
        </Button>
      </form>
      <div className="flex flex-col gap-1 text-center text-zinc-500">
        <Link
          href="/auth/sign-up"
          className="text-xs underline hover:text-blue-800"
        >
          Não tenho uma conta? Clique aqui para se registrar
        </Link>
        <Link
          href="/auth/reset-password"
          className="text-xs underline hover:text-blue-800"
        >
          Esqueci minha senha?
        </Link>
      </div>
    </Form>
  )
}
