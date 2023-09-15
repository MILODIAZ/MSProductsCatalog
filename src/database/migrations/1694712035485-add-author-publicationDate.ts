import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorPublicationDate1694712035485 implements MigrationInterface {
    name = 'AddAuthorPublicationDate1694712035485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "publicationDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "product" ADD "author" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "publicationDate"`);
    }

}
