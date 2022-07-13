package com.nomication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nomication.Repos.BloggerRepo;

@Service
public class BloggerService {
	@Autowired
	BloggerRepo bloggerRepo;
}
