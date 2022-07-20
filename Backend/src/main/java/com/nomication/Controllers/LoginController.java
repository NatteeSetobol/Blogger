package com.nomication.Controllers;

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

import com.nomication.Models.Blogger;
import com.nomication.Services.BloggerService;
import com.nomication.Util.JwtUtil;

import java.security.*;
import java.math.BigInteger;
@RestController
public class LoginController {
	
	@Autowired
	BloggerService bloggerService;
	@Autowired 
	JwtUtil jToken;

	@RequestMapping(value="/logon", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> Logon( @RequestBody HashMap<String, Object> user ,HttpServletRequest httpServletRequest)
	{ 
				
		Blogger existingUser = bloggerService.FindBlogger((String) user.get("username"));
		HashMap<String, Object> result =  new HashMap<String, Object>();
		
		
		if (existingUser != null)
		{
			byte[] bytesOfMessage;
			MessageDigest md;
			byte[] theMD5digest;
			BigInteger no;
			String hashtext = "";
			
			try
			{
				
				String userPass = (String) user.get("password");
				
				bytesOfMessage = userPass.getBytes("UTF-8");
				md = MessageDigest.getInstance("MD5");
				theMD5digest = md.digest(bytesOfMessage);
				no =  new BigInteger(1, theMD5digest);
				hashtext = no.toString(16);
				while (hashtext.length() < 32) {
					hashtext = "0" + hashtext;
				}
				
				if (existingUser.getPassword().equals(hashtext))
				{
					final String jwt = jToken.generateToken(existingUser);
					result.put("token", jwt);

				} else {
					
					result.put("error", "Username and password are incorrect.");
				}
			} catch (Exception e)
			{
				result.put("error", "Username and password are incorrect.");
			}
		
		} else {
			result.put("error", "Username and password are incorrect.");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
		
	}
	
	@RequestMapping(value="/verify", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> Verify( @RequestBody HashMap<String, Object> info ,HttpServletRequest httpServletRequest)
	{ 	
		String usernameFromToken  = null;
		String token = null;
		Blogger existingUser = null;
		HashMap<String, Object> result =  new HashMap<String, Object>();
		
		if (result.size() != 0)
		{
			token = info.get("token").toString();
		
			usernameFromToken = jToken.extractUsername(token);
		
			if (usernameFromToken != null)
			{
				existingUser = bloggerService.FindBlogger(usernameFromToken) ;
				if (existingUser	 != null)
				{
					if (jToken.validateToken(token, existingUser))
					{
						result.put("verify", "true");
					}
				}

			}
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@RequestMapping(value="/logoff", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> logoff( @RequestBody HashMap<String, Object> info ,HttpServletRequest httpServletRequest)
	{ 
		HashMap<String, Object> result =  new HashMap<String, Object>();
		
	
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
}


