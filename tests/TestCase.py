import unittest

from .helper.decorate import for_all_methods
from .helper.timing import time_this

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

options = webdriver.ChromeOptions()
options.binary_location = '/usr/bin/chromium-browser'
options.add_argument("--no-sandbox") #This make Chromium reachable
options.add_argument("--no-default-browser-check") #Overrides default choices
options.add_argument("--no-first-run")
options.add_argument("--disable-default-apps")


@for_all_methods(time_this)
class TestCase(unittest.TestCase):

    __Test__ = False

    def __init__(self, *args, **kwargs):
        super(TestCase, self).__init__(*args, **kwargs)

    @classmethod
    def setUpClass(cls):
        cls.url = 'https://ammarnajjar.github.io/'
        cls.driver = webdriver.Chrome('/home/travis/virtualenv/python3.6.2/chromedriver', chrome_options=options)
        # cls.driver = webdriver.Chrome()
        cls.driver.get(cls.url)

    @classmethod
    def tearDownClass(cls):
        if cls.driver:
            cls.driver.quit()

    def element_exists(self, by):
        exists = False
        try:
            WebDriverWait(self.driver, 2).until(EC.presence_of_element_located(by))
            exists = True
        except TimeoutException:
            pass
        return exists

