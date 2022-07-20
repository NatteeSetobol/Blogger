package com.nomication.Services;

import java.util.ArrayList;

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
		ArrayList<Blogger> bloggers = bloggerRepo.findUserByUsername();
		for (int i=0;i < bloggers.size(); i++  )
		{
			Blogger blogger = bloggers.get(i);
			if (username.equals(blogger.getUsername()))
			{
				return blogger;
			}
		}
		
		return null;
	}
}
