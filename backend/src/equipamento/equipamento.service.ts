import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  EquipamentoEntity,
  EquipamentoStatus,
  EquipamentoTipo,
} from 'src/db/entities/equipamento.entity';
import { RequestEquipamentoDTO } from './dto/request/request-equipamento.dto';
import { ResponseEquipamentoDTO } from './dto/response/response-equipamento.dto';
import { ResponsePaginacaoDTO } from './dto/response/response-paginacao.dto';
import { UpdateEquipamentoDTO } from './dto/request/request-update.dto';
import { FiltroEquipamentoDTO } from './dto/query/filtro-equipamento.dto';
import { SelectQueryBuilder } from 'typeorm/browser';

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
    const equipamento = await this.buscarEquipamentoExistente(id);

    return this.mapearEntidadeParaDto(equipamento);
  }

  async buscarEquipamentoExistente(id: number): Promise<EquipamentoEntity> {
    const equipamentoEncontrado = await this.repository.findOne({
      where: { id },
    });

    if (!equipamentoEncontrado) {
      throw new HttpException(
        'Esse equipamento não existe no sistema',
        HttpStatus.NOT_FOUND,
      );
    }

    return equipamentoEncontrado;
  }

  async buscarTodos(
    query: FiltroEquipamentoDTO,
  ): Promise<ResponsePaginacaoDTO> {
    const { page, limit, tipo, status } = query;
    const constutorQuery = this.repository.createQueryBuilder('equipamento');

    this.anexarTipoNaQuery(tipo, constutorQuery);
    this.anexarStatusNaQuery(status, constutorQuery);

    constutorQuery.skip((page - 1) * limit).take(limit);

    const [data, total] = await constutorQuery.getManyAndCount();

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

  anexarTipoNaQuery(
    tipo: EquipamentoTipo | undefined,
    cq: SelectQueryBuilder<EquipamentoEntity>,
  ) {
    if (tipo) {
      cq.andWhere('equipamento.tipo = :tipo', { tipo });
    }
  }

  anexarStatusNaQuery(
    status: EquipamentoStatus | undefined,
    cq: SelectQueryBuilder<EquipamentoEntity>,
  ) {
    if (status) {
      cq.andWhere('equipamento.status = :status', { status });
    }
  }

  async atualizar(
    id: number,
    dto: UpdateEquipamentoDTO,
  ): Promise<ResponseEquipamentoDTO> {
    const equipamento = await this.buscarEquipamentoExistente(id);

    const dadosAtualizados = Object.fromEntries(
      Object.entries(dto).filter(([_, valor]) => valor !== undefined),
    );

    Object.assign(equipamento, dadosAtualizados);
    await this.repository.save(equipamento);

    return this.mapearEntidadeParaDto(equipamento);
  }

  // TODO: Validação de usuário, onde somente um Supervisor tem acesso a esse endpoint
  async atualizarStatus(id: number, status: EquipamentoStatus) {
    const equipamento = await this.buscarEquipamentoExistente(id);

    equipamento.status = status;
    await this.repository.save(equipamento);

    return this.mapearEntidadeParaDto(equipamento);
  }

  async deletarPorId(id: number): Promise<undefined> {
    const equipamentoDeletado = await this.repository.delete(id);

    if (!equipamentoDeletado.affected) {
      throw new NotFoundException(
        'O equipamento não foi encontrado no sistema',
      );
    }
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
