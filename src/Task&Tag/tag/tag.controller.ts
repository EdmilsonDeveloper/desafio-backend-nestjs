import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, TagParameters } from './tag.dto';
import { Tag } from '../model/tag.model';
import { AuthGuard } from 'src/Auth/authentication/auth.guard';

@UseGuards(AuthGuard)
@Controller('tags')
export class TagController {
  
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() tagData: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(tagData);
  }

  @Get()
  findAll(@Query() query: TagParameters): Promise<Tag[]> {
    return this.tagService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tagData): Promise<[number, Tag[]]> {
    return this.tagService.update(String(id), tagData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tagService.delete(String(id));
  }
}
