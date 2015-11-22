package com.montgomeryhatch.converters;

import org.bson.types.ObjectId;
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
        
        return p;
    } 
}