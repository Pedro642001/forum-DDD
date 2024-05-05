import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class QuestionAttachmentsRepositoryInMemory implements QuestionAttachmentsRepository {
  public items: Array<QuestionAttachment> = [];

  async create(questionAttachment: QuestionAttachment): Promise<void> {
    this.items.push(questionAttachment);

    return;
  }

  async update(questionAttachment: QuestionAttachment): Promise<void> {
    const questionIndex = this.items.indexOf(questionAttachment);

    this.items[questionIndex] = questionAttachment;
  }

  async delete(questionAttachment: QuestionAttachment): Promise<void> {
    const questionIndex = this.items.indexOf(questionAttachment);

    this.items.splice(questionIndex, 1);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items
      .filter((item) => item.questionId.value !== questionId);

    this.items = questionAttachments;
  }

  async findById(questionId: string): Promise<QuestionAttachment | null> {

    const questionAttachment = this.items.find((item) => item.id.value === questionId);

    if (!questionAttachment) {
      return null;
    }

    return questionAttachment;
  }

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items
      .filter((item) => item.questionId.value === questionId);

    return questionAttachments;
  }
};