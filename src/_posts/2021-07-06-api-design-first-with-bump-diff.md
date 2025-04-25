---
title: Bump diff, the missing piece for an API “design-first” approach
author: Paul Bonaud
category: Company
image: blog/api-design-first-bump-diff.png
---

While building APIs, are you more of a **design-first** or a **code-first** type of person? The former approach is usually done when designing APIs for clients, while the latter one is usually used for internal APIs.

At Bump we like to focus on design-first APIs because we think an API - be it RESTful, Messaging, GraphQL, … - needs more love during its design phase. This is why we have improved our tools to go in that direction.

By focusing on the API contract first, we step into the shoes of API consumers. And it is a great way to make sure we build consumer-friendly APIs. Thus making the API clearer, easier to use, and improving its adoptability.

However, until today, we had one missing piece to offer a good design-first approach for our users. Read on for some good news if you are a “design-first” person or _maybe_ a good argument to convince you to become one 😊

## API contract development

For clarity we will focus on a tiny [API from our demo train company](https://demo.bump.sh/doc/users-account) which retrieves the current logged-in users account details. It’s made up of a single `GET /account` endpoint.

Now, imagine you want to change the API to add a list of tickets in the user details, and also want to add a new endpoint to be able to fetch a specific ticket. The changes are easily described in human words, but **what does it represent from your API contract point of view?** You will modify the JSON or YAML contract  with your favorite tool, but now what? `git diff` will probably be a bit hard to read…

**This is where our [new `bump diff` command](https://www.npmjs.com/package/bump-cli#bump-diff-file) comes into play.**
_Make sure to upgrade your `bump-cli` package to at least [`v2.1.0`](https://github.com/bump-sh/cli/releases/tag/v2.1.0) to test it._

Straight from your CLI, you are now able to describe the changes made in your contract:


```shell
> bump diff --doc users-account api-specification.yaml
Updated: GET /account
  Response modified: 200
    Body attribute added: ticket_ids
Added: GET /tickets/{ticket_id}
```

The new command will output a quick summary of what has changed between your latest deployed API contract and the one you have changed locally.

If you need more context, with a visual diff for instance, you can even use the `--open` flag to open the diff directly in your browser:

```shell
> bump diff --open --doc users-account api-specification.yaml
```

The command will return the diff summary and **[open this documentation diff in your browser](https://demo.bump.sh/doc/users-account/changes)**

![Bump visual diff of users API](https://storage.googleapis.com/bump-blog-resources/building-api/bump-diff-users-account-framed.png)

## Collaborating on API design

So, you have made some changes to the contract locally but now you want to receive suggestions and reviews from your team. It’s a good time to open a pull request.

If you use [GitHub Actions](https://github.com/features/actions) to launch your automation workflows, we have some more good news for you: **we now offer a stable `bump-sh/github-action@v1` action**. And [this release](https://github.com/bump-sh/github-action/releases/tag/v1.0.0) includes **automatic API contract changelog pushed as a comment for each pull request**.

![Bump diff inside a PR timeline](https://storage.googleapis.com/bump-blog-resources/building-api/bump-diff-in-PRs-framed.png)

Your team can now directly discuss on the pull request and suggest improvements by reading the diff summary without needing to dig into the JSON diff - which you’ll have to admit is a PITA to read 😅 -. If you update the contract again, the initial comment will be updated accordingly.

We find this bot comment really useful because it helps the team to jump in API design decisions quickly without having to step into a full code review. And it’s a win-win situation, because the person implementing the changes doesn’t have to focus on the code directly to receive quick feedback.

## More to come soon

If you are still unsure whether you want to work with a design-first or code-first approach when building your APIs here are two good reads from the community:

- _A design-first [example from the AsyncAPI community](https://www.asyncapi.com/blog/designing_your_apis_with_asyncapi_part_1#designing-the-apis-with-asyncapi)_
- _a comparison of both methods [from the OpenAPI community](https://blog.restcase.com/api-development-with-design-first-approach/)._

Regarding our two novelties, if you want to try them, you can visit our dedicated help pages or [contact us](mailto:hello@bump.sh) anytime:

- [Help page for the new `bump diff`](https://help.bump.sh/bump-cli#validate-the-documentation-file-)
- [Setting up API diff on pull requests with our GitHub Action](https://help.bump.sh/continuous-integration/github-actions#api-diff-on-pull-requests)

You will soon see some more improvements, on the way we display diff summaries, helping you identify breaking changes by warning the reviewers or even break the Continuous Integration checks if you desire… So stay tuned.
Until then we will continue to work on one of our initial mission: [“Git diff, for your APIs”](https://twitter.com/bump_hq/status/1083402953422196743/photo/1).

Have fun, stay free and stay kind.

✨
