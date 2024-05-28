// import { Module } from '@nestjs/common';
// import { AnalyticsService } from './analytics.service';
// import { AnalyticsController } from './analytics.controller';

// @Module({
//   controllers: [AnalyticsController],
//   providers: [AnalyticsService],
// })
// export class AnalyticsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsSchema } from '../model/analytics.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Analytics', schema: AnalyticsSchema }]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
