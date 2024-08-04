import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import User from "./user.model";

@Entity()
export default class Feedback extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	score: number;

	@Column({ type: "longtext" })
	notes: string;

	@ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
	created_by: User;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
