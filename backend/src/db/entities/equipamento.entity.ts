import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EquipamentoTipo {
  MONITOR = 'Monitor',
  CPU = 'CPU',
  TECLADO = 'Teclado',
}

export enum EquipamentoStatus {
  ATIVO = 'Ativo',
  MANUTENCAO = 'Manutencao',
}

@Entity({ name: 'equipamento' })
export class EquipamentoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: false })
  nome!: string;

  @Column({ type: 'enum', enum: EquipamentoTipo, nullable: false })
  tipo!: EquipamentoTipo;

  @Column({ type: 'date', name: 'data_aquisicao' })
  dataAquisicao?: Date;

  @Column({ type: 'enum', enum: EquipamentoStatus, default: 'Ativo' })
  status!: EquipamentoStatus;
}
