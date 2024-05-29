import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paginate } from '../common/pagination/paginate';
import { IUser } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUsers({
    text,
    limit,
    page,
    search,
  }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: IUser[];

    if (text) {
      data = await this.userModel.find({ $text: { $search: text } }).exec();
    } else {
      data = await this.userModel.find().exec();
    }

    if (search) {
      const searchParams = search.split(';').reduce((acc, param) => {
        const [key, value] = param.split(':');
        acc[key] = value;
        return acc;
      }, {});

      data = await this.userModel.find(searchParams).exec();
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async findOne(id: number): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: number): Promise<IUser> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async makeAdmin(user_id: string): Promise<IUser> {
    return this.userModel
      .findOneAndUpdate({ id: user_id }, { is_admin: true }, { new: true })
      .exec();
  }

  async banUser(id: number): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    user.is_active = !user.is_active;
    return user.save();
  }

  async activeUser(id: number): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    user.is_active = !user.is_active;
    return user.save();
  }
}
