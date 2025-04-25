---
title: Documenting Ruby on Rails APIs with OpenAPI
author: Christophe Dujarric
category: Tech
image: blog/documenting-ror-apis.png
end_with_preview: true
---

The excellent Phil Sturgeon, API expert and reforester, is a well known OpenAPI evangelist since years. And since a few months, we're super proud to work with him, building a new knowledge base that supports API builders in their daily jobs. [Discover](https://docs.bump.sh/guides/) our guides and tutorials, whether you're new or advanced at building APIs, whether they're REST or Event-driven.

One key topic we've discussed over and over with our community is the obvious: what are the best practices in writing OpenAPI contracts while we're working with <insert yours> programming language? From high level recommendations down to code examples, Phil has your back.

You're building APIs with Ruby on Rails? Let me give you some appetizers. That will never replace the full guides, so make sure you bookmark those for when you're hungry enough.

## Code-first and Design-first, with OpenAPI

OK, we have an opinion about that. But that's only ours, and what matters is that you get the right tools and practices, so that at the end, that OpenAPI file is here. And to that end, we're completely agnostic. 

OpenAPI is today the best way to publish the exhaustive description of your APIs, in a way that both humans and machines can consume it. The guides will walk you through how you can generate contracts, and use it to build robust APIs.

## Generating OpenAPI docs from your code

Starting with from the code? [Let Phil show you](https://docs.bump.sh/guides/openapi/code-first-rails/) with concrete (code) examples how to use `RSpec`and `Rswag` to initiate an OpenAPI document.

Now good documentation requires context, accurate descriptions, examples. The guide also describes how to use the `Rswag` DSL and add headers, schemas, responses, and so on.

## Building robust API contracts, and APIs

Writing API contracts before writing code is a great practice. Now there two things you should coonsider from here:

1. Are your contracts accurately and thoroughly describing your API?
2. Is your API responding as expected (and described in those contracts)?

Other said: are there any holes in the racket? [You'll walk through](https://docs.bump.sh/guides/openapi/design-first-rails/) how to use the `openapi_first` and `openapi_contracts` gem. The combination of both, with OpenAPI contracts at the core, gives you control over the docs vs code drift problem.

The icing on the cake? Phil worked out sample OpenAPI files, available on public GitHub repos AND deployed on Bump.sh. Find them at the end of the guides.

Takeways from this: the key nature of API contracts, and the OpenAPI specification. Whether it's your starting point or something that you're catching up with, major programming languages offer a wide set of (Open Source) tools that help getting the best out of it. Writing an OpenAPI contract is not adding more work: it's avoiding otherwise inevitable technical debt.

We hope you'll enjoy those guides. Come back for more very soon, on other languages and other topics.

Actually, if you have some expertises you'd like to share: [contribute](https://github.com/bump-sh/docs?tab=readme-ov-file#contributing)! We'll be happy to support you with it.
