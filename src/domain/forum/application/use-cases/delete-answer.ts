import { Either, left, right } from "@/core/either/either";
import type { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerInput {
	answerId: string;
	authorId: string;
}

type DeleteAnswerOutput = Either<ResourceNotFoundError | NotAllowedError, null>;

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
	}: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (answer.authorId.value !== authorId) {
			return left(new NotAllowedError());
		}

		await this.answersRepository.delete(answer);

		return right(null);
	}
}
