import {supermemo} from 'supermemo'

import makeListDecks from './listDecks'
import makeListDeck from './listDeck'
import makePostDeck from './postDeck'
import makePostCards from './postCards'
import makePatchDeck from './patchDeck'
import makeRemoveDeck from './removeDeck'
import makeGradeCard from './gradeCard'

const listDecks = makeListDecks({})
const listDeck = makeListDeck({}) 
const postDeck = makePostDeck({})
const postCards = makePostCards({})
const patchDeck = makePatchDeck({})
const removeDeck = makeRemoveDeck({})
const gradeCard = makeGradeCard({ practice: supermemo })

export {
    listDecks,
    listDeck,
    postDeck,
    postCards,
    patchDeck,
    gradeCard,
    removeDeck,
}
