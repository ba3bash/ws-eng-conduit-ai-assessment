import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { TagsService } from './tags.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly tagsService: TagsService,
  ) {}

  async create(userId: number, dto: CreateArticleDto) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['followers', 'favorites', 'articles'] },
    );

    // Ensure dto.tagList is an array of strings (tags)
    const tags = typeof dto.tagList === 'string' ? dto.tagList.split(' ') : dto.tagList;

    const article = new Article(user!, dto.title, dto.description, dto.body);
    const tagEntities = await this.tagsService.createOrUpdateTags(tags);
    article.tagList.add(...tagEntities);
    user?.articles.add(article);
    await this.em.flush();

    return { article: article.toJSON(user!) };
  }
}
