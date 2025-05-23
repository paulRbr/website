---
title: "How BigID Enhanced Processes and Boosted Satisfaction by Upgrading Their API Documentation Portal"
category: Company
image: blog/bigid-usecase-bump-sh.png
end_with_preview: true
---

## Technical Writers supporting API demand surge

As BigID's customers increasingly relied on APIs alongside the BigID user interface, the demand for API development surged. However, the existing systems couldn't keep pace. The API documentation process involved developers emailing YAML files to technical writers or attaching them to Jira tickets, leading to confusion over the latest versions. Additionally, corrections to YAML files were often not reflected in updates, forcing technical writers to redo work.

The API documentation site also posed challenges. Initially, it was sufficient to upload YAML files to an AWS bucket and display them on a basic homegrown site. However, the site lacked essential features like versioning, reliable search, and a professional design, making it cumbersome to use. With over 40 APIs regularly updated and used by customers, BigID needed a change. Internal and customer feedback consistently highlighted the need for improved API documentation.

## With Bump.sh, introducing docs-as-code practices

Enter Bump.sh—a game-changer for BigID's API documentation. Transitioning to Bump.sh allowed BigID to overhaul its internal processes. Now, developers save the latest YAML files directly to a GitLab repository, triggering a Jira ticket for technical writers. Writers then make changes to the YAML files directly in GitLab, and a [Bump.sh-provided script](https://github.com/bump-sh/bump-ci-example/blob/main/.gitlab-ci.yml) automatically updates the API documentation whenever a new version is merged.

A direct benefit was that the Engineering teams and Technical Writers had the opportunity to collaborate closely to develop the new tooling and workflows. The technical writing team adopted a docs-as-code approach, enabling both teams to rely on a shared, single source of truth. The development teams also had to learn and follow new procedures. That transition took a little time, but it was well worth the effort. Once the new process was ready, launching our portal on Bump.sh took less than a month, including the delivery of a new user access management feature the Bump.sh team prioritized and developed for our launch.

Bump.sh's seamless integration with GitLab transformed the workflow, eliminating lost files, reducing confusion, and speeding up completion times. Several hours a week that were previously used for managing individual YAML files and redoing lost work can now be invested into the content of the API documentation itself. Further efficiencies are evident from the automated changelog feature, which significantly reduces the effort for technical writers and provides clear updates for users on what’s new in each version. Users can also switch between API versions based on their BigID license, enhancing usability. Additionally, Bump.sh’s backend tools enable technical writers to leverage a sleek, modern interface, enhancing the overall user experience.

## Satisfaction on the rise

An internal poll at BigID showed an 85% increase in satisfaction with the new API documentation site over the old one among sales, support, and product teams, and a 90% increase in satisfaction with the new API documentation process among Engineers. This represents a hugely significant win and validates the effort it took to move from a homemade solution to Bump.sh. As one Product Manager at BigID noted:

> “This is much better than the old site and is exactly what we need. It looks great, and we can easily find all the information we need.”

> *We’re thrilled with the organizational improvements and process efficiencies we've achieved thanks to Bump.sh. These changes wouldn’t have been possible without the comprehensive capabilities of the Bump.sh platform and their exceptional support, which has been second to none. The responsive and collaborative nature of the Bump.sh team has made all the difference; they're consistently attentive to our feedback and continuously develop new features that go beyond industry standards. We’re excited about the future as we continue to benefit from Bump’s innovative and customer-focused approach.*  
> — **Yossi Karp - Technical Writing Manager**

Looking for your docs-as-code API documentation portal? [We're here to help.](mailto:hello@bump.sh)

---

#### Some Words about BigID

[BigID](https://bigid.com/) is a data intelligence platform that helps organizations discover, classify, and manage sensitive data across all environments, enhancing privacy, security, compliance, and data governance. Since its founding eight years ago, BigID has grown from a small startup of fewer than ten employees to a market leader with over 500 employees. This rapid growth highlighted the need to replace initial workarounds with scalable, professional solutions.
