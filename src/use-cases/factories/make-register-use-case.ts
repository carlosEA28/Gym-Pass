import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { OnboardingEmailService } from "../onboarding-email.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const onboardingEmailService = new OnboardingEmailService();
  const registerUseCase = new RegisterUseCase(
    prismaUsersRepository,
    onboardingEmailService,
  );

  return registerUseCase;
}
