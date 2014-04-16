---
layout: post
title:  Sorting Algorithms - Part 1
date:   2014-1-16
categories: blog 2014
tags: sorting algorithms efficiency
---

When I decided I wanted to get into programming several months ago, I ran into a lot of articles talking about big data and [measuring algorithm efficiency]({% post_url 2014-1-1-big-o-analysis %}). It was a lot about theory and formulas, which my poor little brain could barely grasp at the time, so I overlooked it in search of more tangible hard skills like HTML/CSS and Ruby/Rails.

After several months of getting my hands dirty, I knew I had to come back to algorithms. If I was going to be a well-rounded software engineer, I couldn't limit myself to just web development knowledge. This will be my foray into algorithms.

<!--more-->
I will start with three of the basic sorting algorithms out there: Bubble Sort, Selection Sort, and Insertion Sort.

To learn more about each algorithm, let's apply each of them to this same array of numbers: 3 1 4 2

I purposely chose a small amount of numbers mainly because I'm lazy but also I believe it's enough so you get the point.

Let's begin!

## Bubble Sort (Larger numbers "bubble" to the top.)

**Running Time:** O(n<sup>2</sup>)

**How It Works:** Iterate over array of numbers repeatedly, comparing neighboring pairs and swapping them if they are in the wrong order, until all numbers are in the correct position.

(NOTE: Bolded numbers are the numbers that will be swapped. I've also included links that contain a gif of the algorithm in action for better visual.)

[Wiki - Bubble Sort Algorithm][bsa]

First Round:

**3** **1** 4 2 -> 1 3 **4** **2** -> 1 3 2 4

Second Round:

1 **3** **2** 4 -> 1 2 3 4

{% highlight javascript %}
function bubbleSort(values) {
  var swapped, i, temp;

  do {
    swapped = false;
    for (i=0; i < values.length-1; i++) {
      if (values[i] > values[i+1]) {
        temp = values[i];
        values[i] = values[i+1];
        values[i+1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return values;
}
{% endhighlight %}

**Remarks:** Only useful if list is nearly sorted. Otherwise, not the best algorithm for sorting large lists.


## Selection Sort

**Running Time:** O(n<sup>2</sup>)

**How It Works:** Step through array of numbers, pick smallest number, swap it with the leftmost number. Begin at 2nd element of array and repeat, until all numbers are sorted.


[Wiki - Selection Sort Algorithm][ssa]


First Round:

**3** **1** 4 2 -> 1 3 4 2

Second Round:

1 **3** 4 **2** -> 1 2 4 3

Third Round:

1 2 **4** **3** -> 1 2 3 4

{% highlight javascript %}
function selectionSort(values) {
  var smallestInd, temp;
  var i, j;

  for (i = 0; i < values.length; i++) {
    smallestInd = i;
    for (j = i + 1; j < values.length; j++) {
      if (values[smallestInd] > values[j]) {
        smallestInd = j;
      }
    }
    temp = values[i];
    values[i] = values[smallestInd];
    values[smallestInd] = temp;
  }

  return values;
}
{% endhighlight %}

**Remarks:** Not the best algorithm for sorting large lists.


## Insertion Sort

**Running Time:** O(n<sup>2</sup>)

**How It Works:** Iterates over each number, inserting it to where it belongs.


[Wiki - Insertion Sort Algorithm][isa]


First Round:

**3** 1 4 2

Second Round:

3 **1** 4 2 -> 1 3 4 2

Third Round:

1 3 **4** 2

Fourth Round:

1 3 4 **2** -> 1 3 **2** 4 -> 1 2 3 4

{% highlight javascript %}
function insertionSort(values) {
  var i, j, currValue;

  for (i = 1; i < values.length; i++) {
    currValue = values[i];
    for (j = i-1; j >= 0 && currValue < values[j]; j--) {
      values[j+1] = values[j]; 
      values[j] = currValue; 
    }
  }
  return values;
}
{% endhighlight %}

**Remarks:** Not the best algorithm for sorting large lists.


So far, it looks like all of these algorithms suck. But they are simple and easy to understand. In another post, I will be covering some more advanced and much more efficient algorithms. Until then, check out this site that animates speeds of different algorithms: [www.sorting-algorithms.com][sa].

[bsa]: http://en.wikipedia.org/wiki/Bubble_sort
[isa]: http://en.wikipedia.org/wiki/Insertion_sort
[ssa]: http://en.wikipedia.org/wiki/Selection_sort
[sa]: http://www.sorting-algorithms.com/
