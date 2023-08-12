// log 
// (1) DB interval and repetition not changing. efactor seems fine, but stops changing after
//     calling function multiple times.
//     (solution): wrong default value. corrected default value specified in docs
// (2) need logic to update review list. Review list is used for the reviewing process not
//     the cardlist.
//     review list is sorted by due date (current solution), and harder cards come up first
//  


import Deck from '../Deck'
// receives card Id and grade
const makeGradeCard = ({ practice }) => async ({ userId, cardId, grade }) => {
    try {
        const foundDeck = await Deck.findOne(
            { owner: userId, 'cards._id': cardId },
            { cards: { $elemMatch: { _id: cardId } } }
        );
        // extract data to update due data  
        const card = foundDeck.cards[0]
        const stats = {
            interval: card.interval,
            repetition: card.repetition,
            efactor: card.efactor,
            status: card.status,
        }
        // insert data to algorithm
        const { interval, repetition, efactor } = practice(stats, grade)
        const reviewedDate = new Date();
        let date = new Date();
        let dueDate = new Date();
        // set new due date
        dueDate.setDate(date.getDate() + interval)

        // if card type is new, set to reviewed
        if(stats.status === 'new' && interval > 0) {
            // update data
            await Deck.findOneAndUpdate(
                { owner: userId, 'cards._id': cardId },
                { 
                    $set: { 
                        'cards.$.interval': interval, 'cards.$.repetition': repetition, 'cards.$.efactor': efactor, 'cards.$.status': 'reviewed', 'cards.$.reviewedDate': reviewedDate.toISOString(), 'cards.$.dueDate': dueDate.toISOString()
                    },
                    $push: { reviewList: cardId }
                }
            )
        }
        else {
            // update data
            await Deck.findOneAndUpdate(
                { owner: userId, 'cards._id': cardId },
                { $set: { 'cards.$.interval': interval, 'cards.$.repetition': repetition, 'cards.$.efactor': efactor, 'cards.$.reviewedDate': reviewedDate.toISOString(), 'cards.$.dueDate': dueDate.toISOString()} }
            )
        }
    }
    catch(err) {
        throw new Error(err)
    }
}

export default makeGradeCard