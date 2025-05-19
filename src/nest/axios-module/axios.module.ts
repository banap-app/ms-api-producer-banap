// src/common/axios/axios.module.ts
import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from './axios.service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): HttpModuleOptions => ({
        baseURL: config.get<string>('http.baseURL'),
        timeout: config.get<number>('http.timeout'),
        maxRedirects: config.get<number>('http.maxRedirects'),
      }),
    }),
  ],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
