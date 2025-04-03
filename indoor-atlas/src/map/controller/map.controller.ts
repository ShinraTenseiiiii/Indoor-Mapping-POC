import { Controller, Get, Render } from '@nestjs/common';

@Controller('map')
export class MapController {
  @Get('/')
  @Render('index')
  getMap() {
    return { apiKey: process.env.INDOOR_ATLAS_API_KEY };
  }
}
