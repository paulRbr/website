---
title: "Microcks + Bump.sh: Testing, Mocking and Docs"
author: Phil Surgeon, Laurent Broudoux, Yacine Kheddache
category: Tech
image: blog/microcks-and-bump-sh.png
end_with_preview: true
---

This article explains how [Bump.sh](http://bump.sh/) and Microcks can be used in tandem to establish a natural cycle of documentation, simulation (a.k.a mocking) and testing.

Most of the tools that try to do everything in the API lifecycle don’t seem to do any of it particularly well, but integrating specialist tools in a more modular fashion allows for far greater flexibility throughout the API lifecycle.

[Bump.sh](http://bump.sh/) handles turning OpenAPI and AsyncAPI descriptions into beautiful API reference documentation. Microcks covers simulating your API using the same API descriptions, allowing you to gather feedback on an API before investing more time and money into development.

Finally, Microcks can be used to test an API implementation against an API description. This not only confirms your API is working as expected, but makes sure your API documentation is telling the truth, because they’re all powered by the same source of truth.

## What is Bump.sh

[Bump.sh](http://bump.sh/) is an API documentation and discovery platform for technical writers and engineers. It allows you to easily create API reference documentation from OpenAPI & AsyncAPI descriptions, or combined into an "API Catalog" using Hubs and the API Explorer to navigate through entire API ecosystems.

## What is Microcks?

Microcks is an API mocking (a.k.a "simulation") tool that will help you transform an API description document into a realistic replicate of an API, allowing you to sumulate APIs that don't even exist yet. It can also help you test a real API matches against the "[API Contract](https://bump.sh/blog/how-openapi-ensures-reliable-api-communication)" as defined in API descriptions documents using OpenAPI, AsyncAPI, or a handful of other formats.

## The advantages of using Bump.sh and Microcks together

Using Bump.sh and Microcks together allows you to create a clear feedback cycle of documentation, testing, simulation, trial implementation, and iteration.

You can use Bump.sh to create documentation for your API so that people can see how it should work, and Microcks to simulate the API, all before it even exists, and all running off the same configuration allowing for rapid iteration whenever feedback comes in or problems are discovered, then you get the contract agreed before coding begins.

![Doc mocks feedback workflow](https://storage.googleapis.com/bump-blog-resources/2024-12-02-microcks/docs-mocks-feedback.png)

Imagine the scenario: you want to build an API for an iOS team at your organization. The iOS team want to get started as soon as possible because they know there’s going to be some difficult stuff to do once they’re integrated with the API. The is a brand new product so you haven’t built the API yet.

Traditional API development practice would follow the waterfall model for this, even if they consider themselves an "agile" team: you start planning the API, then go straight into coding the implementation, before moving onto testing, all before getting it ready for use by the iOS team. In this model iOS team has to wait until the API dev team are done before they start work.

[![Implementing APIs before Getting Feedback](https://storage.googleapis.com/bump-blog-resources/2024-12-02-microcks/gantt-implementing-apis-before-getting-feedback.png)](https://mermaid.live/view#pako:eNptksFOwzAMhl8lyoFTK7UVY6M3UDW0w8QEXEC9ZI3XRWuTKnERaNq746QbKxs-Nbb_r7-d7HllJPCc10IjlppRoMIG2KLtGmhBo9I1e1gtHFvDxlhgT4AhNweQa1HtBpEUCHNjW4GMvVPEy2VcFKUeqg4qVEZ7DivgExrTefRQXDVCa0-8oZpTdUj6yFG4XRqxLMkmcZLGaRKxqTwxfw2KgD5HkGURExsEy46M9FZeW3kD50cZCscDu4rAm4x52eDDFx972oT6AkfuXwDPjKC6G6sIkSaXLrrueiE--azXRlj511BgTsdM-sFEnlULjVDbi4UE1Wysmo724WX_jh5k92PZzI_NI94C3bOS9Gr2nlFy3NJFlDynTynsruSlPlCf6NG8fuuK52h7iLg1fb3l-UY0jk59599MoQQZbk8tndAfxrTHpsMP7ErMqw)

[View in mermaid](https://mermaid.live/view#pako:eNptksFOwzAMhl8lyoFTK7UVY6M3UDW0w8QEXEC9ZI3XRWuTKnERaNq746QbKxs-Nbb_r7-d7HllJPCc10IjlppRoMIG2KLtGmhBo9I1e1gtHFvDxlhgT4AhNweQa1HtBpEUCHNjW4GMvVPEy2VcFKUeqg4qVEZ7DivgExrTefRQXDVCa0-8oZpTdUj6yFG4XRqxLMkmcZLGaRKxqTwxfw2KgD5HkGURExsEy46M9FZeW3kD50cZCscDu4rAm4x52eDDFx972oT6AkfuXwDPjKC6G6sIkSaXLrrueiE--azXRlj511BgTsdM-sFEnlULjVDbi4UE1Wysmo724WX_jh5k92PZzI_NI94C3bOS9Gr2nlFy3NJFlDynTynsruSlPlCf6NG8fuuK52h7iLg1fb3l-UY0jk59599MoQQZbk8tndAfxrTHpsMP7ErMqw).

Instead of rushing the code and keeping the iOS team hanging around, we can use the API Design-First workflow to create OpenAPI, then use Microcks to deploy mock servers which the iOS team can start to integrate with, using [Bump.sh](http://bump.sh/) to deploy API docs to explain how to use the mocked API! This cuts a bunch of time off the process as both the API and iOS team can work in parallel.

[![Design-first Simultaneous API / App Development](https://storage.googleapis.com/bump-blog-resources/2024-12-02-microcks/gantt-design-first.png)](https://mermaid.live/view#pako:eNp9kstqwzAQRX9l0KIrm8Yhpa13oSaQRSCQQmnxRrXGjogtGWkUCCH_3rHj5tXQWelxz5XuSHtRWIUiFZU0RLkBLtJUI2TodWXiUjtPsNJNqEkatMHDdDmHR5i2LWu2WNu2QTOgShLOrGskAXxyxYtFnGW5Oe56LEhb0xv8QZe1NEabCh6Go2GolKTfJBGMR-OneJTEySiCZKKOVIZtbXeQ2SJ0VrL3P1HjCGRJ6GCwSK6phS02sEK3ZQX8T90EuJe9W5wbwsqdb3E2fbk05ROe1Zl6R09d8qvqqddLii0m6l4v501b4yn-cf_DaUJ448flhp4EMENU35Jj9_aTm0v1bRWRaJCfUCv-FvvOLRe0ZjwXKQ-VdJtc5ObAOhnIrnamECm5gJFwNlRrkZay9jwLbfcdMi25I82vpJXmy9pmEB1-ABTLynw)

[View in mermaid](https://mermaid.live/view#pako:eNp9kstqwzAQRX9l0KIrm8Yhpa13oSaQRSCQQmnxRrXGjogtGWkUCCH_3rHj5tXQWelxz5XuSHtRWIUiFZU0RLkBLtJUI2TodWXiUjtPsNJNqEkatMHDdDmHR5i2LWu2WNu2QTOgShLOrGskAXxyxYtFnGW5Oe56LEhb0xv8QZe1NEabCh6Go2GolKTfJBGMR-OneJTEySiCZKKOVIZtbXeQ2SJ0VrL3P1HjCGRJ6GCwSK6phS02sEK3ZQX8T90EuJe9W5wbwsqdb3E2fbk05ROe1Zl6R09d8qvqqddLii0m6l4v501b4yn-cf_DaUJ448flhp4EMENU35Jj9_aTm0v1bRWRaJCfUCv-FvvOLRe0ZjwXKQ-VdJtc5ObAOhnIrnamECm5gJFwNlRrkZay9jwLbfcdMi25I82vpJXmy9pmEB1-ABTLynw).

No API ever comes out perfect the first time. There are always missing properties in a resource, missing filters on a collection, somebody forgot to set up pagination, maybe some resources need splitting in two to be more useful, or whole concepts might just fall apart and need rethinking.

Getting the client team(s) involved in the planning phase should help iron out much of this but getting these things discovered in the mock server will be a lot quicker and cheaper to fix than letting the mistakes get written into code.

If the iOS team notice a problem could wait for the API team make the changes, update the docs, update the mocks, all of which would be quicker than waiting for the team to change the code. Even better, they could make the change themselves by sending a pull request with the proposed changes. As soon as the API team has approved and merged the pull request, the docs and mocks will be automatically updated, and the trial/feedback cycle continues.

Speeding up and democratizing the prototyping phase with mock servers makes the API design-first workflow incredibly powerful, because everyone can fiddle with API descriptions a lot quicker than learning a whole new programming language.

### Saving Time and Money with Bump.sh and Microcks

Promises of saving time and money is not just some theoretical idea, the folks at [J.B. Hunt Transport Services](https://www.jbhunt.com/) reported **saving at least 7 months using Microcks** to power their mock servers. Mocking their API meant they were not only able to work concurrently, but also helped them capture the exact business requirements specified by the product owner in the form of an API description. These mocks can now be utilized in “sandbox” environments during development phases, and used later for experimenting with new functionality.

When the trials and experimentations are over, you can “lock down” the API description, allowing it to act as an [API Contract](https://bump.sh/blog/how-openapi-ensures-reliable-api-communication) which should not be broken. Microcks can help out here with its testing functionality, which separately from general existing test suites will allow for a simple compliance check of the API. The test runner will look at the OpenAPI/AsyncAPI as it exists, then generate test requests to fire at an implementation of the API to see how it handles them.

![Contract testing workflow](https://storage.googleapis.com/bump-blog-resources/2024-12-02-microcks/contract-testing.png)

If the sample requests are rejected, this suggests the API implementation is not able to handle the requests as described, which means either the API description is wrong - and therefore the API documentation will be wrong, or the API implementation is wrong. Whichever it is, a human will need to take a look at this and figure out what needs to be fixed

Microcks then checks the responses in the same way: it looks at what is coming back, checks that against the API description, and throws up warnings on a mismatch.

This all reduces testing time across the API and client applications, because you immediately have test coverage and confidence, allowing the individual teams to focus on unit testing bits of their code instead of everyone double checking the API is actually doing its job. Other testing tools will be welcome additions to cover your business logic, but contract testing alone is very helpful for spotting glaring problems that could otherwise be scaring off customers.

## Creating API documentation with Bump.sh

Unlike other API documentation tools you don't need to try and figure out how or where to deploy [Bump.sh](http://bump.sh/) documentation. Bump.sh is a hosted solution that can be deployed with a single CLI command pointing at an OpenAPI or AsyncAPI description document.

```
$ bump deploy openapi.yaml \
  --doc <your-documentation> \
  --token <my-documentation-token>
```

Instead of using the [CLI](https://github.com/bump-sh/cli#bump-deploy-file) you could use [GitHub Actions](https://github.com/marketplace/actions/bump-sh-api-documentation-changelog), or a bunch of other [Continuous Integration](https://docs.bump.sh/help/continuous-integration/) tools.

*Learn more about [deploying API documentation](https://docs.bump.sh/help/publish-documentation/deploy-and-release-management/) with Bump.sh.*

## Simulating an API with Microcks

Microcks is a Java web application which you can set up on your own server, or deploy as a Docker or  Kubernetes container. It can be configured per-API to pull API descriptions from a public URL (like a GitHub public "raw" URL, or a S3 bucket). Alternatively you can push it your server using the Microcks CLI.

```
$ ./microcks-cli import 'weather-forecast-openapi.yaml:true' \
   --microcksURL=http://localhost:8080/api/
Microcks has discovered 'WeatherForecast API:1.1.0'
```

We've deployed (or imported) a mock of the [Train Travel API](https://bump.sh/bump-examples/doc/train-travel-api?server_id=server-https-try-microcks-io-rest-train-travel-api-1-0-0) on the Microcks "Try" demo instance, so you can give it a go:

```
$ curl -X GET https://try.microcks.io/rest/Train+Travel+API/1.0.0/stations
```

*Learn more about [mocking APIs with Microcks](https://docs.bump.sh/guides/bump-sh-tutorials/mocking-with-microcks/).*

## Testing an API with Microcks

Once you've got the Microcks instance set up with your APIs imported you can then set up test runs. This process can either be kicked off manually via the application interface when you’d like to make extra certain things are ok, or automatically via continuous integration, perhaps to make sure that a pull request with code and/or description changes are still all correct.

Again you can use the [Microcks CLI](https://microcks.io/documentation/guides/automation/cli/) to automate testing, but the Microcks team have put together guides showing how to handle this using [GitHub Actions](https://microcks.io/documentation/guides/automation/github-actions/), [Jenkins](https://microcks.io/documentation/guides/automation/jenkins/), and [Tekton](https://microcks.io/documentation/guides/automation/tekton/).

*Learn more about [testing APIs with Microcks](https://docs.bump.sh/guides/bump-sh-tutorials/testing-with-microcks/).*
