import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto, TaskParameters } from './task.dto';

@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Post()
    async create(@Body() taskData: CreateTaskDto): Promise<Task> {
        return await this.taskService.create(taskData)
    }

    @Get()
    findAll(@Query() query: TaskParameters): Promise<Task[]> {
        return this.taskService.findAll(query);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() taskData): Promise<[number, Task[]]> {
        return this.taskService.update(String(id), taskData)
    }

    @Delete(':id')
    delete(@Param('id')id: string): Promise<number> {
        return this.taskService.delete(String(id))
    }
}
