import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Form extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	done: boolean;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
