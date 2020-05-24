// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as thought from './thoughts/fields/mutations'
import * as lecture from './lectures/fields/mutations'
import * as oneClass from './classes/fields/mutations'
import * as grade from './grades/fields/mutations'
import * as user from './users/fields/mutations'
import * as homework from './homeworks/fields/mutations'

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: '...',

  fields: {
    ...thought,
    ...lecture,
    ...oneClass,
    ...grade,
    ...user,
    ...homework
  }
})

export default mutation
