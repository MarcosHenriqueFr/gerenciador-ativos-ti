import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EquipamentoTipo } from 'src/db/entities/equipamento.entity';

export class CriarEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEnum(EquipamentoTipo)
  tipo!: EquipamentoTipo;

  @IsOptional()
  @IsDateString()
  dataAquisicao?: string;
}
