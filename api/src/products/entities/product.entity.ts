import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;
}