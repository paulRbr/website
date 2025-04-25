---
title: The Discriminator in OpenAPI Is Generally Redundant & Confusing
author: Phil Sturgeon
category: Tech
image: blog/discriminator-redundant.png
end_with_preview: true
---

If you’ve worked with OpenAPI v3.x, you might have come across the `discriminator` field in schemas. It’s often used alongside `oneOf`, `anyOf`, or `allOf` when you’ve got different variations of a type—polymorphism, essentially. At first glance, it seems pretty handy; it’s meant to help you figure out which specific schema to use when certain values are present, but JSON Schema can handle this out of the box without using the poorly supported OpenAPI-only keyword `discriminator`.

Let’s dive into why the `discriminator` is probably an outdated concept that you can skip struggling to learn, by looking through a couple of examples to show how things can be done without it.

### What’s the Discriminator All About, Anyway?

In OpenAPI, the `discriminator` is a field that helps you figure out which schema you’re dealing with when you’ve got multiple possibilities. It’s kind of like a switch that tells you which specific object or type your payload is going to conform to, using a specific field in the input—often something like a `type` field.

```yaml
components:
  schemas:
    Animal:
      oneOf:
        - $ref: '#/components/schemas/Dog'
        - $ref: '#/components/schemas/Cat'
      discriminator:
        propertyName: type
        mapping:
          dog: '#/components/schemas/Dog'
          cat: '#/components/schemas/Cat'

    Dog:
      type: object
      properties:
        type:
          type: string
          const: dog
        barkVolume:
          type: integer

    Cat:
      type: object
      properties:
        type:
          type: string
          const: cat
        whiskerLength:
          type: integer
```

Here, we’ve got an `Animal` schema that could either be a `Dog` or a `Cat`. The `discriminator` is saying “look at the `type` field in the payload to figure out whether this is a `Dog` or a `Cat`.” 

If the `type` field says `dog`, then OpenAPI knows to check against the `Dog` schema, and if it says `cat`, it’ll check against the `Cat` schema.

Perhaps you send a payload like this:

```json
{
  "type": "dog",
  "barkVolume": 10
}
```

It will use the `Dog` schema.

### But Here’s the Thing...

The `discriminator` doesn’t actually do anything in terms of validation. It’s only there as a hint to speed things up for tooling like code generation tools, so they can quickly figure out which schema to use in certain situations. Whether or not you have the `discriminator`, the validation will still work, documentation can show available options, mocking tools can generate a sample response by picking one of the subschemas, everything will work just fine.

Without it, you can still rely on the natural shape of the data. This particular JSON instance has `type: dog` in there, and that acts as the switch in the oneOf by matching against the `const: dog` in the subschema.

```yaml
components:
  schemas:
    Animal:
      oneOf:
        - $ref: '#/components/schemas/Dog'
        - $ref: '#/components/schemas/Cat'
    Dog:
      type: object
      properties:
        type:
          type: string
          const: dog
        barkVolume:
          type: integer
    Cat:
      type: object
      properties:
        type:
          type: string
          const: cat
        whiskerLength:
          type: integer
```

If you have a property to act as a switch then you're fine. If you don't have one then discriminator could never have worked, because it's fairly rigid like that. The oneOf approach does not need a single specific field to provide a `mapping`, it can use any combination of values, so even without the `type` field you could have different required properties on `Dog` objects (like `barkVolume`), and `Cat` objects (like `whiskerLength`), and that would be enough to select a scheme.

### Fixing Examples of Discriminator

Here's an example from another documentation provider who have an example of `discriminator` to help pick between different `powerSources` for a vehicle.

```yaml
schema:
  discriminator:
    propertyName: powerSource
    mapping:
      electricity: "#/components/schemas/ElectricVehicle"
      gasoline: "#/components/schemas/FueledVehicle"
      human-energy: "#/components/schemas/PedaledVehicle"
  anyOf:
    - $ref: "#/components/schemas/ElectricVehicle"
    - $ref: "#/components/schemas/FueledVehicle"
    - $ref: "#/components/schemas/PedaledVehicle"

```

```yaml
components:
  ElectricVehicle:
		type: object
		properties:
		  powerSource:
		    description: How is the vehicle powered.
		    type: string
		    example: electricity
		  ...

```

We could just delete that whole `discriminator` object, and change `example: electricity` to `const: electricity`.

```yaml
schema:
  anyOf:
    - $ref: "#/components/schemas/ElectricVehicle"
    - $ref: "#/components/schemas/FueledVehicle"
    - $ref: "#/components/schemas/PedaledVehicle"
```

This will actually work better, and give more meaningful validation on `powerSource`.

### Picking Between Schemas

I think people got a bit hooked on the idea of discriminators because it's "the way to do polymorphism in OpenAPI". That may have been true in OpenAPI v2.0, but OpenAPI v3.0 got the `anyOf` and `oneOf` keywords which handle that.

Some tools perpetuate the reliance on `discriminator` by pushing users to use them in order to show selectors allowing users to switch between different `oneOf` and `anyOf` subschemas.

Modern OpenAPI documentation does not need to do this. For example, [Bump.sh](http://bump.sh/) will take the end of each of the `$ref`, turning `"#/components/schemas/ElectricVehicle"` into `ElectricVehicle` and `"#/components/schemas/PedaledVehicle"` into `PedaledVehicle` in the interface.

![image.png](https://storage.googleapis.com/bump-blog-resources/2024-11-04-the-discriminator-in-openapi-is-generally-redundant-and-confusing/image%201.png)

If you’d like more human-readable names you can add the `title` keyword to each of those referenced schemas.

```yaml
components:
  ElectricVehicle:
		title: Electric Vehicle
		type: object
		properties:
		  powerSource:
		    description: How is the vehicle powered.
		    type: string
		    const: electricity
		  ...
```

That will then update the selectors to use the provided name instead of the generated one.

![image.png](https://storage.googleapis.com/bump-blog-resources/2024-11-04-the-discriminator-in-openapi-is-generally-redundant-and-confusing/image%202.png)

Between `oneOf`, `anyOf`, and `title`, most documentation tooling can create brilliant interactive selectors without forcing people to write out each possible mapping.

### Wrapping Up

The `discriminator` in OpenAPI v3.x is less useful than it might seem at first. It doesn’t affect whether a payload is valid, doesn't help with documentation, mocking, or anything much else.

The main reason for using it is to help tools like code generators and their resulting output code, which need to know which schema to pick quickly. In that case, sure, add these optimization shortcuts to your OpenAPI with `discriminator` speed things up, but in most cases you’re better off keeping things simple and letting the data itself decide which schema to use.