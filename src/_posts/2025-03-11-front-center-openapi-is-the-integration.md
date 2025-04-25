---
title: "Front and center: OpenAPI is the integration"
author: Christophe Dujarric
category: Tech
image: blog/modern-openapi-workflow.png
end_with_preview: true
---

When I started as a Product Manager, I felt like a great integration between SaaS products would involve some UI elements. Something like buttons with the other tool's logo on it. Then I realized the importance of "APIs" behind the scene, whether there would be a button or not.

Then I discovered OpenAPI.

And since then, there's one thing I'm convinced about. OpenAPI *is* the integration.

I don't often do that, but while writing this I asked ChatGPT to give me the definition of what an integration is. There's a fair chance the answer is biased by my previous chats, yet it's pretty decent:

![Integration definition by ChatGPT](https://storage.googleapis.com/bump-blog-resources/2025-03-11-perfect-modern-workflow/integration-definition.png)

Of course, saying that *OpenAPI is the integration* becomes arguable here as an API definition file is static (to the extend of new updates): it's not actively sending data or triggering actions.

Yet, we're also saying that *an [API definition file is a contract](https://bump.sh/blog/api-contracts-extended-introduction)*. It is the exact description of how an API is built, and how it may be consumed.

In that respect, it is indeed not sending data. It is the source (or "reference") where any tool should tap in. It is not triggering actions. It is defining what actions can take place, and how.

Wait, did I write "source"? Heard of *source of truth* recently? Yes, we're talking about Git. As much as an API definition file can live very nicely out of a Git repository, what best than a contract that is historized and for which you know you can always find the latest, agreed upon version?

Phil Sturgeon, after writing "[OpenAPI: the Complete Guide](https://docs.bump.sh/guides/openapi/specification/v3.1/introduction/what-is-openapi/)", now condenses 10 years of experience and the strong development of the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) and ecosystem into a guide that gives best pratices in using and benefiting from OpenAPI, as well as some of the best tools available on the market for each step of an API lifecycle.

It's gorgeous, it's a masterpiece educational content, [available right here](https://docs.bump.sh/guides/openapi/specification/v3.1/the-perfect-modern-openapi-workflow/).

Can it be improved? For sure! Thanks to the future evolutions of OpenAPI, thanks further development of vendors supporting the specification, and thanks to your feedback. 

On that last part, keep in mind this content is Open Source, and that you can submit changes [directly on GitHub, or open issues](https://github.com/bump-sh/docs). We're looking forward to building great stuff with you!
