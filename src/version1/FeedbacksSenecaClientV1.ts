import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';

import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';

export class FeedbacksSenecaClientV1 extends CommandableSenecaClient implements IFeedbacksClientV1 {

    constructor(config?: any) {
        super('feedbacks');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<FeedbackV1>) => void): void {
        this.callCommand(
            'get_feedbacks',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        this.callCommand(
            'get_feedback_by_id',
            correlationId,
            {
                feedback_id: feedbackId
            }, 
            callback
        );
    }

    public sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        this.callCommand(
            'send_feedback',
            correlationId,
            {
                feedback: feedback,
                user: user
            }, 
            callback
        );
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        this.callCommand(
            'reply_feedback',
            correlationId,
            {
                feedback_id: feedbackId,
                reply: reply,
                user: user
            }, 
            callback
        );
    }

    public deleteFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');
        this.callCommand(
            'delete_feedback_by_id',
            correlationId,
            {
                feedback_id: feedbackId
            }, 
            callback
        );
    }
    
}
