import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ExecutionContext, Headers } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, TagParameters } from './tag.dto';
import { Tag } from '../model/tag.model';
import { AuthGuard } from 'src/Auth/authentication/auth.guard';

@UseGuards(AuthGuard)
@Controller('tags')
export class TagController {
  
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Headers('Authorization') request: string, @Body() tagData: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(tagData, request);
  }

  @Get()
  findAll(@Query() query: TagParameters, @Headers('Authorization') request: string): Promise<Tag[]> {
    return this.tagService.findAll(query, request);
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
