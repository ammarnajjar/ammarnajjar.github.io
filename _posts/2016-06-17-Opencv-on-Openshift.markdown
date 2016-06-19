---
layout: post
title:  "Opencv on Openshift"
date:   2016-06-17 18:02:02 +0200
categories: development
tags: development python opencv openshift
---
When I wanted to intall opencv on my python-2.7 openshift online cartridge I faced the problem of quota limitation to 1GB.  
I found this [blog post](https://codingexodus.blogspot.de/2013/04/how-to-install-opencv-on-openshift.html) by Stephen Nneji discussed how to use DIY cartridge and install python and opencv manually. Another [blog post](http://kumarcode.com/How-to-install-OpenCV-on-OpenShift/) by Nikhil Kumar used the Python-2.7 cartridge template to reduce the size of compiled opencv.  
I collected the complete steps and put them in a single [bash script](https://github.com/ammarnajjar/opencv_on_openshift_online/blob/master/install.sh).

To run this script in your openshift Python-2.7 cartridge, run the following command:
{% highlight bash %}
$ wget https://raw.githubusercontent.com/ammarnajjar/opencv_on_openshift_online/master/install.sh && bash install.sh
{% endhighlight %}

Then test importing opencv:
{% highlight python %}
> python
Python 2.7.11 (default, Mar 31 2016, 20:46:51) 
[GCC 5.3.1 20151207 (Red Hat 5.3.1-2)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> 
{% endhighlight %}

