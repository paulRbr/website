---
title: "Introducing Arazzo: Describe API Workflows with this extension to OpenAPI"
author: Phil Sturgeon
category: Tech
image: blog/introducing-arazzo.png
end_with_preview: true
---

Arazzo is a new specification from the OpenAPI Initiative for describing and documenting complex workflows throughout your API which touch multiple operations (a.k.a endpoints). The word “arazzo” means “tapestry” in Italian, which gives you a bit of an idea what it’s about, but let’s let the spec do the talking:

> The Arazzo Specification provides a mechanism that can define sequences of calls and their dependencies to be woven together and expressed in the context of delivering a particular outcome or set of outcomes when dealing with API descriptions (such as OpenAPI descriptions).
>

Much like the [Overlays specification](https://docs.bump.sh/guides/openapi/augmenting-generated-openapi/) we’ve been talking about lately, [Arazzo](https://spec.openapis.org/arazzo/latest.html) is the creation of a Special Interest Group within the OAI, made up of tooling vendors and experienced API folks who all have the same interests: creating standards which can solve a wide variety of use cases to push the API ecosystem forward, whether that’s testing, documentation, or even AI.

[![Video - Describing API Workflows: Introducing the Arazzo Specification](http://img.youtube.com/vi/C_rkvN9zwKg/0.jpg)](https://www.youtube.com/watch?v=C_rkvN9zwKg "Describing API Workflows: Introducing the Arazzo Specification")


## Describing Workflows

APIs are rarely just one request. Maybe you need to log in with OAuth and use a property in the response to grab some data from another endpoint. Perhaps you need to create a few things before you can then fetch something else. It’s rarely clear from the API alone what needs to be done. API Reference Documentation is here to help with a lot of it, but it’s usually not enough by itself, with guides and tutorials picking up the slack.

These can be produced manually, with lots of examples in code or curl showing the various steps, but these can suffer human error. Arazzo lets you create these in a declarative format, glueing operations together with inputs and outputs, referencing relevant parts of the OpenAPI to show how things all fit together.

## Example Arazzo Document

If you’d like a quick look at how Arazzo works, here’s a workflow that builds on top of the [Train Travel API](https://bump.sh/bump-examples/doc/train-travel-api) we published earlier in the year.

```yaml
arazzo: 1.0.0
info:
  title: Train Travel API - Book & Pay
  version: 1.0.0
  description: >-
    This API allows you to book and pay for train travel. It is a simple API
    that allows you to search for trains, book a ticket, and pay for it, and
    this workflow documentation shows how each step interacts with the others.
sourceDescriptions:
  - name: train-travel
    url: ./openapi.yaml
    type: openapi
workflows:
  - workflowId: book-a-trip
    summary: Find train trips to book between origin and destination stations.
    description: >-
      This is how you can book a train ticket and pay for it, once you've found
      the stations to travel between and trip schedules.
    inputs:
      $ref: "#/components/inputs/book_a_trip_input"
    steps:
      - stepId: find-origin-station
        description: Find the origin station for the trip.
        operationId: get-stations
        parameters:
          - name: coordinates
            in: query
            value: $inputs.my_origin_coordinates
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          station_id: $outputs.data[0].id
          # there is some implied selection here - get-station responds with a
          # list of stations, but we're only selecting the first one here.
      - stepId: find-destination-station
        operationId: get-stations
        description: Find the destination station for the trip.
        parameters:
          - name: search_term
            in: query
            value: $inputs.my_destination_search_term
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          station_id: $outputs.data[0].id
          # there is some implied selection here - get-station responds with a
          # list of stations, but we're only selecting the first one here.
      - stepId: find-trip
        description: Find the trip between the origin and destination stations.
        operationId: get-trips
        parameters:
          - name: date
            in: query
            value: $inputs.my_trip_date
          - name: origin
            in: query
            value: $steps.find-origin-station.outputs.station_id
          - name: destination
            in: query
            value: $steps.find-destination-station.outputs.station_id
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          trip_id: $response.body.data[0].id

      - stepId: book-trip
        description: Create a booking to reserve a ticket for that trip, pending payment.
        operationId: create-booking
        requestBody:
          contentType: application/json
          payload:
            trip_id: $steps.find-trip.outputs.trip_id
            passenger_name: "John Doe"
            has_bicycle: false
            has_dog: false
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          booking_id: $response.body.id

components:
  inputs:
    book_a_trip_input:
      type: object
      properties:
        my_origin_coordinates:
          type: string
          description: The coordinates to use when searching for a station.
        my_destination_search_term:
          type: string
          description: The search term to use when searching for a station.
        my_trip_date:
          $ref: "#/components/inputs/trip_date"
    trip_date:
      type: string
      format: date-time
```

This example shows how Arazzo works from a high level, defining a single workflow that shows how to find two stations, a train traveling between them, and shows how to use that data to book a ticket.

It might feel fairly familiar to some of you. It feels to me a lot like Continuous Integration setup for tools like Travis CI, Circle CI, GitHub Actions, etc. It also feels a lot like the tool [Strest](https://github.com/eykrehbein/strest), which I used to love using for testing multiple interactions, but which has since been discontinued.

## Arazzo Syntax

Just like OpenAPI you define a version:

```yaml
arazzo: 1.0.0
```

### Info Object

Then you define an `info` to contain relevant metadata about the purpose of this workflow.

```yaml
info:
  title: Train Travel API - Book a Trip
  version: 1.0.0
  description: >-
    This API allows you to book and pay for train travel. It is a simple API
    that allows you to search for trains, and book a ticket. This workflow
    documentation shows how each step interacts with the others.
```

### Source Descriptions Object

Then we have `sourceDescriptions`. OpenAPI is an API Description Format, which is stored in the form of an API Description Document, so this section is chance to mention which type of API description format is being used, and point to a specific API description document.

```yaml
sourceDescriptions:
- name: train-travel
  url: ./openapi.yaml
  type: openapi
```

Currently the types supported are `openapi` and `arazzo`, with the latter being a chance to extend other workflows, but for now let’s just stick to the main case of working with OpenAPI documents.

The URL can be a relative file, or a full `https://...` to a document hosted elsewhere, for example:

```yaml
sourceDescriptions:
- name: train-travel
  url: https://bump.sh/bump-examples/doc/train-travel-api.yaml
  type: openapi
```

### Workflows

Then we move onto `workflows`.

```yaml
workflows:
- workflowId: book-trip
  summary: Find train trips to book between origin and destination stations.
  description: >-
    Find the right train traveling between your origin and destination, then book a ticket.
  inputs:
    $ref: "#/components/inputs/book_trip_input"
  steps:
    ...
```

Lots of this is familiar to OpenAPI fans, only instead of paths and operations we have workflows, with a `workflowId` to give this a unique reference instead of an `operationId`, the same short `summary` and long `description`, and even some `$ref` which you’ll remember from [splitting up your OpenAPI documents](https://docs.bump.sh/guides/openapi/advanced-ref-usage/).

The inputs being referenced here are a standard JSON Schema, outlining what inputs should be given to this workflow, either by another workflow or by a user interface. These are defined inline or referenced to `components.inputs`.

```yaml
components:
  inputs:
    book_trip_input:
      type: object
      properties:
        my_origin_coordinates:
          type: string
          description: The coordinates to use when searching for a station.
        my_destination_search_term:
          type: string
          description: The search term to use when searching for a station.
        my_trip_date:
          $ref: "#/components/inputs/trip_date"
    trip_date:
      type: string
      format: date-time
```

It would not be hard to imagine a documentation “try it now” interface, or testing tooling providing a UI for these schemas. This could be done with [JSON Forms](https://jsonforms.io/) or similar, allowing users to enter values with the type providing a relevant HTML input, and the description being displayed as a label to explain what values should go in there, along with other JSON Schema keywords being leveraged to allow for enum values, or examples.

### Steps Object

Now we get into the main chunk of Arazzo: `steps`.

```yaml
steps:
- stepId: find-origin-station
  description: Find the origin station for the trip.
  operationId: get-stations
  parameters:
    - name: coordinates
      in: query
      value: $inputs.my_origin_coordinates
  successCriteria:
    - condition: $statusCode == 200
  outputs:
    station_id: $outputs.data[0].id
```

Here the `find-origin-station` is a uniquely named step within the workflow, which defines a name that can be referred to elsewhere in the document. The `operationId` is referring to an operation inside the OpenAPI document, and the `parameters` match up with parameters in that operation.

The parameters are similar to OpenAPI parameters, where `in` can be `path`, `query`, `header`, `cookie`. The new thing here is `value`, which can takes either a hard coded value, or refer to a workflow input defined earlier.

Steps can define a `successCriteria`, where all [criteria](https://spec.openapis.org/arazzo/latest.html#criterion-object) must be passed in order to be considered a success. At the most basic level this should be checking for a successful HTTP status code, but can do any comparison using the [runtime expression](https://spec.openapis.org/arazzo/latest.html#runtime-expressions) syntax to grab a value and compare for any basic literals, operators, and loose comparisons on available variables like `$url`, `$method`, `$response.body`, etc. You can even user operators to do OR.

```yaml
- condition: $statusCode == 200 || $statusCode == 201
```

By default the `simple` conditions are used, but you can get more advanced with a `context` attribute to set the variable being used, then using `type: regex` for the condition.

```yaml
- context: $statusCode
  condition: '^200$'
  type: regex
```

If the responses are JSON or XML you can get even more advanced with [JSONPath](https://docs.bump.sh/guides/openapi/jsonpath/) or XPath.

```yaml
- context: $response.body
  condition: $[?count(@.data) > 0]
  type: jsonpath
```

The last part of this step example shows output, which takes values from various bits of the step and makes them available to other steps.

```yaml
outputs:
  station_id: $outputs.data[0].id
```

Now other steps can refer to this output property for their inputs.

```yaml
- stepId: find-trip
  description: Find the trip between the origin and destination stations.
  operationId: get-trips
  parameters:
    - name: date
      in: query
      value: $inputs.my_trip_date
    - name: origin
      in: query
      value: $steps.find-origin-station.outputs.station_id
    - name: destination
      in: query
      value: $steps.find-destination-station.outputs.station_id
  successCriteria:
    - condition: $statusCode == 200
  outputs:
    trip_id: $response.body.data[0].id
```

This next step shows a mixture of parameters being sent to the next operation using a mixture of workflow inputs, and values defined as output from the steps before it.

Chaining together workflow inputs and values from other steps you can create some amazing workflows, and have multiple workflow documents for different use-cases to describe all the important workflows that need to be documented and tested for your API.

## Tips

### Extending Other Workflows

if you find there are certain operations, or groups of operations, getting repeated over and over again, you can make a step which runs a workflow instead. Instead of referencing an `operationId` you can define another workflow, and reference that `workflowId` in a step.

```yaml
- stepId: find-origin-station
  description: Find the origin station for the trip.
  operationId: get-stations
  parameters:
    - name: coordinates
      in: query
      value: $inputs.my_origin_coordinates
  successCriteria:
    - condition: $statusCode == 200
  outputs:
    station_id: $outputs.data[0].id
```

```yaml
- stepId: find-origin-station
  description: Find the origin station for the trip.
  workflowId: find-station # instead of operationId
  parameters:
    - name: coordinates
      value: $inputs.origin_coordinates
      # no `in` needed
  successCriteria:
    - condition: $statusCode == 200
  outputs:
    station_id: $outputs.data[0].id
```

The main difference here is that you no longer need to specify where parameters are going, because they are then used as `inputs` in that workflow. The rest is the same.

### Add Operation IDs to OpenAPI

Using an `operationId` is generally considered good practice because they’re used to make clean URLs for documentation, and help generate cleaner SDKs, but Arazzo creates a new reason for using them.

If an OpenAPI operation does not have an `operationId` you are left using an `operationPath` which is a much uglier syntax, which will also break if paths change.

```yaml
steps:
- operationPath: '{$sourceDescriptions.petstoreDescription.url}#/paths/~1bookings~1{bookingId}/get'
```

Remember how to escape slashes in this syntax is horrendous, so before you start using Arazzo properly it would be a good idea to get all your OpenAPI documents ready by getting sensible consistent `operationId` into them.

### $ref vs reference

There’s a new way to reference objects in Arazzo, and that’s the `reference` keyword, different from the `$ref` keyword you might be used to from OpenAPI.

```yaml
steps:
- stepId: find-pet
  operationId: findPetsByStatus
  parameters:
    - name: status
      in: query
      value: "available"
    - reference: $components.parameters.page
      value: 1
```

This “expression based referencing mechanism” uses the same runtime expressions that we were using for inputs, outputs, and criteria and is available in the following parts of Arazzo:

- successActions

This is different to the the JSON Schema `$ref` keyword which uses JSON Pointer syntax, which might beg the question… why are there two different approaches to referencing things?

Well, there has been confusion in OpenAPI as it attempted to completely align its schema objects with JSON Schema, which is a [very long story](https://apisyouwonthate.com/blog/openapi-v3-1-and-json-schema/) we can skip over here. Basically there are two different semantics for `$ref` depending on where it is, and they’re really subtle things like whether or not it can have other properties next to it...

To maintain compatibility with JSON Schema whilst also creating functionality necessary for this new workflow specification, the authors of Arazzo decided to make a new `reference` keyword that would work as it needed to and make it available in limited locations.

## Tooling Support

As with any new specification, the question is: what tools actually support this?
Multiple tooling vendors are working on supporting this new specification. It’s also in the [Bump.sh](http://Bump.sh) Roadmap. Interested in it, and want us to prioritize it? [Drop us your contact](https://survey.typeform.com/to/HaKaUya0) and let’s chat.

In the meantime there is an early prototype of a test runner similar to the Strest tool I mentioned, called [arazzo-runner](https://github.com/AdrianMachado/arazzo-runner). This can help test the concept and help you build out some of the workflows before better tooling supports comes along to make it easier.
