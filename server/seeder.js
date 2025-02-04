import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import products from './data/products.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Product.deleteMany(); // Clears existing products
    await Product.insertMany(products); // Inserts sample products
    console.log('Data Imported!');
    process.exit(); // Exit after successful import
  } catch (error) {
    console.error('Error importing data:', error.message);
    process.exit(1); // Exit on error
  }
};

importData();
