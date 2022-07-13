package com.nomication.Controllers;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BloggerController {

	@RequestMapping(value="/blog/{id}", method = RequestMethod.GET )
	public ResponseEntity<Object> getAllDueCards(@PathVariable("id") int deckId,HttpServletRequest httpServletRequest)
	{
		HashMap<String, Object> result =  new HashMap<String, Object>();
		result.put("error","no session found!");

		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

}
