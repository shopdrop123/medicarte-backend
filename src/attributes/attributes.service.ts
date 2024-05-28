// import { Injectable } from '@nestjs/common';
// import { CreateAttributeDto } from './dto/create-attribute.dto';
// import { UpdateAttributeDto } from './dto/update-attribute.dto';
// import attributesJson from '@db/attributes.json';
// import { Attribute } from './entities/attribute.entity';
// import { plainToClass } from 'class-transformer';

// const attributes = plainToClass(Attribute, attributesJson);

// @Injectable()
// export class AttributesService {
//   private attributes: Attribute[] = attributes;

//   create(createAttributeDto: CreateAttributeDto) {
//     return this.attributes[0];
//   }

//   findAll() {
//     return this.attributes;
//   }

//   findOne(param: string) {
//     return this.attributes.find(
//       (p) => p.id === Number(param) || p.slug === param,
//     );
//   }

//   update(id: number, updateAttributeDto: UpdateAttributeDto) {
//     return this.attributes[0];
//   }

//   remove(id: number) {
//     return `This action removes a #${id} attribute`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { IAttribute } from 'src/model/attribute.model';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel('Attribute')
    private readonly attributeModel: Model<IAttribute>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto): Promise<IAttribute> {
    const createdAttribute = new this.attributeModel(createAttributeDto);
    return createdAttribute.save();
  }

  async findAll(): Promise<IAttribute[]> {
    return this.attributeModel.find().exec();
  }

  async findOne(param: string): Promise<IAttribute> {
    return this.attributeModel
      .findOne({
        $or: [{ id: Number(param) }, { slug: param }],
      })
      .exec();
  }

  async update(
    id: number,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<IAttribute> {
    return this.attributeModel
      .findOneAndUpdate({ id }, updateAttributeDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: number): Promise<any> {
    return this.attributeModel.deleteOne({ id }).exec();
  }
}
