const express = require('express');
const pool = require('../pools/pool');
const { WebhookClient } = require('dialogflow-fulfillment');

const router = express.Router();

/*** GET ROUTE ***/
router.get('/', (req, res) => {
  res.send('Server Is Working......');
});

/**
 * on this route dialogflow send the webhook request
 * For the dialogflow we need POST Route.
 * */

router.post('/webhook', (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });
  // create intentMap for handle intent
  let intentMap = new Map();
  // add intent map 2nd parameter pass function
  intentMap.set('webhook-demo', handleWebHookIntent);
  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});

function handleWebHookIntent(agent) {
  agent.add('Hello I am Webhook demo How are you...');
}

module.exports = router;
