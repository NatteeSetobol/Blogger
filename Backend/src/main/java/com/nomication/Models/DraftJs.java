package com.nomication.Models;

import java.util.ArrayList;
import java.util.HashMap;

public class DraftJs {
	public ArrayList<HashMap<String, Object>> blocks;
	public HashMap<String, Object> entityMap;
	
	DraftJs()
	{
		blocks = new ArrayList<HashMap<String, Object>>();
		entityMap = new HashMap<String, Object>();
	}
}
