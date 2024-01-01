/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(authorId: number, createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        authorId,
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findAllByUserId(id: number) {
    return this.prisma.article.findMany({ where: { authorId: id } });
  }

  findAllPublished() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts(authorId: number) {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
