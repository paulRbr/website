---
title: Bump News February 2021
author: Anthony Lionnet
category: Company
image: blog/bump-news-february-2021.png
---

3, 2, 1, here are everything that happened at Bump for the past month, including product enhancements, company news, and more.

## Product

### OpenAPI operation url

We now support Operations `servers`, allowing our users to customize their operations examples (in definition and curl example). OpenAPI provides field servers on OperationObject, as an alternative url to serve an operation.

### License support

We now identify and include the `license` information in your documentation description for both OpenAPI and AsyncAPI, along API licenses using the standard SPDX identifier with OpenAPI 3.1.

### Webhooks

The OpenAPI 3.1 release came with some important changes, and among them the support of `webhooks`, at the same first level as `paths`. Webhooks are now supported by Bump, as you can see in [this live example](https://bump.sh/hub/examples/doc/webhooks-extended).

### External references importation

We have been working a lot on making it easier to resolve external references in use within our user specifications. We are happy to announce that a first working version is now live, and that we now resolve external references ($ref) by default from our [CLI](https://github.com/bump-sh/bump-cli), [GitHub action](https://github.com/marketplace/actions/bump-sh-api-documentation-changelog), and even when you deploy from our web application – with some limitations. We will share a more complete coverage about that new feature in an incoming post. [More details here](https://docs.bump.sh/help/specification-support/references/)

### Bump CLI 0.7

The `0.7` version of the Bump CLI has been released, and includes several updates including:

- External references importation by default, making the previous `--import-external-references` used now obsolete.
- Minor bug fixes.

More information on our [CLI GitHub project](https://github.com/bump-sh/bump-cli).

## Team

### Developer Relations

We just started to work with Doug Sillars, senior Developer Relations, who will help us to give the best possible experience regarding our product adoption, and to be focused on “getting the word” out through content. He will both represent our community to become and product interest. Welcome Doug 👋.

### Growth Engineer, we want you!

We are currently looking for a growth engineer, to drive the way we connect with potential users to grow Bump's active user base. Leveraging marketing and technical skills, this role will create programs and find repeatable channels that reach and activate new users. You recognize yourself, or know someone? [Find here the job offer](https://www.notion.so/bumpsh/Growth-Engineer-91d235a84b264bdf9caed1787991afd8).

## Ecosystem

### Sponsoring AsyncAPI

You may or may not heard about it, but that's it, we made it official, after being one of the first to believe in and support AsyncAPI 2.0. Bump joined the list of [AsyncAPI's bronze sponsors](https://opencollective.com/bump). We are glad to be part of that beautiful and exciting journey.
