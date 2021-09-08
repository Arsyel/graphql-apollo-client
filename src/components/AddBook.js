import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/Queries";

export const AddBook = () => {
  const {loading, data, error} = useQuery(getAuthorsQuery);
  const [addBook, {loading: loadingAddBook, error: errorAddBook}] = useMutation(addBookMutation, {
    onError: (err) => console.log("Err detail:", err)
  });
  const [bookForm, setBookForm] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  useEffect(() => {
    if (!loadingAddBook && !errorAddBook) {
      clearFormInput();
    }
    if (errorAddBook) {
      alert("Something went wrong!");
    }
  }, [loadingAddBook, errorAddBook]);

  const displayAuthors = useCallback(() => {
    if (loading) return (<option disabled>Loading authors...</option>);
    if (error) {
      return null;
    }

    const { authors } = data;
    return authors.map(({id, name}) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  }, [data, error, loading]);

  const clearFormInput = () => {
    setBookForm({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: bookForm,
      refetchQueries: [{ query: getBooksQuery }],
      // awaitRefetchQueries: true,
    });
  };

  const handleChangeFormInput = (value) => {
    setBookForm({
      ...bookForm,
      ...value
    });
  };

  return (
    <form className="padding-bottom" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          required
          onChange={(e) => handleChangeFormInput({name: e.target.value})}
          value={bookForm.name}
        />
      </div>

      <div>
        <label>Genre:</label>
        <input
          required
          onChange={(e) => handleChangeFormInput({genre: e.target.value})}
          value={bookForm.genre}
        />
      </div>

      <div>
        <label>Author:</label>
        <select
          required
          onChange={(e) => handleChangeFormInput({authorId: e.target.value})}
          value={bookForm.authorId}
        >
          <option value="">Select author</option>
          { displayAuthors() }
        </select>
      </div>

      {
        loadingAddBook
        ? <p>Loading...</p>
        : <button type="submit">Submit</button>
      }
    </form>
  );
}