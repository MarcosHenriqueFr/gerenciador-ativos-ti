import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipamentoEntity } from 'src/db/entities/equipamento.entity';
import { RequestEquipamentoDTO } from './request-equipamento.dto';
import { ResponseEquipamentoDTO } from './response-equipamento.dto';
import { ResponsePaginacaoDTO } from './response-paginacao.dto';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(EquipamentoEntity)
    private readonly repository: Repository<EquipamentoEntity>,
  ) {}

  async criar(dados: RequestEquipamentoDTO): Promise<ResponseEquipamentoDTO> {
    const equipamentoParaSalvar = this.mapearDtoParaEntidade(dados);

    const equipamentoCriado = await this.repository.save(equipamentoParaSalvar);
    return this.mapearEntidadeParaDto(equipamentoCriado);
  }

  async buscarPorId(id: number): Promise<ResponseEquipamentoDTO> {
    const equipamentoEncontrado = await this.repository.findOne({
      where: { id },
    });

    if (!equipamentoEncontrado) {
      throw new HttpException(
        'Esse equipamento não existe no sistema',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapearEntidadeParaDto(equipamentoEncontrado);
  }

  async buscarTodos(
    page: number,
    limit: number,
  ): Promise<ResponsePaginacaoDTO> {
    const pulo = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip: pulo,
      take: limit,
    });

    const listaRespostas = data.map((entidade) =>
      this.mapearEntidadeParaDto(entidade),
    );

    return {
      data: listaRespostas,
      meta: {
        total: total,
        page: page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  private mapearDtoParaEntidade(
    equipamento: RequestEquipamentoDTO,
  ): Partial<EquipamentoEntity> {
    return {
      nome: equipamento.nome,
      tipo: equipamento.tipo,
      dataAquisicao: equipamento.dataAquisicao,
    };
  }

  private mapearEntidadeParaDto(
    equipamento: EquipamentoEntity,
  ): ResponseEquipamentoDTO {
    return {
      id: equipamento.id,
      nome: equipamento.nome,
      tipo: equipamento.tipo,
      status: equipamento.status,
    };
  }
}
