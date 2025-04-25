---
title: Sponsoring FastAPI
author: Christophe Dujarric
category: Company
image: blog/sponsoring-fastapi.png
end_with_preview: false
---

We’ve said it before: we love Open Source.

We’re sponsors of [OpenAPI](/openapi), [AsyncAPI](/blog/what-is-asyncapi), OpenAPI Generator, and even though most of our time is focused on building a better tool for our users, we take pride in contributing to Open Source projects and communities whenever we have a chance. Whether through a small Pull Request, a community meeting or a conference.

## What is FastAPI?

It’s about APIs, and it's Fast. No kidding.

Now that we let Captain Obvious give you the pitch, some more info if you’ve never heard about it. It’s a Python framework that facilitates the creation of APIs and is based on OpenAPI and JSON Schema. It’s built to speed up the code AND how fast you ship features, reduce the amount of bugs, and improve developer experience. What you can expect of a robust framework, in all.

Sebastian ([tiangolo](https://github.com/tiangolo)) started this project in 2018, and FastAPI now claims over 62k stars and over 5k forks on GitHub. Not to mention the big names using it (like Microsoft, Netflix, and Cisco - OK, I said it).

## So why are we sponsoring it?

Two reasons: we love any project that uses [OpenAPI](/blog/openapi-v4-moonwalk), and we don’t code much with Python ourselves. Which makes it complicated to contribute to anything else than docs. Which are really cool by the way, and already translated in large parts to 19 languages.

So we’re a Gold Sponsor. We hope our support will help Sebastian and the entire community maintain this amazing project.

## I’m here to code; how does it work?

As we said a few lines above, FastAPI works with OpenAPI. What’s really cool is that it automatically generates an API contract based on your Python code. No hassle; you can then just push it our way, and we’ll take care of publishing it.

Well, our code will do it, not us.

So, providing that you have bootstrapped your Bump.sh account ([account initialization and CLI install](https://docs.bump.sh/help/continuous-integration/cli/)), all you’ll need is:

```bash
bump deploy http://127.0.0.1:8000/openapi.json --doc my-documentation --token my-bump-token
```

And the magic happens.

Have a look at further magic with our [CI Integration](https://docs.bump.sh/help/continuous-integration/)!

## It’s OK Swagger UI; you can REST now

Swagger UI and Redoc are both available directly in FastAPI, so why should you bother switching to Bump.sh?

See it like this. It a bit like when old Ben turned into pure Force to assist Luke. We’re Luke (and yes, there’s still much to learn for us).

We’ve learned a lot from those tools, and improved key parts they’re missing:

- Fully hosted, SEO-friendly, stunning API documentation portal
- Automated change detection, branching and versioning
- Access Management features
- OK, you know what? A customer of our switched from Swagger UI, [they can tell better](https://bump.sh/customers/aviobook).

Last but not least: Bump.sh is not just code. It’s also the humans who built it, and who’d love to hear from you and assist with anything. [Drop us a message](mailto:hello@bump.sh) if you need.

Until then, have fun!
