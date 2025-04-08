import mongoose from 'mongoose';

export const DBConnect = {
  init: async (): Promise<void> => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('Missing MONGO_URI in .env file');
    }

    await mongoose.connect(MONGO_URI);
  }
};
