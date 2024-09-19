import { Inject, Injectable } from '@nestjs/common'
import { Project } from 'src/entities/projects.entity'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) {}

  create(project: Project): Promise<Project> {
    return this.projectRepository.save(project)
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['tasks'] })
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    })
  }
  async update(id: number, project: Project): Promise<Project> {
    return this.projectRepository.save(project)
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.projectRepository.delete({ id })
  }
}
