import { Body, Controller, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filters: GetTasksFilterDto, @GetUser() user:User): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filter ${JSON.stringify(filters)}`);
        return this.tasksService.getTasks(filters, user);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating a task. Task information: ${JSON.stringify(CreateTaskDto)}`);
        return this.tasksService.createTasks(CreateTaskDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post('/:id')
    removeTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.removeTaskById(id, user)
    }

    @Patch('/:id/status')
    updateStatusTask(
        @Param('id') id: string, 
        @Body() UpdateTaskDto: UpdateTaskDto): Promise<Task> {
            const { status } = UpdateTaskDto;
            return this.tasksService.updateStatusTask(id, status);
    }
}
