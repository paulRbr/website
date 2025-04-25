---
title: "Bump: GitHub Actions"
author: Doug Sillars
category: Tutorial
image: blog/bump-github-actions.png
---

Here at Bump, we want your documentation to look beautiful. That’s why we designed our layout to work with both OpenAPI and AsyncAPI specifications - just provide your API in these formats, and we’ll make it look amazing.

But where we really simplify things is the ability to update your docs automatically, so you don't even have to think about updating. Just push your code, and we'll make sure your docs are updated.

In this post, we’ll walk through the Bump GitHub Action. If you keep your code (with your API specification) on GitHub, this action will do the documentation updates for you. You'll need a few things:

- A [Bump.sh account](https://bump.sh/users/sign_up).
- Your api location at Bump.sh. You don't actually need to upload your docs, you just need to create the location where it will reside. Once created, you’ll need a `Doc id` and an `Access token` from your docs settings. (Settings > CI deployment).
- Your code (with your API document) hosted on GitHub.

## GitHub Actions

GitHub Actions are automated tasks that GitHub will run over your repository. In this case, when a commit is made, it will take the API specification file denoted in the action (a YAML or JSON), and use it to update your documentation on Bump.

In this case, I will be updating my [JokeAPI](https://github.com/dougsillars/jokeAPI) on Bump whenever new code is pushed.

### Step 1: create your documentation at Bump.

In this case, I want to update my Joke API, so I’ll create a version of my API called “JokeAPI - updating from GitHub Action”  You can see this version on my [Bump account](https://bump.sh/hub/MyApis/doc/jokeapi-updating-from-github-action). I uploaded the current YAML file so that some content would be present on the site.

Inside my new API’s settings, under the “CI deployment” settings, there is a `Doc id` and an `Access token`:

![Bump documentation settings screen](https://storage.googleapis.com/bump-blog-resources/github-actions/bump-documentation-settings.png)

We’ll need these to implement our GitHub Action. But your `Access token` needs to remain private, so keep it under wraps (or a salmon coloured rectangle).

### Step 2: Create GitHub Action

In your GitHub repository, we’ll create our GitHub Action.  Click “Actions” at the top of your repo, and then click “New Workflow”.

![GitHub Action worflow setting screen](https://storage.googleapis.com/bump-blog-resources/github-actions/github-action-workflow-setting.png)

You’re going to get a lot of options on workflows you can create, but we can ignore these. We’ll create our workflow from scratch, so click the “set up a workflow yourself” link. (Don’t worry, you’re not doing it yourself - we’ll do it together!)

Paste in the following code:

```yaml
name: Deploy documentation

on:
  push:
    branches:
      - master
jobs:
  deploy-doc:
    name: Deploy API doc on Bump
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

There are a few fields you’ll need to change:

1. Branch: If your main branch is `master` - you’re set. If you have a newer repo, your main branch is probably called `main`. If your branch has a different name - enter the branch you’d like to update on.
2. Doc: Enter the `Doc id` from your Bump CI deployment settings.
3. Token: Leave in this state. This is referencing a GitHub Secret. So we can use this variable to keep your `Access token` private.
4. File: The link to your yaml/json file. In my jokes api, this became: `file: joke_api_0001.yaml` as my yaml is in the root directory.

### GitHub Secrets

To keep your API token private, we’ll use GitHub Secrets. In your repository, click Settings: Secrets
There’s a button to create a new secret.

![GitHub Action secret screen](https://storage.googleapis.com/bump-blog-resources/github-actions/github-action-secret.png)

You can see I have created a secret called `BUMP_TOKEN` that holds the API token for me repo. This is referenced in the workflow using ```${{secrets.BUMP_TOKEN}}```.

That’s it! Your workflow is now ready to go.

## Testing out your workflow.

To test my workflow, I’ll add a fake endpoint to my API:


```yaml
/fake_entry:
  post:
    tags:
      - users
    summary: fakeentry
    operationId: fake
    description: fake
    parameters:
      - in: header
        name: x-admin
        schema:
          type: string
        required: true

    requestBody:
      content:
        application/json:
          schema:
            type: object
            required:
              - fake
              - fake1
```

Saving this to my repo, I’ll push this code to GitHub with the commit message “adding fake params”. Immediately on the actions page, I see:

![GitHub Action workflow screen](https://storage.googleapis.com/bump-blog-resources/github-actions/github-action-workflow.png)

And after a few seconds: the yellow turns green, indicating that the push to Bump was successful!

## Looking at the Docs

The new `/fake_entry` endpoint is visible under `Users`:

![Bump Joke API fakeentry screen](https://storage.googleapis.com/bump-blog-resources/github-actions/bump-joke-api-fakeentry.png)

### Changelog

Bump reports every change made to the API, and we can see the GitHub action report:

![Bump Joke API changelog](https://storage.googleapis.com/bump-blog-resources/github-actions/bump-joke-api-changes-history.png)

By clicking on the date of the item, we are directed to the diff:

![Bump Joke API diff](https://storage.googleapis.com/bump-blog-resources/github-actions/bump-joke-api-diff.png)

## Conclusion

My next edit was to remove this fake entry endpoint, so that I might continue building my Joke API:

![Bump Joke API changelog updated screen](https://storage.googleapis.com/bump-blog-resources/github-actions/bump-joke-api-changes-history-updated.png)

Using the fake entry, we were able to demonstrate the power of using GitHub actions - simply updating the code in my GitHub repository resulted in the new documentation being pushed live to users.

Removing the manual step of uploading your documents ensures that whatever code is pushed to production - the docs are pushed at the same time, resulting in up-to-date documentation. Every time.
