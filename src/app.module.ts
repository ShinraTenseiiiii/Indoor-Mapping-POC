import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapController } from './map/controller/map.controller';
import { MapService } from './map/service/map.service';

@Module({
  imports: [],
  controllers: [AppController,MapController],
  providers: [AppService,MapService],
})
export class AppModule {}
