import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { Either, left, right } from "@/core/either/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { AnswersRepository } from "../repositories/answers-repository";

interface CommentOnAnswersInput {
	authorId: string;
	content: string;
	answerId: string;
}

type CommentOnAnswersOutput = Either<
	ResourceNotFoundError,
	{ answerComment: AnswerComment }
>;

export class CommentOnAnswersUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentsRepository: AnswerCommentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
	}: CommentOnAnswersInput): Promise<CommentOnAnswersOutput> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.create({
			answerId: new UniqueEntityID(answerId),
			authorId: new UniqueEntityID(authorId),
			content,
		});

		await this.answerCommentsRepository.create(answerComment);

		return right({ answerComment });
	}
}
