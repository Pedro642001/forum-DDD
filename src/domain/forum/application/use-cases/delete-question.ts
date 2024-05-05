import { Either, left, right } from "@/core/either/either";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteQuestionInput {
	questionId: string;
	authorId: string;
}

type DeleteQuestionOutput = Either<
	ResourceNotFoundError | NotAllowedError,
	null
>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		questionId,
		authorId,
	}: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (question.authorId.value !== authorId) {
			return left(new NotAllowedError());
		}

		await this.questionsRepository.delete(question);

		return right(null);
	}
}
