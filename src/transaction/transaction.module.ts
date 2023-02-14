import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SearchModule } from './../search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
