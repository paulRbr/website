---
title: Documenting PHP APIs with OpenAPI
author: Phil Sturgeon
category: Tech
image: blog/documenting-php-apis.png
end_with_preview: true
---

The Bump.sh team has been busy adding brilliant features to the hosted service and their command-line tools, and whilst they’ve been doing that I’ve been typing up infinite guides helping people learn how to get OpenAPI out of (or into!) their various programming languages and web frameworks.

What are the best practices in writing OpenAPI contracts while we're working with PHP? From high level recommendations down to code examples, these guides should help you out, but where to start?

### **Code-first and Design-first, with OpenAPI**

There’s a lot of strong opinions around the best approach here, but whichever approach you take, what matters is that you get the right tools and practices. The main thing is getting an OpenAPI document to work with, and to that end, Bump.sh is completely agnostic.

OpenAPI stands as the optimal method for publishing comprehensive API descriptions, accessible to both humans and machines alike. These guides will lead you through generating API descriptions, utilizing them for documentation, and delving deeper into how OpenAPI accelerates the development of robust APIs.

### **Generating OpenAPI docs from your code**

If you’d like to create an [OpenAPI documentation](https://docs.bump.sh/help/specification-support/openapi-support/) for an existing API, one approach is to pop some annotations into your code, helping flesh out what the requests and responses are, covering validation rules, examples values, and as much description as you can fit into your code.

[This guide will cover](https://docs.bump.sh/guides/openapi/code-first-laravel/) using [Swagger-PHP](https://zircote.github.io/swagger-php/) you can do this with old-school “docblock” style code comments, or PHP 8+ users can use the newer Annotations approach, and either way you’ll be able to export OpenAPI from your actual API. The guide is written for a Laravel PHP audience, but Swagger-PHP works just fine regardless of what framework is being used, and for native PHP applications too.

Combine this with Continuous Integration and Bump.sh CLI’s `deploy` command, and you’ll never have out-of-date API documentation again.

### **Building robust API descriptions and APIs**

Writing API descriptions before writing code is a great practice because you can describe the API you would like to build, not just the one you have built.

The two benefits of this approach are:

1. Why not leverage OpenAPI to handle request validation instead of writing a bunch of code to do that.
2. Why not let OpenAPI handle the contract testing for you, so you don’t have to write a bunch of code to do that as well.

At first, it sounds wild, but when you realize how many places API developers repeat the same API contracts, you start realizing OpenAPI is already covering that, and you can start treating it as a single source of truth for most of the API lifecycle.

[You'll walk through](https://docs.bump.sh/guides/openapi/design-first-laravel-php/) how to use the `membrane/laravel` and `hotmeteor/spectator` packages to handle validation and contract validation, and finally have confidence you have control over the docs vs code drift problem.

Hopefully these guides help, but if that’s not, we’ve also knocked up sample OpenAPI documents available on public GitHub repos, AND deployed on Bump.sh. Find them at the end of the guides.

The main takeaways emphasize the critical role of API contracts and the OpenAPI specification. Regardless of whether it's your initial step or a catch-up process, major programming languages offer a wide array of (Open Source) tools to maximize its benefits. Creating an OpenAPI description isn't about adding extra work; it’s preventing technical debt accumulation, and for the API Design First workflow it even helps speed up the development process.

We hope you'll enjoy those guides. Come back for more very soon, on other languages and other topics.

Actually, if you have some expertises you'd like to share: [contribute](https://github.com/bump-sh/docs?tab=readme-ov-file#contributing)! We'll be happy to support you with it.
