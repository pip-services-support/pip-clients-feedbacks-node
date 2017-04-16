import { YamlConfigReader } from 'pip-services-commons-node';
import { FeedbacksClientFixtureV1 } from './FeedbacksClientFixtureV1';
import { FeedbacksLambdaClientV1 } from '../../src/version1/FeedbacksLambdaClientV1';

suite('FeedbacksLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: FeedbacksLambdaClientV1;
    let fixture: FeedbacksClientFixtureV1;

    setup((done) => {
        client = new FeedbacksLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new FeedbacksClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});