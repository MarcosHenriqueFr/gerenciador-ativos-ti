import { PartialType } from '@nestjs/swagger';
import { RequestEquipamentoDTO } from './request-equipamento.dto';

export class UpdateEquipamentoDTO extends PartialType(RequestEquipamentoDTO) {}
