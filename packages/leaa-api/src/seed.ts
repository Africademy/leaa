import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getConnection } from 'typeorm';

import { AppModule } from '@leaa/api/app.module';
import { SeedService } from '@leaa/api/modules/seed/seed.service';

(async function seed() {
  const logger = new Logger('Seed-Log');
  logger.log('Seed Launcher...', ' 🔰 ');

  const app: NestExpressApplication = await NestFactory.create(AppModule);

  if (process.argv.includes('--nuke')) {
    console.log('\n\n\n\n>>>>>>>>>>>>>>>> ✴️✴️✴️✴️✴️✴️✴️✴️✴️✴️ NUKE NUKE NUKE NUKE\n\n\n\n');

    await getConnection().synchronize(true);
  }

  try {
    const seedService: SeedService = await app.get(SeedService);
    await seedService.insertPermissions();
    await seedService.insertRoles();
    await seedService.insertUsers();
    await seedService.insertRandomUsers();
    await seedService.insertRoleAddPermissions();
    await seedService.insertUserAddRole();
    await seedService.insertCategory();
    await seedService.insertArticle();
    await seedService.insertAx();
  } catch (e) {
    await process.exit(0);
  }

  await process.exit(0);
})();
