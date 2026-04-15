import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EquipamentoTipo } from 'src/db/entities/equipamento.entity';

export class RequestEquipamentoDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  nome!: string;

  @IsEnum(EquipamentoTipo)
  @ApiProperty({ example: 'Monitor' })
  tipo!: EquipamentoTipo;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  dataAquisicao?: Date;
}
