---
layout: post
title:  "Custom Selenium Webdrivers using Decorators"
date:  2017-04-09 07:33:18 +0200
categories: development
tags: development python selenium webdriver decorator metaprogram
---
<a name="Top" />

### The main question:
How to create custom selenium webdriver classes dynamically with a parametrized browser binary path?

### The motivation:
Working on website functional testing using selenium webdriver, generates the urge to run tests using different versions of the most commonly used browsers these days, in parallel on the same machine.  
Tests can use [parametrized](https://pypi.python.org/pypi/parameterized/0.6.1) where the parameter can be the driver class itself, and here comes the need to generate drivers classes dynamically and pass them as parameters to the tests.

### The idea:
In order to be able to use more than one version of a browser, first of all one needs to install these versions locally, then create a custom webdriver class generator with a custom binary path and use these generated classes in the tests wihtout being initialized.

### The procedure:
I am going to explain the steps I followed regarding the most pobular browsers these days: [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/products/) and [Google Chrome](https://www.google.com/chrome/).
- Download Firefox versions you want to use in testing from [Mozilla releases archive](https://ftp.mozilla.org/pub/firefox/releases/).
- For Chrome it might take some effort, by the instructions are clear on the [Chromium project site](https://www.chromium.org/getting-involved/download-chromium), I am going to list them here just in case they got missing:
    - Look in [googlechromereleases.blogspot.com](http://googlechromereleases.blogspot.com/search/label/Stable%20updates) for the last time the wanted version was mentioned.
    - Loop up that version history (e.g.: "44.0.2403.157") in the Position Lookup
    - In this case it returns a base position of "330231". This is the commit of where the 44 release was branched, back in May 2015.*
    - Open the continuous builds archive
    - Click through on your platform (Linux/Mac/Win)
    - Paste "330231" into the filter field at the top and wait for all the results to XHR in. 
    - Eventually I get a perfect hit: [commondatastorage.googleapis.com/chromium-browser-snapshots](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?)
    - Sometimes you may have to decrement the commit number until you find one.
    - Download and run!

- Now you have all your versions ready and able to run, there are many options where you can save them where they can be accessable system wide. One option would be to save them in an environment variables.
- Write a custom webdriver class generator, where the binary path is a parameter and can be dynamically changed in selenium tests. But the first problem I faced here was to be able to change the `__init__` method for our custom class and pass the custom binary path to it. I found out that it can be done by deriving from the class `type`:

{% highlight python %}
binary = FirefoxBinary(bin_path)
def __init__(self, firefox_binary=binary):
    webdriver.Firefox.__init__(self, firefox_binary=firefox_binary)

Firefox = type('Firefox', (webdriver.Firefox, ), {'__init__': __init__})
{% endhighlight %}

- For google chrome, changing the binary path is done a little bit differently:

{% highlight python %}
chrome_options = Options()
chrome_options.binary_location = bin_path

def __init__(self, chrome_options=chrome_options):
    webdriver.Chrome.__init__(self, chrome_options=chrome_options)

Chrome = type('Chrome', (webdriver.Chrome, ), {'__init__': __init__})
{% endhighlight %}

- It would be more practical to put these functionality into decorators. For this purpose I wrote two [decorators](https://wiki.python.org/moin/PythonDecorators) one to generate Firefox webdriver objects:

{% highlight python %}
class CustomFirefox:

    def __init__(self, bin_path):
        self.bin_path = bin_path
    
    def __call__(self, cls):
        binary = FirefoxBinary(self.bin_path)
        
        def __init__(self, firefox_binary=binary):
            webdriver.Firefox.__init__(self, firefox_binary=firefox_binary)

        Firefox = type('Firefox', (webdriver.Firefox, ), {'__init__': __init__})
        return Firefox
{% endhighlight %}

and the other for Chrome webdriver objects:

{% highlight python %}
class CustomChrome:

    def __init__(self, bin_path):
        self.bin_path = bin_path
    
    def __call__(self, cls):
        chrome_options = Options()
        chrome_options.binary_location = self.bin_path

        def __init__(self, chrome_options=chrome_options):
            webdriver.Chrome.__init__(self, chrome_options=chrome_options)

        Chrome = type('Chrome', (webdriver.Chrome, ), {'__init__': __init__})
        return Chrome
{% endhighlight %}

- Now all what one needs to do is to cast the appropriate decorator onto a class, pass the path to the custom binary. For example:
{% highlight python %}
@CustomFirefox('<path_to_firefox_binary>')
class Driver: pass 
print(Driver)
{% endhighlight %}
The output would look like:

{% highlight bash %}
<class '__main__.Firefox'>
{% endhighlight %}
To open the browser, just call the newly created webdriver object:
{% highlight python %}
Driver()
{% endhighlight %}

- This works fine, except that the original meta-data from webdriver class are gone, so in order to keep the meta-data from the parent class `webdriver.Firefox` or `webdriver.Chrom` we need to save that data first before changeing the `__init__` method, and then restore them afterwards, for example for Firefox decorator:

{% highlight python %}
meta_data = dict(webdriver.Firefox.__dict__)
meta_data['__init__'] = __init__
Firefox = type('Firefox', (webdriver.Firefox, ), meta_data)
{% endhighlight %}

Now whe we check the returned class, we get:

{% highlight bash %}
<class 'selenium.webdriver.firefox.webdriver.WebDriver'>
{% endhighlight %}

- A little tweek might be helpful to include the default case where no path is passed as a parameter, so that the decorator generate the default webdriver with the default browser version installed on the system. 

- Now it is possible to create a drivers factory to generate custom webdrivers from a list of binary paths, where the parameters to that factory are the decorator and the list of binary paths:
{% highlight python %}
def driver_factory(decorator, bin_paths):
    drivers = []
    for bin_path in bin_paths:
        @decorator(bin_path)
        class CustomDriver: pass 
        drivers.append(CustomDriver)
return drivers
{% endhighlight %}

- Voala! The webdriver is ready to be used in tests!

- The complete script would look like:

{% gist ammarnajjar/827aa1638377b265148daad20dbda7d8 %}

It might be possible to do the same functionality using a meta class. I will look into that later.
If you have any comments or suggestions please share it with me.

[Go to Top](#Top)
