package com.montgomeryhatch.textbookswap;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.montgomeryhatch.converters.UserConverter;
import com.montgomeryhatch.models.User;
import com.montgomeryhatch.services.UserService;

public class Test {
	public static void main(String[] args) {
//		UserService userService = new UserService();
//		List<User> test = userService.getAllUsers();
//		System.out.println(test);
		
		List<User> users = new ArrayList<>();
		
		DBCollection col = DatabaseConnection.getUsersCol();
		DBCursor cursor = col.find();
		
		while(cursor.hasNext()){
			DBObject dbObj = cursor.next();
			User usrObj = UserConverter.toUser(dbObj);
//	        users.add(usrObj);
			System.out.println(usrObj.toString());
	    } 
	}
}
