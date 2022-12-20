import { Module } from '@nestjs/common';
import { AxiosAdapter } from 'src/commons/adapters/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonsModule {}
