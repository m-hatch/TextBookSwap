package com.montgomeryhatch.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.montgomeryhatch.models.Book;
import com.montgomeryhatch.services.BookService;

@Path("/books")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BookResource {

	private BookService bookService = new BookService();
	
	@GET
	public List<Book> getBooks(){
		return bookService.getAllBooks();
	}
	
	@GET
	@Path("/{bookId}")
	public Book getBook(@PathParam("bookId") String id){
		return bookService.getBook(id);
	}
	
	@POST
	public Book addBook(Book bk){
		return bookService.addBook(bk);
	}
	
	@PUT
	@Path("/{bookId}")
	public Book updateBook(@PathParam("bookId") String id, Book bk){
		return bookService.updateBook(bk);
	}
	
	@DELETE
	@Path("/{bookId}")
	public void deleteBook(@PathParam("bookId") String id){
		bookService.deleteBook(id);
	}
	
}
