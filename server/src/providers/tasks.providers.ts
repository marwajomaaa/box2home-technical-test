import { Task } from 'src/entities/tasks.entity'
import { DataSource } from 'typeorm'

export const tasksProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
]
