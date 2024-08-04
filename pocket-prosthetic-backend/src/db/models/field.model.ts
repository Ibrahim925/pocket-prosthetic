import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Form from "./form.model";

@Entity()
export default class Field extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type: "TEXT" | "SCAN" | "IMAGE";

	@Column()
	label: string;

	@Column({ type: "longtext" })
	value: string;

	@ManyToOne(() => Form, { onDelete: "CASCADE", eager: true })
	form: Form;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
