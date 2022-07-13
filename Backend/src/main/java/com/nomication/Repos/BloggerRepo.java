package com.nomication.Repos;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nomication.Models.Blogger;

@Repository
@Transactional
public interface BloggerRepo extends CrudRepository<Blogger, Integer> {

}
