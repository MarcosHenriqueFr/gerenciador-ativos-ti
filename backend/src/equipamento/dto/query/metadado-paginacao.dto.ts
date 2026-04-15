import { ApiProperty } from '@nestjs/swagger';

export class MetadadoPaginacaoDTO {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  lastPage!: number;
}
