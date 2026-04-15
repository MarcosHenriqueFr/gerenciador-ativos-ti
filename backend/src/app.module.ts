import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EquipamentoModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
