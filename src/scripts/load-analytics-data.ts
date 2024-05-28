import { connectToDatabase } from '../database/database.providers';
import { AnalyticsModel } from '../model/analytics.model';
import analyticsJson from '../db/pickbazar/analytics.json';
import mongoose from 'mongoose';
import { client } from '../database/database.providers';

async function loadAnalyticsData() {
  await connectToDatabase();

  await AnalyticsModel.deleteMany({}); // Clear existing datas
  console.log('Existing analytics data cleared.');

  console.log('Loading new analytics data...');
  await AnalyticsModel.create(analyticsJson);

  console.log('Analytics data loaded successfully');
  process.exit(0);
}

loadAnalyticsData().catch((err) => {
  console.error('Failed to load analytics data', err);
  process.exit(1);
});
