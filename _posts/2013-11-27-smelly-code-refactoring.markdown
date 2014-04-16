---
layout: post
title:  Smelly Code Refactoring
date:   2013-11-27
categories: blog 2013
tags: code-smell long-methods refactoring ruby
---

New terms learned:

code smell - a hint that something has gone wrong somewhere in your code

In this post, we're going to deal with two kinds of code smells: Temporary Variable and Long Method

<!--more-->
Temporary variables tend to change state within a method, and as a method grows longer, it's easier for bugs to appear.

A long method is a method that does more than one thing.

Let's take a look at an example method:

{% highlight ruby %}
def guess(guess)
  mark = ''
  (0..3).each do |index|
    if exact_match?(guess, index)
      mark << '+'
    end
  end
  (0..3).each do |index|
    if number_match?(guess, index)
      mark << '-'
    end
  end
  @output.puts mark
end 
{% endhighlight %}

This is a guess method for a mastermind-type game where the player has to guess a secret 4-digit number and is given clues by way of pluses and minuses to reach the correct answer.

In this example, the temporary variable is mark. If you read through the method, you'll find that mark changes state a total of 8 times in the method. If anything goes wrong in either of the iterators, it will be difficult to track down where the problem lies.

This method is also trying to do a number of different things. We can easily break this chunky method down into several bite-sized methods.

First let's extract methods out of the giant guess method:

{% highlight ruby %}
def guess(guess)
  @output.puts '+'*exact_match_count(guess) + '-'*number_match_count(guess)
end
def exact_match_count(guess)
  exact_match_count = 0
  (0..3).each do |index|
    if exact_match?(guess, index)
      exact_match_count += 1
    end
  end
  exact_match_count
end
def number_match_count(guess)
  number_match_count = 0
  (0..3).each do |index|
    if number_match?(guess, index)
      number_match_count += 1
    end
  end
  exact_match_count
end
{% endhighlight %}

So far we broke up the methods into smaller ones. We can still continue to refactor the exact/number_match_count methods to eliminate the temporary variables:

{% highlight ruby %}
def exact_match_count(guess)
  (0..3).inject(0) do |count, index|
    count + (exact_match?(guess, index) ? 1 : 0)
  end
end 
def number_match_count(guess)
  (0..3).inject(0) do |count, index|
    count + (number_match?(guess, index) ? 1 : 0)
  end
end 
{% endhighlight %}

And there we have it! We went from this:

{% highlight ruby %}
def guess(guess)
  mark = ''
  (0..3).each do |index|
    if exact_match?(guess, index)
      mark << '+'
    end
  end
  (0..3).each do |index|
    if number_match?(guess, index)
      mark << '-'
    end
  end
  @output.puts mark
end 
{% endhighlight %}

To this:

{% highlight ruby %}
def guess(guess)
  @output.puts '+'*exact_match_count(guess) + '-'*number_match_count(guess)
end
def exact_match_count(guess)
  (0..3).inject(0) do |count, index|
    count + (exact_match?(guess, index) ? 1 : 0)
  end
end 
def number_match_count(guess)
  (0..3).inject(0) do |count, index|
    count + (number_match?(guess, index) ? 1 : 0)
  end
end 
{% endhighlight %}

Notice how there are no temporary variables to worry about, and each method has a specific job.

(This was an example taken from the RSpec Book. Highly recommended read for those trying to learn Behavior-Driven-Development / Test-Driven-Development.)