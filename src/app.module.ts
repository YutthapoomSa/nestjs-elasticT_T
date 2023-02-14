import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [TransactionModule, ConfigModule.forRoot(), SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
