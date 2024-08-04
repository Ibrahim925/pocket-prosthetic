import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import User from "./user.model";

@Entity()
export default class Hospital extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToOne(() => User, { onDelete: "CASCADE" })
	admin: User;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
