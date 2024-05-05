import type { AnswersRepository } from "../repositories/answers-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { type Either, left, right } from "@/core/either/either";

interface ChooseQuestionBestAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private answersRepository: AnswersRepository,
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.value,
		);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.value) {
			return left(new NotAllowedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.update(question);

		return right({
			question,
		});
	}
}
