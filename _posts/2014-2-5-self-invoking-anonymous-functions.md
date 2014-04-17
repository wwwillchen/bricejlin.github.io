---
layout: post
title: Javascript Self-Invoking Anonymous Function 
date:   2014-2-5
categories: blog 2014
tags: javascript iife
---

**Self-Invoking Anonymous Function**

A self-invoking anonymous function (or immediately invoked function expression - IIFE) runs automatically after it has been defined, thanks to the `()` at the end and looks like this:

{% highlight javascript %}
  (function() {
    //code code code
  }());
{% endhighlight %}

<!--more-->

**Why is it beneficial?**

Because of the enclosing `()`'s, the function encapsulates its own variables/functions so they don't clutter the global environment. Say if there is a `doStuff()` function in the IIFE, it is safely hidden away so that another `doStuff()` function from another script/library can be used without causing problems. 

You will find that a lot of libraries are actually giant IIFEs.

Let's look at the source code of [jQuery v1.11.0][jQ]:

{% highlight javascript %}
  (function( global, factory ) {
    //code code code
  }( /*more code code*/ {
    //code code code
  }));
{% endhighlight %}

Finally, you can find the same thing happening in [RequireJS][RJS]:

{% highlight javascript %}
  (function( global ) {
  //code code code
  }(this));
{% endhighlight %}

Andddd in [AngularJS][AJS]:

{% highlight javascript %}
  (function(window, document, undefined) {
  //code code code
  })(window, document);
{% endhighlight %}

And what's happening here is pretty much a function has parameters: `window`, `document`, `undefined`. And it is immediately invoked with arguments: `window` and `document`. The `undefined` parameter is there to ensure undefined is actually undefined and not some other value. (Though in ECMAScript 5 and later, `undefined` has been changed to be read only)


[jQ]: http://code.jquery.com/jquery-1.11.0.js
[RJS]: https://github.com/jrburke/requirejs/blob/master/require.js
[AJS]: https://ajax.googleapis.com/ajax/libs/angularjs/1.2.11/angular.js
