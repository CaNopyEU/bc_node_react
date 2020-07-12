// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'

// App Imports
import ParentType from '../type'
import {create, remove, update} from '../resolvers'

// Parent create
export const createParent = {
  type: ParentType,
  args: {
    first_name: {
      name: 'first_name',
      type: GraphQLString
    },
    last_name: {
      name: 'last_name',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
    title_before: {
      name: 'title_before',
      type: GraphQLString
    },
    title_after: {
      name: 'title_after',
      type: GraphQLString
    }
  },
  resolve: create
}

// Parent create
export const updateParent = {
  type: ParentType,
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
    email: {
      name: 'email',
      type: GraphQLString
    },
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
    title_before: {
      name: 'title_before',
      type: GraphQLString
    },
    title_after: {
      name: 'title_after',
      type: GraphQLString
    }
  },
  resolve: update
}

// Parent remove
export const deleteParent = {
  type: ParentType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}