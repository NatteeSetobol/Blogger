package com.nomication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nomication.Models.Blogger;
import com.nomication.Repos.BloggerRepo;

@Service
public class BloggerService {
	@Autowired
	BloggerRepo bloggerRepo;
	
	public Blogger FindBlogger(String username)
	{
		Iterable<Blogger> bloggers = bloggerRepo.findAll();
		
		for (Blogger blogger: bloggers  )
		{
			if (username.equals(blogger.getUsername()))
			{
				return blogger;
			}
		}
		
		return null;
	}
}
