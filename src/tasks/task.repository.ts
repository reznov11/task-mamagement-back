import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { Repository, EntityRepository, getMongoRepository } from 'typeorm';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;

    const manager = getMongoRepository(TaskEntity);

    const tasks = await manager.find({
      where: {
        $or: [
          { text: { $regex: new RegExp(search), $options: 'i' } } || {},
          { title: { $regex: new RegExp(search), $options: 'i' } } || {},
        ],
        $and: [{ status: status }],
      },
    });

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, text } = createTaskDto;
    const task = new TaskEntity();
    task.title = title;
    task.text = text;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
