import { randomBytes } from 'crypto';
import 'dotenv/config';

export default {
  appSecret: process.env.APP_SECRET || randomBytes(48).toString('hex'),
};
