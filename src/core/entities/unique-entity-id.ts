import { randomUUID } from "node:crypto";

export class UniqueEntityID {
	value: string;

	equals(id: UniqueEntityID): boolean {
		return this.value === id.value;
	}

	constructor(id?: string) {
		this.value = id ?? randomUUID();
	}
}
