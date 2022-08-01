package com.nomication.Repos;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nomication.Models.Blogger;

@Repository
//@Transactional
public interface BloggerRepo extends CrudRepository<Blogger, Integer> {

		@Query("from Blogger")
		ArrayList<Blogger> findUserByUsername();	
}
