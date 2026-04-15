import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { RequestEquipamentoDTO } from './request-equipamento.dto';
import { ResponseEquipamentoDTO } from './response-equipamento.dto';
import { ResponsePaginacaoDTO } from './response-paginacao.dto';
import { ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Equipamento criado com sucesso' })
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

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Removido com sucesso' })
  removerPorId(@Param('id') id: number): Promise<undefined> {
    return this.equipamentoService.deletarPorId(id);
  }
}
