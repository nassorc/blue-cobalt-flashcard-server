import {deckService} from './deck-usecases'
import httpStatus from '../../config/httpStatus'
import createResponse from '../../lib/createResponse'
import { generateId } from '../../utils/utils'

export async function getOneDeckHandler(httpRequest) {
    const deckList = await deckService.getOneFlashcardDeck(httpRequest.params.id)
    return createResponse(httpStatus.SUCCESS, {deckList})
}

export async function getManyDecksHandler(httpRequest) {
    const deckList = await deckService.getAllFlashcardDecks(httpRequest.params.id)
    return createResponse(httpStatus.SUCCESS, {deckList})
}

export async function addDeckHandler(httpRequest) {
    let newDeck = httpRequest.body.details;
    newDeck.owner = httpRequest.user.id;

    const response = await deckService.createNewFlashcardDeck(newDeck)

    return createResponse(httpStatus.CREATED, response)
}

export async function updateDeckHandler(httpRequest) {
  await deckService.updateDeck(httpRequest.params.id, httpRequest.body.details)
  return createResponse(httpStatus.SUCCESS, {message:'updated'})
}

export async function deleteDeckHandler(httpRequest) {
    await deckService.removeDeck(httpRequest.params.id)
    createResponse(httpStatus.SUCCESS, {message:'deck deleted'})
}

export async function gradeCardHandler(httpRequest) {
  await deckService.gradeCard(httpRequest.body.userId, httpRequest.body.cardId, httpRequest.body.grade);
  return createResponse(httpStatus.SUCCESS, {message:'card graded'})
}

export async function addCardsHandler(httpRequest) {
    await deckService.addNewFlashcard(httpRequest?.body?.deckId, httpRequest?.body?.cards)
    return createResponse(httpStatus.SUCCESS, {message: 'card added'})
}
