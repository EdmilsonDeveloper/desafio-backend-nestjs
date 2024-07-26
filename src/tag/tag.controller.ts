import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './tag.dto';
import { Tag } from './tag.model';

@Controller('tag')
export class TagController {
  
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() tagData: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(tagData);
  }

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tagData): Promise<[number, Tag[]]> {
    return this.tagService.update(String(id), tagData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.tagService.delete(String(id));
  }
}
