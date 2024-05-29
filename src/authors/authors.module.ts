// import { Module } from '@nestjs/common';
// import { AuthorsService } from './authors.service';
// import { AuthorsController, TopAuthors } from './authors.controller';

// @Module({
//   controllers: [AuthorsController, TopAuthors],
//   providers: [AuthorsService],
// })
// export class AuthorsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsService } from './authors.service';
import { AuthorsController, TopAuthors } from './authors.controller';
import { AuthorSchema } from '../model/author.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorsController, TopAuthors],
  providers: [AuthorsService],
})
export class AuthorsModule {}
