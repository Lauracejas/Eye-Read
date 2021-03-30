
const searchBooks = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  location.replace(`/search/${searchInput}`);
};

const renderAllBooks = async (volumeData) => {

  const getBooks = document.querySelector(".getBook");
  const response = await fetch(`/api/books`, {
    method: 'POST',
    body: JSON.stringify({ volumeData }),
    headers: {
      'Content-Type': 'application/json',
    },
  }); 
  
}

const addHaveRead = async (id, read) => {
 
    const response = await fetch(`/api/books/past`, {
      method: 'POST',
      body: JSON.stringify({ id, read}),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 
    if (response.ok) {
      
    }

};


document.querySelector("#booksearch").addEventListener("click", searchBooks);

document.querySelector('body').addEventListener('click', event => {
  if (event.target.matches('.btn-haveRead')) {
    alert('This book has been added to your list!');
    addHaveRead(event.target.getAttribute('data-bookId'), true);
  }
  else if (event.target.matches('.btn-wantRead')) {
    alert('This book has been added to your list!');
    addHaveRead(event.target.getAttribute('data-wantbookId'), false);
  }
})


