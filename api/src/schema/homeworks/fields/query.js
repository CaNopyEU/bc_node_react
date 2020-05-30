// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import HomeworkType from '../type'
import {getAll, getById} from '../resolvers'

// Homeworks All
export const homeworks = {
  type: new GraphQLList(HomeworkType),
  resolve: getAll
}

// Homework By ID
export const homework = {
  type: HomeworkType,
  args: {
    id: {type: GraphQLInt},
  },
  resolve: getById
}