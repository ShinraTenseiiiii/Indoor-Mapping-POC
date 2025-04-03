import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapService {
  private apiKey = process.env.INDOOR_ATLAS_API_KEY; // Store in .env

  async getWayfinding(
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number,
  ) {
    const url = 'https://positioning.indooratlas.com/v1/wayfinding';

    try {
      const response = await axios.post(
        url,
        {
          start: { lat: startLat, lon: startLon },
          destination: { lat: endLat, lon: endLon },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `apikey ${this.apiKey}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`IndoorAtlas API Error: ${error.message}`);
    }
  }
}
