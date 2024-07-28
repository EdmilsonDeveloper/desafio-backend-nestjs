import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskTag } from '../model/taskTag.model';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../model/tag.model';
import { Task } from '../model/task.model';
import { CreateTaskTag } from './taskTag.dto';

@Injectable()
export class TasktagService {
    constructor(
        @InjectModel(TaskTag)
        private readonly taskTagModel: typeof TaskTag,

        @InjectModel(Task)
        private readonly taskModel: typeof Task
    ){}

    async createTaskTag(taskTagData: CreateTaskTag): Promise<TaskTag> {
        const createdTaskTag = {
            taskId: taskTagData.taskId,
            tagId: taskTagData.tagId,
        }
        
        return await this.taskTagModel.create(createdTaskTag)
    }

    async findAll(): Promise<TaskTag[]> {
        return await this.taskTagModel.findAll()
    }    

    async findTasksByTag(tagId: string) {
        return await this.taskModel.findAll({where: {
            '$tags.id$': tagId,
        },
        include: [{ model: Tag}]
    })
    }

    async delete(id: string) {
        const result = await this.taskTagModel.destroy({where: {id}})

        if (!result) {
            throw new HttpException(
              `Relationship with id '${id}' not found`,
              HttpStatus.BAD_REQUEST,
            );
        }
    }
}
