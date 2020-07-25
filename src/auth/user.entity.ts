import { TaskEntity } from './../tasks/task.entity';
import * as bcrypt from 'bcrypt';
import { ObjectID } from 'mongodb';
import {
  BaseEntity,
  Entity,
  Column,
  ObjectIdColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    type => TaskEntity,
    task => task.user,
    { eager: true },
  )
  tasks: TaskEntity[];

  async validatePassword(plainTextPassword: string): Promise<boolean> {
    const compareHash = await bcrypt.compare(plainTextPassword, this.password);
    return compareHash;
  }
}
