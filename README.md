# Bump marketing website

This website is made with https://www.bridgetownrb.com/.

It's a classic bridgetown installation, except:

- `npm` is used instead of `yarn` (not much value in requiring an alternative package manager for the simple needs we have)
- `.node-version` and `.ruby-version` are added so that you know what node and ruby versions to use. These default to latest (lts) available version at the time of making the website. You can use tools such as [mise](https://mise.jdx.dev/) to automatically manage your local node/ruby versions
- erb templates are used as default instead of liquid

## Install

At the root of the directory:

```sh
bundle install
npm install
```

## Development

To start your site in development mode, run `bin/bridgetown start` and navigate to [localhost:4000](https://localhost:4000/)!

### Commands

```sh
# running locally
bin/bridgetown start

# build & deploy to production
bin/bridgetown deploy

# load the site up within a Ruby console (IRB)
bin/bridgetown console
```

> Learn more: [Bridgetown CLI Documentation](https://www.bridgetownrb.com/docs/command-line-usage)

## Deployment

You can deploy Bridgetown sites on hosts like Render or Vercel as well as traditional web servers by simply building and copying the output folder to your HTML root.

> Read the [Bridgetown Deployment Documentation](https://www.bridgetownrb.com/docs/deployment) for more information.
