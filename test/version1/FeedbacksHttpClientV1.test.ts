let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { FeedbacksMemoryPersistence } from 'pip-services-feedbacks-node';
import { FeedbacksController } from 'pip-services-feedbacks-node';
import { FeedbacksHttpServiceV1 } from 'pip-services-feedbacks-node';
import { IFeedbacksClientV1 } from '../../src/version1/IFeedbacksClientV1';
import { FeedbacksHttpClientV1 } from '../../src/version1/FeedbacksHttpClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('FeedbacksHttpClientV1', ()=> {
    let service: FeedbacksHttpServiceV1;
    let client: FeedbacksHttpClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-feedbacks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new FeedbacksHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new FeedbacksClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
