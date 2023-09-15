import { MigrationInterface, QueryRunner } from "typeorm";

export class StockZeroFix1694740131284 implements MigrationInterface {
    name = 'StockZeroFix1694740131284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "CHK_44fb3006a2113518e451da94bb"`);
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "CHK_baa020058566dd9d965adb1c6c" CHECK ("stock">=0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "CHK_baa020058566dd9d965adb1c6c"`);
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "CHK_44fb3006a2113518e451da94bb" CHECK ((stock > 0))`);
    }

}
