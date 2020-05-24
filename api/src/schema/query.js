// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as thought from './thoughts/fields/query'
import * as lecture from './lectures/fields/query'
import * as oneClass from './classes/fields/query'
import * as grade from './grades/fields/query'
import * as user from './users/fields/query'
import * as homework from './homeworks/fields/query'

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: '...',

  fields: () => ({
    ...thought,
    ...lecture,
    ...oneClass,
    ...grade,
    ...user,
    ...homework
  })
})

export default query