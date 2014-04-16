---
layout: post
title:  Big-O Analysis
date:   2014-1-1
categories: blog 2014
tags: big-o-notation analysis optimization algorithms
---

You've heard it said, that "premature optimization is the root of all evil."

As somebody who loves efficiency, I've fallen prey to it's insatiable need for speed in various occasions of my short coding life. With that said, here is what I learned so far about Big-O notation/analysis!

<!--more-->
Big-O analysis is a form of measurement for how long one algorithm takes to run a function versus another algorithm given a certain input size. 


There are many different types of algorithms and big-o notation is a simple way to group those algorithms by relative efficiency.

With big-o notation, you'll probably be seeing measurements like O(n<sup>n</sup>), O(n), O(log<sub>n</sub>), O(n<sup>2</sup>), O(&radic;n), O(1). By the end of this blog post, you'd have understood about half of that. But you're so smart, I bet you can figure out the rest.

Here is the general procedure for doing Big-O Analysis:

1. Figure out what the input is and what n represents
2. Express number of operations algorithm performs in terms of n
3. Eliminate all but highest order terms
4. Remove all constant factors

Let's start with a simple example I found from [Programming Interviews Exposed][PIE]: create a method that returns the maximum value stored in an array of non-negative numbers. The size of the array is _n_. We will solve the problem in two different ways and see which one is faster using big-o analysis.

I'll be writing this JavaScript because that's the current language I'm learning and want to brush up on. 

First implementation:

{% highlight javascript %}
function compareToMax(array) {
  if (array.length <= 0) {
    return "Put some numbers in your array man!";
  }

  var curMax = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > curMax) {
      curMax = array[i];
    }
  }
  return curMax;
}
{% endhighlight %}

Second implementation:

{% highlight javascript %}
function compareToAll(array) {
  if (array.length <= 0) {
    return "Put some numbers in your array man!";
  }

  var curMax = array[0];

  for (var i = array.length - 1; i > 0; i--) {
    var isMax = true;
    for (var j = 0; j < array.length; j++) {
      if (array[j] > array[i]) {
        isMax = false;
      }
    }
    if (isMax) break;
  }
  return array[i];
}
{% endhighlight %}

Both of these functions return the correct value. Can you guess which one is more efficient? This is where we use big-o analysis in order to predict an algorithm's performance without having to actually implement it.

Let's follow the 4-step procedure:

1. n is the array size
2. n + 2 (n for array size, and 2 for running the if statement and initializing curMax var)
3. n + 2
4. n

The compareToMax function is O(n). For every additional n elements in the array, the output increases linearly by n. 

Now let's apply the 4-step procedure to the second function:

1. n is the array size
2. n<sup>2</sup> + 2 (n for each n elements, and 2 for if statement/initializing curMax var - assuming worst case scenario that max element is at the end)
3. n<sup>2</sup> + 2
4. n<sup>2</sup>

The compareToAll function is O(n<sup>n</sup>). Notice that there were two for loops, each looping through the array.

The reason we drop constants and only keep highest-order term is because as n approaches infinity, the difference between n and n + 2 is so insignificant, it wouldn't even matter. Likewise, for n + n<sup>2</sup> time, difference between n and n<sup>2</sup> is insignificant, so all but highest-order term are dropped

So we have compareToMax at O(n) and compareToAll at 0(n<sup>2</sup>). From this, we can know that as n increases, the algorithm for compareToMax will always be faster than compareToAll, n times faster.

The fastest running time for any run-time analysis is O(1), aka constant running time. An algorithm with constant running time will always take the same amount of time to run regardless of input size.

That's it for now. As an efficiency buff, I will definitely be revisiting this topic in the near future. But I have an interview to prepare for and lots of JavaScript to learn now. So peace!

[PIE]: http://www.amazon.com/Programming-Interviews-Exposed-Secrets-Landing-ebook/dp/B008SGNJOW/ref=sr_1_1?ie=UTF8&qid=1388635250&sr=8-1&keywords=programming+interviews+exposed