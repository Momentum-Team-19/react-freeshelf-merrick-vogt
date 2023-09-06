sorted.sort((a, b) => a.title.localeCompare(b.title));

This JS method sorts the books by title
    .sort is a method that takes in a sorting function as an argument
    .localeCompare is a method that compares two strings
        it returns a negative number if the string should come before the other
        it returns a positive number if the string should come after the other
        it returns 0 if the strings are the same
    .sort uses the negative, positive, or 0 value to sort the array
    The sorting function is called for each pair of elements in the array