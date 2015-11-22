package com.montgomeryhatch.converters;

//import java.util.ArrayList;
//import java.util.List;

import org.bson.types.ObjectId;

//import com.mongodb.BasicDBList;
//import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;
import com.montgomeryhatch.models.User;
 
public class UserConverter {
 
    // convert User Object to MongoDB DBObject
    // take special note of converting id String to ObjectId
    public static DBObject toDBObject(User p) {
 
        BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
                .append("username", p.getUsername()).append("password", p.getPassword())
                .append("email", p.getEmail());
        if (p.getId() != null)
            builder = builder.append("_id", new ObjectId(p.getId()));
        // here is the problem
        /*if (p.getBooks() != null){
        	String[] strList = p.getBooks();
        	List<ObjectId> booksList = new ArrayList<ObjectId>();
        	
        	for(int i = 0; i < p.getBooks().length; i++){
        		booksList.add(new ObjectId(strList[i]));
        	}
            builder = builder.append("books", booksList);
        }*/
        
        return builder.get();
    }
 
    // convert DBObject Object to User
    // take special note of converting ObjectId to String
    public static User toUser(DBObject doc) {
    	User p = new User();
        p.setUsername((String) doc.get("username"));
        p.setPassword((String) doc.get("password"));
        p.setEmail((String) doc.get("email"));
        ObjectId id = (ObjectId) doc.get("_id");
        p.setId(id.toString());
        // here is the problem
        /*List<String> strBooksList = new ArrayList<>();
        BasicDBList booksList = (BasicDBList) doc.get("books");
        for (int i = 0; i < booksList.size(); i++){
        	BasicDBObject bkObj = (BasicDBObject) booksList.get(i);
        	strBooksList.add(bkObj.toString());
        }
        String[] books = new String[strBooksList.size()];
        books = strBooksList.toArray(books);
        p.setBooks(books);*/
        
        return p;
    } 
}