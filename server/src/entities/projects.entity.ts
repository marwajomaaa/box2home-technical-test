import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Task } from './tasks.entity'
import { User } from './users.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]
}
