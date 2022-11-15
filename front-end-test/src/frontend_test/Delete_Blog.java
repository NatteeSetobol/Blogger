package frontend_test;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class Delete_Blog {


	@Test
	void test() {
		WebElement messageElement = null;

		utils util = new utils();
		util.setup();
		util.Login();
		util.ClickOnMyBlog();
		util.ClickOnDeleteBlog();
		
		
		messageElement = util.FindElementByClass("message");
		
		assertTrue(messageElement.isDisplayed());
		assertTrue(messageElement.getText().equals("Successfully deleted!"));
		
		util.cleanup();
	}

}
