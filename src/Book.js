import React, { useState, useEffect } from 'react';
import booksData from './book-data.json'; 
// booksData is an arbitrary name for the imported data
// the json file is an array of objects where each object is a book with its properties

// Arrow function for Books component
const Books = () => {

    // Create a state variable to keep track of which books are expanded
    // This is initialized as an empty object (no books are expanded)
    // The setExpandedBooks function is used to update the state variable
    const [expandedBooks, setExpandedBooks] = useState({});

    // Create a state variable to keep track of the sorting option
    const [sortOption, setSortOption] = useState('title');
    // Create a state variable to keep track of the sorted books 
    const [sortedBooks, setSortedBooks] = useState([]); 

    useEffect(() => {
        let sorted = [...booksData];
        switch (sortOption) {
          case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'author':
            sorted.sort((a, b) => a.author.localeCompare(b.author));
            break;
          case 'oldest':
            sorted.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
            break;
          case 'newest':
            sorted.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
            break;
          default:
            break;
        }
        setSortedBooks(sorted);
      }, [sortOption]);


    // Function to toggle a book's expanded state
    // This function takes in the index of the book that was clicked
    // The index is the key of the expandedBooks object
    // A boolean is the value of the expandedBooks object

    const toggleExpand = (book) => {
        // Step 1: Make a copy of the existing 'expandedBooks' state.
        // Spread operator (...) creates a new object with same key-value pairs
        let newExpandedBooks = {...expandedBooks};
        
        // Step 2: Check if the book is already expanded.
        // The key is the book's title and the value is a boolean whether it is expanded or not
        const isExpanded = expandedBooks[book.title];
        
        // Step 3: Toggle the expansion status.
        if (isExpanded) {
          newExpandedBooks[book.title] = false;
        } else {
          newExpandedBooks[book.title] = true;
        }
      
        // Step 4: Update the state with the new object.
        setExpandedBooks(newExpandedBooks);
      };

        
      
    // Return the JSX for the Books component
    return (
        <div>
            {/* Dropdown menu */}
            <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="oldest">Sort by Oldest Publication</option>
                <option value="newest">Sort by Newest Publication</option>
            </select>

            {/* 
            The map method is used to iterate over the array of objects. 
            This map method returns a new array with the JSX elements. 
            Each div needs a unique key prop. We can use book's index of the json array.
            */}

            {sortedBooks.map((book, index) => (
                <div key={book.title}>
                    <img src={book.coverImageUrl} alt={book.title} width="100" />
                    <h2>{book.title}</h2>
                    <h3>Author: {book.author}</h3>
                    <p>{book.shortDescription}</p>

                    {/* More Information Button */}
                    <p>
                    <button
                    onClick={() => toggleExpand(book)}
                    aria-expanded={expandedBooks[book.title] || false}
                    >
                    More Information
                    </button>
                    </p>

                    {/* Conditional Rendering */}
                    {expandedBooks[book.title] && (
                    <div>
                        <p>Publisher: {book.publisher}</p>
                        <p>Publication Date: {book.publicationDate}</p>
                        <p>{book.detailedDescription}</p>
                        <a href={book.url}>Link to Book</a>
                    </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Books;
