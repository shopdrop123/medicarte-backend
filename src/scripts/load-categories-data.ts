import { CategoryModel } from '../model/category.model';
import { connectToDatabase } from '../database/database.providers';
import categoriesJson from '../db/pickbazar/categories.json';
import mongoose from 'mongoose';

async function loadCategoriesData() {
  try {
    await connectToDatabase();

    console.log(
      'Connection state after connectToDatabase:',
      mongoose.connection.readyState,
    );
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to connect to MongoDB');
    }

    console.log('Clearing existing categories data...');
    const deleteResult = await CategoryModel.deleteMany({});
    console.log('Delete result:', deleteResult);

    console.log('Loading new categories data...');
    const createResult = await CategoryModel.create(categoriesJson);
    console.log('Create result:', createResult);

    console.log('Categories data loaded successfully');
  } catch (error) {
    console.error('Failed to load categories data', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

loadCategoriesData().catch((err) => {
  console.error('Failed to load categories data', err);
  process.exit(1);
});
