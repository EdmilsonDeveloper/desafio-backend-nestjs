import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';

@Injectable()
export class TagService {

  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag
){}

  async create(tagData: CreateTagDto): Promise<Tag> {
    return
  }

  findAll(): Promise<Tag[]> {
    return
  }

  // findQuery(id: number) {
  //   return
  // }

  async update(id: string, tagData): Promise<[number, Tag[]]> {
    const [affectedCount, affectedRows] = await this.tagModel.update(tagData, {where: {id}, returning: true});
    return [affectedCount, affectedRows as Tag[]];
  }

  delete(id: string): Promise<number> {
    return this.tagModel.destroy({where: {id}})
  }
}
