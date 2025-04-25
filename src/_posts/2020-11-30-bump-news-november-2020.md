---
title: Bump News November 2020
author: Anthony Lionnet
category: Company
image: blog/bump-news-november-2020.png
---


Let's start this blog by publishing our first monthly changelog, which is the occasion to write about what's happening at Bump every month, wether it is about company announcements, new features, and everything under the hood.

## Team

Our team has grown and as you may have noticed, we welcomed [Paul](/about) two months ago, who joined us as a Backend Engineer.
We are on a mission which, should you choose to accept it, is to help developers work together to create better API ecosystems.

Want to be part of it? Find below our open positions:

- [Backend Engineer](mailto:hello@bump.sh?subject=Never gonna give you up)
- [Developer Relation](mailto:hello@bump.sh?subject=Never gonna let you down)

## Product

We've been talking to our users over the last few weeks, and great feedbacks came out of it. What we can say is that you have been heard: we have started to focus on improving our OpenAPI and AsyncAPI support, and on adding more [customization options](https://docs.bump.sh/help/customization-options/), let's roll.

### Show verbs in navigation

Clear navigation is essential to be able to quickly find our way through documentation. Until now, you were able to customize your navigation UI by "Groups only" or "Groups and operations". But we felt that it could be enhanced. So you can now [display "Groups and operations with verbs"](https://docs.bump.sh/product-updates/2020/11/18/show-verbs-in-navigation/), making it easier and faster to get the request type regarding each operation or message.

### Add a favicon to your documentation

Because we want you to have a documentation that represents your product and your company, and because many of you wanted it too, it is now possible to [add a custom favicon](https://docs.bump.sh/product-updates/2020/11/12/add-a-favicon-to-your-documentation/) to a documentation. An advantage that meets our desire to offer the best experience in terms of documentation customization.

### Deprecation support

In an API lifecycle, deprecation is something you will/did encounter as your application is constantly changing, evolving.
We now [highlight deprecated elements](https://docs.bump.sh/product-updates/2020/11/22/depreciation-support/) in a documentation, identifying it wether you use an OpenApi or AsyncApi specification. It is a foundation stone in building a more complete deprecation support to come.

### External references support

Our current hobbyhorse is to fully support external references, and we are working toward this goal step by step to have something efficient and well done. This month has been devoted to bug fixes and the development of the `bump resolve` command to used with the [Bump CLI](https://github.com/bump-sh/bump-cli), allowing the local resolution of external references.
