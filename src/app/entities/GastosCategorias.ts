import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm"
import Gastos from "./Gastos"
import Categorias from "./Categorias"

@Entity()
export default class GastosCategorias {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Gastos)
  @JoinColumn({ name: "id_gasto" })
  gasto: Gastos

  @ManyToOne(() => Categorias)
  @JoinColumn({ name: "id_categoria" })
  categoria: Categorias

  @ManyToMany(() => Gastos, (gastos) => gastos.categorias)
  @JoinTable()
  gastos: Gastos[]

  @ManyToMany(() => Categorias, (categorias) => categorias.gastosCategorias)
  @JoinTable()
  categorias: Categorias[]
}
