import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  // Here we are applying validation pipes to this route
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDto,
    // @Body() body
  ): Task {
    return this.tasksService.createTask(createTaskDTO);
    // console.log(`${title} - ${text}`);
  }

  @Patch('/update/:id/status')
  updateTask(
    @Param('id') id: string,
    // Apply pipe on status only
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // @Body() body
  ): Task {
    return this.tasksService.updateTask(id, status);
    // console.log(`${title} - ${text}`);
  }

  @Delete('/delete/:id')
  deteleTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
