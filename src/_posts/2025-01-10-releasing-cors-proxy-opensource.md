---
title: "CORS-ing the Boundaries: How We Built a Secure Open-Source Proxy Solution for Our API Explorer"
author: Emmanuel Louisy-Gabriel
category: Tech
image: blog/cors-ing-the-boundaries.png
end_with_preview: false
---
At Bump.sh, we’re excited to announce a new feature we have been developing: _The API Explorer_, a web-based UI designed to help users send HTTP requests to documented APIs directly from their browser. While this tool offers enhanced usability, it also posed several unique challenges, especially around ensuring user privacy and compliance with [_CORS (Cross-Origin Resource Sharing)_](https://developer.mozilla.org/en-US/docs/Glossary/CORS) restrictions. This blog post takes a look at our approach and how we ended up creating an open-source proxy solution called _cors-toujours_.

## The Problem: CORS Restrictions in the Browser

One major goal for our API Explorer was to handle everything within the user’s browser, without routing requests through our main application server. This approach would allow users to make API requests directly from their browser, ensuring that we would not have access to user credentials or any sensitive data. By avoiding server-side processing, we could also prevent sensitive data from being inadvertently logged.

However, this goal hit a roadblock due to _CORS restrictions_. When a browser sends a request to a different domain, it automatically adds an Origin header, which lets the destination server know that the request originates from a different domain. Most servers, however, do not allow such cross-origin requests by their [_Cross Origin Ressource Policy_](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CORP), resulting in CORS errors on the browser side.

## Our Solution: A Dedicated Proxy Server

To get around these CORS restrictions, we decided to use a proxy server to handle requests. This way, requests could be sent from the browser but routed through a backend proxy server, which would avoid the CORS issues typically encountered with direct cross-origin requests.

To ensure the highest security and privacy standards, we decided to:

- _Separate the proxy from our main application_: By keeping the proxy server independent, we could further limit the exposure of user data to our main infrastructure.

- _Open-source the proxy solution_: Making the code open-source would ensure transparency, allowing the community to review and audit it.

![CORS Proxy Schema](https://storage.googleapis.com/bump-blog-resources/2024-12-12-cors-ing-the-boundaries/cors-toujours-schema.png)

## Exploring and Improving on Existing Solutions

As we researched potential solutions, we came across [_cors-anywhere_](https://github.com/Rob--W/cors-anywhere), an open-source project used by many companies, including some of our competitors. However, after a closer inspection of the codebase, we found it was no longer actively maintained, and some dependencies were outdated. We didn’t want to introduce unnecessary security risks to our users, so we decided to build a solution in-house.

## Introducing cors-toujours: A Simple, Secure, and Open-Source Proxy

Thus, _cors-toujours_ was born: a lightweight, open-source proxy designed to handle CORS restrictions with minimal complexity. Here’s how it works:

- _CORS Headers_: As requests pass through cors-toujours, the Origin header is overridden to match the destination domain, and necessary CORS headers are added to the response to ensure the browser accepts it.

- _No Logging_: In line with our privacy-first approach, cors-toujours doesn’t log any data, keeping user information safe and untracked.

- _Auditability_: Being open-source and under the AGPL license, cors-toujours is available for public auditing, allowing anyone to inspect the code for security.

## Adding Authorization with JWT

To prevent misuse, we implemented a simple authorization layer using _JWT tokens_. By verifying tokens, we ensure that only authorized requests pass through the proxy, helping us prevent abuse and restrict usage within a defined scope.

## Conclusion

_cors-toujours_ has allowed us to bring the API Explorer to life without compromising on user privacy or security. If you’re facing similar challenges with CORS and want a straightforward, auditable proxy solution, we encourage you to check out [_cors-toujours_ on GitHub](https://github.com/bump-sh/cors-toujours) and join the community.

Building cors-toujours was a rewarding experience, and we look forward to seeing how others are going to use it, study it, modify it and redistribute it.

