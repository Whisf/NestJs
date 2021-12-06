import { Injectable, Logger, NotFoundException, Response } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './dto/task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService   {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    getTasks(filters: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.filterTasks(filters, user)
    }

    createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(CreateTaskDto, user);
    }

    getTaskById(id: string, user): Promise<Task> {
        return this.taskRepository.getTaskById(id, user);
    }

    async removeTaskById(id: string, user: User): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Not found ID ${id}!`);
        }
    }

    async updateStatusTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
} 
