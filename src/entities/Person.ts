import { Entity, Column } from "typeorm"
import { BaseContent } from "./BaseContent";

@Entity()
export class Person extends BaseContent {

    @Column()
    email!: string;

    @Column()
    fullName!: string;

    @Column()
    role!: string;

    @Column()
    password!: string

}