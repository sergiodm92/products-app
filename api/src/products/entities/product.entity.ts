import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;
}
