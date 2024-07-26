import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto, TaskParameters, TaskPriorityEnum, TaskStatusEnum } from './task.dto';
import { Op } from 'sequelize';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task
    ){}

    async create(taskData: CreateTaskDto): Promise<Task> {
        const createdTask = {
            title: taskData.title,
            status: TaskStatusEnum.IN_PROGRESS,
            description: taskData.description,
            priority: TaskPriorityEnum.ONE,
            expirationDate: taskData.expirationDate
        };

        return await this.taskModel.create(createdTask);
    }

    async findAll(query: TaskParameters): Promise<Task[]> {
        const where: any = {};

        if (query.title) {
            where.title = { [Op.like]: `%${query.title}%` }
        }

        if (query.status) {
            where.status = query.status
        }

        if (query.priority) {
            where.priority = query.priority
        }

        if (query.expirationDate) {
            where.expirationDate = query.expirationDate
        }

        return this.taskModel.findAll({ where });
    }

    async update(id: string, taskData): Promise<[number, Task[]]> {
        const [affectedCount, affectedRows] = await this.taskModel.update(taskData, {where: {id}, returning: true});
        return [affectedCount, affectedRows as Task[]];
    }

    delete(id: string): Promise<number> {
        return this.taskModel.destroy({where: {id}})
    }
}
