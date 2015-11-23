package com.montgomeryhatch.services;
// DB link

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.montgomeryhatch.converters.BookConverter;
import com.montgomeryhatch.models.Book;
import com.montgomeryhatch.textbookswap.DatabaseConnection;

public class BookService {
	
	public BookService() {
		
	}

	public List<Book> getAllBooks() {
		List<Book> books = new ArrayList<>();
		
		DBCollection col = DatabaseConnection.getBooksCol();
		DBCursor cursor = col.find();
		
		while(cursor.hasNext()){
			DBObject dbObj = cursor.next();
			Book bkObj = BookConverter.toBook(dbObj);
	        books.add(bkObj);
	    }  
		
		return books;
	}
	
	public Book getBook(String id){
		ObjectId b_id = new ObjectId(id);
		
		DBCollection col = DatabaseConnection.getBooksCol();
		BasicDBObject query = new BasicDBObject();
		query.put("_id", b_id);
		DBObject book = col.findOne(query);
		
		return BookConverter.toBook(book);
	}
	
	public Book addBook(Book bk){
		DBObject doc = BookConverter.toDBObject(bk);
		DBCollection col = DatabaseConnection.getBooksCol();
		col.insert(doc);
		ObjectId id = (ObjectId) doc.get("_id");
		bk.setId(id.toString());
		
		return bk;
	}
	
	public Book updateBook(Book bk){
		DBObject book = BookConverter.toDBObject(bk);
		
		DBCollection col = DatabaseConnection.getBooksCol();
		DBObject query = BasicDBObjectBuilder.start()
				.append("_id", book.get("_id")).get();
		col.update(query, book);
		
		return BookConverter.toBook(book);
	}
	
	public void deleteBook(String id){
		ObjectId b_id = new ObjectId(id);
		
		DBCollection col = DatabaseConnection.getBooksCol();
		DBObject query = BasicDBObjectBuilder.start()
				.append("_id", b_id).get();
		col.remove(query);
	}
}
