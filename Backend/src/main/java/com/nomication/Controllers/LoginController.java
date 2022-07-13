package com.nomication.Controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nomication.Models.Blogger;

public class LoginController {

	@RequestMapping(value="/logon", method = RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_VALUE})	 
	public ResponseEntity<Object> Logon(@PathVariable("user") Blogger user,HttpServletRequest httpServletRequest)
	{
					
		return null;
		
	}
	
}
