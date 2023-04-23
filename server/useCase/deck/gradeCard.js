// log 
// (1) DB interval and repetition not changing. efactor seems fine, but stops changing after
//     calling function multiple times.
//     (solution): wrong default value. corrected default value specified in docs
// (2) need logic to update review list. Review list is used for the reviewing process not
//     the cardlist.
//     review list is sorted by due date (current solution), and harder cards come up first
//  


const Deck = require('../../models/Deck');
// receives card Id and grade
const makeGradeCard = ({ practice }) => async ({ userId, cardId, grade } = {}) => {
    try {
        const foundDeck = await Deck.findOne(
            { owner: userId, 'cards._id': cardId },
            { cards: { $elemMatch: { _id: cardId } } }
        );
        const card = foundDeck.cards[0]
        const stats = {
            interval: card.interval,
            repetition: card.repetition,
            efactor: card.efactor,
            status: card.status,
        }
        // set card to reviewed if interval goes up
        // get retquired data to compute new due date
        const { interval, repetition, efactor } = practice(stats, grade)
        const reviewedDate = new Date();
        let date = new Date();
        let dueDate = new Date();
        dueDate.setDate(date.getDate() + interval)

        if(stats.status === 'new') {
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

        

        // update review list

        // return response
    }
    catch(err) {
        throw new Error(err)
    }
}

module.exports = makeGradeCard