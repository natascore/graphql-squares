import { pubsub } from '../pubsub'

const SEAT_CHANGED_TOPIC = 'seat_changed'
const SEAT_ADDED_TOPIC = 'seat_added'

export default {
  Query: {
    getSeat: (parent, { id }, { models }) => models.Seat.findOne({ where: { id } }),
    allSeats: (parent, args, { models }) => models.Seat.findAll({ order: models.sequelize.col('id') }),
  },
  Mutation: {
    createSeat: async (partent, args, { models }) => {
      const seat = await models.Seat.create(args)
      pubsub.publish(SEAT_ADDED_TOPIC, { seatAdded: seat })
      return seat
    },
    updateSeat: async (parent, { id, status }, { models }) => {
      pubsub.publish(SEAT_CHANGED_TOPIC, { seatChanged: { id, status } })
      await models.Seat.update({ status }, { where: { id } } )
      return models.Seat.findOne({ where: { id } } )
    }
  },
  Subscription: {
    seatChanged : {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator(SEAT_CHANGED_TOPIC),
    },
    seatAdded : {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator(SEAT_ADDED_TOPIC),
    }
  },
}