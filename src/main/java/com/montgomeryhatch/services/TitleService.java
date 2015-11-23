package com.montgomeryhatch.services;
//DB link

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

public class TitleService {
	
	public TitleService() {
		
	}

	public List<Book> getByTitle(String title){
		List<Book> books = new ArrayList<>();
		
		DBCollection col = DatabaseConnection.getBooksCol();
		BasicDBObject query = new BasicDBObject();
		query.put("title", title);
		DBCursor cursor = col.find(query);
		
		while(cursor.hasNext()){
			DBObject dbObj = cursor.next();
			Book usrObj = BookConverter.toBook(dbObj);
	        books.add(usrObj);
	    }  
		
		return books;
	}
	
}
