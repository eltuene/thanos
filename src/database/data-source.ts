import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateGastosTable1687905105730 } from "./migrations/1687905105730-CreateGastosTable"
import { CreateCategoriasTable1687906219371 } from "./migrations/1687906219371-CreateCategoriasTable"
import { CreateGastosCategoriasTable1687906230171 } from "./migrations/1687906230171-CreateGastosCategoriasTable"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 33063,
  username: "root",
  password: "root",
  database: "projeto",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [
    CreateGastosTable1687905105730,
    CreateCategoriasTable1687906219371,
    CreateGastosCategoriasTable1687906230171,
  ],
  subscribers: [],
})
