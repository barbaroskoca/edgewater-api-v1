import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class BaseContent {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("date")
    createdOn!: Date;
}