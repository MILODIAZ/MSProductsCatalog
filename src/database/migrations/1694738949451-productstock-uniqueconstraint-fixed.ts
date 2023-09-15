import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductstockUniqueconstraintFixed1694738949451 implements MigrationInterface {
    name = 'ProductstockUniqueconstraintFixed1694738949451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "UQ_160948179388ce342e37fa85d74" UNIQUE ("branchId", "productId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "UQ_160948179388ce342e37fa85d74"`);
    }

}
