interface CreateTotalYearSaleByMonthDto {
  total: number;
  month: string;
}

export class CreateAnalyticsDto {
  readonly totalRevenue: number;
  readonly totalRefunds: number;
  readonly totalShops: number;
  readonly todaysRevenue: number;
  readonly totalOrders: number;
  readonly newCustomers: number;
  readonly totalYearSaleByMonth: CreateTotalYearSaleByMonthDto[];
}
