import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { FeedbacksDirectClientV1 } from '../version1/FeedbacksDirectClientV1';
import { FeedbacksHttpClientV1 } from '../version1/FeedbacksHttpClientV1';
import { FeedbacksSenecaClientV1 } from '../version1/FeedbacksSenecaClientV1';

export class FeedbacksClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-feedbacks', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(FeedbacksClientFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1);
		this.registerAsType(FeedbacksClientFactory.HttpClientV1Descriptor, FeedbacksHttpClientV1);
		this.registerAsType(FeedbacksClientFactory.SenecaClientV1Descriptor, FeedbacksSenecaClientV1);
	}
	
}
