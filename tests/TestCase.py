'''
The Base TestCase class
'''
import unittest

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from .helper.decorate import for_all_methods
from .helper.timing import time_this


@for_all_methods(time_this)
class TestCase(unittest.TestCase):
    '''
    This is the base class for all other TestCases
    '''

    __Test__ = False

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        options.binary_location = '/usr/bin/chromium-browser'
        options.add_argument("--no-sandbox") #This make Chromium reachable
        options.add_argument("--no-default-browser-check") #Overrides default choices
        options.add_argument("--no-first-run")
        options.add_argument("--disable-default-apps")
        cls.url = 'https://ammarnajjar.github.io/'
        cls.driver = webdriver.Chrome(
            '/home/travis/virtualenv/python3.6.2/chromedriver',
            chrome_options=options)
        # cls.driver = webdriver.Chrome()
        cls.driver.get(cls.url)

    @classmethod
    def tearDownClass(cls):
        if cls.driver:
            cls.driver.quit()

    def element_exists(self, find_by):
        '''
        :param: find_by: e.g.: (BY.NAME, 'name')
        :return: True if the element is found, else False
        '''
        exists = False
        try:
            WebDriverWait(self.driver, 2).until(EC.presence_of_element_located(find_by))
            exists = True
        except TimeoutException:
            pass
        return exists
