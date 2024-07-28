import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto, TagParameters } from './tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../model/tag.model';
import { Op } from 'sequelize';

@Injectable()
export class TagService {

  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag
){}

  async create(tagData: CreateTagDto): Promise<Tag> {
    const createdTag = {
      name: tagData.name,
      color: tagData.color,
    }

    return await this.tagModel.create(createdTag);
  }

  findAll(query: TagParameters): Promise<Tag[]> {
    const where: any = {};

    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` }
    }

    if (query.color) {
      where.color = query.color
    }

    return this.tagModel.findAll({ where })
  }

  async update(id: string, tagData): Promise<[number, Tag[]]> {
    const [affectedCount, affectedRows] = await this.tagModel.update(tagData, {where: {id}, returning: true});
    return [affectedCount, affectedRows as Tag[]];
  }

  async delete(id: string) {
    const result = await this.tagModel.destroy({where: {id}})

    if (!result) {
      throw new HttpException(
        `Tag with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
  }
  }
}
