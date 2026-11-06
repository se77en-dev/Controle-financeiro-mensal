import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';
import { CreateTransacaoDto } from './dto/create-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name) private transacaoModel: Model<TransacaoDocument>
  ) {}

  async create(createTransacaoDto: CreateTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(createTransacaoDto);
    return novaTransacao.save();
  }

  async findAll(): Promise<any> {
    const historico = await this.transacaoModel.find().exec();

    let saldoTotal = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach(transacao => {
      if (transacao.tipo === 'receita') {
        saldoTotal += transacao.valor;
      } else if (transacao.tipo === 'despesa') {
        saldoTotal -= transacao.valor;
        totalDespesas += transacao.valor;
        
        // Verifica se foi um gasto não essencial/impulso
        if (transacao.consumoConsciente === false) {
          totalGastoImpulso += transacao.valor;
        }
      }
    });

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso
      }
    };
  }
}