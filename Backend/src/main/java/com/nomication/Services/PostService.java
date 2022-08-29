package com.nomication.Services;

import java.util.ArrayList;

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
	
	void del(Post post)
	{
		postRepo.delete(post);
	}
	
	ArrayList<Post> GetAllUserPost(int id)
	{
		return postRepo.GetUserPost(id);
	}
	
	ArrayList<Post> GetPostById(int id)
	{
		return postRepo.GetPostById(id);
	}
	
}
	