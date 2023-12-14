// utils/prisma.ts

// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";
// Import "server-only" (assuming this is a placeholder for something specific to your setup)
import "server-only";

// Create a global variable to store PrismaClient instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize PrismaClient instance or use an existing one if it exists
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// If not in production, assign the PrismaClient instance to the global variable
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Check for connection errors during initialization
prisma.$connect()
  .catch((error:any) => {
    console.error(error);
    return;
  });

// Export the initialized PrismaClient instance
export default prisma;
