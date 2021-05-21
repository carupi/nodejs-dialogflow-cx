require('dotenv').config({path: '../.env'});
('use strict');

const projectId = process.env.projectId;
const location = process.env.location;
const agentId = process.env.agentId;

console.log(projectId);
console.log(location);
console.log(agentId);

async function main(projectId, location, agentId) {
  const {IntentsClient} = require('@google-cloud/dialogflow-cx');

  // const client = new SessionsClient({
  //   apiEndpoint: 'us-east1-dialogflow.googleapis.com',
  // });

  const client = new IntentsClient();
  console.log(client);

  async function listIntents() {
    // problem happens here!!!
    const parent = client.agentPath(projectId, location, agentId);
    console.info(parent);

    const [intents] = await client.listIntents({
      parent,
      pageSize: 100,
    });
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

main(...process.argv.slice(2));
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
