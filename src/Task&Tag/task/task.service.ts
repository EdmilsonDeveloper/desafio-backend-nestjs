import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../model/task.model';
import { CreateTaskDto, TaskParameters, TaskPriorityEnum, TaskStatusEnum } from './task.dto';
import { Op } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
    private jwtSecret: string;
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task,

        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){
        this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    }

    async create(taskData: CreateTaskDto, request: string): Promise<Task> {
        const token = request.split(' ')[1];

        const decoded = await this.jwtService.verifyAsync(token, {
            secret: this.jwtSecret,
        });

        const createdTask = {
            title: taskData.title,
            status: TaskStatusEnum.IN_PROGRESS,
            description: taskData.description,
            priority: TaskPriorityEnum.ONE,
            expirationDate: taskData.expirationDate,
            userId: decoded.sub,
        };

        return await this.taskModel.create(createdTask);
    }

    async findAll(query: TaskParameters, request: string): Promise<Task[]> {
        const where: any = await {};

        if (query.title) {
            const titleRegex = /^[a-zA-Zà-úÀ-Ú]+(([',. -][a-zA-Zà-úÀ-Ú ])?[a-zA-Zà-úÀ-Ú]+)*$/; 
            if (!titleRegex.test(query.title)) {
                throw new BadRequestException('Título inválido'); 
            }
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

        const token = request.split(' ')[1];
    
        const decoded = await this.jwtService.verifyAsync(token, {
            secret: this.jwtSecret,
        });

        where.userId = decoded.sub

        return this.taskModel.findAll({ where });
    }

    async update(id: string, taskData): Promise<[number, Task[]]> {
        const [affectedCount, affectedRows] = await this.taskModel.update(taskData, {where: {id}, returning: true});
        return [affectedCount, affectedRows as Task[]];
    }

    async delete(id: string){
        const result = await this.taskModel.destroy({where: {id}})

        if (!result) {
            throw new HttpException(
              `Task with id '${id}' not found`,
              HttpStatus.BAD_REQUEST,
            );
        }
    }
}
