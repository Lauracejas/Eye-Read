// handle API call to google books.
const searchBooks = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({ search: searchInput.value }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
};

document.querySelector("#booksearch").addEventListener("click", searchBooks);
