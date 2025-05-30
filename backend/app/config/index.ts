export const config = {
  rateLimiter: {
    max: 1000,
    windowMs: 60 * 1000,
    message: 'Too many requests, please try again in a few minutes',
  },

  cors: {
    origin:
      process.env['NODE_ENV'] === 'production' ?
        'http://localhost:5173'
      : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] as string[],
    credentials: true,
  },

  logger: {
    level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },

  auth: {
    database: {
      provider: 'postgresql',
    },
    options: {
      trustedOrigins: [
        process.env['NODE_ENV'] === 'production' ?
          'http://localhost:5173'
        : 'http://localhost:5173',
      ] as string[],
      emailAndPassword: {
        enabled: true,
      },
      user: {
        additionalFields: {
          role: {
            type: 'string',
            required: true,
            defaultValue: 'BUYER',
            input: false,
          },
        },
      },
    },
  },
} as const;
