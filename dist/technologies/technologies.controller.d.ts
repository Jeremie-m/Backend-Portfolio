import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { TechnologyDto } from './dto/technology.dto';
import { FindTechnologiesDto } from './dto/find-technologies.dto';
export declare class TechnologiesController {
    findAll(query: FindTechnologiesDto): Promise<TechnologyDto[]>;
    findOne(id: string): Promise<TechnologyDto>;
    create(createTechnologyDto: CreateTechnologyDto): Promise<TechnologyDto>;
    update(id: string, updateTechnologyDto: UpdateTechnologyDto): Promise<TechnologyDto>;
    remove(id: string): Promise<void>;
}
