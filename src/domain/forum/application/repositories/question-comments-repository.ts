import type { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
	delete(questionComment: QuestionComment): Promise<void>;
	update(questionComment: QuestionComment): Promise<void>;
	findById(questionCommentId: string): Promise<QuestionComment | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<QuestionComment[]>;
}
