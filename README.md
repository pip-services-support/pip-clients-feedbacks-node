# Feedbacks Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-feedbacks](https://github.com/pip-services/pip-services-feedbacks) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP client
* Seneca client (see http://www.senecajs.org)
* AWS Lambda client
* Direct client

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-feedbacks-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-feedbacks-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.FeedbacksHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Send feedback to support
client.sendFeedback(
    null,
    { 
        category: 'support',
        title: 'Please help',
        content: 'When I am trying to run application in Win 10 it crashes'
    },
    {
        id: '123',
        name: 'Test User',
        email: 'somebody@somewhere.com'
    },
    function (err, feedback) {
        ...
    }
);
```

```javascript
// Reply feedback
client.replyFeedback(
    null,
    feedback.id,
    'Please, be patient. We are working to fix that issue.',
    {
        id: '321',
        name: 'Support Team',
        email: 'support@somewhere.com'
    },
    function(err, feedback) {
    ...    
    }
);
```    

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

