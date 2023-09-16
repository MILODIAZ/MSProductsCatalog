import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeBranches1694874546223 implements MigrationInterface {
    name = 'CascadeBranches1694874546223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_stock" DROP CONSTRAINT "FK_950a5a4c724c3c0e039e516542d"`);
        await queryRunner.query(`ALTER TABLE "products_stock" DROP CONSTRAINT "FK_48dc6f2d8085cfae567d38010b5"`);
        await queryRunner.query(`ALTER TABLE "products_stock" ADD CONSTRAINT "FK_950a5a4c724c3c0e039e516542d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_stock" ADD CONSTRAINT "FK_48dc6f2d8085cfae567d38010b5" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_stock" DROP CONSTRAINT "FK_48dc6f2d8085cfae567d38010b5"`);
        await queryRunner.query(`ALTER TABLE "products_stock" DROP CONSTRAINT "FK_950a5a4c724c3c0e039e516542d"`);
        await queryRunner.query(`ALTER TABLE "products_stock" ADD CONSTRAINT "FK_48dc6f2d8085cfae567d38010b5" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_stock" ADD CONSTRAINT "FK_950a5a4c724c3c0e039e516542d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
