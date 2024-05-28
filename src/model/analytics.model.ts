import { Schema, Document, model } from 'mongoose';

interface ITotalYearSaleByMonth {
  total: number;
  month: string;
}

export interface IAnalytics extends Document {
  totalRevenue: number;
  totalRefunds: number;
  totalShops: number;
  todaysRevenue: number;
  totalOrders: number;
  newCustomers: number;
  totalYearSaleByMonth: ITotalYearSaleByMonth[];
}

const TotalYearSaleByMonthSchema = new Schema<ITotalYearSaleByMonth>({
  total: { type: Number, required: true },
  month: { type: String, required: true },
});

export const AnalyticsSchema = new Schema<IAnalytics>({
  totalRevenue: { type: Number, required: true },
  totalRefunds: { type: Number, required: true },
  totalShops: { type: Number, required: true },
  todaysRevenue: { type: Number, required: true },
  totalOrders: { type: Number, required: true },
  newCustomers: { type: Number, required: true },
  totalYearSaleByMonth: { type: [TotalYearSaleByMonthSchema], required: true },
});

export const AnalyticsModel = model<IAnalytics>('Analytics', AnalyticsSchema);
