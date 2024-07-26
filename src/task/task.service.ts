import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { taskParameters } from './task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task
    ){}

    async create(taskData): Promise<Task> {
        const createTask = new Task(taskData)
        return await createTask.save();
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
