// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { ProfilesController, UsersController } from './users.controller';

// @Module({
//   controllers: [UsersController, ProfilesController],
//   providers: [UsersService],
//   exports: [UsersService],
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { ProfilesController, UsersController } from './users.controller';
import { UserSchema } from '../model/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
