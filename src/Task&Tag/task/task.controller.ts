import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../model/task.model';
import { CreateTaskDto, TaskParameters } from './task.dto';
import { AuthGuard } from 'src/Auth/authentication/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Post()
    async create(@Body() taskData: CreateTaskDto, @Headers('Authorization') request: string): Promise<Task> {
        return await this.taskService.create(taskData, request)
    }

    @Get()
    findAll(@Query() query: TaskParameters, @Headers('Authorization') request: string): Promise<Task[]> {
        return this.taskService.findAll(query, request);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() taskData): Promise<[number, Task[]]> {
        return this.taskService.update(String(id), taskData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.delete(String(id))
    }
}
