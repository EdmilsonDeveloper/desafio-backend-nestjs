import { BadRequestException, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTagDto, TagParameters } from './tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../model/tag.model';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class TagService {
  private jwtSecret: string;
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
){
  this.jwtSecret = this.configService.get<string>('JWT_SECRET');
}

  async create(tagData: CreateTagDto, request: string): Promise<Tag> {
    const token = request.split(' ')[1];
    
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: this.jwtSecret,
    });

    const createdTag = {
      name: tagData.name,
      color: tagData.color,
      userId: decoded.sub,
    }
  
    return await this.tagModel.create(createdTag);
  }

  async findAll(query: TagParameters, request: string): Promise<Tag[]> {
    const where: any = await {};

    if (query.name) {
      const nameRegex = /^[a-zA-Zà-úÀ-Ú]+(([',. -][a-zA-Zà-úÀ-Ú ])?[a-zA-Zà-úÀ-Ú]+)*$/; 
        if (!nameRegex.test(query.name)) {
            throw new BadRequestException('Título inválido'); 
        }
      where.name = { [Op.like]: `%${query.name}%` }
    }

    if (query.color) {
      const colorRegex = /^[a-zA-Zà-úÀ-Ú]+(([',. -][a-zA-Zà-úÀ-Ú ])?[a-zA-Zà-úÀ-Ú]+)*$/; 
        if (!colorRegex.test(query.color)) {
            throw new BadRequestException('Título inválido'); 
        }
      where.color = { [Op.like]: `%${query.color}%` }
    }

    const token = request.split(' ')[1];
    
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: this.jwtSecret,
    });

    where.userId = decoded.sub

    return this.tagModel.findAll({ where })
  }

  async update(id: string, tagData): Promise<[number, Tag[]]> {
    const [affectedCount, affectedRows] = await this.tagModel.update(tagData, {where: {id}, returning: true});
    return [affectedCount, affectedRows as Tag[]];
  }

  async delete(id: string) {
    const result = await this.tagModel.destroy({where: {id}})

    if (!result) {
      throw new HttpException(
        `Tag with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const token = request.headers.authorization?.split(' ')[1];
    return token
  }
}
