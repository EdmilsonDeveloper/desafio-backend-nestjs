import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskTag } from '../model/taskTag.model';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from 'src/app/model/tag.model';
import { Task } from 'src/app/model/task.model';
import { CreateTaskTag } from './taskTag.dto';

@Injectable()
export class TasktagService {
    constructor(
        @InjectModel(TaskTag)
        private readonly taskTagModel: typeof TaskTag,

        @InjectModel(Task)
        private readonly taskModel: typeof Task
    ){}

    async createTaskTag(id: string, taskTagData: CreateTaskTag): Promise<TaskTag> {
        const createdTaskTag = {
            taskId: id,
            tagId: taskTagData.tagId,
        }
        
        return await this.taskTagModel.create(createdTaskTag)
    }

    findAll(): Promise<TaskTag[]> {
        return this.taskTagModel.findAll()
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
