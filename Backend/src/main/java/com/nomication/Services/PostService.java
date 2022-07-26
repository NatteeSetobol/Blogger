package com.nomication.Services;

import org.springframework.beans.factory.annotation.Autowired;

import com.nomication.Models.Post;
import com.nomication.Repos.PostRepo;

public class PostService {
	@Autowired 
	PostRepo postRepo;
	
	void save(Post post)
	{
		postRepo.save(post);
	}
}
	