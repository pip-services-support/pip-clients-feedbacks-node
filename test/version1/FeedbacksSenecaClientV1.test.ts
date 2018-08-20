let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { FeedbacksMemoryPersistence } from 'pip-services-feedbacks-node';
import { FeedbacksController } from 'pip-services-feedbacks-node';
import { FeedbacksSenecaServiceV1 } from 'pip-services-feedbacks-node';
import { IFeedbacksClientV1 } from '../../src/version1/IFeedbacksClientV1';
import { FeedbacksSenecaClientV1 } from '../../src/version1/FeedbacksSenecaClientV1';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('FeedbacksSenecaClient', () => {
    let service: FeedbacksSenecaServiceV1;
    let client: FeedbacksSenecaClientV1;
    let fixture: FeedbacksClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-feedbacks', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new FeedbacksSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
