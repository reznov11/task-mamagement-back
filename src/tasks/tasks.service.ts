import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task => task.title.includes(search) || task.text.includes(search),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, text } = createTaskDto;

    const task: Task = {
      // id: Math.floor(Math.random() * this.tasks.length).toString(),
      id: uuid(),
      title,
      text,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const taskFound = this.tasks.find(task => task.id === id);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return taskFound;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const taskFound = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    // const item = this.tasks.find(task => task.id === id);
    // const index = this.tasks.indexOf(item);
    // this.tasks.splice(index, 1);
  }
}
