import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class GetTasksFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsOptional()
    search?: string
}