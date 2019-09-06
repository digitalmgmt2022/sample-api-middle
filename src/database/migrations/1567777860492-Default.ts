import { MigrationInterface, QueryRunner } from 'typeorm';

const preparePhoto = [
  'https://picsum.photos/id/128/1920/1080',
  'https://picsum.photos/id/256/1920/1080',
  'https://picsum.photos/id/512/1920/1080',
  'https://picsum.photos/id/1024/1920/1080',
  'https://picsum.photos/id/1280/1920/1080',
  'https://picsum.photos/id/64/1920/1080',
  'https://picsum.photos/id/32/1920/1080',
  'https://picsum.photos/id/16/1920/1080',
  'https://picsum.photos/id/8/1920/1080',
];

export class Default1567777860492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for await (const photo of preparePhoto) {
      await queryRunner.query(
        `INSERT INTO Photo(id, login, createAt, updateAt) VALUES (DEFAULT, '${photo}', DEFAULT, DEFAULT)`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `Like` DROP FOREIGN KEY `FK_d62fd1e1e63a92c1bccdfa6084d`',
    );
    await queryRunner.query(
      'ALTER TABLE `Like` DROP FOREIGN KEY `FK_e1ac421f1e6a1da63df580c62e4`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7aaa4ae2972d3b81d7f159c597` ON `User`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7d7ba3f7344bde97dd5f2bd60e` ON `User`',
    );
    await queryRunner.query('DROP TABLE `User`');
    await queryRunner.query(
      'DROP INDEX `IDX_af4e8594115116db9f7ae0940b` ON `Like`',
    );
    await queryRunner.query('DROP TABLE `Like`');
    await queryRunner.query('DROP TABLE `Photo`');
  }
}
