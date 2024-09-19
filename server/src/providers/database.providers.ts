import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,

        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/../**/*.entity{.ts,.js}'],
      })

      return dataSource.initialize()
    },
  },
]
