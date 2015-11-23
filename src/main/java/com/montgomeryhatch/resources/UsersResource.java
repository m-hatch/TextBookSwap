package com.montgomeryhatch.resources;
// URI endpoints

import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.montgomeryhatch.models.User;
import com.montgomeryhatch.services.UserService;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UsersResource {

	private UserService userService = new UserService();
	
	@GET
	public List<User> getUsers(){
		return userService.getAllUsers();
	}
	
	@GET
	@Path("/{userId}")
	public User getUser(@PathParam("userId") String id){
		return userService.getUser(id);
	}
	
	@POST
	public User addUser(User usr){
		return userService.addUser(usr);
	}
	
	@PUT
	@Path("/{userId}")
	public User updateUser(@PathParam("userId") String id, User user){
		return userService.updateUser(user);
	}
	
	@DELETE
	@Path("/{userId}")
	public void deleteUser(@PathParam("userId") String id){
		userService.deleteUser(id);
	}
	
	@GET
	@Path("/validate/{uname}/{pass}")
	public User validateUser(@PathParam("uname") String uname, 
			@PathParam("pass") String pass){
		return userService.validateUser(uname, pass);
	}
}
