import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorDto, AuthorPaginator } from './dto/get-author.dto';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';
import { paginate } from '../common/pagination/paginate';
import { IAuthor } from '../model/author.model';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<IAuthor>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<IAuthor> {
    const createdAuthor = new this.authorModel(createAuthorDto);
    return createdAuthor.save();
  }

  async getAuthors({
    page,
    limit,
    search,
  }: GetAuthorDto): Promise<AuthorPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: IAuthor[];

    if (search) {
      const searchParams = search.split(';').reduce((acc, param) => {
        const [key, value] = param.split(':');
        acc[key] = value;
        return acc;
      }, {});

      data = await this.authorModel.find(searchParams).exec();
    } else {
      data = await this.authorModel.find().exec();
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/authors?search=${search}&limit=${limit}`;

    return {
      data: results.map((author) => author.toObject() as any), // Convert Mongoose documents to plain objects
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getAuthorBySlug(slug: string): Promise<IAuthor> {
    return this.authorModel.findOne({ slug }).exec();
  }

  async getTopAuthors({ limit = 10 }: GetTopAuthorsDto): Promise<IAuthor[]> {
    return this.authorModel.find().limit(limit).exec();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<IAuthor> {
    return this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
  }

  async remove(id: number): Promise<IAuthor> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
