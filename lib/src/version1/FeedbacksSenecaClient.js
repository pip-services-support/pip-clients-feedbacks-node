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
var FeedbacksSenecaClient = (function (_super) {
    __extends(FeedbacksSenecaClient, _super);
    function FeedbacksSenecaClient(config) {
        _super.call(this, FeedbacksSenecaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    FeedbacksSenecaClient.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        this.call('feedbacks', 'get_feedbacks', {
            correlation_id: correlationId,
            filter: filter,
            paging: paging
        }, callback);
    };
    FeedbacksSenecaClient.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this.call('feedbacks', 'get_feedback_by_id', {
            correlation_id: correlationId,
            feedback_id: feedbackId
        }, callback);
    };
    FeedbacksSenecaClient.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        callback = this.instrument(correlationId, 'FeedbacksClient.SendFeedback', callback);
        this.call('feedbacks', 'send_feedback', {
            correlation_id: correlationId,
            feedback: feedback,
            user: user
        }, callback);
    };
    FeedbacksSenecaClient.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this.call('feedbacks', 'reply_feedback', {
            correlation_id: correlationId,
            feedback_id: feedbackId,
            reply: reply,
            user: user
        }, callback);
    };
    FeedbacksSenecaClient.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this.call('feedbacks', 'delete_feedback', {
            correlation_id: correlationId,
            feedback_id: feedbackId
        }, callback);
    };
    /**
     * Unique descriptor for the FeedbacksSenecaClient component
     */
    FeedbacksSenecaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-feedbacks", "seneca", "1.0");
    return FeedbacksSenecaClient;
}(pip_services_runtime_node_5.SenecaClient));
exports.FeedbacksSenecaClient = FeedbacksSenecaClient;
