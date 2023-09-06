import React, { useState } from 'react';
import booksData from './book-data.json'; 
// booksData is an arbitrary name for the imported data
// the json file is an array of objects where each object is a book with its properties

// Arrow function for Books component
const Books = () => {

    // Create a state variable to keep track of which books are expanded
    // This is initialized as an empty object (no books are expanded)
    // The setExpandedBooks function is used to update the state variable
    const [expandedBooks, setExpandedBooks] = useState({});

    // Function to toggle a book's expanded state
    // This function takes in the index of the book that was clicked
    // The index is the key of the expandedBooks object
    // A boolean is the value of the expandedBooks object

    const toggleExpand = (index) => {
        // Step 1: Make a copy of the existing 'expandedBooks' state.
        // Spread operator (...) creates a new object with same key-value pairs
        let newExpandedBooks = {...expandedBooks};
        
        // Step 2: Check if the book at the given index is already expanded.
        const isExpanded = expandedBooks[index];
        
        // Step 3: Toggle the expansion status.
        if (isExpanded) {
          newExpandedBooks[index] = false;
        } else {
          newExpandedBooks[index] = true;
        }
      
        // Step 4: Update the state with the new object.
        setExpandedBooks(newExpandedBooks);
      };
      
    // Return the JSX for the Books component
    return (
        <div>
            {/* 
            The map method is used to iterate over the array of objects. 
            This map method returns a new array with the JSX elements. 
            Each div needs a unique key prop. We can use book's index of the json array.
            */}

            {booksData.map((book, index) => (
                <div key={index}>
                    <img src={book.coverImageUrl} alt={book.title} width="100" />
                    <h2>{book.title}</h2>
                    <h3>Author: {book.author}</h3>
                    <p>{book.shortDescription}</p>

                    {/* More Information Button */}
                    <p>
                    <button
                    onClick={() => toggleExpand(index)}
                    aria-expanded={expandedBooks[index] || false}
                    >
                    More Information
                    </button>
                    </p>

                    {/* Conditional Rendering */}
                    {expandedBooks[index] && (
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
