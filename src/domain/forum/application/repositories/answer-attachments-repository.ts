import type { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export interface AnswerAttachmentsRepository {
	create(answerAttachment: AnswerAttachment): Promise<void>;
	delete(answerAttachment: AnswerAttachment): Promise<void>;
	deleteManyByAnswerId(AnswerId: string): Promise<void>;
	update(answerAttachment: AnswerAttachment): Promise<void>;
	findById(answerAttachmentId: string): Promise<AnswerAttachment | null>;
	findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
}
