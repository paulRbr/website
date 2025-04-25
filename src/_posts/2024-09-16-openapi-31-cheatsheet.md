---
title: "OpenAPI 3.1 - The Cheat Sheet"
author: Christophe Dujarric, Yoan Gross
category: Tech
image: blog/openapi-31-cheatsheet.png
end_with_preview: true
---

We can't tell you how stoked we are about this. It's been a while that we realized something key was missing, to help the entire community adopt and use [OpenAPI](https://bump.sh/openapi) daily. 

Something short enough, while thorough enough, so that you always make sure you always completely describe your API, without missing any crucial information, nor wondering "Hugh... How do I write this again?" and having to scan through the entire specification.

Something you could even hold in your hands. Because, yes, as much as we avoid printing things on a day-to-day basis, sometimes screens are not enough. Teachers, rest assured: our cheat sheet print-outs are too large to be hidden in your students pockets.

Anyway, that's it, we made it. Let us introduce the OpenAPI 3.1 Cheat Sheet.

![openapi-31-cheatsheet-v1.png](https://storage.googleapis.com/bump-blog-resources/openapi-31-cheasheet/openapi-31-cheatsheet-v1.png)
[Download the PDF version](https://storage.googleapis.com/bump-blog-resources/openapi-31-cheasheet/openapi-31-cheatsheet-v1.pdf)

It took us about 6 months to produce this first version. First of all, because we're of course quite busy developing Bump.sh and serving our customers. But more importantly, because synthesizing OpenAPI on an A4/US letter sheet is just not trivial. 

The Specification covers a wide range of use cases. It is robust in the sense that your APIs can be completely described, so that humans and machines alike can discover it, and interact with it. In the end, an OpenAPI contract can become quite deep and complex. We wanted to squeeze the essence out of it, and brainstormed multiple times about what should be in (and how), and what should be out.

You'll read it on your own, but here are the sections we retained:
* [Document Structure](https://docs.bump.sh/guides/openapi/specification/v3.1/understanding-structure/basic-structure/)
* [General Information](https://docs.bump.sh/guides/openapi/specification/v3.1/understanding-structure/basic-structure/#2-info-object)
* [API Structure](https://docs.bump.sh/guides/openapi/specification/v3.1/understanding-structure/paths-operations/)
* [Data Types and Schemas](https://docs.bump.sh/guides/openapi/specification/v3.1/data-models/schema-and-data-types/)
* [Security](https://docs.bump.sh/guides/openapi/specification/v3.1/advanced/security/)
* [Reuse Elements](https://docs.bump.sh/guides/openapi/specification/v3.1/advanced/splitting-documents-with-ref/)
* [Polymorphism](https://docs.bump.sh/guides/openapi/specification/v3.1/data-models/schema-composition/)
* [Grouping and sorting](https://docs.bump.sh/guides/openapi/specification/v3.1/documentation/grouping-operations-with-tags/)

We had a chance to work on this with OpenAPI experts (👋 Phil Sturgeon, James Higginbotham and Kin Lane, as well as some of our key power users at Elastic, Lightspeed Commerce, and many more).

And we wanted to make the outcome of that work accessible completely for free, as the entire OpenAPI community should benefit from it, free of charge. It is [CC BY-NC-SA 4.0 licensed](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en).

To be honest and transparent, this is a first version of that Cheat Sheet. We might have been a little too enthusiastic to print it for apidays London 2024. Fetch your exclusive sample there: there won't be many, and we'll have to print new versions for Paris as we've already spotted some typos.

They're fixed in the downloadable PDF version, but if you have a hard copy and spot those errors, **we're paying a drink to the first 5 people who drop by our booth** with the full list of errors.

This Cheat Sheet will be lively in the coming weeks and months. We'll work on:
* improving the current version
* making a web version of it
* covering the next versions of OpenAPI (Moonwalk, we see you)
* making one for AsyncAPI

Share it with your network, the person working next to you or the world via social media; it's built for that!