import { UserEntity } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id): Promise<TaskEntity> {
    const task = await this.tasksService.getTaskById(id);
    return task;
  }

  @Post()
  // Here we are applying validation pipes to this route
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDto,
    @GetUser() user: UserEntity,
    // @Body() body
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDTO, user);
    // console.log(`${title} - ${text}`);
  }

  @Patch('/update/:id/status')
  updateTask(
    @Param('id') id: string,
    // Apply pipe on status only
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // @Body() body
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(id, status);
    // console.log(`${title} - ${text}`);
  }

  @Delete('/delete/:id')
  deteleTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
