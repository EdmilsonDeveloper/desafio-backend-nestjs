import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto, taskParameters, TaskPriorityEnum, TaskStatusEnum } from './task.dto';
import { validate } from 'class-validator';

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

    async findAll(): Promise<Task[]> {
        return this.taskModel.findAll();
    }

    // async findQuery(params: taskParameters): Promise<Task[]> {
    //     return this.taskModel.findAll({where: {title: params}});
    // }

    async update(id: string, productData): Promise<[number, Task[]]> {
        const [affectedCount, affectedRows] = await this.taskModel.update(productData, {where: {id}, returning: true});
        return [affectedCount, affectedRows as Task[]];
    }

    delete(id: string): Promise<number> {
        return this.taskModel.destroy({where: {id}})
    }
}
