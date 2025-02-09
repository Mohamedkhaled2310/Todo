import { Controller, Post, Get, Put, Delete, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.createTask(createTaskDto,  req.user?.sub);
  }

 
  @Get()
  async getTasks(@Req() req: Request, @Query('category') category?: string, @Query('completed') completed?: boolean) {
    return this.taskService.getTasks( req.user?.sub, category, completed);
  }

 
  @Get(':id')
  async getTaskById(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.getTaskById(id,  req.user?.sub);
  }

 
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: Request) {
    return this.taskService.updateTask(id, updateTaskDto,  req.user?.sub);
  }


  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.deleteTask(id,  req.user?.sub);
  }
}
