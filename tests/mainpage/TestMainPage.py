from tests.TestCase import TestCase
from selenium.webdriver.common.by import By

class TestMainPage(TestCase):

    __Test__ = True

    def test_author_is_ammar_najjar(self):
        name = 'author'
        if self.element_exists((By.NAME, name)):
            author = self.driver.find_element_by_name(name).get_attribute('content')
            self.assertEqual(author, 'Ammar Najjar')
        else:
            self.fail('Author element cannot be found on the page: %s' % self.driver.current_url)

    def test_title_is_ammar_najjars_personal_blog(self):
        class_name = 'site-title'
        if self.element_exists((By.CLASS_NAME, class_name)):
            title = self.driver.find_element_by_class_name(class_name).text
            self.assertEqual(title, 'Ammar Najjar\'s Personal Blog')
        else:
            self.fail('Title element cannot be found on the page: %s' % self.driver.current_url)

    def test_link_to_about_page_exits(self):
        css_selector = 'div[class="trigger"]>a'
        if self.element_exists((By.CSS_SELECTOR, css_selector)):
            about_div = self.driver.find_element_by_css_selector(css_selector).get_attribute('href')
            self.assertIn('about', about_div)
        else:
            self.fail('About element cannot be found on the page: %s' % self.driver.current_url)

    def test_fork_me_on_github_link_is_correct(self):
        css_selector = 'span[id="forkongithub"]>a'
        if self.element_exists((By.CSS_SELECTOR, css_selector)):
            repo_url = 'https://github.com/ammarnajjar/ammarnajjar.github.io'
            fork_href = self.driver.find_element_by_css_selector(css_selector).get_attribute('href')
            self.assertEqual(repo_url, fork_href)
        else:
            self.fail('ForkGithub element cannot be found on the page: %s' % self.driver.current_url)

    def test_footer_has_link_to_github_account(self):
        css_selector = 'a[href*="github.com/ammarnajjar"]'
        self.assertTrue(self.element_exists((By.CSS_SELECTOR, css_selector)),
                        'Github account element cannot be found on the page: %s' % self.driver.current_url)

    def test_footer_has_link_to_twitter_account(self):
        css_selector = 'a[href*="twitter.com/ammarnajjar"]'
        self.assertTrue(self.element_exists((By.CSS_SELECTOR, css_selector)),
                        'Twitter account element cannot be found on the page: %s' % self.driver.current_url)

    def test_footer_has_link_to_linkedin_account(self):
        css_selector = 'a[href*="linkedin.com/in/najjarammar"]'
        self.assertTrue(self.element_exists((By.CSS_SELECTOR, css_selector)),
                        'Linkedin account element cannot be found on the page: %s' % self.driver.current_url)

    def test_footer_has_link_to_xing_account(self):
        css_selector = 'a[href*="xing.com/profile/Ammar_Najjar"]'
        self.assertTrue(self.element_exists((By.CSS_SELECTOR, css_selector)),
                        'Xing account element cannot be found on the page: %s' % self.driver.current_url)

    def test_footer_has_link_to_datafeed_account(self):
        css_selector = 'a[href="/feed.xml"]'
        self.assertTrue(self.element_exists((By.CSS_SELECTOR, css_selector)),
                        'Data feed account element cannot be found on the page: %s' % self.driver.current_url)

    def test_tags_section_exists(self):
        css_selector = 'div[class="tag-list"]>ul>li'
        self.assertTrue(self.driver.find_elements_by_css_selector(css_selector),
                        'Tags cannot be found on the page: %s' % self.driver.current_url)

    def test_posts_section_exists(self):
        css_selector = 'ul[class="post-list"]>li'
        self.assertTrue(self.driver.find_elements_by_css_selector(css_selector),
                        'Posts cannot be found on the page: %s' % self.driver.current_url)

