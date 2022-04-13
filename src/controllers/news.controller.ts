import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {News} from '../models';
import {NewsRepository} from '../repositories';

export class NewsController {
  constructor(
    @repository(NewsRepository)
    public newsRepository: NewsRepository,
  ) { }

  @post('/news')
  @response(200, {
    description: 'News model instance',
    content: {'application/json': {schema: getModelSchemaRef(News)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {
            title: 'NewNews',
            exclude: ['_id'],
          }),
        },
      },
    })
    news: Omit<News, '_id'>,
  ): Promise<News> {
    return this.newsRepository.create(news);
  }

  @get('/news/count')
  @response(200, {
    description: 'News model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.count(where);
  }

  @get('/news')
  @response(200, {
    description: 'Array of News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(News, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(News) filter?: Filter<News>,
  ): Promise<News[]> {
    console.log("Yo Reached", filter);
    return this.newsRepository.find(filter);
  }

  @patch('/news')
  @response(200, {
    description: 'News PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.updateAll(news, where);
  }

  @get('/news/{id}')
  @response(200, {
    description: 'News model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(News, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(News, {exclude: 'where'}) filter?: FilterExcludingWhere<News>
  ): Promise<News> {
    return this.newsRepository.findById(id, filter);
  }

  @patch('/news/{id}')
  @response(204, {
    description: 'News PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
  ): Promise<void> {
    await this.newsRepository.updateById(id, news);
  }

  @put('/news/{id}')
  @response(204, {
    description: 'News PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() news: News,
  ): Promise<void> {
    await this.newsRepository.replaceById(id, news);
  }

  @del('/news/{id}')
  @response(204, {
    description: 'News DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.newsRepository.deleteById(id);
  }
}
