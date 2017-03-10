"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var FeedbacksLambdaClient_1 = require('../../src/version1/FeedbacksLambdaClient');
var FeedbacksClientFixture_1 = require('./FeedbacksClientFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var clientOptions = options.get('clients');
clientOptions = _.isArray(clientOptions) ? clientOptions : [clientOptions];
var lambdaOptions = _.find(clientOptions, function (o) {
    return (o.descriptor || {}).type == 'lambda';
});
suite('FeedbacksLambdaClient', function () {
    // Skip test if lambda is not configured
    if (lambdaOptions == null)
        return;
    var config = pip_services_runtime_node_2.ComponentConfig.fromValue(lambdaOptions);
    var client = new FeedbacksLambdaClient_1.FeedbacksLambdaClient();
    client.configure(config);
    var fixture = new FeedbacksClientFixture_1.FeedbacksClientFixture(client);
    suiteSetup(function (done) {
        client.link(new pip_services_runtime_node_1.ComponentSet());
        client.open(done);
    });
    suiteTeardown(function (done) {
        client.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
