import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectId,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

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
