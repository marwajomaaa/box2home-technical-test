import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './users.entity'
import { Project } from './projects.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: string

  @Column()
  dueDate: Date

  @ManyToOne(() => User, (user) => user.tasks)
  user: User

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project
}
