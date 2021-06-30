import {MigrationInterface, QueryRunner} from "typeorm";
import { UserSeed } from "src/seeds/users.seed";

export class Init1625058655621 implements MigrationInterface {
    name = 'Init1625058655621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(300) NOT NULL, `password` varchar(300) NOT NULL, `email` varchar(300) NOT NULL, `amount` decimal NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transactions` (`id` varchar(36) NOT NULL, `amount` decimal NOT NULL, `date` datetime NOT NULL, `correspondentId` varchar(36) NULL, `recipientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `transactions` ADD CONSTRAINT `FK_cea9d196428c53f86db6fd94c83` FOREIGN KEY (`correspondentId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `transactions` ADD CONSTRAINT `FK_027bc0e7f0e511822fd3019859f` FOREIGN KEY (`recipientId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transactions` DROP FOREIGN KEY `FK_027bc0e7f0e511822fd3019859f`");
        await queryRunner.query("ALTER TABLE `transactions` DROP FOREIGN KEY `FK_cea9d196428c53f86db6fd94c83`");
        await queryRunner.query("DROP TABLE `transactions`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
