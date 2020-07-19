import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import appConfigurations from './config/app.configurations';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      load: [appConfigurations],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
