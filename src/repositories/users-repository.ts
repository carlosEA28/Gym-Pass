import type { Prisma, User } from "../generated/prisma/client.js";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
