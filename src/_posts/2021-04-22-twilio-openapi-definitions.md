---
title: Playing with Twilio's OpenAPI specifications
author: Paul Bonaud
category: Experiment
image: blog/twilio-openapi-specifications.png
---
This week, [Twilio published OpenAPI definitions](https://www.twilio.com/blog/introducing-twilio-open-api-specification-beta) for all of their APIs. Let's see together the small steps we can take to transform those definitions into a nice looking API Reference documentation page which tracks API changes automatically.

If you wonder what Twilio is, here's a paragraph taken from their about page:

> Twilio has democratized communications channels like voice, text, chat, video, and email by virtualizing the world’s communications infrastructure through APIs that are simple enough for any developer to use, yet robust enough to power the world’s most demanding applications.

*Note: this is an experiment demonstration which is not endorsed, nor affiliated by, the Twilio company.*

## Definition files hierarchy

First let's take a look at [the repository with their published files](https://github.com/twilio/twilio-oai). The OpenAPI definition files are available in the `spec/` folder in both JSON or YAML formats. Here's a sneak peek of some of the JSON files available:

```
spec/
└── json/
    ├── twilio_accounts_v1.json
    ├── twilio_chat_v2.json
    ├── twilio_conversations_v1.json
    ├── twilio_events_v1.json
    ├── twilio_fax_v1.json
    ├── twilio_messaging_v1.json
    ├── twilio_notify_v1.json
    ├── twilio_numbers_v2.json
    ├── twilio_verify_v2.json
    ├── twilio_video_v1.json
    ├── twilio_voice_v1.json
    └── …
```

At first glance we can imagine a quick way of generating the documentation pages:

* For each file from the available `*.json` files

  * Extract the API name from filename `twilio_<api_name>_vN.json`
  * Create documentation `api_name` from the api definition file `twilio_<api_name>_vN.json` within a [single Hub](https://bump.sh/#hubs) named Twilio
* Enjoy the result and customise the UI!

## Automatically publish the documentation on changes

In order to demonstrate the magic on each commit I've forked their repository [on my GitHub namespace](https://github.com/paulRbr/twilio-oai) where I will be able to push to my `main` branch and use GitHub Actions on my fork.

Now let's write a tiny shell script *\- Don't worry it's only an experiment -* which will do what we imagined in the previous paragraph:

```sh
#!/usr/bin/env sh
set -eu

# Install bump-cli (published as a Ruby gem)
gem install bump-cli

# For each file from the available `*.json` files
for api in spec/json/*.json; do
    # Extract the API name from filename `twilio_<api_name>_vN.json`
    apiName="${api%_*}" # remove everything after the last '_'
    apiName="${apiName#*_}" # remove everything before the first '_'

    # Auto-create documentation <apiName> from the api definition file
    # in the 'twilio' hub
    bump deploy \
      --doc "${apiName}" --token "${BUMP_TOKEN}" \
      --hub twilio --auto-create \
      "${api}"
done
```

The `bump deploy` command is where all the magic happens: it will push the api definition file to generate its documentation on Bump.sh. By passing the `--auto-create` flag together with the `--hub twilio` and `--doc ${apiName}` flags we are going to **create** a documentation called `${apiName}` **if it doesn't exist**. On all future changes of the definition files, it will simply be **updated**.

And now the GitHub Action workflow to use the script above on each commit of the `main` branch of our git repository:

```yaml
name: Deploy twilio API documentation on Bump

on:
  push:
    branches:
      - main

jobs:
  deploy-doc:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7
          bundler-cache: true
      - run: sh ./.github/scripts/deploy-all.sh
        env:
          BUMP_TOKEN: ${{ secrets.BUMP_TOKEN }}
```

We are almost there! You might notice we are using a `secrets.BUMP_TOKEN` variable which needs to be added in the settings of my GitHub repository. Let's get our hub access token from Bump.

## Creating the Twilio hub page on Bump.sh

OK let's leave the terminal and head to my [Bump.sh](https://bump.sh/docs) account in order to [create the hub](https://bump.sh/blog/organize-your-api-documentation-with-bump-hubs#creating-a-hub). I'm headed to [bump.sh/hubs/new](https://bump.sh/hubs/new) to do so.

Now my hub is created, I can retrieve my `hub token` from my hub `Settings > CI deployment`  page

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/twilio-hub-token.png "Hub token for CI deployments")

And adding the token to my GitHub repository secrets at the following location: <https://github.com/paulRbr/twilio-oai/settings/secrets/actions> *(Don't forget to change your project namespace in the URL if you're trying it out)*

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/github-repository-secrets-bump-token.png "GitHub `secrets.BUMP_TOKEN`")

We are now ready to push our two files *\- the sh script and the GitHub Action workflow -* of the previous paragraph.

Shall we try to `git push origin main`?

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/github-action-twilio-deploy-all.png "GitHub Action publish API documentation on Bump.sh")

The screenshot above shows the [GitHub Action logs that ran successfully](https://github.com/paulRbr/twilio-oai/actions/runs/766705170) on my `main` branch after pushing. We can see everything seems to have worked as expected.

## Refining the resulting Twilio API reference hub

It's live! <https://bump.sh/hub/twilio/> 🎉

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/twilio-hub.png "Twilio API reference Hub")

The result is already pretty nice. We can browse each [API documentation](https://bump.sh/api-documentation) and have a good overview of what Twilio's API can offer. Let's see what we can change on Bump and in Twilio's definition files to make it even better.

## Grouping by categories and UI customisation

Here are some of the configuration option I changed in my hub settings page:

* Select the grouping mode of API docs to “by category” from the hub `Settings > Customize UI` page
* Adding a category to each documentation from their respective `Settings > Hubs settings` page

  * Moving the main `api` documentation into a dedicated category called **“Main”**
  * Moving all docs containing the word `TODO:` into a dedicated **“Todo”** category (Might be useful for the Twilio dev team to track which api definition files needs attention)
  * Moving all tools related docs into a category **“Tools”**
  * All the other docs will land in a category that I named **“Uncategorized”**
* Changing the hub defaults from the `Default settings` page, which will apply to all documentation of that hub

  * Uploading Twilio's logo
  * Change the color scheme to red
  * Change default navigation to `Groups and operations with verbs` to display all API operations with their associated HTTP verb in the navigation bar of each documentation page

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/twilio-hub-customized.png "Twilio API reference Hub customized")

## Updating the api definition files

Now the hub is looking all good. We can get back to API definitions in our favorite text editor.

To demonstrate the automatic documentation updates I have [commited some changes](https://github.com/paulRbr/twilio-oai/commit/02bb6c99721372e1516b8c1fc1ce4594ece23814) on all API `*.json` files. The goal was to change their `description` fields and mark all docs as “unofficial” to not confuse end-users.

After 1min our GitHub Action workflow reports [a successful run](https://github.com/paulRbr/twilio-oai/runs/2401968115). Meaning our hub and all subsequent documenation pages have been updated.

**<https://bump.sh/hub/twilio/>**

![](https://storage.googleapis.com/bump-blog-resources/twilio-hub/twilio-hub-final.png "Twilio API reference Hub final")

That's about it. If you have a set of different APIs and need a centralised public page for your docs Bump can help you out. [Give it a try](https://bump.sh/users/sign_in) and [let us know](mailto:hello@bump.sh) what you think or how we can improve to better fit your needs.

Have fun, stay free and stay kind.

✨
