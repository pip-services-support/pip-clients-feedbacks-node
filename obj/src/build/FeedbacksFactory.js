"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const FeedbacksDirectClientV1_1 = require("../version1/FeedbacksDirectClientV1");
const FeedbacksHttpClientV1_1 = require("../version1/FeedbacksHttpClientV1");
const FeedbacksSenecaClientV1_1 = require("../version1/FeedbacksSenecaClientV1");
class FeedbacksFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1_1.FeedbacksDirectClientV1);
        this.registerAsType(FeedbacksFactory.HttpClientV1Descriptor, FeedbacksHttpClientV1_1.FeedbacksHttpClientV1);
        this.registerAsType(FeedbacksFactory.SenecaClientV1Descriptor, FeedbacksSenecaClientV1_1.FeedbacksSenecaClientV1);
    }
}
FeedbacksFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'factory', 'default', 'default', '1.0');
FeedbacksFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'client', 'direct', 'default', '1.0');
FeedbacksFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'client', 'http', 'default', '1.0');
FeedbacksFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'client', 'seneca', 'default', '1.0');
exports.FeedbacksFactory = FeedbacksFactory;
//# sourceMappingURL=FeedbacksFactory.js.map