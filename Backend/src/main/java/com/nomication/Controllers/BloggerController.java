package com.nomication.Controllers;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;

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

	@RequestMapping(value="/blogs", method = RequestMethod.POST )
	public ResponseEntity<Object> getAllDueCards(@RequestBody  HashMap<String, Object> info,HttpServletRequest httpServletRequest)
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
