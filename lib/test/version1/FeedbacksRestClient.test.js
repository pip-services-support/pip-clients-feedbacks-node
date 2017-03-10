"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var FeedbacksMemoryPersistence = require('pip-services-feedbacks/lib/src/persistence/FeedbacksMemoryPersistence').FeedbacksMemoryPersistence;
var FeedbacksController = require('pip-services-feedbacks/lib/src/logic/FeedbacksController').FeedbacksController;
var FeedbacksRestService = require('pip-services-feedbacks/lib/src/services/version1/FeedbacksRestService').FeedbacksRestService;
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var FeedbacksRestClient_1 = require('../../src/version1/FeedbacksRestClient');
var FeedbacksClientFixture_1 = require('./FeedbacksClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('FeedbacksRestClient', function () {
    var db = new FeedbacksMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new FeedbacksController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new FeedbacksRestService();
    service.configure(restConfig);
    var client = new FeedbacksRestClient_1.FeedbacksRestClient();
    client.configure(restConfig);
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, storage, client);
    var fixture = new FeedbacksClientFixture_1.FeedbacksClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
