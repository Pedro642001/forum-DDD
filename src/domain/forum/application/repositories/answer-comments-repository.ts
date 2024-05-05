import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
	update(answerComment: AnswerComment): Promise<void>;
	delete(answerComment: AnswerComment): Promise<void>;
	findById(answerComment: string): Promise<AnswerComment | null>;
	findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]>;
}
