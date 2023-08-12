import makeGetDecks from './getDecksController'
import makeGetDeck from './getDeckController'
import makeAddDeck from './addDeckController'
import makeAddCards from './addCardsController'
import makePostGradeCard from './postGradeCardController'
import makeUpdateDeck from './updateDeckController'
import makeDeleteDeck from './deleteDeckController'
import { 
  listDecks, 
  listDeck, 
  postDeck, 
  postCards, 
  patchDeck, 
  gradeCard, 
  removeDeck 
} from '../usecase'

const getDecks = makeGetDecks({ listDecks })
const getDeck = makeGetDeck({ listDeck })
const addDeck = makeAddDeck({ postDeck })
const addCards = makeAddCards({ postCards })
const updateDeck = makeUpdateDeck({ patchDeck })
const deleteDeck = makeDeleteDeck({ removeDeck })
const postGradeCard = makePostGradeCard({ gradeCard })

export {
    getDecks,
    getDeck,
    addDeck,
    addCards,
    updateDeck,
    deleteDeck,
    postGradeCard,
}