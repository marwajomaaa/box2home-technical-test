import { Project } from 'src/entities/projects.entity'
import { DataSource } from 'typeorm'

export const projectProviders = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: ['DATA_SOURCE'],
  },
]
