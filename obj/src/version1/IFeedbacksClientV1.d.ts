import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { FeedbackV1 } from './FeedbackV1';
export interface IFeedbacksClientV1 {
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<FeedbackV1>) => void): void;
    getFeedbackById(correlationId: string, feedbackId: string, callback: (err: any, feedback: FeedbackV1) => void): void;
    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1, callback: (err: any, feedback: FeedbackV1) => void): void;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1, callback: (err: any, feedback: FeedbackV1) => void): void;
    deleteFeedbackById(correlationId: string, feedbackId: string, callback: (err: any, feedback: FeedbackV1) => void): void;
}