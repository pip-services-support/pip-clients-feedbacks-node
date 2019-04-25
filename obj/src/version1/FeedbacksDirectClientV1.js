"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
//import { IFeedbacksController } from 'pip-services-feedbacks-node';
class FeedbacksDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-feedbacks", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getFeedbacks(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedbacks');
        this._controller.getFeedbacks(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getFeedbackById(correlationId, feedbackId, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.get_feedback_by_id');
        this._controller.getFeedbackById(correlationId, feedbackId, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }
    sendFeedback(correlationId, feedback, user, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.send_feedback');
        this._controller.sendFeedback(correlationId, feedback, user, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }
    replyFeedback(correlationId, feedbackId, reply, user, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.reply_feedback');
        this._controller.replyFeedback(correlationId, feedbackId, reply, user, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }
    deleteFeedbackById(correlationId, feedbackId, callback) {
        let timing = this.instrument(correlationId, 'feedbacks.delete_feedback_by_id');
        this._controller.deleteFeedbackById(correlationId, feedbackId, (err, feedback) => {
            timing.endTiming();
            callback(err, feedback);
        });
    }
}
exports.FeedbacksDirectClientV1 = FeedbacksDirectClientV1;
//# sourceMappingURL=FeedbacksDirectClientV1.js.map