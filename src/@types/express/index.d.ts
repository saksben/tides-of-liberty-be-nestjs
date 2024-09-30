import { User } from '@prisma/client';

// Adds user to Request object
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
