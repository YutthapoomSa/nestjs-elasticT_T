/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

type dataResponse = {
  device_id: number;
  pm2: number;
  pm10: number;
  site_name: string;
  heat_index: number;
  coor_lat: number;
  coor_lon: number;
  humidity: number;
  temperature: number;
  date_data: Date;
};

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async search(search: { key: string }) {
    let results = new Set();
    const response = await this.esService.search({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        size: 50,
        query: {
          match_phrase: search,
        },
      },
    });
    const hits = response.hits.hits;
    hits.map((item) => {
      results.add(item._source as dataResponse);
    });

    return { results: Array.from(results), total: response.hits.total };
  }

  async createIndex() {
    await client.indices.create({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            description: { type: 'text' },
            price: { type: 'float' },
          },
        },
      },
    });
  }

  async Index(data: dataResponse) {
    await client.index({
      index: 'weather-station',
      body: {
        data,
      },
    });
  }
}
