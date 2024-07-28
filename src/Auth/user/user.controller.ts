import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserResponse } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.create(userData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateUserDto> {
    return this.userService.findOne(String(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(String(id));
  }
}
