let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { MicroserviceConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { Builder } from 'pip-services-runtime-node';

let FeedbacksMemoryPersistence = require('pip-services-feedbacks/lib/src/persistence/FeedbacksMemoryPersistence').FeedbacksMemoryPersistence;
let FeedbacksController = require('pip-services-feedbacks/lib/src/logic/FeedbacksController').FeedbacksController;
let FeedbacksRestService = require('pip-services-feedbacks/lib/src/services/version1/FeedbacksRestService').FeedbacksRestService;

import { Version1 as StorageVersion1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageVersion1.StorageNullClient;

import { FeedbacksRestClient } from '../../src/version1/FeedbacksRestClient';
import { FeedbacksClientFixture } from './FeedbacksClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('FeedbacksRestClient', ()=> {    
    let db = new FeedbacksMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new FeedbacksController();
    ctrl.configure(new ComponentConfig());

    let service = new FeedbacksRestService();
    service.configure(restConfig);

    let client = new FeedbacksRestClient();
    client.configure(restConfig);

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, storage, client);
    let fixture = new FeedbacksClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});