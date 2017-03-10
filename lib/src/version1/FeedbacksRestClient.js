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
var FeedbacksRestClient = (function (_super) {
    __extends(FeedbacksRestClient, _super);
    function FeedbacksRestClient(config) {
        _super.call(this, FeedbacksRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    FeedbacksRestClient.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        var params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);
        this.call('get', '/feedbacks', params, callback);
    };
    FeedbacksRestClient.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this.call('get', '/feedbacks/' + feedbackId, {
            correlation_id: correlationId
        }, callback);
    };
    FeedbacksRestClient.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        this.call('post', '/feedbacks', {
            correlation_id: correlationId
        }, {
            feedback: feedback,
            user: user
        }, callback);
    };
    FeedbacksRestClient.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this.call('put', '/feedbacks/' + feedbackId, {
            correlation_id: correlationId
        }, {
            user: user,
            reply: reply
        }, callback);
    };
    FeedbacksRestClient.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this.call('delete', '/feedbacks/' + feedbackId, {
            correlation_id: correlationId
        }, callback);
    };
    /**
     * Unique descriptor for the FeedbacksRestClient component
     */
    FeedbacksRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-feedbacks", "rest", "1.0");
    return FeedbacksRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.FeedbacksRestClient = FeedbacksRestClient;
