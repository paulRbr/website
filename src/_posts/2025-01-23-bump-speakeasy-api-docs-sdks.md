---
title: "Speakeasy x Bump.sh: Publishing API docs with custom code samples powered by SDKs"
author: Christophe Dujarric
category: Integration
image: blog/speakeasy_integration_announcement.png
end_with_preview: true
---

It’s been a while since we chatted with the [Speakeasy](https://www.speakeasy.com/) folks. What’s more natural? [Bump.sh](http://Bump.sh) and Speakeasy are the first two vendors ever to officially support [OpenAPI Overlays](https://github.com/OAI/Overlay-Specification).

In a few words, Speakeasy is a complete platform for building API SDKs. Our tooling empowers teams to use OpenAPI to create robust SDKs, enhance API docs with custom code examples, Terraform providers and end-to-end testing.

If you’re sometimes reading our content, you’ve probably seen us talk a lot about our belief this specification changes the game in many use cases. Cool side-perk, by the way: it’s built for OpenAPI, but [also works for AsyncAPI with Bump.sh](https://docs.bump.sh/help/specification-support/overlays/).

We’re now writing this post because we recently released a guide that gives a very specific and powerful example of what Overlays can achieve: populating language-specific examples through the `x-codeSamples` extension. And in that spot, Speakeasy raises the bar, by generating SDKs AND the Overlays that contain those examples.

What’s left? Well, automate that process with our CI integration. Anytime you update your API structure (and contracts), you end up with fully up-to-date SDKs and docs with the proper examples in any of your supported languages.

[Get up-and-running in a few steps](https://docs.bump.sh/guides/bump-sh-tutorials/generate-sdks-with-speakeasy/).

Missing SDKs in your API doc portals, or API docs to publish along with your SDKs? [Reach out to us, we can help](mailto:hello@bump.sh).
