// src/core/pest-product/infrastructure/gateway/http/PestProductEmbrapaGateway.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Culture } from 'src/core/pest-product/domain/PestProduct';
import { IPestProductGateway } from 'src/core/pest-product/domain/PestProductGateway';

@Injectable()
export class PestProductEmbrapaGateway implements IPestProductGateway {
  constructor(private readonly httpService: HttpService) {}

  async search(
    culture: Culture | 'ALL',
    searchTerm: string | null,
  ): Promise<unknown> {
    const url = process.env.EMBRAPA_URL!; 

    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EMBRAPA_TOKEN}`,
    };

    const params:any = null
    if (searchTerm) params['praga_nome_comum'] = searchTerm;
    if (culture && culture !== 'ALL') params['cultura'] = culture;

    try {
      const res: AxiosResponse = await firstValueFrom(
        this.httpService.get(url + '/search/produtos-formulados', {
          headers,
          params,
          // (opcional) segurança extra:
          timeout: 15000,
          validateStatus: (s) => s >= 200 && s < 500,
        }),
      );

      if (res.status >= 400) {
        // normalize o erro p/ sua camada de domínio
        throw new Error(
          `Embrapa API error ${res.status}: ${JSON.stringify(res.data)}`,
        );
      }

      return res.data; // devolve apenas o payload
    } catch (err) {
      // logue/translate conforme sua necessidade de domínio
      throw err;
    }
  }
}
