import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Form from "./form.model";
import User from "./user.model";

@Entity()
export default class Request extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
	to: User;

	@ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
	from: User;

	@OneToOne(() => Form, { eager: true, onDelete: "CASCADE" })
	@JoinColumn()
	form: Form;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
