---
title: "Helping Memo Bank deliver APIs to their customers, and comply with European FinTech regulations"
category: Company
image: blog/memobank-usecase-bump-sh.png
end_with_preview: true
---

## Engineering at Memo Bank

Jérémie Martinez was the first tech Memo Bank employee and grew to lead tech, then Head of Engineering. He’s now leading over 20 people across teams working on the CBS, frontend, Site Reliability Engineering, and data.

> Most of our team has learned a lot over the past years, building uncommon expertise in advanced banking and transaction systems, which is scattered across many more individuals in larger, traditional banks.

As you can expect, the banking operations ecosystem is highly regulated and controlled, requiring extremely sharp engineering delivery.

The team loves nothing more than a carefully technically-crafted product and knows how to build it. Jérémie is proud to say that they had no production incident yet and close to no developer turnover.

## Where OpenAPI and Memo Bank meet

A cornerstone of Memo Bank’s product and software architecture is its API ecosystem.

Technically, the team has a **code-first** approach: they generate an OpenAPI definition from the code — not the other way around. Still, it starts with a design phase where they agree upon contracts, even if they directly code it and then document it. They also continuously verify how the OpenAPI definition renders, to ensure an elegant usage of the solution.

> OpenAPI 3.0 lets us automate nearly everything and benefit from all that is developed around this standard.

To produce OpenAPI contracts, Jérémie’s teams use [JaxRS](https://fr.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services): [Jersey](https://eclipse-ee4j.github.io/jersey/) is used server-side to implement the OpenAPI contract. That source is used to automatically generate the client’s code using another open-source project, [RestEasy](https://docs.jboss.org/resteasy/docs/3.6.2.Final/userguide/html/RESTEasy_Client_Framework.html).

## Wanna know more about their APIs?

A key value proposition for their customers is to let them programmatically pilot their bank accounts and transactions. Salary payments, purchases via wire transfers, collecting money from their customers — and all of that by batch if necessary to gain efficiency and focus on their core business rather than administration. Their public REST API ([Published on Bump.sh](https://docs.api.memo.bank/) – surprise!) offers their customers all the flexibility they need. Memo Bank especially leveraged two unique features of Bump.sh: the **changelog** and **branches support**. As their API is versioned and offers backward compatibility, customers can pick the doc version they need, even if they still use an older version after a breaking change.

Beyond their public API, they have a legal duty to produce a partner API following the PSD2 European regulation, to which Third Party Providers connect. Those “TPPs” (for instance Powens and Bridge) ensure secure payments through Strong Customer Authentication. Also built as a REST API, this API’s doc is conveniently centralized with the rest of the catalog on Bump.sh, and its access is restricted to the TPPs (Access management? Yup, we got your back).

Because we’ve been super nice lately, Jérémie exceptionally accepted to lift the veil for a moment on their private APIs. The apps’ architecture, as Jérémie says, isn’t exactly structured as “micro-services”. It’s more **“macro-services”**, per business logic and following a Domain Driven Design approach. And all of those need to communicate! Some of the APIs are in REST/HTTP, some of them are **asynchronous**. The choice of event-driven API directly results from the highly regulated and controlled banking ecosystem. An event-driven system empowers traceability: all events are logged and become immutable facts that can be audited. In more detail, there are two event-driven APIs: one for streaming events, using **Kafka**, and one serving as a “discrete messaging queue”, using **ActiveMQ (AMQP)**. Adopting the **AsyncAPI** specification and deploying docs with Bump.sh on an internal Hub is currently under exploration by Memo Bank’s engineering team.

## Memo Bank treat: integrating Bump.sh and GitLab

How about that? Memo Bank’s engineering team cooked a little something they’re willing to share (see below): a custom Bump.sh/GitLab integration that automatically displays a diff at the Merge Request level when they implement new API changes, so that the team can review it easily before merging.

You’ll [find here the script](https://github.com/bump-sh/bump-ci-example/blob/76c0791dae429d26d0ad0abbacea12ac781d9bc9/.gitlab/diff-comment-mr.sh) that runs in their CI/CD pipeline, and the corresponding [`.gitlab-ci.yml` snippet](https://github.com/bump-sh/bump-ci-example/blob/76c0791dae429d26d0ad0abbacea12ac781d9bc9/.gitlab-ci.yml#L34-L41).

And that’s the type of result you can expect if using a similar script:

![Screenshot of a Bump.sh diff preview on GitLab](https://storage.googleapis.com/bump-blog-resources/2023-03-14-helping-memo-bank-deliver-apis-to-their-customers/memobank-gitlab-preview.png)

## The way we helped Memo Bank

In all, Memo Bank adopted all of the key features of Bump.sh, with a special highlight on:

- **Automated generation of elegant documentation**. Their public API is a strategic feature in their approach to the SMB market. Bump.sh helped them set up the corresponding public doc very fast and keeps it up-to-date automatically, for a considerable gain in time and efficiency.
- **CI integration and changelog**. For their partner API, the CI integration of Bump.sh supports Memo Bank in mitigating reputation risks (which would happen with uncontrolled breaking changes) and ensuring compliance (PSD2 regulation).

> Bump.sh plays a key role in helping us publish always up-to-date API documentation. That means more engineering efficiency and better support for our customers, as well as risk mitigation on reputation and compliance.

Some of their favorite Bump.sh perks? The ability to set a custom domain, the stunning design (including the dark mode), the changelog, the versioning and branches, the CLI, the full support of OpenAPI, the automation, and the section introductions with Markdown support. And beyond the tool itself, they appreciated finding the Bump.sh team around the corner whenever they had a question or needed support.

---
#### Memo Bank’s journey, so far

Memo Bank was created in 2017 to offer Small and Medium Businesses a banking experience that echoes their needs and challenges. Where traditional banks offer services for larger businesses, and some FinTech make a difference for individuals, the SMB market was poorly addressed.

After a successful exit with the acquisition by Trainline, one of Captain Train’s founders felt from their experience with traditional banks that it was time to break some of the codes by creating a tech-led bank, capable of understanding and serving today’s entrepreneurs.

The first big step was to get their license in June 2020 from the Banque de France (French National Central Bank), allowing them to exercise across Europe.

The service went live a couple of months later, in September 2020, based on a brand new Core Banking System (CBS), fully developed by Memo Bank’s engineering team. Something unique in the industry.
