import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Hospital from "./hospital.model";

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	activated: boolean;

	@Column()
	type: "ADMIN" | "EMPLOYEE" | "PATIENT";

	@ManyToOne(() => Hospital, { onDelete: "CASCADE", eager: true })
	hospital: Hospital;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
