---
title: The RapiDoc alternative you are looking for.
short_title: RapiDoc
author: Christophe Dujarric
---

**RapiDoc is an OpenAPI renderer, Open Sourced in January 2019**. According to its GitHub repository, the **code frequency greatly decreased since 2023**.

When it was initially released, RapiDoc was a great alternative to SwaggerUI, offering a better user experience and navigation, with a index and a search feature. As most of the "OpenAPI renderers", it relied on JavaScript to fetch OpenAPI definition files from a distant URL, and then render it in the client's browser.

As communicated in 2021 by mrin9, RapiDoc's original creator, "one of the main advantage of RapiDoc is its powerful customization". Since then, the UI and UX standards and expectations for API documentation have greatly evolved, starting with the 3-columns display inspired by Stripe, which RapiDoc does not support.

For use cases requiring to publish a simple, unique and public API doc with relatively rare updates, RapiDoc was a great option, providing that you had skills in HTML and CSS.

For other use cases, **we've seen many businesses move over to Bump.sh**, especially to tackle needs with **complex API ecosystems** (multiple APIs, large and/or API definitions), **rapidly changing APIs**, need to deal with **advanced access management to API catalogs**, and to adopt **API contract-centered and docs-as-code workflows**.

## Top 3 reasons to choose Bump.sh over RapiDoc

### Modern API doc workflow

Pointing to the latest version of an OpenAPI file in a JavaScript code line is just not enough anymore. Actually, where is that file hosted, and who is taking care of updating it? How do you know it's up-to-date? And as soon as you have more than one API, do you have the right resources in your teams to code what's needed to have a clean developer portal including searchable and usable API references and all of the other key content?

A [modern API doc workflow](https://docs.bump.sh/guides/openapi/specification/v3.1/the-perfect-modern-openapi-workflow/), supported by Bump.sh, unlocks:

* **Git-centered**, **docs-as-code** practices: your API code and API doc evolve side-by-side. Whether you opt for **code-first or design-first**, you make sure you **always have the latest, up-to-date version** of your [API contract](https://bump.sh/blog/api-contracts-extended-introduction). Supported by our [CI integration options](https://docs.bump.sh/help/continuous-integration/), and our unique automated changelog generation.
* **Server-side parsing**: it's no longer about your client's browser fetching API files and letting it do the heavy lifting of parsing and rendering it. Bump.sh ingests your files and remodels it in its own proprietary abstraction. Benefits? **Blazing-fast rendering**, even for the largest definition files on the market, native support for external references (no need for you to code more for that to work), ability to publish **OpenAPI** and **AsyncAPI** docs within the same portal, with a seamless UX, and much more.
* **Searchable catalogs**: a key benefit of the above. From your **list of API docs** published in your catalog ("Hub" in Bump.sh), find any endpoint, any parameter  or object in any API thanks to a central search. Cherry on the cake: we automatically generate [APIs.json that make your catalogs discoverable](https://docs.bump.sh/guides/bump-sh-tutorials/make-your-apis-discoverable-with-apisjson/) by search engines, marketplaces, and other third-party tools.


### Modern API doc UI

Yes, Stripe set new standards in API docs UI and UX design. We took some inspiration from them like pretty much any other modern tool on the market, starting with the 3 columns layout. 

We added unique features like the "[share-and-highlight](https://docs.bump.sh/product-updates/2021/09/11/share-and-highlight-anything-inside-your-api-documentation/)", already a while ago, as well as extensive ways to insert additional content sections (through [Markdown support](https://docs.bump.sh/help/documentation-experience/markdown-support/), [Mermaid support](https://docs.bump.sh/help/documentation-experience/markdown-support/#diagrams-and-charts-mermaid-support) and our [custom `x-topics` vendor extension](https://docs.bump.sh/help/documentation-experience/topics/)). 

But if there were three key parts to differentiate Bump.sh from the core features of RapiDoc, those would be the ones:

* **No-code customization**: you don't have to talk CSS, JS or HTML fluently. It's possible, if you have advanced customization needs. But publishing documentation with your brand identity easily by adding a logo or changing a color, adding a favicon and meta image is achievable in seconds [through our documentation management UI](https://docs.bump.sh/help/customization-options/color-logo-meta-images/). And so it is for [custom sub-domains](https://docs.bump.sh/help/customization-options/custom-domains/).
* **Advanced integration options**: because when your API ecosystem grows, your dev portal often grows with it. Bump.sh is the reference in API references publication. And because we want to be the best at that, our approach is to make it possible for you to **integrate those into existing dev portals**, no matter what they're built with. Embed Bump.sh-powered API references into your dev docs and keep your existing navigation, header and footer. Set sub-paths (https://yourdomain.com/docs/api) rather than sub-domains (https://apidocs.yourdomain.com). Apply advanced CSS and JS to further visually integrate API references in your sites and respect your brand guidelines.
* **API explorer**: the try-it-out or RapiDoc and SwaggerUI, but then better. Ever tried to play with those for a request that has more than a few parameters? Not the most user-friendly. The **Bump.sh API Explorer features a dedicated UI**. Enjoy a full page to fill-in forms, tackling even the most complex API requests, while still letting you pop-up the docs as a side pane whenever you don't remember what a given parameter is here for. And that's just the start: enjoy pre-filled examples, "share requests" that you pre-configured to have ready-made reproducers, and more.

### User Access Management

So, you have docs. It's great to have it on your local machine when you work on your APIs - you should. Yet as we say also for our own product: "if there's no doc, the feature doesn't exist". **Docs are key for your users to adopt your product and APIs**. Now you need to have the right way of sharing the right doc to the right people. And that, on its own, is a great reason to switch from RapiDoc to Bump.sh.

Let's wrap it up again in 3 main points:

* **SEO friendly** for public docs: if it's public, you want people to find it. Another spin-off of the "server-side parsing" explained above. If you rely only on client-side parsing and rendering of your API definitions, don't expect crawlers to load it and find your API description. Lazy robots. **Exposing the API content** to crawlers is of course the first step for Bump.sh. It is then **optimized for search engines**, with the **correct titles and metadata**.
* **Public, private or partner**: because sometimes, you don't want to make it public. Easy; its a button switch away. No need to work with the dedicated engineering team to set up a dedicated site and authentication. Create a new Hub, or a stand-alone, private doc. Then **decide** whether you want to **share it** only with **internal users**, or also with **partners**. Pro-tip: [use Overlays](https://docs.bump.sh/guides/openapi/specification/v3.1/extending/overlays/) and publish several variations of the same API docs, tailored to specific audiences, while controlling who sees what.
* **Multiple SSO**: because it's better than 0, and that 1 is not enough. Of course, connecting to your **company's employees directory** makes sense. You want all of them to be able to read your API docs (btw, 0 costs per internal reader on Bump.sh). But having a **separate directory for your customers and partners** is key. Build the correct silos in access control for enforced security, yet don't end up in manual access control nightmare.

## They were on RapiDoc before switching to Bump.sh

**BigID**: [read their story here](https://bump.sh/customers/bigid). TL;DR: before Bump.sh, more than 40 private docs manually published by pushing it to an S3 bucket and rendered by RapiDoc. Completely disconnected workflow between tech writers and engineers, leading to discrepancies between docs and APIs, tons of time wasted, and frustration for everyone, including users. 

After Bump.sh: still counting additional new API docs, **90% increase in satisfaction through a docs-as-code workflow and modern UI**.

**Redpanda**: very soon more story here.
