import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBeTruthy();
  });


  // Test 1 : L'ajout d'un livre sans titre ne doit pas fonctionner
  it('should not add a book without title', () => {
    const book = {
      id: 11,
      title: "",
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);
    expect(result).toBeFalsy();
  });


  // Test 2 : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it('should not add a book with totalCopies equal 0 or negative number', () => {
    const book = {
      id: 12,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 0,
    };

    const result = service.addBook(book);
    expect(result).toBeFalsy();
  });


  // Test 3 : Emprunter un livre doit décrémenter availableCopies
  it('should decrement availableCopies', () => {
    const book: Book = {
      id: 14,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 10,
      totalCopies: 1,
    };

    service.addBook(book);
    service.borrowBook(book.id);
    const borrowedBook = service.getBook(book.id);
    console.log(service.getBooks())
    expect(borrowedBook.availableCopies).toEqual(9);
  });


  // Test 4 : Ne pas emprunter un livre dont availableCopies est égal à 0
  it('should not can borrow a book with availableCopies under 1', () => {
    const book: Book = {
      id: 15,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const firstBorrow = service.borrowBook(book.id);
    expect(firstBorrow).toBeTruthy()

    const secondBorrow = service.borrowBook(book.id);
    expect(secondBorrow).toBeFalsy()
  });


  // Test 5 : Ne pas emprunter un livre qui n'existe pas
  it('should not can borrow an unvalid book', () => {
    const borrowedBook = service.borrowBook(100);
    expect(borrowedBook).toBeFalsy();
  });


  // Test 6 : Retourner un livre doit incrémenter availableCopies
  it('should increase availableCopies', () => {
    // au départ, le livre 1 a availableCopies à 5 et totalCopies à 5
    // donc j'en retire un pour les besoin du test
    service.borrowBook(1)


    // je récupère le livre pour récupérer et conserver la valeur à cet instant de availableCopies
    // availableCopies vaut 4
    const returnedBook = service.getBook(1);
    const availableCopies = returnedBook.availableCopies;// la valeur 4 est conservé par cette variable

    // je retourne le livre 1. donc availableCopies doit être incrémenté et valoir 5
    service.returnBook(1);

    expect(returnedBook.availableCopies).toEqual(availableCopies + 1);
  });


  // Test 7 : Ne pas retourner un livre qui n'existe pas
  it('should not be possible to return an unexisting book', () => {
    const returnedBook = service.returnBook(100);
    expect(returnedBook).toBeFalsy();
  });


  // Test 8 : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it('should not be possible to return an unexisting book', () => {
    const result = service.returnBook(1);
    expect(result).toBeFalsy();
  });


  // Ajoute des tests de ton choix pour les autres méthodes

  // Test 9 : Doit supprimer un livre
  it('should delete a book', () => {
    const result = service.deleteBook(1);
    expect(result).toBeTruthy();
  });


  // Test 10 : Ne doit pas supprimer un livre qui n'existe pas
  it('should throw an error', () => {
    expect(() => service.deleteBook(100)).toThrow("book not found");
  });


  // Test 11 : Doit modifier un livre
  it('should update a book', () => {
    const book: Book = {
      id: 20,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };
    service.addBook(book);

    const updatedBook = {
      id: 20,
      title: 'New Book',
    }
    service.updateBook(updatedBook);

    const modifiedBook = service.getBook(20);
    expect(modifiedBook.title).toEqual("New Book")

  });


  // Test 12 : Ne doit pas modifier un livre qui n'existe pas
  it('should update a book', () => {    
    const updatedBook = {
      id: 200,
      title: 'New Book',
    }
    expect(() => service.updateBook(updatedBook)).toThrow("book not found");
  });
});
