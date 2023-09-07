import React, { useState, useEffect, useRef } from 'react';
import blankBookImage from './blank-book.jpg';


// booksData is an arbitrary name for the imported data
// the json file is an array of objects where each object is a book with its properties
import booksData from './book-data.json'; 

// Import the SearchComponent for the dropdown sort option and search bar
import SearchComponent from './SearchComponent';

// Import the ViewToggle for the view toggle button
import ViewToggle from './ViewToggle';


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
    
    // Create a state variable to keep track of the query
    const [searchQuery, setSearchQuery] = useState('');
    
    // Create a state variable to keep track of the view
    const [view, setView] = useState('list');  // Default to list view

    // Create a state variable to keep track of the image error
    const [imageError, setImageError] = useState({});


    useEffect(() => {
        let sorted = [...booksData];

        // Filtering based on search query
        if (searchQuery) {
            sorted = sorted.filter(
            book => 
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sorting based on dropdown sort option
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
    }, [sortOption, searchQuery]);

    const handleImageError = (bookTitle) => {
        setImageError((prevErrors) => {
            return { ...prevErrors, [bookTitle]: true };
        });
    };
      

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

        // Assume bookRef is the ref attached to your book component
        if (bookRef && bookRef.current) {
            bookRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
      };

    // In your component body
    const bookRef = useRef(null);
      
    // Return the JSX for the Books component
    return (
        <div className="container my-5 text-center">
            <h1 className="display-4 mb-4">Book Library</h1>

            <ViewToggle view={view} setView={setView} />

            <SearchComponent 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    {sortedBooks.map((book) => (
                        <div key={book.title} className={`book-content ${view === 'grid' ? 'col-md-4' : 'col-md-12'}`}>
                            <div className={`book-content ${view === 'list' ? 'list-view' : 'grid-view'}`}>
                                {imageError[book.title] ? (
                                    <div className="fallback-image">
                                        <img src={blankBookImage} alt="Fallback" />
                                        <span className="fallback-title">{book.title}</span>
                                    </div>
                                    ) : (
                                    <img
                                        src={book.coverImageUrl}
                                        alt={book.title}
                                        onError={() => handleImageError(book.title)}
                                    />
                                )}
                                <div ref={bookRef} className="book-info">
                                    <h2 className="mt-3">{book.title}</h2>
                                    <h3>Author: {book.author}</h3>
                                    <p>{book.shortDescription}</p>

                                    <button
                                        onClick={() => toggleExpand(book)}
                                        aria-expanded={expandedBooks[book.title] || false}
                                        className="btn btn-primary"
                                    >
                                    {expandedBooks[book.title] ? "Less Information" : "More Information"}
                                    </button>

                                    {expandedBooks[book.title] && (
                                    <div className="mt-3">
                                        <p>Publisher: {book.publisher ? book.publisher : 'Not Available'}</p>
                                        <p>Publication Date: {book.publicationDate ? book.publicationDate : 'Not Available'}</p>
                                        <p>{book.detailedDescription}</p>
                                        <a href={book.url} className="btn btn-secondary">Link to Book</a>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div> 
    );
};

export default Books;
