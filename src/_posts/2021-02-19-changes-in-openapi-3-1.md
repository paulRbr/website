---
title: Two OpenAPI 3.1 changes we love
author: Sébastien Charrier
category: OpenAPI
image: blog/openapi-3-1-beta.png
end_with_preview: false
---
This week, [version 3.1 of OpenAPI](http://spec.openapis.org/oas/v3.1.0) has officially landed after several beta and release candidates. This is a great news for the REST API community, as some important changes are coming with this version. Congrats to all the team behind this huge step forward!

Here are two major changes we loved so much at Bump that we have already released their support.

## Webhooks support

This is one of the most important changes in 3.1: you can now describe webhooks provided by your API in your OpenAPI specification, the same way you describe your API paths.

If you don't know what a webhook is, you may want to [read this article](https://codeburst.io/what-are-webhooks-b04ec2bf9ca2) before going any further.

> Webhooks provide a mechanism where by a server-side application can notify a client-side application when a new event (that the client-side application might be interested in) has occurred on the server.

Here is an example of how you describe a webhook with OpenAPI 3.1:

```yaml
webhooks:
  newPet:
    post:
      requestBody:
        description: Information about a new pet in the system
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Pet"
      responses:
        "200":
          description: Return a 200 status to indicate that the data was received successfully
```

I'm glad to announce that these [OpenAPI webhooks are already supported by Bump](https://docs.bump.sh/product-updates/2021/02/04/hello-openapi-webhooks/) as first class citizen: we show them in your documentation and analyze them when generating the automatic changelog.

You have nothing more to do, just deploy your first specification with webhooks and you'll see the magic happen. [See a live example](https://bump.sh/bump/doc/webhook-example)

## Better $ref pointers

I really love this one, as it solves a nightmare for those who have experienced splitting their OpenAPI file into reusable components.

Until now, as described in the specification, `$ref` pointers were fully replaced by what they were pointing to when resolving an OpenAPI specification. This means that any sibling of the `$ref` was removed. For instance:

```yaml
property:
  $ref: #/components/pointer
  required:
    - hello
components:
  pointer:
    hello: world
```

Was resolved as:

```yaml
property:
  hello: world
```

As you may see, the `required` key alongside `$ref` was removed. This was particularly annoying when trying to reuse a model in different contexts, like in this situation where you want to specify some required attributes.

The good news is that as a part of its JSON Schema compatibility migration, OpenAPI 3.1 allows us to merge these siblings with the resolved `$ref` ones. The previous example now results into this:

```yaml
property:
  hello: world
  required:
    - hello
```

This change will simplify some specifications, and probably remove a lot of code duplication. And yes, this is supported by Bump as of now.

## What about other 3.1 changes?

There are [many other changes](https://github.com/OAI/OpenAPI-Specification/releases/tag/3.1.0) in this new version of the specification. In our effort to offer the best possible OpenAPI experience, we will strive to support them all.

Have any comment or question about OpenAPI 3.1? [Ping us anytime](mailto:hello@bump.sh), we will always answer.