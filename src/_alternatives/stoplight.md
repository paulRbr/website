---
title: The best Stoplight alternative.
short_title: Stoplight
author: Christophe Dujarric
---

**Stoplight was founded in August 2014**, and **acquired in August 2023 by Smartbear** (who also had acquired [Swagger](../swagger-ui/) in 2015).

It's important to disambiguate what we'll talk about below. Stoplight is indeed a complete API design platform, pretty much like Swagger Hub. It is famous for some of its Open Source tools, which include **Elements** (OpenAPI renderer), **Spectral** (a widely adopted OpenAPI linter), and **Prism** (a mock server generator).

As much as each of these Open Source tools can be used independently, they're geared toward the classic model of offering limited features, encouraging users to upgrade to the paid version. It's key to understand that from there, entering the paid **Stoplight.io platform is entering a walled-garden** [like with Swagger Hub](https://bump.sh/blog/from-swaggerhub-to-bump-git), **locking you in a specific workflow and set of tools**.

For now, what we will describe below is the comparison between Bump.sh and Stoplight Elements. **Bump.sh is indeed offering a different approach** to the Stoplight Platform through its paid offering: **we focus on building the best API reference publication platform**, and making sure it **integrates in any** of your **current tooling, workflows and existing developer portals**.

Stoplight Elements is a Web/React component that drops into existing documentation, and was aiming to knock Swagger UI off the “top spot” years back.

## Top 3 reasons to choose Bump.sh over Stoplight Elements

### We're not leaving you high and dry

OK, Stoplight Elements offers a rather decent UI for rendering OpenAPI definition files, as well as a "try-it-out"/interaction API console. Yet, it suffers from the same issues than other client-side OpenAPI renderers (like [Swagger UI](../swagger-ui/) and [Redoc](../redoc/)), on top of falling short for more advanced support and features like most Open Source tools.

* **Active development**: After being bought out by SmartBear, the entire **Stoplight ecosystem has gone into maintenance mode** and only a handful of low stakes commits have been made to the documentation. Bump.sh alive and kicking. **We’re actively adding brilliant new functionality all the time**, actively working with our users to shape the roadmap.
* **Easy setup**: Stoplight Elements is confusing to get started for non technical users as it needs a web server and code to load the component. Creating a new API doc can be done by a tech writer or a product owner, who might not necessarily have the time or the knowledge for a tedious configuration step.
* **Server-side processing**: While Elements depends on the browser to load and render JSON files, **Bump.sh handles your API definition files on the server**, enabling a range of advantages we detail below. This includes built-in support for `$ref` files, effortless publishing of both OpenAPI and AsyncAPI specs, and more.
* **Try it/console**: **Bump.sh features a beautiful, interactive documentation** with Try-It functionality, that doesn't get stuck to the third column of the doc, offering a **full screen** to let your build even the **most complex requests**, and which works far better at **handling things like CORS** (we even released an [Open Source CORS proxy](https://github.com/bump-sh/cors-toujours), used in the background).

### Built for modern workflows

Let's hammer it down: **Bump.sh is not there to lock you into a walled-garden**. **We do API Reference**. We do our best in that part, with some cool and unique features that come with it. So **no matter what your workflow is** (design-first, code-first, with our without Git), Bump.sh fits right in. 

Now the past years have shown us the community converge to [modern ways to design, build and publish APIs and docs](https://docs.bump.sh/guides/openapi/specification/v3.1/the-perfect-modern-openapi-workflow/). And **we made sure that Bump.sh could support you** there, anytime having up-to-date and user-friendly docs could assist.

* **API definitions are contracts**, and a **source of truth**: That last buzzword rings a bell? Yes, Git. GitHub has long been advertized as that "source of truth". Not saying the contrary, but adjusting a little: an API contract, because it is historized in Git, can be a reliable source of truth. And Bump.sh is there, supporting natively **docs-as-code workflows**, to help you [**review (breaking) changes throughout the design and development phase**](https://docs.bump.sh/help/changes-management/), thanks to our [GitHub Action](https://docs.bump.sh/help/continuous-integration/github-actions/), [API](https://docs.bump.sh/help/continuous-integration/api/) and [CLI](https://docs.bump.sh/help/continuous-integration/cli/) (for **integration with any other source control** such as Gitlab, Azure DevOps and Bitbucket)
* **Aggregate searchable API catalogs**: Stoplight requires multiple APIs be grouped into a single “Project”. Using **Bump.sh you can create API catalogs** with APIs from absolutely anywhere. More importantly, those catalogs give [infinite grouping and sorting possibilities](https://docs.bump.sh/help/hubs/customize-ui/), while each of them will be entirely searchable. Meaning that from the root of the catalog, the search engine will let you **find and discover any of it's APIs' endpoints, objects or parameter**. You won't have to remember where that `GET /user` is stached anymore.
* **Today isn't just about simple REST APIs anymore**: Architectures evolve, APIs complexify, new technologies rise. We know that very well and monitor it closely at Bump.sh. That why we support the **latest OpenAPI versions** (including [webhooks](https://docs.bump.sh/help/api-change-management/webhooks/)), [**OpenAPI Overlays**](https://docs.bump.sh/help/continuous-integration/cli/#the-overlay-command), and also [**AsyncAPI** for your event-driven APIs](https://docs.bump.sh/help/specification-support/asyncapi-support/). After all, why would they require a different API reference tool, with a different UI, UX, and to be hosted on a different domain? We help you **publish centralized docs for all your API ecosystem**.

### Ready to publish the right docs to the right audience

Not all APIs, nor docs, are made equal. Not all API consumers have equal needs and expectations. Same for your internal security requirements. Also for that part, **we've built the piece that you connect to the rest of your ecosystem**. But unlike an Open Source tool, **there are live humans that come with Bump.sh**, who take tremendous pride in **helping other people**. Guaranteed, not chatbot.

* **SEO friendly**: Stoplight Elements and Stoplight Platform both run as a JavaScript web app which confuses search engine crawlers. According to SEO checker tools, **Stoplight pages only have three words on the page**, but **Bump.sh renders perfectly crawlable pages** server-side. This is great for SEO and a whole lot faster.
* **Beyond public docs**: Of course, SEO is great for public docs. Now you might precisely want that search engines don't index your API doc pages, and that only select users can access it. We've also got your back there. **Internal** APIs? Check. **Privately** shared APIs (such as for business partners or premium customers)? Also check. **[Configure access control](https://docs.bump.sh/help/publish-documentation/documentation-access-management/) with any granularity**. And as you don't want to keep maintaining access control manually, integrate your people directories with our SSO support. One edge: we support as **many SSO connections as you need to the same API catalog**. One for your employees, one for your customers. Heck, even one for your family if you need. It's up to you to decide what makes sense.
* It's **not just about leaving a tool on your desk**: We work with some of the biggest names in the Tech world. We're not just offering an off-the-shelf product, even if that is an option for simpler needs. **We're your dedicated API docs team**. We have **expertise in documentation management** and **API specifications**. And we know very well that once your publish your new UX and docs "it was [always] better before". Change management is so. And we're **here standing by your side**. It can be a matter of giving you tips and advice. And it can be a plain need for us to improve our product. **We love feedback in that case**; it just **helps us make better stuff for the entire community**.
