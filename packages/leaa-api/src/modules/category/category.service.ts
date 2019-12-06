import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, getRepository, SelectQueryBuilder, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from '@leaa/common/src/entrys';
import {
  CategoriesArgs,
  CategoriesWithPaginationOrTreeObject,
  CategoryArgs,
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryTreeObject,
} from '@leaa/common/src/dtos/category';
import { formatUtil, curdUtil, paginationUtil, errorUtil } from '@leaa/api/src/utils';

type ICategoriessArgs = CategoriesArgs & FindOneOptions<Category>;
type ICategoryArgs = CategoryArgs & FindOneOptions<Category>;

const CONSTRUCTOR_NAME = 'CategoryService';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  categoriesByTrees(items: Category[], args?: ICategoriessArgs): CategoryTreeObject[] {
    const appendInfoToItem = (item: Category): Omit<CategoryTreeObject, 'children'> => ({
      ...item,
      key: `${item.parent_id}-${item.id}-${item.slug}`,
      //
      title: `${item.name}`,
      subtitle: item.slug,
      value: item.id,
      expanded: args && args.expanded,
    });

    const recursiveItems = (categories: Category[]) => {
      return categories.map(category => {
        if (category.children && Array.isArray(category.children) && category.children.length > 0) {
          // eslint-disable-next-line no-param-reassign
          category.children = recursiveItems(category.children);
        }

        return appendInfoToItem(category);
      });
    };

    const result = recursiveItems(items);

    result.unshift({
      key: '0-0-0-root',
      id: 0,
      parent_id: 0,
      slug: 'root',
      name: '----',
      //
      title: '----',
      subtitle: 'Root',
      value: 0,
      expanded: true,
      created_at: moment.unix(1318000000).toDate(),
    });

    return result;
  }

  async categories(args: ICategoriessArgs): Promise<CategoriesWithPaginationOrTreeObject | undefined> {
    const nextArgs: ICategoriessArgs = formatUtil.formatArgs(args);

    const qb = getRepository(Category).createQueryBuilder();
    qb.select().orderBy(nextArgs.orderBy || 'created_at', nextArgs.orderSort);

    if (nextArgs.q) {
      const aliasName = new SelectQueryBuilder(qb).alias;

      ['name', 'slug'].forEach(q => {
        qb.orWhere(`${aliasName}.${q} LIKE :${q}`, { [q]: `%${nextArgs.q}%` });
      });
    }

    if (args.treeType) {
      const manager = getManager();
      const trees = await manager.getTreeRepository(Category).findTrees();

      return { trees: this.categoriesByTrees(trees, { expanded: args.expanded }) };
    }

    return paginationUtil.calcQueryBuilderPageInfo({
      qb,
      page: nextArgs.page,
      pageSize: nextArgs.pageSize,
    });
  }

  async category(id: number, args?: ICategoryArgs): Promise<Category | undefined> {
    let nextArgs: ICategoryArgs = {};
    if (args) nextArgs = args;

    return this.categoryRepository.findOne(id, nextArgs);
  }

  async createCategory(args: CreateCategoryInput): Promise<Category | undefined> {
    if (!args || (args && !args.slug)) return errorUtil.ERROR({ error: 'Not Found Slug' });

    const manager = getManager();
    const newCategory = new Category();

    newCategory.name = args.name;
    newCategory.slug = args.slug;
    newCategory.description = args.description;
    newCategory.parent_id = args.parent_id || 0;

    if (args.parent_id) {
      const parent = await this.category(args.parent_id);

      if (parent) {
        newCategory.parent = parent;
      }
    }

    return manager.save(newCategory);
  }

  async updateCategory(id: number, args: UpdateCategoryInput): Promise<Category | undefined> {
    const nextArgs = args;

    if (typeof args.parent_id !== 'undefined') {
      const parent = await this.category(args.parent_id);

      if (parent) {
        nextArgs.parent = parent;
      } else {
        nextArgs.parent = undefined;
        nextArgs.parent_id = 0;
      }
    }

    return curdUtil.commonUpdate(this.categoryRepository, CONSTRUCTOR_NAME, id, nextArgs);
  }

  async deleteCategory(id: number): Promise<Category | undefined> {
    if (id <= 2) {
      return errorUtil.ERROR({ error: 'Default Category, PLEASE DONT' });
    }

    return curdUtil.commonDelete(this.categoryRepository, CONSTRUCTOR_NAME, id);
  }
}
