import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { taskParameters } from './task.dto';

@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Post()
    create(@Body() taskData): Promise<Task> {
        return this.taskService.create(taskData)
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    // @Get()
    // findQuery(@Query() params: taskParameters): Promise<Task[]> {
    //     console.log(params);
        
    //     return this.taskService.findQuery(params);
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() taskData): Promise<[number, Task[]]> {
        return this.taskService.update(String(id), taskData)
    }

    @Delete(':id')
    delete(@Param('id')id: string): Promise<number> {
        return this.taskService.delete(String(id))
    }
}
