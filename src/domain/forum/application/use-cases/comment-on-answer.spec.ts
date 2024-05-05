import { AnswersRepositoryInMemory } from "test/repositories/forum/answers-repository-in-memory";
import { CommentOnAnswersUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/forum/make-answer";
import { AnswerAttachmentsRepositoryInMemory } from "test/repositories/forum/answer-attachments-repository-in-memory";
import { AnswerCommentsRepositoryInMemory } from "test/repositories/forum/answer-comments-repository-in-memory";

let answerCommentsRepositoryInMemory: AnswerCommentsRepositoryInMemory;
let answerAttachmentsRepositoryInMemory: AnswerAttachmentsRepositoryInMemory;
let answersRepositoryInMemory: AnswersRepositoryInMemory;
let sut: CommentOnAnswersUseCase;

describe("Comment on question", () => {
	beforeEach(() => {
		answerAttachmentsRepositoryInMemory =
			new AnswerAttachmentsRepositoryInMemory();
		answerCommentsRepositoryInMemory = new AnswerCommentsRepositoryInMemory();
		answersRepositoryInMemory = new AnswersRepositoryInMemory(
			answerAttachmentsRepositoryInMemory,
		);

		sut = new CommentOnAnswersUseCase(
			answersRepositoryInMemory,
			answerCommentsRepositoryInMemory,
		);
	});

	it("Should be able to create a new comment on question", async () => {
		const answer = makeAnswer();

		await answersRepositoryInMemory.create(answer);

		const result = await sut.execute({
			authorId: answer.authorId.value,
			content: "new content",
			answerId: answer.id.value,
		});

		expect(answerCommentsRepositoryInMemory.items[0].content).toEqual(
			"new content",
		);
	});
});
