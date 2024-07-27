import { Injectable } from '@nestjs/common';
import { CreateTasktagDto, TaskTagParameters } from './tasktag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TaskTag } from './taskTag.model';
import { Tag } from 'src/tag/tag.model';
import { Task } from 'src/task/task.model';

@Injectable()
export class TasktagService {
  constructor(
    @InjectModel(TaskTag)
    private readonly taskTagModel : typeof TaskTag
){}

  async create(taskTagData: CreateTasktagDto): Promise<TaskTag> {
    const createdTaskTag = {
      taskId: taskTagData.taskId,
      tagId: taskTagData.tagId,
    }

    return await this.taskTagModel.create(createdTaskTag)
  }

  async findAll(query: TaskTagParameters): Promise<TaskTag[]> {
    const where: any = {};

    if (query.tagId) {
      where.tagId = query.tagId
  }

    return this.taskTagModel.findAll({ where })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} tasktag`;
  // }

  // update(id: number, updateTasktagDto) {
  //   return `This action updates a #${id} tasktag`;
  // }

  delete(id: string): Promise<number> {
    return
  }
}
