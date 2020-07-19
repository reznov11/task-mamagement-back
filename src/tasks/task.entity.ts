import { TaskStatus } from './task-status.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  status: TaskStatus;
}
