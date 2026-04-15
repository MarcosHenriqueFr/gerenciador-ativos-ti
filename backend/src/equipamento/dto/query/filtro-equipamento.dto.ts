import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  EquipamentoStatus,
  EquipamentoTipo,
} from 'src/db/entities/equipamento.entity';

export class FiltroEquipamentoDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  page: number = 1;

  @Min(1)
  @Max(50)
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  limit: number = 10;

  @IsOptional()
  @IsEnum(EquipamentoTipo)
  @ApiProperty({ required: false, example: 'Monitor' })
  tipo?: EquipamentoTipo;

  @IsOptional()
  @IsEnum(EquipamentoStatus)
  @ApiProperty({ required: false, example: 'Ativo' })
  status?: EquipamentoStatus;
}
