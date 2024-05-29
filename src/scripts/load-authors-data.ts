import { AuthorModel } from '../model/author.model';
import { connectToDatabase } from '../database/database.providers';
import authorsJson from '../db/pickbazar/authors.json';
import mongoose from 'mongoose';

async function loadAuthorsData() {
  try {
    await connectToDatabase();

    console.log(
      'Connection state after connectToDatabase:',
      mongoose.connection.readyState,
    );
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to connect to MongoDB');
    }

    console.log('Clearing existing authors data...');
    const deleteResult = await AuthorModel.deleteMany({});
    console.log('Delete result:', deleteResult);

    console.log('Loading new authors data...');
    const createResult = await AuthorModel.create(authorsJson);
    console.log('Create result:', createResult);

    console.log('Authors data loaded successfully');
  } catch (error) {
    console.error('Failed to load authors data', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

loadAuthorsData().catch((err) => {
  console.error('Failed to load authors data', err);
  process.exit(1);
});
