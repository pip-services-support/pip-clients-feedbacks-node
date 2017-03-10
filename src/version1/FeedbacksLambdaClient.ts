let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaClient } from 'pip-services-runtime-node';

import { IFeedbacksClient } from './IFeedbacksClient';

export class FeedbacksLambdaClient extends LambdaClient implements IFeedbacksClient {       
	/**
	 * Unique descriptor for the FeedbacksLambdaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-feedbacks", "lambda", "1.0"
	);
    
    constructor(config?: any) {
        super(FeedbacksLambdaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }

    public getFeedbacks(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        this.call(
            'get_feedbacks',
            {
                correlation_id: correlationId,
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getFeedbackById(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this.call(
            'get_feedback_by_id',
            {
                correlation_id: correlationId,
                feedback_id: feedbackId
            }, 
            callback
        );        
    }

    public sendFeedback(correlationId: string, feedback: any, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        this.call(
            'send_feedback',
            {
                correlation_id: correlationId,
                feedback: feedback,
                user: user
            }, 
            callback
        );
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this.call(
            'reply_feedback',
            {
                correlation_id: correlationId,
                feedback_id: feedbackId,
                reply: reply,
                user: user  
            },
            callback
        );
    }

    public deleteFeedback(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this.call(
            'delete_feedback',
            {
                correlation_id: correlationId,
                feedback_id: feedbackId
            }, 
            callback
        );
    }
    
}
