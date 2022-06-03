import React from 'react';
import Book from './Book';
import AddBook from './AddBook';

const Books = () => {
  const books = [
    {
      title: '1000 Years of Joys and Sorrows',
      author: 'Ai Weiwei',
      id: 1,
    },
    {
      title: 'Road to Memphis',
      author: 'Mildred D. Taylor',
      id: 2,
    },
    {
      title: 'Silas Marner',
      author: 'George Eliot',
      id: 3,
    },
  ];
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} title={book.title} author={book.author} id={book.id} />
      ))}
      <AddBook />
    </div>
  );
};

export default Books;
