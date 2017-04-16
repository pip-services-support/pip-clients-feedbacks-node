import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { FeedbacksDirectClientV1 } from '../version1/FeedbacksDirectClientV1';
import { FeedbacksHttpClientV1 } from '../version1/FeedbacksHttpClientV1';
import { FeedbacksSenecaClientV1 } from '../version1/FeedbacksSenecaClientV1';

export class FeedbacksFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-feedbacks', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-feedbacks', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(FeedbacksFactory.DirectClientV1Descriptor, FeedbacksDirectClientV1);
		this.registerAsType(FeedbacksFactory.HttpClientV1Descriptor, FeedbacksHttpClientV1);
		this.registerAsType(FeedbacksFactory.SenecaClientV1Descriptor, FeedbacksSenecaClientV1);
	}
	
}
