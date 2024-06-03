import { Prisma, PrismaClient } from '@prisma/client'

export type ConnectionDatabaseType = PrismaClient<
  Prisma.PrismaClientOptions,
  never
>

export const connectionDatabase = new PrismaClient()
