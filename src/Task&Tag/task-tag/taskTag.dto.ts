import { IsOptional, IsString } from "class-validator"

export class CreateTaskTag {
    tagId: string
    taskId: string
}

export class TaksTagParameters {
    @IsString()
    @IsOptional()
    name: string
}