require('dotenv').config({path: '../.env'});
('use strict');

const projectId = process.env.projectId;
const location = process.env.location;
const agentId = process.env.agentId;

// console.log(projectId);
// console.log(location);
// console.log(agentId);

async function main(projectId, location, agentId) {
  const {IntentsClient} = require('@google-cloud/dialogflow-cx'); //original
  // const {SessionsClient} = require('@google-cloud/dialogflow-cx'); //tentativa

  const client = new IntentsClient({
    apiEndpoint: 'us-east1-dialogflow.googleapis.com',
  }); //original
  // const clientS = new SessionsClient({
  //   apiEndpoint: 'us-east1-dialogflow.googleapis.com',
  // });

  async function listIntents() {
    // problem happens here!!!
    const parent = client.agentPath(projectId, location, agentId);
    const [intents] = await client.listIntents({
      parent,
      pageSize: 100,
    });

    console.log('teste');

    intents.forEach(intent => {
      console.log('====================');
      console.log(`Intent name: ${intent.name}`);
      console.log(`Intent display name: ${intent.displayName}`);
      console.log(`# Parameters: ${intent.parameters.length}`);
      console.log(`# Training Phrases: ${intent.trainingPhrases.length}`);
    });
  }

  listIntents();
  // [END dialogflow_cx_list_intents]
}

// main(...process.argv.slice(2));
main(projectId, location, agentId);

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
