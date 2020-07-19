// import { v4 as uuid } from 'uuid';
import { TaskEntity } from './task.entity';
import { ObjectID } from 'mongodb';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
    // return this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    if (!ObjectID.isValid(id)) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      const taskFound = await this.taskRepository.findOne(id);
      return taskFound;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);

    if (task !== undefined) {
      const result = await this.taskRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`No tasks was deleted!`);
      }
    }
  }
}
