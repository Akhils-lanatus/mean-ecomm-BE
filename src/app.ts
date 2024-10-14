import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from 'mongoose';
import UserAuthRoutes from './routes/userAuth.routes.js';
import CategoryRoutes from './routes/category.routes.js';
import BrandRoutes from './routes/brand.routes.js';
import ProductRoutes from './routes/product.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  await mongoose
    .connect(process.env.MONGO_URI!)
    .then((x) => console.log(`DB CONNECTED TO :: ${x.connection.host}`))
    .catch((err) => console.log(`DB CONNECTION ERROR :: ${err}`));
})();

//middlewares
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', UserAuthRoutes);
app.use('/api/v1/category', CategoryRoutes)
app.use('/api/v1/brand', BrandRoutes)
app.use('/api/v1/product', ProductRoutes)
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
