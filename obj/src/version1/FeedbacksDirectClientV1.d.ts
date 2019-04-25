import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';
export declare class FeedbacksDirectClientV1 extends DirectClient<any> implements IFeedbacksClientV1 {
    constructor(config?: any);
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<FeedbackV1>) => void): void;
    getFeedbackById(correlationId: string, feedbackId: string, callback: (err: any, feedback: FeedbackV1) => void): void;
    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1, callback: (err: any, feedback: FeedbackV1) => void): void;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1, callback: (err: any, feedback: FeedbackV1) => void): void;
    deleteFeedbackById(correlationId: string, feedbackId: string, callback: (err: any, feedback: FeedbackV1) => void): void;
}
