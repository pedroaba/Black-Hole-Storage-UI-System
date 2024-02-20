import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

const prisma = new PrismaClient()

const authorizeParamsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const authOptions = {
  // @ts-expect-error NextAuth Typing
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(_, request) {
        const credentials = authorizeParamsSchema.parse(request.body)
        console.log(credentials)

        const userOnDb = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!userOnDb) {
          throw new Error('Invalid credentials!')
        }

        const isMatchPassword = userOnDb.password === credentials.password
        if (!isMatchPassword) {
          throw new Error('Invalid credentials!')
        }

        return {
          id: userOnDb.id,
          email: userOnDb.email,
          image: userOnDb.image,
          name: userOnDb.name,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (!token.email) throw new Error('User not found')

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: token.email,
        },
      })

      return {
        ...session,
        user,
      }
    },
  },
} satisfies AuthOptions
