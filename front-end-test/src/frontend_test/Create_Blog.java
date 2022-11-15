package frontend_test;

import static org.junit.Assert.assertTrue;

import java.awt.Desktop.Action;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class Create_Blog {

	static WebDriver driver = null;
	
	void Login()
	{
        WebElement element;	
        
        element = driver.findElement(By.partialLinkText("Login"));	
        
        element.click();
        
        driver.findElement(By.name("username")).sendKeys("test");
        driver.findElement(By.name("password")).sendKeys("test");

        driver.findElement(By.name("submit")).click();
       
        try
        {
            driver.findElement(By.className("error"));
        	assertTrue(false);
            
        } catch(Exception e) 
        {
        
        }
	}
	
	void ClickOnMyBlog()
	{
		WebElement blogElement;
		
        blogElement = driver.findElement(By.partialLinkText("My Blog"));	

        assertTrue(blogElement.isDisplayed());
        
        blogElement.click();
        
        
	}
	

	public static void setup()
	{
    	System.setProperty("webdriver.gecko.driver","/Users/popcorn/Selenium/geckodriver");

		try {
			driver =  new FirefoxDriver();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
        
        /*NOTES(): Go to the main page */
        driver.get("http://localhost:8080");

	}
	
	public static void cleanup()
	{
		driver.close();
		driver = null;
	}
	
	@Test
	void CreateASuccuessfulBlog() 	 
	{
		WebElement createButton;
		WebElement titleField;
		WebElement editor;
		WebElement createBlog;
		WebElement textElement;
		Random randNumbers;
		setup();
		Login();
		ClickOnMyBlog();
		
        createButton = driver.findElement(By.name("Create"));
        
        assertTrue(createButton.isDisplayed());
        
        createButton.click();

        titleField = driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        
        randNumbers = new Random();
        
        int rand_int1 = randNumbers.nextInt(999999);
        
        titleField.sendKeys("" + rand_int1);
        
	    editor = driver.findElement(By.cssSelector("div.notranslate.public-DraftEditor-content[role='textbox']"));
        
        
        assertTrue(editor.isDisplayed());
        
        editor.sendKeys("");
        
       Actions action = new Actions(driver);
        
        action.moveToElement(editor).sendKeys("this is a test").perform();
        
        createBlog = driver.findElement(By.tagName("button"));
       
        
        assertTrue(createBlog.isDisplayed());
        
        createBlog.click();
        
        
        textElement = driver.findElement(By.className("message"));
        
        assertTrue(textElement.getText().equals("Blog created!"));
        
        //driver.wait(4000);
        cleanup();
        
	}
	
	@Test
	void CreateTitleFailBlog() 
	{
		WebElement createButton;
		WebElement titleField;
		WebElement editor;
		WebElement createBlog;
		WebElement textElement;
		
		setup();
		Login();
		ClickOnMyBlog();
		
        createButton = driver.findElement(By.name("Create"));
        
        assertTrue(createButton.isDisplayed());
        
        createButton.click();

        titleField = driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        

        
        titleField.sendKeys("");
        
	    editor = driver.findElement(By.cssSelector("div.notranslate.public-DraftEditor-content[role='textbox']"));
        
        
        assertTrue(editor.isDisplayed());
        
        editor.sendKeys("");
        
       Actions action = new Actions(driver);
        
        action.moveToElement(editor).sendKeys("this is a test").perform();
        
        createBlog = driver.findElement(By.tagName("button"));
       
        
        assertTrue(createBlog.isDisplayed());
        
        createBlog.click();
        
        //driver.wait(4000);
        textElement = driver.findElement(By.className("errorHandler"));
        
        assertTrue(textElement.getText().equals("Error, Submitting your blog to the backend."));
        
        
        cleanup();
        
	}
	
	
	@Test
	void CreateBlogEntryFailBlog() 
	{
		WebElement createButton;
		WebElement titleField;
		WebElement editor;
		WebElement createBlog;
		WebElement textElement;
		Random randNumbers;

		
		setup();
		Login();
		ClickOnMyBlog();
		
        createButton = driver.findElement(By.name("Create"));
        
        assertTrue(createButton.isDisplayed());
        
        createButton.click();

        titleField = driver.findElement(By.name("title"));
        
        assertTrue(titleField.isDisplayed());
        
        randNumbers = new Random();

        int rand_int1 = randNumbers.nextInt(999999);

        titleField.sendKeys("" + rand_int1);
        
        
        createBlog = driver.findElement(By.tagName("button"));
       
        
        assertTrue(createBlog.isDisplayed());
        
        createBlog.click();
        
        //driver.wait(4000);
        textElement = driver.findElement(By.className("errorHandler"));
        
        assertTrue(textElement.getText().equals("Error, Submitting your blog to the backend."));
        
        
        cleanup();
        
	}
}
