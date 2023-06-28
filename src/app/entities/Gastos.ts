import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import GastosCategorias from "./GastosCategorias";
  
@Entity('gastos')
export default class Gastos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  descricao: string;

  @Column('float')
  valor: number;

  @CreateDateColumn()
  data: Date;

  @ManyToMany(() => GastosCategorias)
  @JoinTable()
  categorias: GastosCategorias[];
}