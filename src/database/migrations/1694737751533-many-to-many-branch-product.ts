import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToManyBranchProduct1694737751533 implements MigrationInterface {
    name = 'ManyToManyBranchProduct1694737751533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_stock" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "stock" integer NOT NULL, "productId" integer, "branchId" integer, CONSTRAINT "PK_557112c9955555e7d08fa913f3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "FK_6d782c52c11043659e1182b33db" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_stock" ADD CONSTRAINT "FK_d9f0c1040dadad6e67816ced0b2" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "FK_d9f0c1040dadad6e67816ced0b2"`);
        await queryRunner.query(`ALTER TABLE "product_stock" DROP CONSTRAINT "FK_6d782c52c11043659e1182b33db"`);
        await queryRunner.query(`DROP TABLE "product_stock"`);
    }

}
