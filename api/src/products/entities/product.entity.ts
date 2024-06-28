import { Entity, Column, ObjectIdColumn, ObjectId, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';

@Entity({ name: 'products' })
export class Product {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Column()
  image: string;

  @Column('simple-array')
  ratings: number[];

  @Column()
  stock: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
