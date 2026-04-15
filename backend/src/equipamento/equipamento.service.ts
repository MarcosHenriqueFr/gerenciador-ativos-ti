import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipamentoEntity } from 'src/db/entities/equipamento.entity';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(EquipamentoEntity)
    private readonly repository: Repository<EquipamentoEntity>,
  ) {}

  async criar(dados: Partial<EquipamentoEntity>): Promise<EquipamentoEntity> {
    const equipamentoCriado = await this.repository.save(dados);
    return equipamentoCriado;
  }
}
