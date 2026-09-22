import type { Book } from './book';

export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      availableCopies: 5,
      totalCopies: 5,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      availableCopies: 3,
      totalCopies: 3,
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      availableCopies: 0,
      totalCopies: 2,
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): boolean {
    if (book) {

      // ajouter suite au test => 1. L'ajout d'un livre sans titre ne doit pas fonctionner
      if (!book.title || book.title === "") {
        return false;
      }

      // ajouter suite au test => 2. L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
      if (book.totalCopies <= 0) {
        return false;
      }

      this.books.push(book);
      return true;
    }
    return false;
  }

  borrowBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);

    if (book) {
      // ajouter suite au test => 4. Ne pas emprunter un livre dont availableCopies est égal à 0
      if (book.availableCopies < 1) {
        return false;
      }

      // ajouter suite au test => 3. Emprunter un livre doit décrémenter availableCopies
      const index = this.books.findIndex((book) => book.id === id);
      book.availableCopies--;

      // ajouter suite au test => 3. Emprunter un livre doit décrémenter availableCopies
      this.books[index] = book;
      return true;
    }
    return false;
  }

  returnBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);
    // ajouter suite au test => 8. Ne pas retourner un livre dont toutes les copies ont déjà été rendues
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies++;
      return true;
    }
    return false;
  }

  deleteBook(id: number): boolean {
    const book = this.getBook(id);
    if (book) {
      this.books = this.books.filter((book) => book.id !== id);
      return true;
    }
    return false;
  }

  // modifié suite au test => 11. Doit modifier un livre
  updateBook(updatedBook: Partial<Book>): boolean {
    if (updatedBook && updatedBook.id) {
      const targetBook = this.getBook(updatedBook.id);      
      const index = this.books.findIndex((book) => book.id === updatedBook.id);
      this.books[index] = { ...targetBook, ...updatedBook };
      
      return true;
    }
    return false;
  }

  // ajouter suite au test => 3. Emprunter un livre doit décrémenter availableCopies
  getBook(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new Error("book not found")
    }

    return book;
  }
}

export const bookService = new BookService();
