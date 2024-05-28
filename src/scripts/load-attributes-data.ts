import { connectToDatabase } from '../database/database.providers';
import mongoose from 'mongoose';
import { AttributeModel } from '../model/attribute.model';
import attributesJson from '../db/pickbazar/attributes.json';

async function loadAttributesData() {
  try {
    await connectToDatabase();

    console.log(
      'Connection state after connectToDatabase:',
      mongoose.connection.readyState,
    );
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to connect to MongoDB');
    }

    console.log('Clearing existing attributes data...');
    const deleteResult = await AttributeModel.deleteMany({});
    console.log('Delete result:', deleteResult);

    console.log('Loading new attributes data...');
    const createResult = await AttributeModel.create(attributesJson);
    console.log('Create result:', createResult);

    console.log('Attributes data loaded successfully');
  } catch (error) {
    console.error('Failed to load attributes data', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

loadAttributesData().catch((err) => {
  console.error('Failed to load attributes data', err);
  process.exit(1);
});
