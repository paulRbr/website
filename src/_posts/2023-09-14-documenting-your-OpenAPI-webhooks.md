---
title: Documenting your OpenAPI webhooks
author: Paul Monseu de Bodinat
category: Tech
image: blog/webhooks-with-openapi.png
---

Let's talk about webhooks, and how to document them with OpenAPI 3.1!

## Difference between REST API & Webhooks

Both REST API and webhooks are solutions to make technical services communicate together, but while an API is synchronous (each API request has an answer), a webhook is asynchronous (a specific event will provide this request):

- An API needs to be called to provide an answer (__PULL model__: the client _pulls_ data from the server, via HTTP requests to an API endpoint)
- A webhook needs an event to provide an answer (__PUSH model__: the server _pushes_ data to the client, without the client actively requesting it)

The main difference between a webhook and an API request is the direction of communication and the timing of data transfer:
API requests are client-initiated, synchronous, and used for actively retrieving data, while webhooks are server-initiated, asynchronous, and used for receiving real-time updates or notifications without the need for polling or actively requesting information.

Both have their use cases, and which one to use depends on the specific requirements of your application.

Let's take an example about a traveller asking his fellow travelers "Are we there yet?", all along the road…

![Shrek is our API here](https://storage.googleapis.com/bump-blog-resources/webhooks-with-openapi/are-we-there-yet.jpeg)

API design here would consist in a endpoint where user can request: "Are we there yet?"

Every time the question is asked, an API call.

And every time, all along the road:

- API call: "Are we there yet?"
- API response: "No"

And finally, far far away, when you reach your final destination…

- API call: "Are we there yet?"
- API response "Yes!"

Well, this doesn't look really efficient… And using a REST API was not the best solution here indeed.

This should have been triggered by a specific event. For example: "Arrival in 4 kilometers".

Then, and only at this specific event, just once, a webhook is sent to Donkey:
"We're almost there…"

Sure Shrek and Fiona would have preferred this webhook solution.

## How webhooks were 'supported' with OpenAPI 3.0.3

In version 3.0, it was not really webhooks but something very similar: callbacks.

OpenAPI 3.0 supports a `callbacks` field for Operation object at same level than tags, summary, description or responses.

But when responses concern synchronous answers of the API, callbacks describe asynchronous answers.

For example when the result of an API call requires too much time to be delivered, or could be delivered several times… A callback is initiated by an event, not by a call to the API.

cf [Callback example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/callback-example.yaml) from OpenAPI Initiative:

```yaml
openapi: 3.0.3
info:
  title: Callback Example
  version: 1.0.0
paths:
  /streams:
    post:
      description: subscribes a client to receive out-of-band data
      parameters:
        - name: callbackUrl
          in: query
          required: true
          description: |
            the location where data will be sent.  Must be network accessible
            by the source server
          schema:
            type: string
            format: uri
            example: https://tonys-server.com
      responses:
        '201':
          description: subscription successfully created
          content:
            application/json:
              schema:
                description: subscription information
                required:
                  - subscriptionId
                properties:
                  subscriptionId:
                    description: this unique identifier allows management of the subscription
                    type: string
                    example: 2531329f-fb09-4ef7-887e-84e648214436
      callbacks:
        # the name `onData` is a convenience locator
        onData:
          # when data is sent, it will be sent to the `callbackUrl` provided
          # when making the subscription PLUS the suffix `/data`
          '{$request.query.callbackUrl}/data':
            post:
              requestBody:
                description: subscription payload
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        timestamp:
                          type: string
                          format: date-time
                        userData:
                          type: string
              responses:
                '202':
                  description: |
                    Your server implementation should return this HTTP status code
                    if the data was received successfully
                '204':
                  description: |
                    Your server should return this HTTP status code if no longer interested
                    in further updates

```

Obviously there was a callback description connected to an operation specified in the API.

But what about events arriving as an incoming HTTP, with requests configuration defined outside of the API? We could define this incoming URL from a form or whatever…

Webhook notion was missing with old versions of OpenAPI.
Before OpenAPI, it was for example possible to use Redoc custom specification extension
`x-webhooks` (cf [documentation](https://redocly.com/docs/api-reference-docs/specification-extensions/x-webhooks/)).

Here come the necessary evolution for webhooks, fortunately generalized by OpenAPI 3.1.

## How webhooks are supported with OpenAPI 3.1

cf [OpenAPI 3.1 documentation](https://spec.openapis.org/oas/v3.1.0)

OpenAPI Document is now described as:
> A self-contained or composite resource which defines or describes an API or elements of an API.
> The OpenAPI document MUST contain at least one `paths` field, a `components` field or a `webhooks` field.

And about field `webhooks`:
> The incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement.
> Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration.
> The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses.

__About classical endpoints:__

`paths` has many endpoints: `Path Objects`.
These endpoints have many operations, described with `Path Item Objects` (one or many).

__About webhooks:__

`webhooks` describe many webhooks.
Each webhook has a key `name` (it's a unique string to refer to each webhook) with its `Path Item Object` (only one).

And good news, format for both `Path Item Objects` are exactly the same (you can even re-use the same with internal references)!

__The main difference is that the request is initiated by the API provider, it's not necessary to provide the target 'URL' anymore__

Consequently, we can describe this expected HTTP income outside of a specific Operation callback (or asynchronous response, you get it).

To illustrate this, let's take the [Webhook Petstore example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.yaml), provided by OpenAPI Initiative.

```yaml
openapi: 3.1.0
info:
  title: Webhook Example
  version: 1.0.0
  description: >
    Easy example of documentation with a single webhook,
    provided by OpenAPI Initiative.

# Since OAS 3.1.0 the paths element isn't necessary. Now a valid OpenAPI Document can describe only paths, webhooks, or even only reusable components
webhooks:
  # Each webhook needs a name
  newPet:
    # This is a Path Item Object, the only difference is that the request is initiated by the API provider
    post:
      description: A new pet is born, let's come and discover it in Petstore.
      requestBody:
        description: Information about a new pet in the system
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Pet"
      responses:
        "200":
          description: Return a 200 status to indicate that the data was received successfully

components:
  schemas:
    Pet:
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string


```

A webhook named `newPet` is implemented.
When a related event (a new pet arrived in shop, for example a new born), a request is sent to every users expecting this event, to URLs they have previously provided.

## How webhooks are supported by Bump.sh

At Bump.sh, we provide an API contract management platform that helps you document and track APIs:
we cleverly identify what changes in your APIs structures, and keep developers up to date.

All it takes is to upload your OpenAPI document to Bump.sh and let the magic happen.
You want to actually see the magic? You can play around with the live documentation of the above [Petstore live example](https://bump.sh/hub/examples/doc/webhook-simple).

As explained by Sebastien in [Two OpenAPI 3.1 changes we love](/changes-in-openapi-3-1), we provide supports of OpenAPI Webhooks from version 3.1!
This version of OpenAPI grants more support to webhooks and considers they are at the same level than paths, making it easier to provide documentation including REST API and webhooks.

Do not hesitate to have a look on our dedicated support page [here](https://docs.bump.sh/help/specification-support/openapi-support/webhooks/).

## Webhook on your API documentation

While speaking about webhooks in API documentation, I should definitely mention our home-made webhook example,
a webhook to follow your API documentation.

If you create an API documentation at Bump.sh, you have access to some integrations to follow API changes.
In addition to [email subscription](https://docs.bump.sh/help/api-change-management/#email), [RSS feed](https://docs.bump.sh/help/api-change-management/#rss) or [Slack notification](https://docs.bump.sh/help/api-change-management/#slack),
you also have the possibility to create your own webhook, attached to your API.

You just need to provide an url and each time documentation changes,
a new POST request is sent to this url, with JSON description of the API and the related change.

This is detailed in our [help center about webhooks](https://docs.bump.sh/help/api-change-management/webhooks/).

And of course, we have documented this webhook in our API documentation, following OpenAPI specification:
https://developers.bump.sh/group/webhook-documentation-change

```json
# Headers
X_BUMP_SIGNATURE_256: a0b1c1d2e3f5a8b13c21d34e55f89a144b233c377d610e987f1597a2584b4181

# Payload
{
  "api": {
    "id": "42",
    "name": "Bump.sh",
    "description": "The official Bump.sh API documentation",
    "slug": "bump-sh",
    "url": "https://developers.bump.sh/",
    "version": "1.0",
    "created": "2019-05-05",
    "modified": "2022-04-07"
  },
  "diff": {
    "id": "ef41eb26-5e7f-47b9-9854-fa170d46bbd2",
    "title": "Bump.sh Api",
    "breaking": false,
    "details": [
      {
        "id": "post-DocStructureChange",
        "name": "POST DocStructureChange",
        "status": "added",
        "type": "webhook",
        "breaking": false,
        "children": []
      }
    ],
    "previous_version_url": "https://developers.bump.sh/changes/ef41eb26/previous.json",
    "current_version_url": "https://developers.bump.sh/changes/ef41eb26/current.json"
  }
}
```


## Conclusion

Bump.sh is proud to provide the best possible support for your webhooks. Since OpenAPI 3.1 `paths`, `components` and `webhooks` are treated as first class citizens!

Why not give your webhooks the premium treatment too by [offering them a Bump.sh documentation](https://bump.sh/users/sign_up?utm_source=bump&utm_medium=blog&utm_campaign=blog-documenting-openapi-webhooks)?
