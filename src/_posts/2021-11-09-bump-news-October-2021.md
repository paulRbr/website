---
title: Bump News October 2021
author: Grégoire Pichat
category: Company
image: blog/bump-news-october-2021.png
---
Last month brought us some improvements for a better developer experience, both in the API design phase and in the understanding of your API by your users:

* Live preview the documentation while writing your API definition file
* Diff navigation: A faster way to see what has changed in your API
* Support of multiple examples to match the use cases of your API consumer

Read below for more details on how these new features can help you and your users in the various stages of the API cycle.

## Bump live preview

This new command gives you the ability to stay focused on your API definition file (OpenAPI or AsyncAPI file) while seeing your Bump preview documentation page being updated as you change the file.

No need for a specific text editor, or any extension, just use the bump CLI to preview your documentation live.

This is an enhancement of the Bump `preview` command, just add the  `--live` flag to use it.

![bump-live-preview](https://storage.googleapis.com/bump-blog-resources/bump-news-october-2021/live-preview.gif)

Learn more about live preview on [our help page](https://help.bump.sh/bump-cli#live-preview).

## Bump diff navigation

Quickly identify what has changed in your API from the documentation.

Thanks to the diff navigation, you can now easily jump from change to change! No need to scroll anymore to see the latest changes in your documentation diff, you are a click away from the next change.

![bump-diff-navigation](https://storage.googleapis.com/bump-blog-resources/bump-news-october-2021/bump-diff-navigation.gif)

[See it in action](https://docs.canopyservicing.com/doc/latest/changes/b90c2f30-b9d5-4e17-86c6-34374bfa418c)

## Multiple examples support

Give your API users a personalized experience and a better understanding of your API while reading your documentation, by including multiple examples to your API definition.

Bump now supports the display of multi examples that are supported by the OpenAPI and AsyncAPI specifications.

![bump-multiple-examples-support](https://storage.googleapis.com/bump-blog-resources/bump-news-october-2021/multiple-examples-support.jpg)