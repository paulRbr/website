---
title: From SwaggerHub to Bump.sh, unlocking the power of Git
author: Phil Sturgeon
category: Tech
image: blog/from-swaggerhub-to-bump.png
end_with_preview: true
---

Recently we published a guide showing how [Bump.sh](http://bump.sh/) users can migrate their OpenAPI descriptions [out of SwaggerHub and into Bump.sh](https://docs.bump.sh/guides/bump-sh-tutorials/migrate-from-swaggerhub/), and I thought it would be helpful to spend a bit of time writing about why you'd want to do that. The migration guide shows how, but let’s talk about why freeing your API descriptions from a walled garden is important, and what can be done when your API design workflow is entirely under your own control.

## SwaggerHub is a Walled Garden

SwaggerHub is one of many tools Swagger offer, with Swagger Editor helping you create and modify OpenAPI descriptions on their servers, then Swagger UI allows you to preview them as you go, and share hosted versions so anyone can see your OpenAPI-based API reference documentation (depending on access controls).

SwaggerHub is like many Software-as-a-Service offerings in the world of OpenAPI: you sign up for an account, log in through the browser, and use their editor experience to work on your API descriptions. 100% of the work is done through the web browser. All the functionality is either provided on their service,  handled by a predetermined list of integrations, or you're clicking "Export" a file to do things elsewhere.

This is a pretty standard experience, but it can lead to all sorts of problems and considerations.

No internet connection? No work today.

Got lots of employees, freelancers, collaborators, or open-source contributors? You gotta pay for each and every person who wants to contribute.

Want to use Git? Hopefully it's on one of their predefined source control providers.

Want to integrate with a particular mocking or SDK service? Better hope they directly support it, or you can find a way to send that service Webhooks from SwaggerHub that it's able to understand.

If the third-party service cannot understand SwaggerHub webhooks then you need to set up a webhook relay, which is an absolute nightmare to test.

## Why use a Walled Garden?

For a long time this all seemed fine because people had very simplistic expectations of what OpenAPI was, and the lifecycle in which it would be used.

In the early days people would write a bunch of code, then towards the end of the development process they'd sprinkle a few annotations/docblocks around their codebase to export OpenAPI, and shove all of that into a website like SwaggerHub to create some hosted documentation.

When API Design First got more popular API designers were perhaps updating OpenAPI documents through SwaggerHub for the whole "Design Phase" of the lifecycle, then when development began all of this wonderful metadata would be tossed aside and the code would take over. This was thankfully a short period in the API Design First movement, with ["API Design First, and Evolve" workflow](https://apisyouwonthate.com/blog/api-design-first-vs-code-first/) reaching maturity over the last few years.

Now that people use OpenAPI before, during, and after development, it just doesn't feel practical to have it anywhere other than sat right there in the source code with the API, in the same source control repository, all hooked up with the same continuous integration, whether thats something simple like GitHub Actions or more home grown like Jenkins.

## Benefits of a Git-based OpenAPI Workflow

SwaggerHub has a lot of functionality aimed at recreating what Git and hosted source control providers like GitHub, Bitbucket, and Gitlab already offer.

- Forking
- Comparing
- Merging
- Real-time comments to communicate with collaborators
- Issue Tracking

There is Git integration which requires access tokens and permissions to be set up, and the integration asks which branch you'd like it sent to. Sending all changes to a single branch leads to some confusing situations, where changes might have been made to the documents in Git, and SwaggerHub is now overriding those changes.

SwaggerHub also cannot help you send pull requests, so you'll be going to GitHub to create pull requests, for documents that are not actually managed by GitHub.

With more and more people using OpenAPI to enable contract testing and server-side validation, it's more common for changes to the OpenAPI to be made by the developer making changes to the code and tests, but if you do that you run the risk of getting your changes overridden. Sending two pull requests (one for the SwaggerHub changes, one for the code) then you run the risk of breaking main.

It seems more sensible to let Git do what Git does, manage and track changes, provide line-by-line comparisons which can be commented on and have issues created, with all the OpenAPI, code, and tests updated together in a single pull request so you have atomic commit-level accuracy.

Then your CI solution can ping something like Bump.sh to give it the latest OpenAPI, and there's no need to keep anything in sync because your Git repository is the source of truth and the documentation is just a single command that deploys whatever is in the latest commit.

**Use [Bump.sh CLI](https://github.com/bump-sh/cli) to deploy from wherever (Jenkins, CircleCI, etc.):**

```
bump deploy openapi.yaml --doc <doc-slug> --token <token>

```

**Use the [Bump.sh GitHub Action](https://github.com/marketplace/actions/bump-sh-api-documentation-changelog) to deploy changes:**

```
name: Check & deploy API documentation

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

permissions:
  contents: read
  pull-requests: write

jobs:
  deploy-doc:
    if: ${{ github.event_name == 'push' }}
    name: Deploy API documentation on Bump.sh
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Deploy API documentation
        uses: bump-sh/github-action@v1
        with:
          doc: <BUMP_DOC_ID>
          token: ${{secrets.BUMP_TOKEN}}
          file: doc/api-documentation.yml

```

Using Git as a source of truth also means you don't need a comments system for tracking design reviews, and you don't need a separate issue tracker for feedback on those changes, because GitHub, Gitlab and Bitbucket do all of that really well already.

## Expanding Functionality Beyond the Garden

SwaggerHub offers a few features like [API Standardization](https://support.smartbear.com/swaggerhub/docs/en/manage-resource-access/api-standardization.html), which is using the popular open-source offering [Spectral](https://github.com/stoplightio/spectral). Spectral runs on the command-line, in continuous integration, [VS Code](https://github.com/stoplightio/vscode-spectral/), or via GitHub Actions, where you have the full power of the open-source tool available in your Git-based workflow.

Unfortunately when you run it through SwaggerHub you only get partial support for some functionality, some core functions, and no support for custom rulesets.

Instead of settling for the limited support for Spectral offered through the walled garden, a Git-based workflow allows you to build your own automated API Style Guides to ensure your entire organization has standard APIs, and allows you to use third-party rulesets like the [Microcks Spectral Ruleset](https://github.com/microcks/microcks-spectral-ruleset), a ruleset built to help you build OpenAPI that works perfectly with the powerful open-source mocking solution [Microcks](https://docs.bump.sh/guides/bump-sh-tutorials/testing-with-microcks/).

Mocking and SDKs are another great use-case. There are countless providers for all of these tools and many of them are open-source, so why not trigger changes through your continuous integration or source control setup, so everything is all happening at the same time, but still with maximum control and flexibility over the tools being used.

## Choose your own Editor

Very few things bring up more emotional discussions in the world of software engineering than text editors, and it’s understandable. You’re probably spending a huge amount of time using them, getting to know the shortcuts, tweaking settings, installing extensions, making things ever more productive as you go.

The switch to the API design workflow can be tricky for some teams as it is, but inserting a brand new web-based text-editor onto people can increase the tension further.

Instead of being forced to use Swagger Editor, the Git workflow lets you use literally any text editor or IDE you like. That can be VS Code, Vim, JetBrains, whatever each individual OpenAPI contributor prefers.

They can just run `bump preview openapi.yaml --live` to see how it looks as they go, or check when they’ve done a decent bit of work, and it will be deployed properly whenever the Git commit lands in a pull request or gets merged.

You can even benefit from the use of AI tools like Copilot which guess the OpenAPI you’re trying to write and speed you up even more. When you escape the walled garden you have a lot more options available.

## API Design Reviews

GitHub and friends won't provide every feature you need for your API workflow of course, but it does provide a brilliant framework which can be expanded upon.

API Design Reviews are a great example. A design review is basically a chance for API design/development teams and API governance teams to interact, making sure changes are the right move for the API specifically and the organization in general.

A pull request provides a good view of the line-by-line changes, but most of us are not good at visualizing 100s or 1,000s of lines of YAML in our minds.

Don't. Let Bump.sh point out a summary of changes on your pull requests so that the design review / governance teams know where to focus their efforts.

![changelog.png](https://storage.googleapis.com/bump-blog-resources/2024-07-11-from-swaggerhub-to-bump-git/changelog.png)

To save them the pain of figuring out the YAML they can look at the preview of the OpenAPI documentation specifically built from that branch to see what those changes look like as human-readable documentation.

## Notifications of Changes

Once Bump.sh is tracking these changes going into branches, it can also track the changes going into the main branch. This provides the perfect opportunity to alert interested stakeholders of changes that are happening with the API.

![change-tracker.png](https://storage.googleapis.com/bump-blog-resources/2024-07-11-from-swaggerhub-to-bump-git/change-tracker.png)

These stakeholders don't need to be paid users that have been added to the SaaS, they can be anyone with permission to see the API documentation, because anyone who can see it deserves to know if things are changing on them.

Warning people that an [endpoint is deprecated](https://apisyouwonthate.com/blog/surviving-deprecations-to-resources-and-properties-on-other-apis/) is always a tricky prospect, but being able to automatically email interested users can hopefully help reduce the amount of time you need to maintain old problematic code.

## Summary

Freeing yourself from tools like SwaggerHub makes the API design workflow feel a lot more modular, allowing for different tools to be swapped in and out as needed instead of hoping that one tooling provider will be able to do everything you need.

With so many amazing cheap or free OpenAPI tools popping up you can even save a lot of money working this way, and chose when and where to host something yourself, or when to let somebody like [Bump.sh](http://Bump.sh) handle powerful bits of functionality so you don’t have to.

---

Notes

Bump.sh can also "recover the Git history" of API changes with the changelog. And there's the overlays, and all of those things that all of a sudden become possible, make help team build an actual doc out of a mere technical description/list of endpoints.
