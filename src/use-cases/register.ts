import { hash } from "bcryptjs";
import type { UsersRepository } from "../repositories/users-repository.js";
import { UserAlreadyExistsError } from "./erros/user-already-exists.js";
import type { User } from "../generated/prisma/client.js";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface ResgisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseParams): Promise<ResgisterUseCaseResponse> {
    const password_hash = await hash(password, 8);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
