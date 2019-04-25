let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { FeedbacksMemoryPersistence } from 'pip-services-feedbacks-node';
import { FeedbacksController } from 'pip-services-feedbacks-node';
import { IFeedbacksClientV1 } from '../../src/version1/IFeedbacksClientV1';
import { FeedbacksDirectClientV1 } from '../../src/version1/FeedbacksDirectClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

suite('FeedbacksDirectClientV1', ()=> {
    let client: FeedbacksDirectClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new FeedbacksDirectClientV1();
        client.setReferences(references);

        fixture = new FeedbacksClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
