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

  // Sends data from the agent as a response
  try {
    const responses = await sessionClient.detectIntent(request);
    res.status(200).send({ data: responses });
  } catch (e) {
    console.log(e);
    res.status(422).send({ e });
  }
});

router.post('/voice-input', (req, res) => {
  res.status(200).send({ data: 'VOICE ENDPOINT CONNECTION SUCCESSFUL' });
});

module.exports = router;
