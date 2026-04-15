import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { RequestEquipamentoDTO } from './request-equipamento.dto';
import { ResponseEquipamentoDTO } from './response-equipamento.dto';
import { ResponsePaginacaoDTO } from './response-paginacao.dto';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  async criar(
    @Body() equipamento: RequestEquipamentoDTO,
  ): Promise<ResponseEquipamentoDTO> {
    return this.equipamentoService.criar(equipamento);
  }

  @Get('/:id')
  buscarPorId(@Param('id') id: number): Promise<ResponseEquipamentoDTO> {
    return this.equipamentoService.buscarPorId(id);
  }

  @Get()
  buscarTodos(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<ResponsePaginacaoDTO> {
    return this.equipamentoService.buscarTodos(page, limit);
  }
}
