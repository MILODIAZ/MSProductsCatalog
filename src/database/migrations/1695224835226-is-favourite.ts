import { MigrationInterface, QueryRunner } from "typeorm";

export class IsFavourite1695224835226 implements MigrationInterface {
    name = 'IsFavourite1695224835226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "isFavourite" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isFavourite"`);
    }

}
