import type { Request, Response } from 'express';
import type { AuthLocals } from '../../../middleware/authHandlers.ts';
import { becomeSellerSchema } from './products.validators.ts';
import { prismaClient } from '../../../db/prismaClient.ts';
import { Role, WeekDay } from '@prisma/client';

export const becomeSeller = async (
  req: Request<unknown, AuthLocals>,
  res: Response,
) => {
  const validData = becomeSellerSchema.parse(req.body);

  const { user } = res.locals;

  const shop = await prismaClient.shop.create({
    data: {
      userId: user.id,
      name: validData.name,
      description: validData.description,
      county: validData.county,
      city: validData.city,
      street: validData.street,
      latitude: validData.latitude,
      longitude: validData.longitude,
      phone: validData.phone,
      workIntervals: {
        create: validData.workIntervals.map((interval) => ({
          day: interval.day.toUpperCase() as WeekDay, // e.g. "MONDAY"
          startTime: interval.startTime, // e.g. "08:00"
          endTime: interval.endTime, // e.g. "16:00"
        })),
      },
    },
    include: {
      workIntervals: true,
    },
  });

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: Role.SELLER,
    },
  });

  res.status(201).json({ user, shop });
};
