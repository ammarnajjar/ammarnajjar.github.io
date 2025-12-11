---
slug: python-descriptors
title: 'Book Review: Python Descriptors'
authors: ammarnajjar
date: 2019-09-03 21:03:49 +0200
tags: [python, book-review]
---
### About the book:

- Author: Jacob Zimmerman
- ISBN (pbk): 978-1-4842-3726-7
- ISBN (electronic): 978-1-4842-3727-4
- URL: [https://link.springer.com/book/10.1007%2F978-1-4842-3727-4](https://link.springer.com/book/10.1007%2F978-1-4842-3727-4)

<!-- truncate -->

### Summery:

This book has two parts:

- First on explaining what descriptors are, data vs non-data ones, and basic implementation of the built in `classmethod`, `staticmethod` and `property` descriptors.

- Second on showing how to implement your custom descriptors.

### Highlights:

Chapter 4: Descriptors in the Standard Library

- The property Class

```python
class property:
    def __init__(self, fget=None, fset=None, fdel=None):
        self.fget = fget
        self.fset = fset
        self.fdel = fdel
    def __get__(self, instance, owner):
        if instance is None:
            return self
        elif self.fget is None:
            raise AttributeError("unreadable attribute")
        else:
            return self.fget(instance)
    def __set__(self, instance, value):
        if self.fset is None:
            raise AttributeError("can't set attribute")
        else:
            self.fset(instance, value)
    def __delete__(self, instance):
        if self.fdel is None:
            raise AttributeError("can't delete attribute")
        else:
            self.fdel(instance)
    def getter(self, fget):
        return type(self)(fget, self.fset, self.fdel)
    def setter(self, fset):
        return type(self)(self.fget, fset, self.fdel)
    def deleter(self, fdel):
        return type(self)(self.fget, self.fset, fdel)
```

- The classmethod descriptor

```python
class classmethod:
    def __init__(self, func):
        self.func = func
    def __get__(self, instance, owner):
        return functools.partial(self.func, owner)
```

- The staticmethod descriptor

```python
class staticmethod:
    def __init__(self, func):
        self.func = func
    def __get__(self, instance, owner):
        return self.func
```

### Opinion

I enjoyed reading this book, especially the first part, it shows a view port of a developer who is not involved in the core development of python itself. He sometimes also says, ask a core developer if you wanna get the exact reasoning behind it 😄

You don't need an editor open deside you while reading, so I pretty much read it on the bus.

### Conclusion:

- Level: Advanced
- I recommend this book for python developer who like to know what is going under the hood, twinkle with the interiors functionality of python, and curious how every thing works.

<a href="#" class="go-to-top">Go to Top</a>