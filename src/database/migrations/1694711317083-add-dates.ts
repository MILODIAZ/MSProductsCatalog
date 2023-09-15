import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDates1694711317083 implements MigrationInterface {
    name = 'AddDates1694711317083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
    }

}
