import type { CheckIn } from "../../generated/prisma/client.js";
import type { CheckInUncheckedCreateInput } from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { CheckinsRepository } from "../check-ins-repository.js";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckinsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("day");
    const endOfTheDay = dayjs(date).endOf("day");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async save(check_in: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: check_in.id,
      },
      data: {
        validated_at: check_in.validated_at,
      },
    });

    return checkIn;
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
