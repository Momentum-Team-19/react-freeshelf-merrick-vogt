1. const [expandedBooks, setExpandedBooks] = useState({});

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
}

State:

In React, each component can have its own "state", which is just information the component holds and can use to determine what it displays.
Here, the state is called expandedBooks. It is essentially a list that keeps track of which books are currently expanded (showing more details) and which are not.
Toggle Function:

toggleExpand is a function to open a book's details if they're currently closed or to close them if they're currently open.
Now, let's walk through the function step-by-step:

Step 1: We make a fresh copy of the current state (the list of which books are expanded and which are not).
- This is necessary because in React, you shouldn't modify state directly.

Step 2: We check if the clicked book is already expanded or not.
- The book's "name" (or title) is used to identify it in our list.
- If the book's name is in our list and marked as true, that means it's expanded. If it's marked as false or not in the list at all, it's not expanded.

Step 3: Based on the book's current state, we either expand it (if it was closed) or close it (if it was open). This is the "toggle" action.
- If the book was open (true), we set it to closed (false).
- If it was closed or not in the list at all, we add it to the list and mark it as open (true).

Step 4: After deciding whether to open or close the book, we update our component's state with the new list. React will then automatically make any necessary changes to what's displayed on the screen.

In a nutshell, the toggleExpand function is like a switch for a light bulb. When you click on a book, this function checks if the light (or book details) is currently on or off. If it's on, it turns it off. If it's off, it turns it on.

2. sorted.sort((a, b) => a.title.localeCompare(b.title));

This JS method sorts the books by title
    .sort is a method that takes in a sorting function as an argument
    .localeCompare is a method that compares two strings
        it returns a negative number if the string should come before the other
        it returns a positive number if the string should come after the other
        it returns 0 if the strings are the same
    .sort uses the negative, positive, or 0 value to sort the array
    The sorting function is called for each pair of elements in the array