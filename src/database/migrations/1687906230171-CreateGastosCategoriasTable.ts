import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm"

export class CreateGastosCategoriasTable1687906230171
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gastos_categorias",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "id_gasto",
            type: "int",
          },
          {
            name: "id_categoria",
            type: "int",
          },
        ],
      })
    )
    await queryRunner.createForeignKey(
      "gastos_categorias",
      new TableForeignKey({
        columnNames: ["id_gasto"],
        referencedColumnNames: ["id"],
        referencedTableName: "gastos",
        onDelete: "CASCADE",
      })
    )
    await queryRunner.createForeignKey(
      "gastos_categorias",
      new TableForeignKey({
        columnNames: ["id_categoria"],
        referencedColumnNames: ["id"],
        referencedTableName: "categorias",
        onDelete: "CASCADE",
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("gastos_categorias", "id_gasto")
    await queryRunner.dropForeignKey("gastos_categorias", "id_categoria")
    await queryRunner.dropTable("gastos_categorias")
  }
}
