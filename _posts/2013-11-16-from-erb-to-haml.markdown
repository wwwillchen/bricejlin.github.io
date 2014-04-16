---
layout: post
title:  From ERB to HAML
date:   2013-11-16
categories: blog 2013
tags: rails haml erb
---

So I recently switched from erb to haml, and absolutely loved it. It took some getting used to at first, but it’s fairly easy to pick up after a few tries.

<!--more-->
To install in Rails:

-  add gem ‘haml’ to your Gemfile
-  replace your `html.erb` tags with `html.haml`
-  The hardest part for me was creating custom attributes.

In regular html, it’d be:

{% highlight html %}
<nav class=”navbar navbar-default” role=”navigation”>
{% endhighlight %}

In haml, you’d write it as:

{% highlight haml %}
%nav.navbar.navbar-default{ role: "navigation" }
{% endhighlight %}

Haml has a very CSS’y syntax, attaching [dot]classname to html tag. Same would apply for id’s (`nav#navbar`)

Another example would be:

**html:**

{% highlight html %}
<button class=”navbar-toggle” type=”button” data-toggle=”collapse” data-target=”#bs-example-navbar-collapse-1”>
{% endhighlight %}

**haml:**

{% highlight haml %}
%button.navbar-toggle{ type: “button”, data:{ toggle: “collapse”, target: “#bs-example-navbar-collapse-1” }
{% endhighlight %}

Notice that with haml, you must separate each attribute with a comma, or else you will get errors.

Check out the documentation [here][haml-doc].

[haml-doc]: http://haml.info/docs.html