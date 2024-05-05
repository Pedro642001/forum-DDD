import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
	create(answer: Answer): Promise<void>;
	update(answer: Answer): Promise<void>;
	delete(answer: Answer): Promise<void>;
	findById(answer: string): Promise<Answer | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<Answer[]>;
}
