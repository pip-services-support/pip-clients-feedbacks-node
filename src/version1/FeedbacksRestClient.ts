let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { IFeedbacksClient } from './IFeedbacksClient';

export class FeedbacksRestClient extends RestClient implements IFeedbacksClient {       
	/**
	 * Unique descriptor for the FeedbacksRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-feedbacks", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(FeedbacksRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
    
    public getFeedbacks(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        
        let params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);

        this.call('get', 
            '/feedbacks', 
            params, 
            callback
        );
    }

    public getFeedbackById(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        
        this.call('get', 
            '/feedbacks/' + feedbackId,
            {
                correlation_id: correlationId
            }, 
            callback
        );        
    }

    public sendFeedback(correlationId: string, feedback: any, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        
        this.call('post', 
            '/feedbacks',
            {
                correlation_id: correlationId
            }, 
            {
                feedback: feedback,
                user: user
            }, 
            callback
        );
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        
        this.call('put', 
            '/feedbacks/' + feedbackId, 
            {
                correlation_id: correlationId
            }, 
            {
                user: user,
                reply: reply
            }, 
            callback
        );
    }

    public deleteFeedback(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);

        this.call('delete', 
            '/feedbacks/' + feedbackId, 
            {
                correlation_id: correlationId
            }, 
            callback
        );
    }
    
}
