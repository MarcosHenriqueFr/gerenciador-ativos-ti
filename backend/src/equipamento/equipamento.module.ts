import { Module } from '@nestjs/common';
import { EquipamentoController } from './equipamento.controller';
import { EquipamentoService } from './equipamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentoEntity } from 'src/db/entities/equipamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipamentoEntity])],
  controllers: [EquipamentoController],
  providers: [EquipamentoService],
})
export class EquipamentoModule {}
