package frontend_test;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

class Edit_Blog {

	@Test
	void SuccessEdit() {
		WebElement messageElement = null;
		WebElement createButton;
		WebElement titleField;
		WebElement editor;
		WebElement createBlog;
		WebElement textElement;

		utils util = new utils();
		util.setup();
		util.Login();
		util.ClickOnMyBlog();
		util.ClickOnEditBlog();
		
        titleField = util.driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        
        titleField.sendKeys("this was edit");
        
	    editor = util.driver.findElement(By.cssSelector("div.notranslate.public-DraftEditor-content[role='textbox']"));
        
        
        assertTrue(editor.isDisplayed());
        
        editor.sendKeys("");
        
       Actions action = new Actions(util.driver);
        
        action.moveToElement(editor).sendKeys("this is a test").perform();
        
        createBlog = util.driver.findElement(By.tagName("button"));
       
        
        assertTrue(createBlog.isDisplayed());
        
        createBlog.click();
        
        //driver.wait(4000);
        textElement = util.driver.findElement(By.className("message"));
        
        assertTrue(textElement.getText().equals("Blog Edited!"));
        
        util.driver.close();
		
	}
	
	@Test
	void FailEditBlogTitle()
	{
		WebElement titleField;
		WebElement textElement;
		WebElement createBlog;

		utils util = new utils();
		util.setup();
		util.Login();
		util.ClickOnMyBlog();
		util.ClickOnEditBlog();
		
        titleField = util.driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        
        titleField.clear();
        
        createBlog = util.driver.findElement(By.tagName("button"));
        createBlog.click();
        
        textElement = util.driver.findElement(By.className("errorHandler"));
        
        assertTrue(textElement.getText().equals("Error, Please enter a title"));
        
        
        
        util.driver.close();
	}
	/*
	@Test
	void FailEditBlogBlob()
	{
		WebElement titleField;
		WebElement textElement;
		WebElement createBlog;
		WebElement editor;

		
		utils util = new utils();
		util.setup();
		util.Login();
		util.ClickOnMyBlog();
		util.ClickOnEditBlog();
		
        titleField = util.driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        
        titleField.clear();
        titleField.sendKeys("my new edit title");
        
	    editor = util.driver.findElement(By.cssSelector("div.notranslate.public-DraftEditor-content[role='textbox']"));
        
        
        assertTrue(editor.isDisplayed());
        
        editor.clear();
        
       Actions action = new Actions(util.driver);
       action.moveToElement(editor).keyDown(Keys.COMMAND);
       action.moveToElement(editor).sendKeys("a");
       action.moveToElement(editor).keyUp(Keys.COMMAND);
       action.moveToElement(editor).sendKeys(Keys.BACK_SPACE);
       action.moveToElement(editor).build();
       action.moveToElement(editor).perform();

       

       
        createBlog = util.driver.findElement(By.tagName("button"));
       
        
        assertTrue(createBlog.isDisplayed());
        
        createBlog.click();
        
        
        textElement = util.driver.findElement(By.className("message"));
        
        assertTrue(textElement.getText().equals("Please Enter a blog entry"));

	}
	*/

}
