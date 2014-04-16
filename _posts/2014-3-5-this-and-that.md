---
layout: post
title: Javascript Scoping - this vs that
date:   2014-3-5
categories: blog 2014
tags: javascript bind jquery
---

So I recently came across a Javascript example that challenged my knowledge of
the `this` concept. `this` is one of those scoping concepts that I find difficult
to describe but easier to show when used in an example. So let's start out with
the object below:

```js
var person = {
  name: 'Brice Lin',
  age: 24,
  getInfo: function() {

    console.log(this.age);

    (function() {
      console.log(this.name);
    }());

  }
};
```
<!--more-->

In this example, the `getInfo` method calls two things: `console.log` and
a self-invoked anonymous function. One is supposed to print the person's age, and
the other is supposed to print the person's name.

Now there is no good reason to be writing your code like this, but I can't think
of a better example, so just work with me!

Once I instantiate the `person` object and call `person.getInfo();` though, my
output is:

```
24
undefined
```

Why didn't the function calling `console.log` on `this.name` work? Isn't `this`
still referencing the `person` object? The answer is no. `this` always belongs
to the object that calls it. In this case, it's the anonymous function and
not the `person` object that called it and since the anonymous function doesn't
have a `name` property, it returns `undefined`.

The tricky thing about `this` is that what it references to changes based on who
calls it. This is common when you are building an object by which to create
different instantiations. Then `this` will refer to each instantiation and not
just the main constructor object.

```js
function Human() {
  this.gender = 'unknown';
}

var sally = new Human();
sally.gender = 'female';

var billy = new Human();
billy.gender = 'male';

sally.gender // 'female'
billy.gender // 'male'
```

In our previous example, in order to make both instances of `this` refer to the `person`
object, we simply have to set a variable that holds `this` when `this` is referencing
`person`.

```js
var that = this;
```

So the new code will look like:

```js
var person = {
  name: 'Brice Lin',
  age: 24,
  getInfo: function() {
    var that = this;

    console.log(that.age);

    (function() {
      console.log(that.name);
    }());

  }
};
```

Now we know since `that` is `this` when `this` references `person`, we can use
`that` in different scopes knowing it's always going to refer to `person`.

Now when we call `person.getInfo()`, we will get:

```
24
Brice Lin
```

For those using jQuery, there is a `bind()` function that accomplishes a similar
thing, albeit having a slower runtime performance:

```js
var person = {
  name: 'Brice Lin',
  age: 24,
  getInfo: function() {

    console.log(this.age);

    (function() {
      console.log(this.name);
    }.bind(this)());

  }
};
```
