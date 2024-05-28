import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import { Analytics } from 'src/analytics/entities/analytics.entity';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase timeout to 45 seconds
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
    });
    console.log(uri);
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connection state:', mongoose.connection.readyState);

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Uncomment this line to run the connection function when the module is executed directly
// connectToDatabase().catch(console.dir);
