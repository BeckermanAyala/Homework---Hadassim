import dotenv from 'dotenv';
import app from './app';
import { DBConnect } from './utils/db-connect';
dotenv.config();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await DBConnect.init();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('Failed to start server:', error.message);
  }
})();
