package com.montgomeryhatch.converters;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;
import com.montgomeryhatch.models.Book;

public class BookConverter {
	 
    // convert Book Object to MongoDB DBObject
    // take special note of converting id String to ObjectId
    public static DBObject toDBObject(Book b) {
 
        BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
                .append("title", b.getTitle()).append("dept", b.getDept())
                .append("course", b.getCourse()).append("image",  b.getImage())
                .append("price", b.getPrice()).append("date", b.getDate())
                .append("author", b.getAuthor());
        if (b.getId() != null)
            builder = builder.append("_id", new ObjectId(b.getId()));
        if (b.getUser() != null)
            builder = builder.append("user", new ObjectId(b.getUser()));
        return builder.get();
    }
 
    // convert DBObject Object to Book
    // take special note of converting ObjectId to String
    public static Book toBook(DBObject doc) {
    	Book b = new Book();
        b.setTitle((String) doc.get("title"));
        b.setAuthor((String) doc.get("author"));
        b.setDept((String) doc.get("dept"));
        b.setCourse((String) doc.get("course"));
        b.setImage((String) doc.get("image"));
        b.setPrice((String) doc.get("price"));
        b.setDate((String) doc.get("date"));
        
        ObjectId id = (ObjectId) doc.get("_id");
        b.setId(id.toString());
        ObjectId user = (ObjectId) doc.get("user");
        b.setUser(user.toString());
        
        return b;
 
    }
     
}
