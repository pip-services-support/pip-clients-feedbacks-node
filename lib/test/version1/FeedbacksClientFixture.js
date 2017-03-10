"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var FEEDBACK = {
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
var USER1 = {
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
var USER2 = {
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};
var FeedbacksClientFixture = (function () {
    function FeedbacksClientFixture(client) {
        this._client = client;
    }
    FeedbacksClientFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        var feedback1, feedback2;
        async.series([
            // Send one feedback
            function (callback) {
                _this._client.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.category, FEEDBACK.category);
                    assert.equal(feedback.content, FEEDBACK.content);
                    assert.equal(feedback.sender.id, USER1.id);
                    assert.equal(feedback.sender.name, USER1.name);
                    assert.isDefined(feedback.sent);
                    assert.isUndefined(feedback.replied);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Send another feedback
            function (callback) {
                _this._client.sendFeedback(null, FEEDBACK, USER2, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.category, FEEDBACK.category);
                    assert.equal(feedback.content, FEEDBACK.content);
                    assert.equal(feedback.sender.id, USER2.id);
                    assert.equal(feedback.sender.name, USER2.name);
                    assert.isDefined(feedback.sent);
                    assert.isUndefined(feedback.replied);
                    feedback2 = feedback;
                    callback();
                });
            },
            // Get all feedbacks
            function (callback) {
                _this._client.getFeedbacks(null, {}, {}, function (err, feedbacks) {
                    assert.isNull(err);
                    assert.isObject(feedbacks);
                    assert.lengthOf(feedbacks.data, 2);
                    callback();
                });
            },
            // Reply the feedback
            function (callback) {
                _this._client.replyFeedback(null, feedback1.id, 'This is a reply', USER2, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.reply, 'This is a reply');
                    assert.equal(feedback.replier.id, USER2.id);
                    assert.equal(feedback.replier.name, USER2.name);
                    assert.isDefined(feedback.replied);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Delete feedback
            function (callback) {
                _this._client.deleteFeedback(null, feedback1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete feedback
            function (callback) {
                _this._client.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isNull(feedback || null);
                    callback();
                });
            }
        ], done);
    };
    return FeedbacksClientFixture;
}());
exports.FeedbacksClientFixture = FeedbacksClientFixture;
