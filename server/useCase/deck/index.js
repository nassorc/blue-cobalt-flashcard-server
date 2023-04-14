const language = require('@google-cloud/language')
const path = require('path')
const {supermemo} = require('supermemo')

const makeListDeck = require('./listDeck')
const makePostDeck = require('./postDeck')
const makePostCards = require('./postCards')
const makePatchDeck = require('./patchDeck')
const makeGradeCard = require('./gradeCard')

// async function buildDeck(text) {
//     const configuration = new Configuration({
//         apiKey: process.env.OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     try {
//         const completion = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [{role: "user", content: "Hello world"}],
//         });
//         console.log(completion.data.choices[0].message);   
//     }
//     catch(err) {
//         throw new Error(err.message)
//     }

// }

// const credentials = require('./blue-cobalt-377922-842cadf535f9.json')
// async function buildDeck1(text) {
//     // Creates a client
//     console.log(text)
//     const client = new language.LanguageServiceClient({
//         credentials: credentials
//     });

//     // Prepares a document, representing the provided text
//     const document = {
//         content: text,
//         type: 'PLAIN_TEXT',
//     };

//     // const [analysis] = await client.analyzeSyntax({
//     //     document: {
//     //         content: text,
//     //         type: 'PLAIN_TEXT'
//     //     }
//     // }) 
//     // console.log(analysis.tokens[0].text)
//     // console.log(analysis.tokens[0].partOfSpeech)
//     // console.log(analysis.tokens[0].dependencyEdge)

//     // 1============
//     // // Detects entities in the document
//     // const [result] = await client.analyzeEntities({document});

//     // const entities = result.entities;

//     // console.log('Entities:');
//     // entities.forEach(entity => {
//     //     console.log(entity.name);
//     //     console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
//     //     if (entity.metadata && entity.metadata.wikipedia_url) {
//     //         console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
//     //     }
//     // });

//     // 2==============
//     // Need to specify an encodingType to receive word offsets
//     const encodingType = 'UTF8';

//     // Detects the sentiment of the document
//     const [syntax] = await client.analyzeSyntax({document, encodingType});

//     console.log('Tokens:');
//     syntax.tokens.forEach(part => {
//     console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
//     console.log('Morphology:', part.partOfSpeech);
//     });
// }


const listDeck = makeListDeck({})
const postDeck = makePostDeck({})
const postCards = makePostCards({})
const patchDeck = makePatchDeck({})
const gradeCard = makeGradeCard({ practice: supermemo })
module.exports = {
    listDeck,
    postDeck,
    postCards,
    patchDeck,
    gradeCard,
}