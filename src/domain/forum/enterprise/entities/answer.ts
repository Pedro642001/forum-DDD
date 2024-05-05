import { AggregateRoot } from "@/core/entities/aggregate-root";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { Optional } from "@/core/types/optional";
import { AnswerAttachmentList } from "./answer-attachment-list";
import { AnswerCreatedEvent } from "../events/answer-created-event";

export interface AnswerProps {
	authorId: UniqueEntityID;
	questionId: UniqueEntityID;
	content: string;
	attachments: AnswerAttachmentList;
	createdAt: Date;
	updatedAt?: Date;
}

export class Answer extends AggregateRoot<AnswerProps> {
	get content() {
		return this.props.content;
	}

	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get attachments() {
		return this.props.attachments;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	static create(
		props: Optional<AnswerProps, "createdAt" | "attachments">,
		id?: UniqueEntityID,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				attachments: props.attachments ?? new AnswerAttachmentList(),
			},
			id,
		);

		const isNewAnswer = !id;

		if (isNewAnswer) {
			answer.addDomainEvent(new AnswerCreatedEvent(answer));
		}

		return answer;
	}
}
