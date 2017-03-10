"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var FeedbacksLambdaClient = (function (_super) {
    __extends(FeedbacksLambdaClient, _super);
    function FeedbacksLambdaClient(config) {
        _super.call(this, FeedbacksLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    FeedbacksLambdaClient.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        this.call('get_feedbacks', {
            correlation_id: correlationId,
            filter: filter,
            paging: paging
        }, callback);
    };
    FeedbacksLambdaClient.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this.call('get_feedback_by_id', {
            correlation_id: correlationId,
            feedback_id: feedbackId
        }, callback);
    };
    FeedbacksLambdaClient.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        this.call('send_feedback', {
            correlation_id: correlationId,
            feedback: feedback,
            user: user
        }, callback);
    };
    FeedbacksLambdaClient.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this.call('reply_feedback', {
            correlation_id: correlationId,
            feedback_id: feedbackId,
            reply: reply,
            user: user
        }, callback);
    };
    FeedbacksLambdaClient.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this.call('delete_feedback', {
            correlation_id: correlationId,
            feedback_id: feedbackId
        }, callback);
    };
    /**
     * Unique descriptor for the FeedbacksLambdaClient component
     */
    FeedbacksLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-feedbacks", "lambda", "1.0");
    return FeedbacksLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.FeedbacksLambdaClient = FeedbacksLambdaClient;
