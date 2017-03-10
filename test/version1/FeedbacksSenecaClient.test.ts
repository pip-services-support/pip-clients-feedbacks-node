let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let FeedbacksMemoryPersistence = require('pip-services-feedbacks/lib/src/persistence/FeedbacksMemoryPersistence').FeedbacksMemoryPersistence;
let FeedbacksController = require('pip-services-feedbacks/lib/src/logic/FeedbacksController').FeedbacksController;
let FeedbacksSenecaService = require('pip-services-feedbacks/lib/src/services/version1/FeedbacksSenecaService').FeedbacksSenecaService;

import { Version1 as StorageVersion1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageVersion1.StorageNullClient;

import { FeedbacksSenecaClient } from '../../src/version1/FeedbacksSenecaClient';
import { FeedbacksClientFixture } from './FeedbacksClientFixture';

suite('FeedbacksSenecaClient', ()=> {        
    let db = new FeedbacksMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new FeedbacksController();
    ctrl.configure(new ComponentConfig());

    let service = new FeedbacksSenecaService();
    service.configure(new ComponentConfig());

    let client = new FeedbacksSenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, storage, service, seneca);
    let fixture = new FeedbacksClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});