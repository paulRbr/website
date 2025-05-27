---
title: Enhancing Lightspeed API management
author: Jay Cormier
category: Customers
image: blog/lightspeed-usecase-bump-sh.png
company:
  logo: company-logos/lightspeed.svg
  name: Lightspeed Commerce
  domain: Retail
  website: https://www.lightspeedhq.com/
  partnering since: 2023
---

## Enhancing API management with Bump.sh

Lightspeed enables seamless integration with other systems and services through robust and well-documented APIs. This flexibility ensures that our merchants can leverage the full power of Lightspeed's platform while incorporating the third-party tools and systems they require to thrive in a competitive landscape.

### Providing good API documentation is easy, is it?

In our case, we faced challenges that we needed to overcome to provide good and helpful API documentation. Many of these challenges were deeply rooted in treating API documentation as an afterthought.

A microservice-based architecture offers many operational benefits to our engineering team. However, it also adds complexity. For API development, this means multiple teams are simultaneously working on enhancing our existing APIs or building new ones.

With over 100 microservices, most exposing either public or internal APIs, we initially struggled to provide unified API documentation with consistent detail and quality. The easiest approach to API documentation is to use tooling that generates documentation pages from code as a by-product of the development process. While convenient, this solution had drawbacks: not all services had their documentation exposed, internal documentation was merely hidden, and the documentation was scattered across multiple URLs that partners needed to know. If changes were made to the APIs or the documentation, there was no way to notify partners or show exactly what had changed, leading to an increased volume of requests to our API Support team. Improvements to the documentation could only be made in code by our often time-constrained development team. Instead of empowering our technical writers to enrich the documentation with the required detail, this created a long feedback loop resulting in inconsistent and outdated documentation, which our partners found difficult to use.

### Mindset Shift: Treating API Documentation as a First-Class Citizen

To address these challenges, we need a system capable of handling the complexity of our API structure. We need all API endpoints across all microservices to be unified and accessible in one single place, ensuring both internal and external endpoints are documented and shared with our internal team and partners. Effective communication of API changes is essential to keep both our internal teams and partners consuming our APIs in the loop. Most importantly, we need to empower our technical writers to enhance our documentation.

Above all, we needed a mindset shift to make API documentation a first-class citizen in our process. By prioritizing documentation, we aimed to enhance collaboration, improve integration capabilities, and ensure consistent and reliable information across all our services.

## Investing in Internal Tooling

To support this new approach, we made significant changes to our internal processes and invested in internal tooling to achieve all goals we have set out for:

- **Custom Operator Development:** Since all our infrastructure runs on Kubernetes, we made the OpenAPI document a deployable custom resource. We developed a Kubernetes operator that would merge all the individual OpenAPI documents into one comprehensive document representing all of our APIs, ensuring unified and up-to-date documentation.
- **OpenAPI Document Deployment:** Each microservice provides and tracks its OpenAPI document in Git. The OpenAPI document becomes an artifact that is versioned and released at the same time we make any changes to the code, ensuring central management of each microservice's API specification.
- **Enhanced Collaboration:** With the OpenAPI document being the source of truth, we enabled our technical writers to update and test changes to the specifications. This improved collaboration between developers and documentation teams.

> Before we moved to Bump.sh, updating our API specs and documentation was challenging and required developer intervention.
> After the move, I could access and edit the specs myself and crucially preview changes before release. I can now quickly add important details and corrections without developer assistance, making my job easier and improving support for our Partners and Partner Support teams.
> Additionally, having access to the specs allowed me to learn more about API design and the development life cycle, enabling me to better communicate our partners' needs to API development teams.
> — *Leah Williams, Technical Writer - API*

## Adopting Bump.sh for Additional Benefits

Making the mindset shift to treat API documentation as a first-class citizen and investing in internal tooling were critical steps, yet we still missed crucial functionality to address all past drawbacks. To further enhance our documentation capabilities, we chose Bump.sh. Its ability to handle complex API structures and offer automated documentation features aligned perfectly with our needs. The integration process was seamless thanks to our adherence to the OpenAPI standard and Bump.sh providing all the necessary features out-of-the-box:

- **Automated Changelog and Notification System:** This significantly improved our communication and documentation processes, reducing the long feedback loops between our partners consuming the API, our API support team, the technical writers, and our engineering team.
- **Best-in-Class Documentation:** With Bump.sh, we know there is a team focused on providing the best-in-class API documentation experience, allowing us to focus on our core mission.
- **Improved Team Collaboration:** Adopting Bump.sh and prioritizing API documentation has transformed the way the entire team, from development to technical writers, collaborates to provide excellent documentation.

> Our journey with Bump.sh has been a revelation. It not only solved our immediate challenges but also opened new avenues for innovation in API management.
> The ability to automate changelogs and receive notifications has been a game-changer for our team.
> — *Alexander Mühlbauer, Development Manager*

## Conclusion: A Strategic Partnership

Adopting Bump.sh has been a crucial part in addressing our documentation challenges and enhancing our API management approach. By making a mindset shift to prioritize API documentation and investing in internal tooling, we laid a strong foundation for consistent and high-quality documentation. Leveraging Bump.sh has further elevated our capabilities, providing automated features and best-in-class documentation experiences that seamlessly integrate with our existing processes.

The ongoing collaboration with the Bump.sh team has been invaluable, offering continuous improvements and fostering a feedback loop that benefits both parties. Bump.sh has not only resolved our immediate issues but also established itself as an essential component of our toolkit.

---

## To learn more about Lightspeed

Lightspeed is the unified POS and payments platform powering the world's best businesses in over 100 countries.

The partner of choice for ambitious retail and hospitality entrepreneurs, Lightspeed simplifies processes across teams, channels, and locations to help accelerate revenue growth and provide the best customer experience.

Its fast, flexible omnichannel technology combines advanced point of sale and ecommerce solutions with integrated payments, inventory management, real-time reporting, staff and supplier management, financial services, and more.

With timesaving tools and integrations, performance-boosting insights, and personalized support from industry experts, Lightspeed helps businesses focus on what matters—so they can keep staff happy and become the go-to destination in their space.
