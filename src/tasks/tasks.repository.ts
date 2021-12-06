import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { timestamp } from "rxjs";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');
    async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description } = CreateTaskDto;
        
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(task);
        return task
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.findOne({id, user: user});
        
        if(!found) {
            throw new NotFoundException(`Not found ID ${id}`);
        }
        return found;
    }

    async removeTaskById(id: string, user: User): Promise<void> {
        this.getTaskById(id, user).then(task => {
            this.delete(task);
        })
    }
    async filterTasks(filters: GetTasksFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filters;        
        const query = this.createQueryBuilder('task');
        query.where({ user });

        if(status) {
            query.andWhere('task.status = :status', { status })
        }

        if(search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%`})
        }
        
        try {
            const task = await query.getMany();
            return task;
        } catch (error) {
            this.logger.error(`Failed at username: ${user.username}. Filter: ${JSON.stringify(filters)}`, error.stack);
            throw new InternalServerErrorException('Failed to search task');
        }

    }
  
}

