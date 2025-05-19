// src/common/axios/axios.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);

  constructor(private readonly http: HttpService) {}

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    this.logger.debug(`GET ${url}`);
    return firstValueFrom(this.http.get<T>(url, config));
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    this.logger.debug(`POST ${url}`);
    return firstValueFrom(this.http.post<T>(url, data, config));
  }

  async put<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    this.logger.debug(`PUT ${url}`);
    return firstValueFrom(this.http.put<T>(url, data, config));
  }
}
