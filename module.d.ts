declare module 'pip-clients-feedbacks-node' {
	import { IClient } from 'pip-services-runtime-node';
	import { LambdaClient } from 'pip-services-runtime-node';
	import { SenecaClient } from 'pip-services-runtime-node';
	import { RestClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class FeedbacksFactory extends ComponentFactory {
        public static Instance: FeedbacksFactory;	
        constructor();	
    }

    module Version1 {
        export interface IFeedbacksClient extends IClient {
            getFeedbacks(correlationId: string, filter: any, paging: any, callback: any): void;
            getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
            sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
            replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
            deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
        }

        export class FeedbacksRestClient extends RestClient implements IFeedbacksClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getFeedbacks(correlationId: string, filter: any, paging: any, callback: any): void;
            getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
            sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
            replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
            deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
        }

        export class LambdaSenecaClient extends LambdaClient implements IFeedbacksClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getFeedbacks(correlationId: string, filter: any, paging: any, callback: any): void;
            getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
            sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
            replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
            deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
        }

        export class FeedbacksSenecaClient extends SenecaClient implements IFeedbacksClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getFeedbacks(correlationId: string, filter: any, paging: any, callback: any): void;
            getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
            sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
            replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
            deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
        }
    }
}
