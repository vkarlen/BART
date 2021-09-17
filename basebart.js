const dialogflow = require('@google-cloud/dialogflow');
const { v4 } = require('uuid');
const Path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

require('dotenv').config();

// Create a DialogFlow Session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: Path.join(__dirname, 'server/routes/key.json'),
});
const sessionPath = sessionClient.projectAgentSessionPath(
  process.env.PROJECT_ID,
  v4()
);

// Send user input to DialogFlow
async function sendQuery(message) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(`Bart: ${result.fulfillmentText}`);

  prompt();
}

function prompt() {
  var arrow = '> ',
    length = arrow.length;
  rl.setPrompt(arrow, length);
  rl.prompt();
}

rl.on('line', function (input) {
  switch (input.trim().toLowerCase()) {
    case 'end':
    case 'close':
    case 'done':
      rl.close();
      break;
    default:
      sendQuery(input);
      break;
  }
}).on('close', function () {
  console.log('Have a great day!');
  process.exit(0);
});

// Trigger to start
console.log('Good to see you. Try typing stuff.');
prompt();
