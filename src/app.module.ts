import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesModule } from './transacoes/transacoes.module';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/controleFinanceiro?retryWrites=true&w=majority'),
    TransacoesModule,
  ],
})
export class AppModule {}