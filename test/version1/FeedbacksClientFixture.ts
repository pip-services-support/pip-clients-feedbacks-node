let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IFeedbacksClient } from '../../src/version1/IFeedbacksClient';

let FEEDBACK = {
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
let USER1 = {
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
let USER2 = {
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};

export class FeedbacksClientFixture {
    private _client: IFeedbacksClient;
    
    constructor(client: IFeedbacksClient) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        var feedback1, feedback2;

        async.series([
        // Send one feedback
            (callback) => {
                this._client.sendFeedback(
                    null,
                    FEEDBACK,
                    USER1,
                    (err, feedback) => {
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
                    }
                );
            },
        // Send another feedback
            (callback) => {
                this._client.sendFeedback(
                    null,
                    FEEDBACK,
                    USER2,
                    (err, feedback) => {
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
                    }
                );
            },
        // Get all feedbacks
            (callback) => {
                this._client.getFeedbacks(
                    null,
                    {},
                    {},
                    (err, feedbacks) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedbacks);
                        assert.lengthOf(feedbacks.data, 2);

                        callback();
                    }
                );
            },
        // Reply the feedback
            (callback) => {
                this._client.replyFeedback(
                    null,
                    feedback1.id,
                    'This is a reply',
                    USER2,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.reply, 'This is a reply');
                        assert.equal(feedback.replier.id, USER2.id);
                        assert.equal(feedback.replier.name, USER2.name);
                        assert.isDefined(feedback.replied);

                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Delete feedback
            (callback) => {
                this._client.deleteFeedback(
                    null,
                    feedback1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete feedback
            (callback) => {
                this._client.getFeedbackById(
                    null,
                    feedback1.id,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isNull(feedback || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
