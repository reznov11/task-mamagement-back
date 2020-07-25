import { UserEntity } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { Repository, EntityRepository, getMongoRepository } from 'typeorm';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;

    const manager = getMongoRepository(TaskEntity);

    const tasks =
      status || search
        ? await manager.find({
            where: {
              $or: [
                { text: { $regex: new RegExp(search), $options: 'i' } } || {},
                { title: { $regex: new RegExp(search), $options: 'i' } } || {},
              ],
              $and: [{ status: status }, { userId: user.id }],
            },
          })
        : manager.find({ userId: user.id });

    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, text } = createTaskDto;
    const task = new TaskEntity();
    task.title = title;
    task.text = text;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}
