import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDto } from './dto/project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';
export declare class ProjectsController {
    findAll(query: FindProjectsDto): Promise<ProjectDto[]>;
    findOne(id: string): Promise<ProjectDto>;
    create(createProjectDto: CreateProjectDto): Promise<ProjectDto>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDto>;
    remove(id: string): Promise<void>;
}
