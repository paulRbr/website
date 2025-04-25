---
title: "Train Travel API: A Modern OpenAPI PetStore Replacement"
author: Phil Sturgeon
category: Tech
image: blog/train-travel-api.png
end_with_preview: true
---

Everyone working with OpenAPI (formerly Swagger) will have come across the PetStore at some point. It's a sample OpenAPI description for an imaginary Pet Store with an API, but the OpenAPI is old, and the API it describes is pretty far from best practices. We thought it was time for a refresh, so we're bringing you the [Train Travel API](https://github.com/bump-sh-examples/train-travel-api), a new sample OpenAPI you can use for your tooling and testing.

## Introducing the Train Travel API

The OpenAPI description document is on the [train-travel-api](https://github.com/bump-sh-examples/train-travel-api) GitHub repository, and comes in the form of a single `openapi.yaml` that you can use as a sample for any documentation, validation, mocking, or whatever tools that you maintain and want to show a working demo with something less contrived than a "Todo API" or the Pet Store.

It's an open-source project licensed as [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://github.com/bump-sh-examples/train-travel-api/blob/main/LICENSE_CC-BY-NC-SA-4.0).

## Describes a Realistic API

This API builds off of various open data sources and public APIs that have all proven the concepts and patterns used in the design of this API.

The concept of Stations is based on [Stations - A Database of European Train Stations](https://github.com/trainline-eu/stations), maintained by [Trainline EU](https://github.com/trainline-eu/), and powered by [OpenStreetMap](https://www.openstreetmap.org/), [SNCF OpenData](https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/), [Digitraffic.fi](http://rata.digitraffic.fi/api/v1/metadata/stations), [OpenTransportData.swiss](https://opentransportdata.swiss/en/dataset/bhlist/resource/035c4d98-df6c-49b4-988a-3822823f0bf9), [admin.ch](https://www.bav.admin.ch/bav/fr/home/themes-a-z/geoinformation/geodonnees-de-base/arrets-des-transports-publics.html).

```yaml
Station:
  type: object
  xml:
    name: station
  required:
    - id
    - name
    - address
    - country_code
  properties:
    id:
      type: string
      format: uuid
      description: Unique identifier for the station
      examples:
        - efdbb9d1-02c2-4bc3-afb7-6788d8782b1e
        - b2e783e1-c824-4d63-b37a-d8d698862f1d
    name:
      type: string
      description: The name of the station
      examples:
        - Berlin Hauptbahnhof
        - Paris Gare du Nord
    address:
      type: string
      description: The address of the station
      examples:
        - Invalidenstraße 10557 Berlin, Germany
        - 18 Rue de Dunkerque 75010 Paris, France
    country_code:
      type: string
      description: The country code of the station
      format: iso-country-code
      examples:
        - DE
        - FR
    timezone:
      type: string
      description: The timezone of the station in the IANA Time Zone Database format
      examples:
        - Europe/Berlin
        - Europe/Paris

```

The concept of Trips and Bookings is based on the authors’ experiences trying to get around Europe, and wishing more booking apps had the ability to search for trains that would take a bicycle (and considering getting a dog to join him on those adventures). This domain knowledge is enough to get a handle on what an API should have for making trips and bookings easily, and feels somewhat more beneficial for the sample API than somebody guessing at what a pet shop might need.

```yaml
Trip:
  type: object
  xml:
    name: trip
  properties:
    id:
      type: string
      format: uuid
      description: Unique identifier for the trip
      examples:
        - 4f4e4e1-c824-4d63-b37a-d8d698862f1d
    origin:
      type: string
      description: The starting station of the trip
      examples:
        - Berlin Hauptbahnhof
        - Paris Gare du Nord
    destination:
      type: string
      description: The destination station of the trip
      examples:
        - Paris Gare du Nord
        - Berlin Hauptbahnhof
    departure_time:
      type: string
      format: date-time
      description: The date and time when the trip departs
      examples:
        - '2024-02-01T10:00:00Z'
    arrival_time:
      type: string
      format: date-time
      description: The date and time when the trip arrives
      examples:
        - '2024-02-01T16:00:00Z'
    operator:
      type: string
      description: The name of the operator of the trip
      examples:
        - Deutsche Bahn
        - SNCF
    price:
      type: number
      description: The cost of the trip
      examples:
        - 50
    bicycles_allowed:
      type: boolean
      description: Indicates whether bicycles are allowed on the trip
    dogs_allowed:
      type: boolean
      description: Indicates whether dogs are allowed on the trip
Booking:
  type: object
  xml:
    name: booking
  properties:
    id:
      type: string
      format: uuid
      description: Unique identifier for the booking
      readOnly: true
      examples:
        - 3f3e3e1-c824-4d63-b37a-d8d698862f1d
    trip_id:
      type: string
      format: uuid
      description: Identifier of the booked trip
      examples:
        - 4f4e4e1-c824-4d63-b37a-d8d698862f1d
    passenger_name:
      type: string
      description: Name of the passenger
      examples:
        - John Doe
    has_bicycle:
      type: boolean
      description: Indicates whether the passenger has a bicycle.
    has_dog:
      type: boolean
      description: Indicates whether the passenger has a dog.

```

Booking Payments are based pretty closely to the Stripe Payments API, and utilize the same polymorphic approach to accepting credit/debit cards, or bank account payments.

```yaml
BookingPayment:
  type: object
  unevaluatedProperties: false
  properties:
    id:
      description: Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.
      type: string
      format: uuid
      readOnly: true
    amount:
      description: Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.
      type: number
      exclusiveMinimum: 0
      examples:
        - 49.99
    currency:
      description: Three-letter [ISO currency code](<https://www.iso.org/iso-4217-currency-codes.html>), in lowercase.
      type: string
      enum:
        - bam
        - bgn
        - chf
        - eur
        - gbp
        - nok
        - sek
        - try
    source:
      description: The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.
      anyOf:
        - title: Card
          description: A card (debit or credit) to take payment from.
          properties:
            object:
              const: card
              type: string
            name:
              type: string
              description: Cardholder's full name as it appears on the card.
            number:
              type: string
              description: The card number, as a string without any separators. On read all but the last four digits will be masked for security.
            cvc:
              type: integer
              description: Card security code, 3 or 4 digits usually found on the back of the card.
              minLength: 3
              maxLength: 4
              writeOnly: true
            exp_month:
              type: integer
              format: int64
              description: Two-digit number representing the card's expiration month.
              examples:
                - 12
            exp_year:
              type: integer
              format: int64
              description: Four-digit number representing the card's expiration year.
              examples:
                - 2025
            address_line1:
              type: string
              writeOnly: true
            address_line2:
              type: string
              writeOnly: true
            address_city:
              type: string
            address_country:
              type: string
            address_post_code:
              type: string
          required:
            - name
            - number
            - cvc
            - exp_month
            - exp_year
            - address_country
        - title: Bank Account
          description: A bank account to take payment from. Must be able to make payments in the currency specified in the payment.
          type: object
          properties:
            object:
              const: bank_account
              type: string
            name:
              type: string
            number:
              type: string
              description: The account number for the bank account, in string form. Must be a current account.
            sort_code:
              type: string
              description: The sort code for the bank account, in string form. Must be a six-digit number.
            account_type:
              enum:
                - individual
                - company
              type: string
              description: The type of entity that holds the account. This can be either `individual` or `company`.
            bank_name:
              type: string
              description: The name of the bank associated with the routing number.
              examples:
                - Starling Bank
            country:
              type: string
              description: Two-letter country code (ISO 3166-1 alpha-2).
          required:
            - name
            - number
            - account_type
            - bank_name
            - country
    status:
      description: The status of the payment, one of `pending`, `succeeded`, or `failed`.
      type: string
      enum:
        - pending
        - succeeded
        - failed
      readOnly: true

```

This is just the schema components, and already you can see there is a lot there to learn from. Let's look at a few bits.

The `anyOf` in `source` allows for documentation tools to show the different branches of valid JSON, and the `title` inside gives them a nice-looking name.

![schema-read-write-reuse.png](https://storage.googleapis.com/bump-blog-resources/train-travel-api/anyOf.png)

The use of `readOnly`/`writeOnly` lets you use the same schema for requests and responses, with most modern tooling knowing to strip the `readOnly` from request bodies and `writeOnly` from response bodies.

![schema-read-write-reuse.png](https://storage.googleapis.com/bump-blog-resources/train-travel-api/schema-read-write-reuse.png)

## Standards & Conventions

The Train Trip API uses appropriate web standards whenever they exist and draft standards when they're still in progress.

The API error responses conform to [Problems Details (RFC 9457)](https://www.rfc-editor.org/rfc/rfc9457) instead of making up custom formats, and the rate-limiting follows the latest [RateLimit Header fields IETF draft](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) instead of the more common X-Rate-Limit convention.

![errors-rfc9457.png](https://storage.googleapis.com/bump-blog-resources/train-travel-api/errors-rfc9457.png)

Country codes are [ISO 3166](https://www.iso.org/iso-3166-country-codes.html), Currency codes are [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html), dates and times are ISO 8601 as per [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6), and the timezones are using [IANA Time Zone Database format](https://www.iana.org/time-zones).

For the data format, using a standard like [JSON:API](https://jsonapi.org/) or [Hydra](https://www.hydra-cg.com/) might have been a bit too confusing, but we wanted to do something more conventional than firing around raw JSON arrays for collections because that gets confusing for things like pagination. Seeing as most APIs use some sort of wrapper for collections to avoid using bare JSON arrays, the API uses a `Wrapper-Collection`. This leaves space for any simple HATEOAS controls for other resources or actions like `self`, and pagination controls for `next` and `previous` in the body.

```yaml
Wrapper-Collection:
  description: This is a generic request/response wrapper which contains both data and links which serve as hypermedia controls (HATEOAS).
  type: object
  properties:
    data:
      description: The wrapper for a collection is an array of objects.
      type: array
      items:
        type: object
    links:
      description: A set of hypermedia links which serve as controls for the client.
      type: object
      readOnly: true
  xml:
    name: data
```

These are then extended with allOf in responses to avoid needing to define that format over and over again whilst still keeping the path item definitions simple.

```yaml
  /stations:
    get:
      summary: Get a list of train stations
      description: Returns a list of all train stations in the system.
      operationId: get-stations
      tags:
        - Stations
      responses:
        '200':
          description: A list of train stations
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/Wrapper-Collection'
                  - properties:
                      data:
                        type: array
                        items:
                          $ref: '#/components/schemas/Station'
                  - properties:
                      links:
                        allOf:
                          - $ref: '#/components/schemas/Links-Self'
                          - $ref: '#/components/schemas/Links-Pagination'

```

This is all merged down and flattened into a structure like this:

![collection.png](https://storage.googleapis.com/bump-blog-resources/train-travel-api/collection.png)

These examples were all then run through [Spectral](https://github.com/stoplightio/spectral/) to make sure they were valid against their schema.

## Built for OpenAPI v3.1 and modern JSON Schema

Unlike the Pet Store which was written in OpenAPI v2.0 then shoved through a v2.0 to v3.0 converter, the Train Travel API was designed from the start for OpenAPI v3.1.

This means it's got useful demonstrations of newer functionality for Webhooks, reusing the same schema to show how you can avoid repeating schemas (once again benefitting from `readOnly`/`writeOnly`).

```yaml
webhooks:
  newBooking:
    post:
      operationId: new-booking
      summary: New Booking
      description: |
        Subscribe to new bookings being created, to update integrations for your users.  Related data is available via the links provided in the request.
      tags:
        - Bookings
      requestBody:
        content:
          application/json:
            schema:
              allOf:  
                - $ref: '#/components/schemas/Booking'
                - properties:
                    links:
                      allOf:
                        - $ref: '#/components/schemas/Links-Self'
                        - $ref: '#/components/schemas/Links-Pagination'
            example:
              id: efdbb9d1-02c2-4bc3-afb7-6788d8782b1e
              trip_id: efdbb9d1-02c2-4bc3-afb7-6788d8782b1e
              passenger_name: John Doe
              has_bicycle: true
              has_dog: true
              links:
                self: https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb
      responses:
        '200':
          description: Return a 200 status to indicate that the data was received successfully.
          headers:
            RateLimit:
              $ref: '#/components/headers/RateLimit'
```

It's also using `unevaluatedProperties`, the modern replacement for `additionalProperties` which understands `allOf` in subschemas, helping make sure clients do not fire over properties thinking they are being saved whilst silently being ignored. 

```yaml
BookingPayment:
  type: object
  unevaluatedProperties: false
  properties:
    ...
```

*Learn more about `unevaluatedProperties` [on the JSON Schema documentation](https://json-schema.org/understanding-json-schema/reference/object#unevaluatedproperties).*

Finally, we are utilizing every type of example that OpenAPI knows how to support.

One sort of example is “Property Examples” which go on individual properties. Each property having their own example means lists of properties will individually make sense in many documentation tools, regardless of which example is picked to go in the request/response examples.

```yaml
source:
	anyOf:
	- title: Card
	  description: A card (debit or credit) to take payment from.
	  properties:
	    object:
	      const: card
	      type: string
	    name:
	      type: string
	      description: Cardholder's full name as it appears on the card.
	      examples:
	        - Francis Bourgeois
	    number:
	      type: string
	      description: The card number, as a string without any separators. On read all but the last four digits will be masked for security.
	      examples:
	        - '4242424242424242'
	    cvc:
	      type: integer
	      description: Card security code, 3 or 4 digits usually found on the back of the card.
	      minLength: 3
	      maxLength: 4
	      writeOnly: true
	      examples:
	        - 123
```

Then, each request/response has at least one example of the whole response.

```yaml
responses:
  '200':
    description: Payment successful
    headers:
      RateLimit:
        $ref: '#/components/headers/RateLimit'
    content:
      application/json:
        schema:
          allOf: 
            - $ref: '#/components/schemas/BookingPayment'
            - properties:
                links:
                  $ref: '#/components/schemas/Links-Booking'
        examples:
          Card:
            summary: Card Payment
            value:
              id: 2e3b4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a
              amount: 49.99
              currency: gbp
              source:
                object: card
                name: J. Doe
                number: '************4242'
                cvc: 123
                exp_month: 12
                exp_year: 2025
                address_country: gb
                address_post_code: N12 9XX
              status: succeeded
              links:
                booking: https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb/payment
          Bank:
            summary: Bank Account Payment
            value:
              id: 2e3b4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a
              amount: 100.5
              currency: gbp
              source:
                object: bank_account
                name: J. Doe
                account_type: individual
                number: '*********2345'
                sort_code: '000123'
                bank_name: Starling Bank
                country: gb
              status: succeeded
              links:
                booking: https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb
```

This is not always necessary, but is exceptionally helpful when there is polymorphism, or other variable payloads, because you can name the examples, and good documentation tools will let viewers pick between them.

![named-examples.png](https://storage.googleapis.com/bump-blog-resources/train-travel-api/named-examples.png)

## API Design First

We've built the OpenAPI, but currently, there is no API implementation. Should we build a real, working API to go with this sample?

If we're going to do that, we should follow the API Design First principles and make sure the API Design is as good as possible first. Seeing as this is an open-source project, perhaps you could swing by with your feedback.

I was wondering about renaming Trips to Services, or perhaps there is a better word?

Perhaps Bookings should become Reservations, because is it a booking if you have not paid? Then, we could rename BookingPayment to Payment, as you need to pay for a reservation before it expires.

I also wondered about listing multiple prices for different classes and services; we could even add support for passes.

If you'd like to get involved with evolving and improving the OpenAPI please swing by the [issue tracker](https://github.com/bump-sh-examples/train-travel-api/issues) and help out.

If you maintain OpenAPI tooling and still have the Pet Store in there, please consider removing it or keeping it around as an option but using this one by default. We need to be building our tools to support the very best OpenAPI has to offer, and using samples stuck so far in the past is doing a disservice to your tools and your potential users.
