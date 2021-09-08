import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/Queries";

export const Books = ({ onClickBook }) => {
  const { loading, data, error, refetch } = useQuery(getBooksQuery);

  if (loading) return (<p>Loading...</p>);
  if (error) {
    console.log("Seek err::", error);
    return (<p>Something went wrong!</p>);
  }

  const { books } = data;

  return (
    <div className="padding-bottom">
      <ul>
        {
          books.map(({id, name, isStarred}) => (
            <li
              style={{ cursor: "pointer" }}
              key={id}
              onClick={() => (onClickBook) && onClickBook(id)}
            >
              {name}
            </li>
          ))
        }
      </ul>
      <button
        onClick={() => refetch()}
      >
        Refresh book list
      </button>
    </div>
  );
}