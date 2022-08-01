package com.nomication.Repos;

import java.util.ArrayList;

//import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nomication.Models.Post;

@Repository 
//@Transactional
public interface PostRepo extends  CrudRepository<Post, Integer> {
	@Query("from Post where author_id = ?1")
	ArrayList<Post> GetUserPost(int author_id);
}
