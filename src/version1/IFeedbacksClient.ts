import { IClient } from 'pip-services-runtime-node';

export interface IFeedbacksClient extends IClient {
    getFeedbacks(correlationId: string, filter: any, paging: any, callback: any): void;
    getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
    sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
    deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
}
