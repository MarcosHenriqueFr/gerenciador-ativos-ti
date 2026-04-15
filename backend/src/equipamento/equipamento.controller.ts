import { Controller, Post, Body } from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { RequestEquipamentoDTO } from './request-equipamento.dto';
import { ResponseEquipamentoDTO } from './response-equipamento.dto';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  async criar(
    @Body() equipamento: RequestEquipamentoDTO,
  ): Promise<ResponseEquipamentoDTO> {
    return this.equipamentoService.criar(equipamento);
  }
}
