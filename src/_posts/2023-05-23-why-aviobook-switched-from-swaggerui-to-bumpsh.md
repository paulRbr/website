---
title: "Why AvioBook switched from Swagger UI to Bump.sh for all of their APIs"
category: Customers
image: blog/aviobook-usecase-bump-sh.png
company:
  logo: company-logos/aviobook.svg
  name: Aviobook
  domain: Aviation Software
  website: https://www.aviobook.aero/
  partnering since: 2021
---

## About Mano, AvioBook’s CTO

_He’s busy but we’ve been very lucky: Mano Swerts, AvioBook’s CTO, found time to answer a few questions._

I’ve been at AvioBook for more than 4 years now. I worked at consultancy firms in the past, switching between a large number of customers and industries. I was drawn to AvioBook as it is a product company with an incredible offering in a unique industry. I joined the company as a Java Tech Lead and was one of the drivers behind the redesign and restructuring of AvioBook’s approach to APIs and API documentation. In my current role, I’m still closely involved in our API strategy, although I'm more focused on how we can bring the power of AvioBook's APIs to our customers.

## Organizing teams and APIs, together

The AvioBook product suite is quite extensive. We have several product teams that focus on the development and evolution of our many products. Every team is responsible for a specific part of this suite. Apart from that, we have our managed integrations team that is specialized in building integrations between the AvioBook platform and airline IT systems. They create tailored solutions per customer, leveraging the AvioBook platform APIs to do so.

We had 2 main challenges: during the design phase of our APIs, we needed to make sure that the use cases of all of our internal teams were taken into account. This required a uniform approach to documenting and discussing APIs.

After APIs were implemented, we needed to make sure that all teams were able to easily browse all available APIs and understand how they could use them.

## Writing OpenAPI and AsyncAPI contracts

That’s why we started using OpenAPI and AsyncAPI specifications to support both use cases. Here at AvioBook, we started out with a Swagger UI to provide a single place to look for all available APIs. It was a great starting point, but it does have some limitations. The most important ones are not being able to visualize AsyncAPI files and not being able to efficiently host multiple versions of the API contracts.

As a company, we are mainly focused on REST APIs over HTTPS and event-based messaging APIs (with RabbitMQ). REST APIs were our first focus as they have the broadest field of applicability. They can be used to power mobile applications, web portals, but also integration scenarios. As we keep on investing in scalability and increased availability of our product suite, we have started working on a messaging strategy as well, which is mainly suitable for performant and scalable service-to-service integrations.

## From Swagger UI to Bump.sh

Using Swagger UI, we weren’t able to easily centralize API documentation for all of our platform versions. With Bump.sh, we can easily do that and show differences between versions of the API.

Bump.sh also allows us to visualize AsyncAPI files in the same consistent manner as our OpenAPI documentation, something we couldn’t do at all with our previous solution.

Probably most important: Bump.sh allows us to expose our APIs to our customers using proper access management features, which is entirely lacking in Swagger.

Bump.sh supports us in providing APIs as a service to our customers, basically allowing us to bring a new platform (APIs) to the market. This is one of our key differentiators. We were already quite unique in the market with our managed integration services. However, enabling our customers to integrate directly through their own processes and current IT systems serves to reinforce our position as a leading platform.

It also allows our teams to work together in a more efficient way as there is a single place for everyone to access API documentation.

## APIs in the sky, so high

Working with AvioBook has been a blast for us, too. Beyond the fact that we’re indirectly contributing to safe and comfortable flights, our collaboration with the AvioBook engineering teams led us to improve Bump.sh on various aspects, including advanced OpenAPI features support, and improving overall performances of Bump.sh for all users.

Looking for an alternative to Swagger UI? AvioBook can tell better than us. [We're here to help.](mailto:hello@bump.sh)

---
## Some Words about AvioBook

AvioBook (a Thales Group company) is a software and hardware technology company building a suite of solutions for airlines. Starting with an EFB or Electronic Flight Bag solution for pilots, the suite now includes tools for all stakeholders in flight operations from dispatchers and technicians through to cabin crew and EFB admins.

What is an Electronic Flight Bag (EFB)? Well, you might have that picture of fancy pilots wearing their uniforms in your mind right now. Think about what they have in their hands. See that fancy suitcase? Well, that’s soooo 1960’s. It’s all digital now! And actually, much more powerful. Transform that into a tablet that lets pilots access crucial information in real-time to prepare for their flight, get passengers comfortably and safely to their destinations, and communicate with cabin and ground crew.
