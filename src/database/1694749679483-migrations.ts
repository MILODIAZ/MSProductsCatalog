import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1694749679483 implements MigrationInterface {
    name = 'Migrations1694749679483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" ALTER COLUMN "stock" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" ALTER COLUMN "stock" DROP DEFAULT`);
    }

}
