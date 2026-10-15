import 'server-only'
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// pnpm exec prisma validate
// pnpm exec prisma db push
// pnpm exec prisma generate
// pnpm exec prisma migrate dev --name add_products
// pnpm exec prisma migrate deploy
// pnpm exec prisma db pull
