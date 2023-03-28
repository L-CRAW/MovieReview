import time
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestLogin(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument('--headless')
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.maximize_window()
        cls.driver.implicitly_wait(5)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

#connect to the website
    def setUp(self):
        self.driver.get("https://moviereviewamber.netlify.app/login")

# test if login is successful
    def test_login_successful(self):
        username = self.driver.find_element(by=By.ID, value="username")
        password = self.driver.find_element(by=By.ID, value="password")
        login_button = self.driver.find_element(by=By.CSS_SELECTOR, value="button.btn.btn-primary.w-100")
        username.send_keys("Craw")
        password.send_keys(123456)
        login_button.click()
        time.sleep(5)
        self.assertEqual(self.driver.current_url, "https://moviereviewamber.netlify.app/movies")

#test if the database has already been displayed
    def test_database_displayed(self):
        self.driver.get("https://moviereviewamber.netlify.app/movies")
        time.sleep(2)
        table_rows = self.driver.find_elements(by=By.CSS_SELECTOR, value="table tbody tr")
        self.assertTrue(len(table_rows) > 0)

#test if the search function works
    def test_search(self):
        self.driver.get("https://moviereviewamber.netlify.app/upload-review")
        time.sleep(2)
        movie_title = self.driver.find_element(by=By.ID, value="movieTitle")
        movie_title.send_keys("the godfather")
        search_button = self.driver.find_element(by=By.CSS_SELECTOR, value="button.btn.btn-primary.mt-2")
        search_button.click()
        time.sleep(2)
        h3_element = self.driver.find_element(by=By.TAG_NAME, value = "h3")
        self.assertEqual(h3_element.text, "Movie found! Add your review:")

if __name__ == "__main__":
    unittest.main()
