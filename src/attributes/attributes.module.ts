import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { AttributeSchema } from 'src/model/attribute.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attribute', schema: AttributeSchema }]),
  ],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule {}
