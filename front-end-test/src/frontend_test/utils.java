package frontend_test;

import static org.junit.Assert.assertTrue;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class utils {
	public WebDriver driver = null;
	
	public void Login()
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
	
	public void ClickOnMyBlog()
	{
		WebElement blogElement;
		
        blogElement = driver.findElement(By.partialLinkText("My Blog"));	

        assertTrue(blogElement.isDisplayed());
        
        blogElement.click();
        
        
	}
	
	public void ClickOnDeleteBlog()
	{
		WebElement deleteElement = null;
		deleteElement = driver.findElement(By.className("bi-trash"));
		
		assertTrue(deleteElement.isDisplayed());
		
		deleteElement.click();
	}
	
	
	public void ClickOnEditBlog()
	{
		WebElement deleteElement = null;
		deleteElement = driver.findElement(By.className("bi-file-earmark-binary-fill"));
		
		assertTrue(deleteElement.isDisplayed());
		
		deleteElement.click();
	}

	public void setup()
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
	
	public  void cleanup()
	{
		driver.close();
		driver = null;
	}
	
	public WebElement FindElementByClass(String className)
	{
		return driver.findElement(By.className(className));
	}
}
