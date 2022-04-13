import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {News, NewsRelations} from '../models';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype._id,
  NewsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(News, dataSource);
  }
}
