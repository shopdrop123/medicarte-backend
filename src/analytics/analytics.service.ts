import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnalytics } from 'src/model/analytics.model';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('Analytics')
    private readonly analyticsModel: Model<IAnalytics>,
  ) {}

  async findAll(): Promise<IAnalytics[]> {
    return this.analyticsModel.find().exec();
  }

  async create(createAnalyticsDto: CreateAnalyticsDto): Promise<IAnalytics> {
    const createdAnalytics = new this.analyticsModel(createAnalyticsDto);
    return createdAnalytics.save();
  }

  // Add other methods as necessary
}
