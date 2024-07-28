import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskTag } from './taskTag.dto';
import { TaskTag } from '../model/taskTag.model';
import { TasktagService } from './tasktag.service';

@Controller('tasktags')
export class TasktagController {

    constructor(
        private readonly taskTagService: TasktagService
    ){}

    @Post(':id')
    async createTaskTag(@Param('id') id: string, @Body() taskTagData: CreateTaskTag): Promise<TaskTag> {
        return await this.taskTagService.createTaskTag(String(id), taskTagData)
    }

    @Get()
    findAll() {
        return this.taskTagService.findAll()
    }

    @Get(':id')
    async findTasksByTag(@Param('id') id: string) {
        return this.taskTagService.findTasksByTag(String(id))
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskTagService.delete(String(id))
    }
}
