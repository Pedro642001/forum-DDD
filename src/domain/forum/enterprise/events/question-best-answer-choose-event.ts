import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";
import { Question } from "../entities/question";

export class QuestionBestAnswerChooseEvent implements DomainEvent {
	ocurredAt: Date;
	question: Question;
	bestAnswerId: UniqueEntityID;

	constructor(question: Question, bestAnswerId: string) {
		this.question = question;
		this.bestAnswerId = new UniqueEntityID(bestAnswerId);
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.question.id;
	}
}
