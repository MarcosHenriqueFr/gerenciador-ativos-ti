import { IsEnum } from 'class-validator';
import {
  EquipamentoStatus,
  EquipamentoTipo,
} from 'src/db/entities/equipamento.entity';

export class ResponseEquipamentoDTO {
  id?: number;
  nome!: string;

  @IsEnum(EquipamentoTipo)
  tipo!: EquipamentoTipo;

  @IsEnum(EquipamentoStatus)
  status!: EquipamentoStatus;
}
