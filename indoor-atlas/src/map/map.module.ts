import { Module } from '@nestjs/common';
import { MapService } from './service/map.service';
import { MapController } from './controller/map.controller';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapController,MapService],
})
export class Map {}