package com.montgomeryhatch.textbookswap;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class TestDB{
   public static void main( String args[] ){
      try{   
		 // To connect to mongodb server
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Now connect to your databases
         DB db = mongoClient.getDB( "textbooks" );
		 System.out.println("Connect to database successfully");
         //boolean auth = db.authenticate(myUserName, myPassword);
		 //System.out.println("Authentication: "+auth);
		 
		 DBCollection users = db.getCollection("users");
		 DBCollection books = db.getCollection("books");
		 DBObject myDoc = users.findOne();
		 System.out.println(myDoc);
		 
		 
		 
      }catch(Exception e){
	     System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	  }
   }
}