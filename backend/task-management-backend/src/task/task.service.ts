import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}


  async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = new this.taskModel({ ...createTaskDto, userId });
    return newTask.save();
  }


  async getTasks(userId: string, category?: string, completed?: boolean): Promise<Task[]> {
    const filter: any = { userId };
    if (category) filter.category = category;
    if (completed !== undefined) filter.completed = completed;
    
    return this.taskModel.find(filter).exec();
  }

  async getTaskById(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId, userId }).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  
  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      updateTaskDto,
      { new: true },
    );

    if (!updatedTask) throw new NotFoundException('Task not found');
    return updatedTask;
  }


  async deleteTask(taskId: string, userId: string): Promise<{ message: string }> {
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId, userId });
    if (!deletedTask) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }
}
