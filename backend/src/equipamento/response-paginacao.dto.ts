import { ApiProperty } from '@nestjs/swagger';
import { ResponseEquipamentoDTO } from './response-equipamento.dto';
import { MetadadoPaginacaoDTO } from './metadado-paginacao.dto';

export class ResponsePaginacaoDTO {
  @ApiProperty({ isArray: true })
  data!: ResponseEquipamentoDTO[];

  @ApiProperty({ type: MetadadoPaginacaoDTO })
  meta!: MetadadoPaginacaoDTO;
}
