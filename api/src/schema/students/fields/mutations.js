// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'

// App Imports
import {create, remove, update} from '../resolvers'
import StudentType from "../type";

// Student create
export const createStudent = {
  type: StudentType,
  args: {
    first_name: {
      name: 'first_name',
      type: GraphQLString
    },
    last_name: {
      name: 'password',
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
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    desc: {
      name: 'desc',
      type: GraphQLString
    },
    userId: {
      name: 'userId',
      type: GraphQLInt
    },
    parentId: {
      name: 'parentId',
      type: GraphQLInt
    },
    classId: {
      name: 'classId',
      type: GraphQLInt
    },
  },
  resolve: create
}

// Student update
export const updateStudent = {
  type: StudentType,
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
      name: 'password',
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
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    desc: {
      name: 'desc',
      type: GraphQLString
    },
    parentId: {
      name: 'parentId',
      type: GraphQLInt
    },
    classId: {
      name: 'classId',
      type: GraphQLInt
    },
  },
  resolve: update
}

// Student remove
export const removeStudent = {
  type: StudentType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}