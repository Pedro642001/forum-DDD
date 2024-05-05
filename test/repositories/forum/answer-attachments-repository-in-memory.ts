import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class AnswerAttachmentsRepositoryInMemory implements AnswerAttachmentsRepository {

  public items: Array<AnswerAttachment> = [];

  async create(answerAttachment: AnswerAttachment): Promise<void> {
    this.items.push(answerAttachment);

    return;
  }

  async update(answerAttachment: AnswerAttachment): Promise<void> {
    const questionIndex = this.items.indexOf(answerAttachment);

    this.items[questionIndex] = answerAttachment;
  }

  async delete(answerAttachment: AnswerAttachment): Promise<void> {
    const questionIndex = this.items.indexOf(answerAttachment);

    this.items.splice(questionIndex, 1);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {

  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const questionAttachments = this.items
      .filter((item) => item.answerId.value !== answerId);

    this.items = questionAttachments;
  }

  async findById(questionId: string): Promise<AnswerAttachment | null> {

    const answerAttachment = this.items.find((item) => item.id.value === questionId);

    if (!answerAttachment) {
      return null;
    }

    return answerAttachment;
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = this.items
      .filter((item) => item.answerId.value === answerId);

    return answerAttachments;
  }

};