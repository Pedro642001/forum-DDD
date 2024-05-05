import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface StudentProps {
	name: string;
}

export class Student extends Entity<StudentProps> {
	static create(props: StudentProps, id?: UniqueEntityID) {
		return new Student(props, id);
	}
}
