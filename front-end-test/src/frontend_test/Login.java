package frontend_test;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

class Login {

	@Test
	void SuccessfulLogin() {
    	System.setProperty("webdriver.gecko.driver","/Users/popcorn/Selenium/geckodriver");

        WebDriver driver = new FirefoxDriver();
        WebElement element;	
        WebElement blogElement;
        WebElement Error;
        
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
        
        driver.get("http://localhost:8080");
        
        element = driver.findElement(By.partialLinkText("Login"));	
        
        element.click();
        
        driver.findElement(By.name("username")).sendKeys("test");
        driver.findElement(By.name("password")).sendKeys("test");

        driver.findElement(By.name("submit")).click();
       
        try
        {
        	Error = driver.findElement(By.className("error"));
        	assertTrue(false);
            
        } catch(Exception e) 
        {
        
        }
        
        driver.close();
	}
	
	@Test
	void FailedLogin()
	{
    	System.setProperty("webdriver.gecko.driver","/Users/popcorn/Selenium/geckodriver");

        WebDriver driver = new FirefoxDriver();
        WebElement element;	
        WebElement blogElement;
        WebElement Error;
        
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
        
        driver.get("http://localhost:8080");
        
        element = driver.findElement(By.partialLinkText("Login"));	
        
        element.click();
        
        driver.findElement(By.name("username")).sendKeys("test");
        driver.findElement(By.name("password")).sendKeys("failed");

        driver.findElement(By.name("submit")).click();
       
       
        Error = driver.findElement(By.className("error"));
        	assertTrue(Error.isDisplayed());
        
        driver.close();
	}

}
