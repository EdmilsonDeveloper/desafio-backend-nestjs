import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasktagService } from './tasktag.service';
import { CreateTasktagDto, TaskTagParameters } from './tasktag.dto';
import { TaskTag } from './taskTag.model';
import { Task } from 'src/task/task.model';

@Controller('tasktags')
export class TasktagController {
  constructor(private readonly tasktagService: TasktagService) {}

  @Post()
  create(@Body() taskTagData: CreateTasktagDto): Promise<TaskTag> {
    return this.tasktagService.create(taskTagData);
  }

  @Get()
  findAll(@Query() query: TaskTagParameters): Promise<TaskTag[]> {
    return this.tasktagService.findAll(query);
  }

  // @Get(':taskId')
  // findOne(@Param('id') id: string) {
  //   return this.tasktagService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTasktagDto: UpdateTasktagDto) {
  //   return this.tasktagService.update(+id, updateTasktagDto);
  // }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.tasktagService.delete(String(id));
  }
}
