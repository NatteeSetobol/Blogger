package com.nomication.Repos;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nomication.Models.Post;

@Repository 
@Transactional
public interface PostRepo extends  CrudRepository<Post, Integer> {

}
