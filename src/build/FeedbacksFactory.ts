import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class FeedbacksFactory extends ComponentFactory {
	public static Instance: FeedbacksFactory = new FeedbacksFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.FeedbacksRestClient.Descriptor, Version1.FeedbacksRestClient);
		this.register(Version1.FeedbacksSenecaClient.Descriptor, Version1.FeedbacksSenecaClient);
		this.register(Version1.FeedbacksLambdaClient.Descriptor, Version1.FeedbacksLambdaClient);
	}
	
}
