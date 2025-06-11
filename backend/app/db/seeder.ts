import 'dotenv/config';
import { Role, ProductTypeCategory, UnitType, WeekDay } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import crypto from 'crypto';
import { prismaClient } from './prismaClient.ts';
import { logger } from '../utils/logger.ts';
import { auth } from '../utils/auth.ts';

async function main() {
  logger.info('🌱 Starting database seeding...');

  // Clear existing data (optional - use with caution in production)
  await prismaClient.$transaction([
    prismaClient.verification.deleteMany(),
    prismaClient.review.deleteMany(),
    prismaClient.account.deleteMany(),
    prismaClient.session.deleteMany(),
    prismaClient.orderProduct.deleteMany(),
    prismaClient.order.deleteMany(),
    prismaClient.product.deleteMany(),
    prismaClient.workInterval.deleteMany(),
    prismaClient.shop.deleteMany(),
    prismaClient.productType.deleteMany(),
    prismaClient.user.deleteMany(),
  ]);

  // Create users
  const [session1, session2] = await Promise.all([
    auth.api.signUpEmail({
      body: {
        name: 'John Buyer',
        email: 'buyer@example.com',
        password: 'buyerpassword',
      },
    }),
    auth.api.signUpEmail({
      body: {
        name: 'John Seller',
        email: 'seller@example.com',
        password: 'sellerpassword',
      },
    }),
  ]);

  const buyer = session1.user;
  const seller = await prismaClient.user.update({
    where: {
      id: session2.user.id,
    },
    data: {
      role: Role.SELLER,
    },
  });

  // Create product types
  const productTypes = await Promise.all([
    prismaClient.productType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Organic Tomato',
        category: ProductTypeCategory.VEGETABLE,
      },
    }),
    prismaClient.productType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Red Apple',
        category: ProductTypeCategory.FRUIT,
      },
    }),
    prismaClient.productType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Fresh Basil',
        category: ProductTypeCategory.HERB,
      },
    }),
    prismaClient.productType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Chicken Breast',
        category: ProductTypeCategory.MEAT,
      },
    }),
    prismaClient.productType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Whole Milk',
        category: ProductTypeCategory.DAIRY,
      },
    }),
  ]);

  // Create shop with work intervals
  const shop = await prismaClient.shop.create({
    data: {
      id: crypto.randomUUID(),
      userId: seller.id,
      name: 'Fresh Market',
      description: 'Organic products from local farms',
      city: 'San Francisco',
      county: 'California',
      street: '123 Market St',
      latitude: new Decimal(37.7749),
      longitude: new Decimal(-122.4194),
      phone: "0742220931",
      workIntervals: {
        create: Object.values(WeekDay).map((day) => ({
          id: crypto.randomUUID(),
          day,
          startTime: '08:00',
          endTime: '20:00',
        })),
      },
    },
  });

  // Create reviews for the shop
  await prismaClient.review.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        shopId: shop.id,
        userId: buyer.id,
        rating: 5,
        comment: 'Great selection of organic products!',
      },
      {
        id: crypto.randomUUID(),
        shopId: shop.id,
        userId: buyer.id,
        rating: 4,
        comment: 'Very fresh produce, will buy again.',
      }]
})

  // Create products
  const products = await Promise.all([
    prismaClient.product.create({
      data: {
        id: crypto.randomUUID(),
        shopId: shop.id,
        productTypeId: productTypes[0].id,
        title: 'Premium Organic Tomatoes',
        price: new Decimal(4.99),
        unitType: UnitType.KG,
        stock: new Decimal(120),
        city: 'San Francisco',
        county: 'California',
        street: '123 Market St',
        latitude: new Decimal(37.7749),
        longitude: new Decimal(-122.4194),
        description: 'Fresh organic tomatoes from local farm',
      },
    }),
    prismaClient.product.create({
      data: {
        id: crypto.randomUUID(),
        shopId: shop.id,
        productTypeId: productTypes[1].id,
        title: 'Red Delicious Apples',
        price: new Decimal(3.49),
        unitType: UnitType.KG,
        stock: new Decimal(120),
        city: 'San Francisco',
        county: 'California',
        street: '123 Market St',
        latitude: new Decimal(37.7749),
        longitude: new Decimal(-122.4194),
        description: 'Sweet and crisp apples',
      },
    }),
    prismaClient.product.create({
      data: {
        id: crypto.randomUUID(),
        shopId: shop.id,
        productTypeId: productTypes[3].id,
        title: 'Free-Range Chicken Breast',
        price: new Decimal(12.99),
        unitType: UnitType.KG,
        stock: new Decimal(120),
        city: 'San Francisco',
        county: 'California',
        street: '123 Market St',
        latitude: new Decimal(37.7749),
        longitude: new Decimal(-122.4194),
        description: 'Humanely raised chicken',
      },
    }),
  ]);

  // Create orders with order products
  const order = await prismaClient.order.create({
    data: {
      id: crypto.randomUUID(),
      userId: buyer.id,
      orderedProducts: {
        create: [
          {
            id: crypto.randomUUID(),
            productId: products[0].id,
            quantity: new Decimal(1.5),
          },
          {
            id: crypto.randomUUID(),
            productId: products[1].id,
            quantity: new Decimal(2.0),
          },
        ],
      },
    },
    include: {
      orderedProducts: true,
    },
  });

  // Create buyer session
  await prismaClient.session.create({
    data: {
      id: crypto.randomUUID(),
      token: crypto.randomBytes(32).toString('hex'),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      userId: buyer.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create seller session
  await prismaClient.session.create({
    data: {
      id: crypto.randomUUID(),
      token: crypto.randomBytes(32).toString('hex'),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      userId: seller.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  logger.info(`✅ Database seeded successfully`);
  logger.info(`👤 Buyer user, ${buyer.email}`);
  logger.info(`👩‍🌾 Seller user, ${seller.email}`);
  logger.info(`🛒 Order created with ID, ${order.id}`);
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e, '❌ Seeding failed');
    await prismaClient.$disconnect();
    process.exit(1);
  });
