/* eslint-disable operator-linebreak,no-case-declarations */
import axios from 'axios';

const baseUrl =
  'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/10YoTuamOqCvI4w6jz3l/books';

const ADD_BOOK = 'bookstore/books/ADD_BOOK';
const DELETE_BOOK = 'bookstore/books/DELETE_BOOK';
const FETCH_BOOKS = 'bookstore/books/FETCH_BOOKS';

const initialState = {
  books: {},
};

const addBook = (book) => ({
  type: ADD_BOOK,
  book,
});

const deleteBook = (id) => ({
  type: DELETE_BOOK,
  id,
});

const fetchBooks = (books) => ({
  type: FETCH_BOOKS,
  books,
});

export const deleteBookAsync = (id) => async (dispatch) => {
  await axios.delete(`${baseUrl}/${id}`);
  dispatch(deleteBook(id));
};

export const postBook = (book) => async (dispatch) => {
  try {
    await axios.post(baseUrl, book, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(addBook(book));
  } catch (error) {
    throw new Error(error);
  }
};

export const getBooks = () => async (dispatch) => {
  const response = await axios.get(baseUrl);
  dispatch(fetchBooks(response.data));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: {
          ...state.books,
          [action.book.item_id]: [action.book],
        },
      };
    case DELETE_BOOK:
      const { [action.id]: deleted, ...rest } = state.books;
      return {
        ...state,
        books: rest,
      };
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.books,
      };
    default:
      return state;
  }
};
