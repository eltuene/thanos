import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable } from "typeorm";
import GastosCategorias from "./GastosCategorias";
@Entity()
export default class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToMany(() => GastosCategorias, gastosCategorias => gastosCategorias.categorias)
  @JoinTable()
  gastosCategorias: GastosCategorias[];
}