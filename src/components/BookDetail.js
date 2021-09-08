import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/Queries";

export const BookDetail = ({ id }) => {
  const { loading, data, error } = useQuery(getBookQuery, {
    variables: { id }
  });

  if (!id) return (<p>Select the book above</p>)

  if (loading) return (<p>Loading book detail...</p>);
  if (error) {
    console.log("Err:", error);
    return (<p>Something went wrong!</p>)
  }

  const { book } = data;

  return (
    <>
      <h4>{book.name}</h4>
      by {book.author.name} ({book.genre})
    </>
  );
}