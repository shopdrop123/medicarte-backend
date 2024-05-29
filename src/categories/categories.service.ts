import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { paginate } from 'src/common/pagination/paginate';
import { ICategory } from '../model/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async getCategories({
    limit,
    page,
    search,
    parent,
  }: GetCategoriesDto): Promise<any> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = this.categoryModel.find();

    if (search) {
      const searchParams = search.split(';').reduce((acc, param) => {
        const [key, value] = param.split(':');
        acc[key] = value;
        return acc;
      }, {});

      query = query.find(searchParams);
    }

    if (parent === 'null') {
      query = query.find({ parent: null });
    }

    const data = await query.exec();
    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;

    return {
      data: results.map((category) => category.toObject()), // Convert Mongoose documents to plain objects
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getCategory(param: string, language: string): Promise<ICategory> {
    return this.categoryModel
      .findOne({ $or: [{ id: param }, { slug: param }] })
      .exec();
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async remove(id: number): Promise<ICategory> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
