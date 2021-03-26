// handle API call to google books. 
const searchBooks = async (event) => {
    event.preventDefault();
    alert('foo');
};


document
    .querySelector('#booksearch')
    .addEventListener('click', searchBooks);