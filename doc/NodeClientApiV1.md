# Client API (version 1) <br/> Feedbacks Microservices Client SDK for Node.js

Node.js client API for Feedbacks microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [Feedback class](#class1)
* [FeedbackPage class](#class2)
* [IFeedbacksClient interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getFeedbacks()](#operation4)
    - [getUsetById()](#operation5)
    - [sendFeedback()](#operation6)
    - [replyFeedback()](#operation7)
    - [deleteFeedback()](#operation8)
* [FeedbacksRestClient class](#client_rest)
* [FeedbacksSenecaClient class](#client_seneca)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-feedbacks-node": "git+ssh://git@github.com:pip-services/pip-clients-feedbacks-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-feedbacks-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-feedbacks-node').Version1;

// Client configuration
var config = {
    transport: {
        type: 'http',
        host: 'localhost', 
        port: 8012
    }
};

// Create the client instance
var client = sdk.FeedbacksRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Send feedback to support
    client.sendFeedback(
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
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Sent feedback is');
            console.log(feedback);
            
            // Reply feedback
            client.replyFeedback(
                feedback.id,
                'Please, be patient. We are working to fix that issue.',
                {
                    id: '321',
                    name: 'Support Team',
                    email: 'support@somewhere.com'
                },
                function(err, feedback) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Replied feedback is');
                    console.log(feedback);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> Feedback class

Represents user's feedback. 

**Properties:**
- id: string - unique feedback id
- category: string - feedback category, i.e. 'issue', 'feature', 'copyright', 'general', etc.
- app: string - (optional) application name
- sender: PartyReference - (optional) party who sent the feedback
  - id: string - (optional) unique user id who sent the feedback
  - name: string - sender full name
  - email: string - sender email address to send reply
- sent: Date - date and time when feedback was sent
- title: string - (optional) feedback title
- content: string - feedback textual content
- pic_ids: string[] - (optional) array of picture block ids in storage attached to this feedback
- docs: Reference[] - (optional) array of attached documents
  - id: string - block id in storage attached to this feedback
  - name: string - attached document/file name
- company_name: string - name of the company who reported copyright violation
- company_addr: string - mail address of the company who reported copyright violation
- copyright_holder: string - holder/owner of the violated copyright
- original_location: string - original location of copyrighted material
- copyrighted_work: string - exact description of the copyrighted material
- unauth_loc: string - unauthorized location of the violated copyright
- replier: PartyReference - party who replied the feedback
  - id: string - unique user id who replied the feedback
  - name: string - replier full name
  - email: string - replier email address to continue communication
- replied: Date - date and time when feedback was reply
- reply: text - reply textual content
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

### <a name="class3"></a> FeedbackPage class

Represents a paged result with subset of requested Feedback objects

**Properties:**
- data: Feedback[] - array of retrieved Feedback page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> IFeedbacksClient interface

If you are using Typescript, you can use IFeedbacksClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IFeedbacksClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IFeedbacksClient {
    init(refs, callback);
    open(callback);
    close(callback);
    getFeedbacks(filter, paging, callback);
    getFeedbackById(feedbackId, callback);
    sendFeedback(feedback, user, callback);
    replyFeedback(feedbackId, reply, user, callback);
    deleteFeedback(feedbackId, callback);
}
```

### <a name="operation1"></a> init(refs)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- refs: References - references to other components 
  - log: ILog - reference to logger
  - countes: ICounters - reference to performance counters
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getFeedbacks(filter, paging, callback)

Retrieves a list of feedbacks by specified criteria

**Params properties:** 
- filter: object - filter parameters
  - category: string - (optional) feedback category
  - app: string - (optional) application name
  - sender_id: string - (optional) unique user id of the sender
  - sender_email: string - (optional) email address of the sender
  - replier_id: string - (optional) unique user id of the replier
  - from: Date - (optional) start of feedback created interval
  - to: Date - (optional) end of feedback created interval
  - replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
  - search: string - string for full text search in title, content and sender name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: FeedbackPage - retrieved Feedback objects in paged format

### <a name="operation5"></a> getFeedbackById(feedbackId, callback)

Retrieves feedback by its unique id. 

**Arguments:** 
- feedback_id: string - unique feedback id
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: Feedback - retrieved Feedback object

### <a name="operation6"></a> sendFeedback(feedback, user, callback)

Sends a feedback from a user.

**Arguments:** 
- feedback: Feedback - a feedback to be sent
- user: User - feedback sender
  - id: string - (optional) sender unique user id
  - name: string - full sender name
  - email: string - sender email address
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: Feedback - created Feedback object
 
### <a name="operation8"></a> replyFeedback(feedbackId, reply, user, callback)

Reply feedback specified by its unique id.

**Arguments:** 
- feedbackId: string - unique feedback id
- reply: string - replied textual content
- user: User - feedback replier
  - id: string - (optional) replier unique user id
  - name: string - full replier name
  - email: string - replier email address
- callback: (err, feedback) => void - callback function
  - err: Error - occured error or null for success
  - feedback: Feedback - replied Feedback object

### <a name="operation9"></a> deleteFeedback(feedbackId, callback)

Deletes system feedback specified by its unique id.

**Arguments:** 
- feedbackId: string - unique feedback id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_rest"></a> FeedbacksRestClient class

FeedbacksRestClient is a client that implements HTTP/REST protocol

```javascript
class FeedbacksRestClient extends RestClient implements IFeedbacksClient {
    constructor(config: any);
    init(refs, callback);
    open(callback);
    close(callback);
    getFeedbacks(filter, paging, callback);
    getFeedbackById(feedbackId, callback);
    sendFeedback(feedback, user, callback);
    replyFeedback(feedbackId, reply, user, callback);
    deleteFeedback(feedbackId, callback);
}
```

**Constructor config properties:** 
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> FeedbacksSenecaClient class

FeedbacksSenecaClient is a client that implements Seneca protocol

```javascript
class FeedbacksSenecaClient extends SenecaClient implements IFeedbacksClient {
    constructor(config: any);        
    init(refs, callback);
    open(callback);
    close(callback);
    getFeedbacks(filter, paging, callback);
    getFeedbackById(feedbackId, callback);
    sendFeedback(feedback, user, callback);
    replyFeedback(feedbackId, reply, user, callback);
    deleteFeedback(feedbackId, callback);
}
```

**Constructor config properties:** 
- transport: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number
