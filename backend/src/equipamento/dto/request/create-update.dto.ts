import { PartialType } from '@nestjs/swagger';
import { RequestEquipamentoDTO } from './create-equipamento.dto';

export class UpdateEquipamentoDTO extends PartialType(RequestEquipamentoDTO) {}
