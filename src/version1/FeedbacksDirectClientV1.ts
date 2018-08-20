import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';

import { FeedbackV1 } from './FeedbackV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IFeedbacksClientV1 } from './IFeedbacksClientV1';
//import { IFeedbacksController } from 'pip-services-feedbacks-node';

export class FeedbacksDirectClientV1 extends DirectClient<any> implements IFeedbacksClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-feedbacks", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<FeedbackV1>) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedbacks');
        this._controller.getFeedbacks(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedback_by_id');
        this._controller.getFeedbackById(correlationId, feedbackId, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }

    public sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.send_feedback');
        this._controller.sendFeedback(correlationId, feedback, user, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.reply_feedback');
        this._controller.replyFeedback(correlationId, feedbackId, reply, user, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }

    public deleteFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');
        this._controller.deleteFeedbackById(correlationId, feedbackId, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }

}