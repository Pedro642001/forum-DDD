import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
	create(questionAttachment: QuestionAttachment): Promise<void>;
	delete(questionAttachment: QuestionAttachment): Promise<void>;
	deleteManyByQuestionId(questionId: string): Promise<void>;
	update(questionAttachment: QuestionAttachment): Promise<void>;
	findById(questionAttachmentId: string): Promise<QuestionAttachment | null>;
	findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
