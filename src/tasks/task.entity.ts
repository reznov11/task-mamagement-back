import { UserEntity } from './../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { BaseEntity, Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(
    type => UserEntity,
    user => user.tasks,
    { eager: false },
  )
  user: UserEntity;

  @ObjectIdColumn()
  userId: ObjectID;
}
