"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var FeedbacksMemoryPersistence = require('pip-services-feedbacks/lib/src/persistence/FeedbacksMemoryPersistence').FeedbacksMemoryPersistence;
var FeedbacksController = require('pip-services-feedbacks/lib/src/logic/FeedbacksController').FeedbacksController;
var FeedbacksSenecaService = require('pip-services-feedbacks/lib/src/services/version1/FeedbacksSenecaService').FeedbacksSenecaService;
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var FeedbacksSenecaClient_1 = require('../../src/version1/FeedbacksSenecaClient');
var FeedbacksClientFixture_1 = require('./FeedbacksClientFixture');
suite('FeedbacksSenecaClient', function () {
    var db = new FeedbacksMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new FeedbacksController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new FeedbacksSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new FeedbacksSenecaClient_1.FeedbacksSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, storage, service, seneca);
    var fixture = new FeedbacksClientFixture_1.FeedbacksClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
