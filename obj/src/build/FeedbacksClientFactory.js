"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const FeedbacksDirectClientV1_1 = require("../version1/FeedbacksDirectClientV1");
const FeedbacksHttpClientV1_1 = require("../version1/FeedbacksHttpClientV1");
class FeedbacksClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksClientFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1_1.FeedbacksDirectClientV1);
        this.registerAsType(FeedbacksClientFactory.HttpClientV1Descriptor, FeedbacksHttpClientV1_1.FeedbacksHttpClientV1);
    }
}
exports.FeedbacksClientFactory = FeedbacksClientFactory;
FeedbacksClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-feedbacks', 'factory', 'default', 'default', '1.0');
FeedbacksClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-feedbacks', 'client', 'direct', 'default', '1.0');
FeedbacksClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-feedbacks', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=FeedbacksClientFactory.js.map