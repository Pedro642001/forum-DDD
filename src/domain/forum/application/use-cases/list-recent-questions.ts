import { Either, right } from "@/core/either/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";

interface ListRecentQuestionsInput {
	page: number;
}

type ListRecentQuestionsOutput = Either<
	null,
	{
		questions: Question[];
	}
>;

export class ListRecentQuestionsUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		page,
	}: ListRecentQuestionsInput): Promise<ListRecentQuestionsOutput> {
		const questions = await this.questionsRepository.findManyRecent({
			page,
		});

		return right({
			questions,
		});
	}
}
