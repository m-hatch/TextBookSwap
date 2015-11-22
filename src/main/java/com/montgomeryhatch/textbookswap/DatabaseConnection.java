package com.montgomeryhatch.textbookswap;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class DatabaseConnection {
	
	public static DB getMongo(){
		// connect to mongodb server
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        // connect to databases
        DB db = mongoClient.getDB( "textbooks" );
        return db;
	}
	
	// return users collection
	public static DBCollection getUsersCol(){
		DB db = DatabaseConnection.getMongo();
		DBCollection users = db.getCollection("users");
		return users;
	}
	
	// return books collection
	public static DBCollection getBooksCol(){
		DB db = DatabaseConnection.getMongo();
		DBCollection books = db.getCollection("books");
		return books;
	}
}
