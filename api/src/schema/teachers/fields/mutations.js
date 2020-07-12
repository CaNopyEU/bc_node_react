// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from 'graphql'

// App Imports
import {create, remove, update} from '../resolvers'
import TeacherType from "../type";

// User create
export const createTeacher = {
  type: TeacherType,
  args: {
    first_name: {
      name: 'first_name',
      type: GraphQLString
    },
    last_name: {
      name: 'last_name',
      type: GraphQLString
    },
    title_before: {
      name: 'title_before',
      type: GraphQLString
    },
    title_after: {
      name: 'title_after',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    city: {
      name: 'city',
      type: GraphQLString
    },
    street: {
      name: 'street',
      type: GraphQLString
    },
    street_num: {
      name: 'street_num',
      type: GraphQLFloat
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    main_teacher: {
      name: 'main_teacher',
      type: GraphQLBoolean
    },
    userId: {
      name: 'userId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// User create
export const updateTeacher = {
  type: TeacherType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    first_name: {
      name: 'first_name',
      type: GraphQLString
    },
    last_name: {
      name: 'last_name',
      type: GraphQLString
    },
    title_before: {
      name: 'title_before',
      type: GraphQLString
    },
    title_after: {
      name: 'title_after',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    city: {
      name: 'city',
      type: GraphQLString
    },
    street: {
      name: 'street',
      type: GraphQLString
    },
    street_num: {
      name: 'street_num',
      type: GraphQLFloat
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    main_teacher: {
      name: 'main_teacher',
      type: GraphQLBoolean
    }
  },
  resolve: update
}

// Teacher remove
export const deleteTeacher = {
  type: TeacherType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}