---
layout: post
title: "Reactjs: Arrays in jsx"
date: Sun Nov 24 20:03:52 CET 2019
categories: development
tags: reactjs
---

When I tried out Reactjs [tutorial](https://reactjs.org/tutorial/tutorial.html) few months ago, I noticed that in the official [starter code](https://codepen.io/gaearon/pen/oWWQNa?editors=0010), they repeated same `div` elements in the `render()` method, just in case of change in the source, I will list it here:

{% gist ammarnajjar/a607a290ddf165d8ab49bac2a902caec original.jsx %}

From the fist look I did not like the repetition, even for a beginner in React, javascript basic array operations should be a familiar topic.

So I refactored that section using the [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) operation:

{% gist ammarnajjar/a607a290ddf165d8ab49bac2a902caec using_map.jsx %}

I do not think that this is so complecated to be understood for any React beginner, and I would recommend using similar concise code instead of repeating the same function calls or elements over and over again.

What do you think?
