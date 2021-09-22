const express = require('express');
const axios = require('axios');
const Dialogflow = require('@google-cloud/dialogflow');
const pool = require('../pools/pool');
const { v4 } = require('uuid');
const { WebhookClient } = require('dialogflow-fulfillment');
const Path = require('path');

require('dotenv').config();

const router = express.Router();
const sessionClient = new Dialogflow.SessionsClient({
  keyFilename: Path.join(__dirname, 'key.json'),
});

const sessionPath = sessionClient.projectAgentSessionPath(
  process.env.PROJECT_ID,
  v4()
);

/*** POST ***/
router.post('/text-input', async (req, res) => {
  const { message } = req.body;
  console.log(message);

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

router.post('/webhook', (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });

  // create intentMap for handle intent
  let intentMap = new Map();

  // add intent map 2nd parameter pass function
  intentMap.set('RandomFact', handleRandomFact);

  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});

async function handleRandomFact(agent) {
  await axios
    .get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then((apiRes) => {
      return agent.add(apiRes.data.text);
    })
    .catch((err) => {
      return agent.add(
        "Uh oh! Seems I'm having some trouble right now. Ask me again later?"
      );
    });
}

module.exports = { router, sessionClient, sessionPath };
