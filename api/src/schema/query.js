// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as lecture from './lectures/fields/query'
import * as oneClass from './classes/fields/query'
import * as grade from './grades/fields/query'
import * as user from './users/fields/query'
import * as homework from './homeworks/fields/query'
import * as teacher from './teachers/fields/query'
import * as student from './students/fields/query'
import * as record from './records/fields/query'
import * as parent from './parents/fields/query'
import * as group from './groups/fields/query'
import * as attendance from './attendances/fields/query'
import * as group_lecture from './groups_lectures/fields/query'
import * as teacher_lecture from './teachers_lectures/fields/query'
import * as teacher_group from './teachers_groups/fields/query'

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: '...',

  fields: () => ({
    ...lecture,
    ...oneClass,
    ...grade,
    ...user,
    ...homework,
    ...teacher,
    ...student,
    ...record,
    ...parent,
    ...group,
    ...attendance,
    ...group_lecture,
    ...teacher_lecture,
    ...teacher_group
  })
})

export default query