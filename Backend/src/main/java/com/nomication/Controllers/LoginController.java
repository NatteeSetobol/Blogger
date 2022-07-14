package com.nomication.Controllers;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.nomication.Models.Blogger;
import com.nomication.Services.BloggerService;
import java.security.*;
import java.math.BigInteger;

public class LoginController {
	
	@Autowired
	BloggerService bloggerService;

	@RequestMapping(value="/logon", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> Logon(@PathVariable("user") Blogger user,HttpServletRequest httpServletRequest)
	{
		Blogger existingUser = bloggerService.FindBlogger(user.getUsername());
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
				bytesOfMessage = user.getPassword().getBytes("UTF-8");
				md = MessageDigest.getInstance("MD5");
				theMD5digest = md.digest(bytesOfMessage);
				while (hashtext.length() < 32) {
					hashtext = "0" + hashtext;
				}
				
				if (existingUser.getPassword().equals(hashtext))
				{
					result.put("success", "login!");

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
	
}
