import { MigrationInterface, QueryRunner } from "typeorm";

export class StockPositiveFix1694740000728 implements MigrationInterface {
    name = 'StockPositiveFix1694740000728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "CHK_44fb3006a2113518e451da94bb" CHECK ("stock">0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "CHK_44fb3006a2113518e451da94bb"`);
    }

}
