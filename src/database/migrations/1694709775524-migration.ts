import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694709775524 implements MigrationInterface {
    name = 'Migration1694709775524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c" UNIQUE ("name"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(200), "price" integer NOT NULL, "image" character varying, "isBlocked" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "CHK_73324cf7723934a8b0271665c9" CHECK ("price">0), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "branch"`);
    }

}
