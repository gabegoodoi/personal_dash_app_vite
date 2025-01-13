import { gql } from 'urql';

export const CREATE_POST = gql`
    mutation ($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`;

export const UPDATE_POST = gql`
    mutation ($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
            id
            title
            body
        }
    }
`;

export const DELETE_POST = gql `
    mutation ($id: ID!) {
        deletePost(id: $id)
    }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodoStatus($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;