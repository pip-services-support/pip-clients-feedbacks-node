"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var FeedbacksFactory = (function (_super) {
    __extends(FeedbacksFactory, _super);
    function FeedbacksFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.FeedbacksRestClient.Descriptor, Version1.FeedbacksRestClient);
        this.register(Version1.FeedbacksSenecaClient.Descriptor, Version1.FeedbacksSenecaClient);
        this.register(Version1.FeedbacksLambdaClient.Descriptor, Version1.FeedbacksLambdaClient);
    }
    FeedbacksFactory.Instance = new FeedbacksFactory();
    return FeedbacksFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.FeedbacksFactory = FeedbacksFactory;
