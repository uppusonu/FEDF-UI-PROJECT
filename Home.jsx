import { useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Python Programming",
      author: "John Smith",
      status: "Available",
    },
    {
      id: 2,
      title: "Data Structures",
      author: "David Lee",
      status: "Issued",
    },
    {
      id: 3,
      title: "Machine Learning",
      author: "Sarah Wilson",
      status: "Available",
    },
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function addBook() {
    if (!title || !author) return;

    setBooks([
      ...books,
      {
        id: Date.now(),
        title,
        author,
        status: "Available",
      },
    ]);

    setTitle("");
    setAuthor("");
  }

  function deleteBook(id) {
    setBooks(books.filter((b) => b.id !== id));
  }

  function toggleStatus(id) {
    setBooks(
      books.map((b) =>
        b.id === id
          ? {
              ...b,
              status:
                b.status === "Available" ? "Issued" : "Available",
            }
          : b
      )
    );
  }

  const filtered = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ? true : book.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="container">
      <nav className="navbar">
        <h2>📚 Library Management System</h2>
      </nav>

      <section className="hero">
        <h1>Digital Library Dashboard</h1>
        <p>Manage books efficiently.</p>
      </section>

      <div className="cards">
        <div className="card">
          <h2>{books.length}</h2>
          <p>Total Books</p>
        </div>

        <div className="card">
          <h2>
            {
              books.filter((b) => b.status === "Available")
                .length
            }
          </h2>
          <p>Available</p>
        </div>

        <div className="card">
          <h2>
            {
              books.filter((b) => b.status === "Issued")
                .length
            }
          </h2>
          <p>Issued</p>
        </div>
      </div>

      <div className="controls">
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Available")}>
          Available
        </button>

        <button onClick={() => setFilter("Issued")}>
          Issued
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>

              <td>{book.status}</td>

              <td>
                <button
                  onClick={() => toggleStatus(book.id)}
                >
                  {book.status === "Available"
                    ? "Issue"
                    : "Return"}
                </button>

                <button
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}