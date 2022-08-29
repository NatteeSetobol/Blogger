package com.nomication.Controllers;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.nomication.Models.Blogger;
import com.nomication.Models.Post;
import com.nomication.Repos.PostRepo;
import com.nomication.Services.BloggerService;
import com.nomication.Util.JwtUtil;

@RestController
public class BloggerController {
	@Autowired 
	JwtUtil jToken;
	@Autowired
	BloggerService bloggerService;
	@Autowired	
	PostRepo postRepo;

	@RequestMapping(value="/allblogs", method = RequestMethod.GET)
	public ResponseEntity<Object> getAllBlogEntries(HttpServletRequest httpServletRequest)
	{
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ArrayList<Post> blogs = null;
		
		blogs = postRepo.GetAllPost();
		
		result.put("Success", blogs);
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@RequestMapping(value="/blogs", method = RequestMethod.POST )
	public ResponseEntity<Object> getUserBlogEntries(@RequestBody  HashMap<String, Object> info,HttpServletRequest httpServletRequest)
	{
		HashMap<String, Object> result =  new HashMap<String, Object>();
		String token = null;
		
		token = info.get("token").toString();
		Blogger blogger = null;
		
		blogger = CheckUserAndToken(token);
		
		if (blogger != null)
		{
			ArrayList<Post> blogs = null;
			blogs = postRepo.GetUserPost(blogger.GetId()); 
			
			
			result.put("Success", blogs);
		} else {
			result.put("Success", "false");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);	
	}
	
	// NOTES(): This will save the edit Blog
	
	@RequestMapping(value="/save", method = RequestMethod.POST )
	public ResponseEntity<Object> saveBlogEntries(@RequestBody  HashMap<String, Object> info,HttpServletRequest httpServletRequest)
	{
		HashMap<String, Object> result =  new HashMap<String, Object>();
		String token = null;
		Blogger blogger = null;
		
		try {
			token = info.get("token").toString();
			blogger = CheckUserAndToken(token);	
		} catch (Exception e)
		{
			System.out.print("Token error");
		}
		if (blogger != null)
		{
			Post ogPost = null;
			ArrayList<Post> posts = null;
			
			try {
				posts = postRepo.GetPostById( (int) info.get("id"));
			
				if (posts.size() == 1)
				{
					ogPost = posts.get(0);
				}
			} catch (Exception e)
			{
				System.out.print("Post id not found");

				ogPost = null;
			}
			
			if (ogPost != null)
			{
				// NOTES(): of course if somebody steals a token they could still edit and submit it?
				if (ogPost.getAuthorId() == blogger.GetId())
				{
			        ObjectMapper objectMapper = new ObjectMapper();
			        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			        String jsonString = null;


					try
					{
				        jsonString = objectMapper.writeValueAsString(info.get("text"));

						ogPost.setText(jsonString);
						ogPost.setTitle((String) info.get("title"));
						postRepo.save(ogPost);
					
						result.put("Success", "true");
					} catch (Exception e)
					{
						System.out.print("Not the Author " + e.getMessage());
						result.put("Success", "false");
					}
				}
			} else {
				System.out.print("Token not found. ");
				result.put("Success", "false");
			}
			
			
		} else {
			result.put("Success", "false");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);	
	}
	
	@RequestMapping(value="/submit", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> Submit( @RequestBody HashMap<String, Object> info ,HttpServletRequest httpServletRequest)
	{ 
		HashMap<String, Object> result =  new HashMap<String, Object>();
		String token = null;
		String usernameFromToken  = null;
		Blogger existingUser = null;

		try
		{
			token = info.get("token").toString();

			usernameFromToken = jToken.extractUsername(token);
		
			if (usernameFromToken != null)
			{
				existingUser = bloggerService.FindBlogger(usernameFromToken);
			
				if (existingUser != null)
				{
					if (jToken.validateToken(token, existingUser))
					{
						String title = null;
						Object jObject = null;
				        ObjectMapper objectMapper = new ObjectMapper();
				        String jsonString = null;
				        Post post = null;
				        DateTimeFormatter dtf = null;
				        LocalDateTime now  = null;
				        Timestamp timestamp;
					
						title = (String) info.get("title");
						jObject = (Object) info.get("blog");
						
				        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				        
				        jsonString = objectMapper.writeValueAsString(jObject);
				        
				        try 
				        {
				        	post = new Post();
				        	post.setAuthorId(post.getAuthorId());
				        
				        	dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
				        	now = LocalDateTime.now();  
				   
				        	timestamp = Timestamp.valueOf(now);
				        
				        	post.setCreated(timestamp);
				        	post.setAuthorId(existingUser.GetId());
				        	post.setPublish(timestamp);
				        	post.setUpdated(timestamp);
				        	post.setTitle(title);
				        	post.setText(jsonString);
				        	postRepo.save(post);
					
				        	result.put("Success", "true");
				        
				        } catch (Exception e)
				        {
							result.put("Success", "false");

				        }		
					}
				}

			}
		} catch (Exception expection)
		{
			result.put("Error", "Unexcepted error");

		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	

	
	@RequestMapping(value="/post/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getPost(@PathVariable("id") int postId,HttpServletRequest httpServletRequest)
	{ 
		HashMap<String, Object> result =  new HashMap<String, Object>();
		ArrayList<Post> posts = null;
		
		try 
		{
			posts = postRepo.GetPostById(postId);
			
			if (posts.size() > 0)
			{
				Post post = (Post) posts.get(0);
				result.put("success", post);
			} else {
				result.put("Error", "Unexcepted error");
			}
			
		} catch(Exception e) {
			result.put("Error", "Unexcepted error");
		}
		
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	
	@RequestMapping(value="/delete", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deletePost(@RequestBody HashMap<String, Object> info,HttpServletRequest httpServletRequest)
	{ 
		HashMap<String, Object> result =  new HashMap<String, Object>();
		ArrayList<Post> posts = null;
		String token = null;
		String usernameFromToken  = null;
		Blogger existingUser = null;
		int pid = 0;
		boolean status = false;

		try {
		token = info.get("token").toString();
		pid = Integer.parseInt( info.get("id").toString());


		usernameFromToken = jToken.extractUsername(token);
	
		if (usernameFromToken != null)
		{
			existingUser = bloggerService.FindBlogger(usernameFromToken);
		
			if (existingUser != null)
			{
				if (jToken.validateToken(token, existingUser))
				{
					posts = postRepo.GetPostById(pid);
					if (posts.size() > 0)
					{
						Post post = posts.get(0);
						if (existingUser.GetId() == post.getAuthorId())
						{
							status = true;
							postRepo.delete(post);
							result.put("Success","Post deleted");
						}
					}
				}
			}
		}
		} catch (Exception e)
		{
			status = false;
		}
		
		if (status == false)
		{
			result.put("Error","Error deleting post!");
		}

		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	Blogger CheckUserAndToken(String token)
	{
		boolean isValid = false;
		String usernameFromToken  = null;
		Blogger existingUser = null;
	
		try {
		usernameFromToken = jToken.extractUsername(token);
		
		if (usernameFromToken != null)
		{
			existingUser = bloggerService.FindBlogger(usernameFromToken);
		
			if (existingUser != null)
			{
				if (jToken.validateToken(token, existingUser))
				{
					isValid = true;
				}
			}
		}
		} catch (Exception e) {
			isValid = false;
		}
		
		return existingUser;
	}
}
