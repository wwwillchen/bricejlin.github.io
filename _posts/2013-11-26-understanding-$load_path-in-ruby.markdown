---
layout: post
title:  Understanding $LOAD_PATH in Ruby
date:   2013-11-26
categories: blog 2013
tags: ruby $load_path require
---

While going through an example from the Rspec Book, I came across this bit of code:

**env.rb**

{% highlight ruby %}
$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'codebreaker'
{% endhighlight %}

My initial reaction was to just be confused, then accept it and move on. But I know it’s eventually going to come back and haunt me so I decided to look into it.

<!--more-->

To better understand what’s going on, this is the structure of my code ( dashes represent directories)

{% highlight ruby %}
- codebreaker
   - features
     - support
       env.rb
   - lib
     - codebreaker
       game.rb
     codebreaker.rb
{% endhighlight %}

First, I tried to observe what was going on using just the knowledge of Ruby that I already know:

- The "<<" is the method that pushes elements into an array, therefore, $LOAD_PATH is some kind of array
- Require ‘codebreaker’ means to load a file (located in same directory) as env.rb named ‘codebreaker.rb’. Interesting, there exists no codebreaker.rb in the same directory.
- I’m not exactly sure what the File.expa… part means, but if I follow the ../'s (terminal action to go back a dir) starting from that file (env.rb), it looks like it goes:

{% highlight ruby %}
env.rb -> support -> features -> codebreaker -> lib
{% endhighlight %}

Funny, lib also happens to be where the required codebreaker.rb lies. So it looks like that piece of code gives it env.rb the ability to write

{% highlight ruby %}
require 'codebreaker'
{% endhighlight %}

without having to go through require '../../path_to/codebreaker'

At this point, I have a general idea of what’s going on, but I should go deeper and figure out what the ruby code does exactly.

After a quick search, I found that __FILE__ just references the relative path of current filename - in this case, env.rb. More info [here][__FILE__].

File.expand_path converts a pathname to an absolute pathname. More info [here][expand_path].

{% highlight ruby %}
File.expand_path('../../../lib', __FILE__)
{% endhighlight %}

means starting from __FILE__, follow the path down ../../../lib, then return the absolute path of lib

and so that absolute path is being pushed into $LOAD_PATH

Ruby File.expand_path documentation [here][File-doc]

[__FILE__]: http://stackoverflow.com/questions/224379/what-does-file-mean-in-ruby
[expand_path]: http://apidock.com/ruby/File/expand_path/class
[File-doc]: http://ruby-doc.org/core-2.0.0/File.html#M002540
