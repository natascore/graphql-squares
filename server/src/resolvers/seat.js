import { pubsub } from '../pubsub'

const SEAT_CHANGED_TOPIC = 'seat_changed'

export default {
  Query: {
    getSeat: (parent, { id }, { models }) => models.Seat.findOne({ where: { id } }),
    allSeats: (parent, args, { models }) => models.Seat.findAll(),
  },
  Mutation: {
    createSeat: (partent, args, { models }) => {
      return models.Seat.create(args)
    },
    updateSeat: async (parent, { id, status }, { models }) => {
      pubsub.publish(SEAT_CHANGED_TOPIC, { seatChanged: { id, status } })
      const test = await models.Seat.update({ status }, { where: { id } } )
      return models.Seat.findOne({ where: { id }})
    }
  },
  Subscription: {
    seatChanged : {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator(SEAT_CHANGED_TOPIC),
    },
  },
}