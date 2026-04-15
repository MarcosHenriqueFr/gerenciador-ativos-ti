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
  Patch,
} from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { RequestEquipamentoDTO } from './dto/request/request-equipamento.dto';
import { ResponseEquipamentoDTO } from './dto/response/response-equipamento.dto';
import { ResponsePaginacaoDTO } from './dto/response/response-paginacao.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateEquipamentoDTO } from './dto/request/request-update.dto';
import { EquipamentoStatus } from 'src/db/entities/equipamento.entity';
import { FiltroEquipamentoDTO } from './dto/query/filtro-equipamento.dto';

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
  @ApiOkResponse({
    description: 'Lista de equipamentos de acordo com as informações do filtro',
  })
  buscarTodos(
    @Query() query: FiltroEquipamentoDTO,
  ): Promise<ResponsePaginacaoDTO> {
    return this.equipamentoService.buscarTodos(query);
  }

  @Patch('/:id')
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEquipamentoDTO,
  ): Promise<ResponseEquipamentoDTO> {
    return this.equipamentoService.atualizar(id, dto);
  }

  @Patch('/:id/status')
  async atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: EquipamentoStatus,
  ) {
    return this.equipamentoService.atualizarStatus(id, status);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Removido com sucesso' })
  removerPorId(@Param('id') id: number): Promise<undefined> {
    return this.equipamentoService.deletarPorId(id);
  }
}
