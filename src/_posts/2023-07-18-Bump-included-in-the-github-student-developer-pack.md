---
title: Bump.sh included in the GitHub Student Developer Pack
author: Christophe Dujarric
category: Product
image: blog/github-students-bump-sh.png
end_with_preview: false
---

GitHub Education just announced that Bump.sh is included [in their latest Mobile Development Experience](https://education.github.com/experiences/mobile_app_development).

That brings back some memories...

## Our roots in Mobile Development

Five years ago, in a previous venture, we introduced a major issue in a mobile app. It brought the service down for all its users. The root cause? A breaking change in our API that we didn’t identify when releasing to production. That change was part of a much wider product evolution, including database migrations, making it virtually impossible to roll back and bring the service back up fast.

This story probably rings a bell to many. 

And that’s precisely the origin of Bump.sh. We realized the lack of actionable API documentation tools, that would assist in identifying changes, and let developers discover, build and consume APIs.

## Helping students not reproduce our issues

Today, we’re thrilled to open free access to [Bump.sh](http://Bump.sh) for all GitHub Students.

The [GitHub Student Developer Pack](https://education.github.com/pack) lets students worldwide access a wide variety of professional-grade tools that otherwise wouldn’t be affordable. While learning, they can directly benefit from what will be their day-to-day workspace once they start their career. They can complete student projects through a great developer experience. They can apply everything they learn about, hands-on.

A keystone of API development, whether for Mobile or web apps, is in the specifications such as OpenAPI (ex-Swagger) or AsyncAPI. They make it possible to define [a robust contract](https://bump.sh/blog/api-contracts-extended-introduction) that tells how to work with an API. We’re fervent advocates of specifications and encourage student developers to discover and learn how to use them early on.

By offering [Bump.sh](http://Bump.sh) to students, we’re hoping it will assist them in those efforts. Bump.sh indeed generates stunning docs directly from OpenAPI and AsyncAPI contracts. It detects any change in those contracts and can warn a team whenever a breaking change occurs. More: through our [GitHub Action](https://github.com/marketplace/actions/bump-sh), get API docs automatically updated, and decide whether breaking changes should turn your commit status to red.

[Read more](https://bump.sh/students) about what’s included in our offer.

Students, we’ll love to see what you’ll build. We’ll be there if you need any assistance on the road!
