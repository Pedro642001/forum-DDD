import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Either, left, right } from "@/core/either/either";

interface GetQuestionBySlugInput {
	slug: string;
}

type GetQuestionBySlugOutput = Either<
	ResourceNotFoundError,
	{ question: Question }
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugInput): Promise<GetQuestionBySlugOutput> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({ question });
	}
}
