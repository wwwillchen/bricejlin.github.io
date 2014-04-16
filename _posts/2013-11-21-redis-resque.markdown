---
layout: post
title:  Redis/Resque
date:   2013-11-21
categories: blog 2013
tags: rails ruby redis resque background gems
---

Today I learned how to use Resque/Redis to move my app’s emailing process to the background. This speeds things up for and really improves the user experience.

<!--more-->
My app, an opentable-clone app, takes in reservations from customers and emails a notification to the restaurant owner every time a reservation is made.

Before, when a user clicked submit on a reservation, he/she would typically have to wait till the email is processed/sent to be able to browse the site again. While it’s not bad for something small like a reservation, bigger apps that process larger sets of data would have a serious problem.

With Resque/Redis, the emailing is moved to a queue that gets processed separately, so after a user creates a reservation, he/she is automatically redirected back to the site without waiting on the mailing to happen.

So Resque and Redis are two separate tools. 

[Redis][redis] is a key-value store, often referred to as a NoSQL database. What differentiates it from something like MongoDB is that Redis stores data in RAM, but periodically writes to disk, giving it persistence. Redis is typically used for caches and other mechanisms to speed up web apps.

[Resque][resque] is a queueing system backed by Redis (commonly used for sending emails and processing data). It creates background jobs, putting them on multiple queues and processing them later.

Resque is composed of three things:
1 - A Ruby library for creating, querying and processing jobs
2 - A Rake task for starting a worker with processes jobs
3 - A Sinatra app for monitoring queues, jobs and workers

Check out this [Railscast][rcast] for more on setting up Resque and Redis for your Ruby on Rails app.

[redis]: http://redis.io
[resque]: https://github.com/resque/resque
[rcast]: http://railscasts.com/episodes/271-resque