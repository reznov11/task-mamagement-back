import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_DB_URI,
  database: 'tasks_management',
  // port: 5432,
  // username: 'postgres',
  // password: 'ammar1991',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  ssl: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
