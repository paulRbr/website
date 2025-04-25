---
title: The "Don't Have Time to Create API Documentation" Paradox
author: Phil Sturgeon
category: Tech
image: blog/time-to-create-doc-paradox.png
end_with_preview: true
---

You are building an API for a reason. You need to integrate with another business to make money. You need to get data to a new frontend application to get more users to make money. You have important business to do, so why should you waste time creating API documentation?

As an API consultant who constantly works in rescuing companies from messes they've made for themselves, one of the most common problems being solved is trying to figure out how an API works after the developer/team who built it have handed it off, left the company, or just plain forgotten.

## Why do we even need API documentation?

Let me tell you a story about a unicorn startup who had infinite developers and silly deadlines, who blew all their money on nonsense.

This company was focused on agile development. Standard cliche Silicon Valley stuff; move fast and break things. They would need to rush out an API to hit incredibly tight deadlines, so they would get everyone sat around the same ping pong table to work on it. The backend and frontend teams would all hash it out, write a bunch of code one-handed eating cold pizza with the other, and with a few days a prototype API was built and the frontend team was integrating with it.

Weeks go by, and more functionality is needed, so a few new endpoints or properties get popped in here and there. So far so good.

Months go by, and new clients need to integrate with the API. Unfortunately those clients were not sat around that ping pong table at the time, the original developers have forgotten or moved on, and the Slack channel doesn't have the random JSON examples in history any more because its been full up with gifs.

## If nobody remembers how an API works do you even have an API?

This company was building new APIs every few months because they'd forgotten how the old ones worked. Several of their 40+ API teams were building v3, v4, or v12 of their APIs because it seemed quicker and easier than working it out.

These new API versions were being created regularly with no meaningful differences from the previous versions, it's just that people honestly could not remember how the API worked. There were no unit tests or contract tests to glean this information from, and some of the APIs did not even define the JSON output using serializers or types of any sort, because they were pulling in undeclared information from multiple other APIs and services, merging it together, and sending *whatever* to the client.

Some of the APIs were acquired through other startups being bought and folder into the company, and were built in languages none of the team understood, let alone knew how to get running.

Sniffing HTTP traffic going through production environments is another approach which can help to build a partial contract in these black box situations, but you never know if you've caught every endpoint, or just the popular ones. You also can never know if a particular field is ever nullable, because it just so happens to have had values set in all the messages observed lately...

Companies who forget how their APIs work generally have two options.

1. Hire an expensive expert to come and figure it out.
2. Build a new API from scratch.

If you pick option one, I'll see you soon.

If you pick option two, are you going to make the same mistakes again, or are you going to write API documentation this time?

## OpenAPI saves API Developers time

API developers being asked to produce API documentation at the end of the process is always going to lead to complaints unless it comes from the top. It's hard to convince business to do that when it very clearly feels like the API is "done" now, and they need to let that team spend an extra week or two writing things down that they say won't help anything.

This whole dynamic is absolutely backwards, and it reminds me of the lost decades of software engineers pretending they didn't need to write unit tests because it "took more time". We now know that more time is saved by using unit tests to cover code you're about to write (Test-Driven Development) or code you wrote earlier (Spike and Stabilize).

Much like testing, building good quality API reference documentation feels like a huge chore, but using OpenAPI means you can speed up both the API documentation process, and the API development process too. 

1. Write OpenAPI before you write any code, so you can use mock servers ([with Microcks, for instance](https://docs.bump.sh/guides/bump-sh-tutorials/mocking-with-microcks/)) to see if stakeholders like the shape of the API before you waste time building something they don't want.
2. When confirmed you can use the OpenAPI to contract test the API responses instead of thinking about how to contract test it later (well, [also with Microcks](https://docs.bump.sh/guides/bump-sh-tutorials/testing-with-microcks/), by the way), meaning your API is more reliable and better tested incredibly early on, something else people often leave until bugs start happening to think about finding time to set up.
3. Use OpenAPI for server-side validation, pointing application framework middleware, to save you wasting loads of time explaining the shape of your payload data when its already written in the OpenAPI you created in step 1 and used in step 2.

When you have completed all these steps guess what. You already have a pretty solid API contract, which is the core basis of API documentation. [With a single CLI command](https://docs.bump.sh/help/continuous-integration/cli/#bump-deploy-file) you can run `bump deploy openapi.yaml` and that OpenAPI will be turned into [beautiful hosted API documentation](https://bump.sh/api-documentation) that can be shared with your whole team.

### Handing over to Technical Writers

Once you’ve built an amazing API accurately described with top quality OpenAPI you have a more stable and reliable API that does exactly what it says it does, and that’s a pretty good place to be in compared to the usual “Slack channel with some vague outdated notes” or a Excel spreadsheet with some endpoints in it.  

Documentation is about a lot more than just showing endpoints and properties, and writing long form descriptions of operations and workflows can take a huge amount of time. This is a good handing off point to work with Technical Writers, who can massage the OpenAPI you have created into shape and expand on your points. We have a couple of tips to [improve OpenAPI descriptions](https://docs.bump.sh/guides/technical-writing/), and put the accurate quantity of polish and useful info.

The more context you can give them in the OpenAPI document the better, but it’s far easier for them to look at OpenAPI and ask questions than it is to try and look at 10 different programming languages and try to figure all that out.

## API Documentation Saves Everyone Time

Getting your OpenAPI built early in the process means you can use it to speed up the whole API lifecycle, and then at any point you can pop that into [Bump.sh](http://bump.sh/) for beautiful documentation, and keep updating it every time you add new functionality or make any changes to the codebase, using a [git-centric workflow](https://bump.sh/blog/from-swaggerhub-to-bump-git).

Your clients know how to onboard without having to pester you and your team either directly or through support.

Your technical writers have more context so they can do more without you.

Your developers remember how things are meant to work so they can make smaller changes easier.

Nobody is going to have to waste time and money on rebuilding entire APIs because they forgot how they work.