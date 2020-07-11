// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as lecture from './lectures/fields/mutations'
import * as oneClass from './classes/fields/mutations'
import * as grade from './grades/fields/mutations'
import * as user from './users/fields/mutations'
import * as homework from './homeworks/fields/mutations'
import * as teacher from './teachers/fields/mutations'
import * as student from './students/fields/mutations'
import * as record from './records/fields/mutations'
import * as parent from './parents/fields/mutations'
import * as group from './groups/fields/mutations'
import * as attendance from './attendances/fields/mutations'
import * as group_lecture from './groups_lectures/fields/mutations'
import * as teacher_lecture from './teachers_lectures/fields/mutations'
import * as teacher_group from './teachers_groups/fields/mutations'
import * as student_group from './students_groups/fields/mutations'

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: '...',

  fields: {
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
    ...teacher_group,
    ...student_group,
  }
})

export default mutation
