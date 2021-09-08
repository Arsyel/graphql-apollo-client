import gql from "graphql-tag";

export const getBooksQuery = gql`
  query GetBooks {
    books {
      id
      name
    }
  }
`;

export const getBookQuery = gql`
  query GetBook ($id: ID!) {
    book (id: $id) {
      name
      genre
      author {
        name
      }
    }
  }
`;

export const getAuthorsQuery = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

export const addBookMutation = gql`
  mutation AddBook ($name: String!, $genre: String!, $authorId: ID!) {
    addBook (name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;