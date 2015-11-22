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
import com.montgomeryhatch.converters.UserConverter;
import com.montgomeryhatch.models.User;
import com.montgomeryhatch.textbookswap.DatabaseConnection;

public class UserService {
	
	public UserService() {

	}

	public List<User> getAllUsers() {
		List<User> users = new ArrayList<>();
		
		DBCollection col = DatabaseConnection.getUsersCol();
		DBCursor cursor = col.find();
		
		while(cursor.hasNext()){
			DBObject dbObj = cursor.next();
			User usrObj = UserConverter.toUser(dbObj);
	        users.add(usrObj);
	    }     
			
		return users;
	}
	
	public User getUser(String id){
		ObjectId u_id = new ObjectId(id);
		
		DBCollection col = DatabaseConnection.getUsersCol();
		BasicDBObject query = new BasicDBObject();
		query.put("_id", u_id);
		DBObject user = col.findOne(query);
		
		return UserConverter.toUser(user);
	}
	
	public User addUser(User usr){
		DBObject doc = UserConverter.toDBObject(usr);
		DBCollection col = DatabaseConnection.getUsersCol();
		col.insert(doc);
		ObjectId id = (ObjectId) doc.get("_id");
		usr.setId(id.toString());
		
		return usr;
	}
	
	public User updateUser(User usr){
		DBObject user = UserConverter.toDBObject(usr);
		
		DBCollection col = DatabaseConnection.getUsersCol();
		DBObject query = BasicDBObjectBuilder.start()
				.append("_id", user.get("_id")).get();
		col.update(query, user);
		
		return UserConverter.toUser(user);
	}
	
	public void deleteUser(String id){
		ObjectId u_id = new ObjectId(id);
		
		DBCollection col = DatabaseConnection.getUsersCol();
		DBObject query = BasicDBObjectBuilder.start()
				.append("_id", u_id).get();
		col.remove(query);
	}
}