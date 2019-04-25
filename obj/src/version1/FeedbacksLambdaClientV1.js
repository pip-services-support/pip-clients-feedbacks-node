"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class FeedbacksLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('feedbacks');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getFeedbacks(correlationId, filter, paging, callback) {
        this.callCommand('get_feedbacks', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getFeedbackById(correlationId, feedbackId, callback) {
        this.callCommand('get_feedback_by_id', correlationId, {
            feedback_id: feedbackId
        }, callback);
    }
    sendFeedback(correlationId, feedback, user, callback) {
        this.callCommand('send_feedback', correlationId, {
            feedback: feedback,
            user: user
        }, callback);
    }
    replyFeedback(correlationId, feedbackId, reply, user, callback) {
        this.callCommand('reply_feedback', correlationId, {
            feedback_id: feedbackId,
            reply: reply,
            user: user
        }, callback);
    }
    deleteFeedbackById(correlationId, feedbackId, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');
        this.callCommand('delete_feedback_by_id', correlationId, {
            feedback_id: feedbackId
        }, callback);
    }
}
exports.FeedbacksLambdaClientV1 = FeedbacksLambdaClientV1;
//# sourceMappingURL=FeedbacksLambdaClientV1.js.map