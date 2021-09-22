const express = require('express');
const Dialogflow = require('@google-cloud/dialogflow');
const pool = require('../pools/pool');
const { v4 } = require('uuid');
const { WebhookClient } = require('dialogflow-fulfillment');
const Path = require('path');

require('dotenv').config();

const router = express.Router();

/*** POST ***/
router.post('/text-input', async (req, res) => {
  const { message } = req.body;

  const sessionClient = new Dialogflow.SessionsClient({
    keyFilename: Path.join(__dirname, 'key.json'),
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECT_ID,
    v4()
  );

  // DialogFlow request object
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-us',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    res.status(200).send(responses[0].queryResult);
  } catch (err) {
    res.status(422).send({ err });
  }
});

router.post('/voice-input', (req, res) => {
  res.status(200).send({ data: 'VOICE ENDPOINT CONNECTION SUCCESSFUL' });
});

// router.get('/', (req, res) => {
//   res.send('Server Is Working......');
// });

/**
 * on this route dialogflow send the webhook request
 * For the dialogflow we need POST Route.
 * */
router.post('/webhook', (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });
  console.log('REQ', req);

  // create intentMap for handle intent
  let intentMap = new Map();

  // add intent map 2nd parameter pass function
  intentMap.set('RandomFact', handleWebHookIntent);

  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});

function handleWebHookIntent(agent) {
  agent.add('Hello I am Webhook demo How are you...');
}

module.exports = router;
