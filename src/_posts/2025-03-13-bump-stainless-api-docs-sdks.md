---
title: "Stainless x Bump.sh: Publishing API docs with custom code samples powered by SDKs"
author: Christophe Dujarric
category: Integration
image: blog/stainless_integration_announcement.png
end_with_preview: true
---

It all started with a PR on OpenAI’s open-source repository.

Alex Rattray ([Stainless](https://www.stainless.com/)’s CEO) reviewed one of our suggestions to improve OpenAI’s OpenAPI — try saying that out loud multiple times, quickly! I have to admit, my suggestion wasn’t quite right for their use case. Yet, it sparked a conversation: we had heard about Stainless before (they power SDKs for Anthropic, Cloudflare, and of course, OpenAI), but this was a chance to connect and share ideas about OpenAPI, API docs, SDKs, and most importantly, Developer Experience.

We actually have a lot in common. They don’t necessarily endorse every point in our guide on “[The Perfect Modern OpenAPI Workflow](https://docs.bump.sh/guides/openapi/specification/v3.1/the-perfect-modern-openapi-workflow/)”, but we share the same foundation!

Here’s the core idea:

- Publishing great API docs makes an API ecosystem discoverable.
- Generating great SDKs makes that API ecosystem accessible.

Ultimately, it’s all about optimizing the Developer Experience. Both Bump.sh and Stainless aim to do the heavy lifting — translating OpenAPI definition files (also known as [API contracts](https://bump.sh/blog/how-openapi-ensures-reliable-api-communication)) into these essential ingredients automatically, so teams don’t have to spend countless hours doing it manually.

But there’s something even more important we believe: OpenAPI is the integration.

Sure, there’s always space for deeper, native, and unique integrations between two SaaS products — those create extra value and benefits. But the starting point is the go-to standard for describing REST APIs. OpenAPI helps humans and machines understand and agree on exactly how an API works and how it can be consumed. That’s its core purpose.

The first step of the integration between Stainless and Bump.sh is simple: enrich OpenAPI files with code samples for each language that Stainless generates an SDK for, then publish those samples with Bump.sh — all within a single GitHub Action workflow.

How does it work? [Check out our integration guide](https://docs.bump.sh/guides/bump-sh-tutorials/stainless-integration/), written by the excellent Sam El-Borai, Customer Engineer at Stainless.

Are you using both Bump.sh and Stainless and have feedback or questions? [Reach out to us](mailto:hello@bump.sh) — we’d love to help.
