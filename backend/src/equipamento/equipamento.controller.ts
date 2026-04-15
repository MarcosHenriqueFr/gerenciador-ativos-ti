import { Controller, Post, Body } from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { EquipamentoEntity } from 'src/db/entities/equipamento.entity';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  async criar(
    @Body() equipamento: EquipamentoEntity,
  ): Promise<EquipamentoEntity> {
    return this.equipamentoService.criar(equipamento);
  }
}
