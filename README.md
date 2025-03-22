# Bump marketing website

This website is made with [Bridgetown](https://www.bridgetownrb.com/).

It's a classic bridgetown installation, except:

- `npm` is used instead of `yarn`. There is not much value in requiring an alternative package manager for the simple needs we have, so just stick to the default.
- `.node-version` and `.ruby-version` are added so that you know what node and ruby versions to use. These default to latest (lts) available version at the time of making the website. You can use tools such as [mise](https://mise.jdx.dev/) to automatically manage your local node/ruby versions
- erb templates are used as default instead of liquid. This match the decision made on the docs hub, and the decision the bridgetown team [is converging to](https://github.com/bridgetownrb/bridgetown/issues/899).
- [tailwind v4](https://tailwindcss.com/) is used as the main way to write CSS (see below).

## Install

At the root of the directory:

```sh
bundle install
npm install
touch frontend/styles/dev-tailwind-build-trigger.css
```

## Development

To start your site in development mode, run `bin/bridgetown start` and navigate to [localhost:4000](https://localhost:4000/).

Most commands are run via the `bin/bridgetown` helper, see the [Bridgetown CLI docs](https://www.bridgetownrb.com/docs/command-line-usage) for more details.

## Partials vs Ruby components

We have two ways of reusing html templates: [partials](https://www.bridgetownrb.com/docs/template-engines/erb-and-beyond#partials) and [ruby components](https://www.bridgetownrb.com/docs/components/ruby).

Components are great to expose easily what a template can take as parameter and add some logic if needed.

Partials are great as a straigth-forward way to reuse templates without having to create Ruby classes upon Ruby classes. But they lack variables explicit encapsulation.

There seems to be a bug currently in bridgetown, [preventing us from easily using partials inside components](https://github.com/bridgetownrb/bridgetown/issues/986).

This is why partials are mostly used for now instead of components: we can easily break down each partial into smaller parts, while components are more restricted.

Components are used for the small ui elements that we often reuse and that get value in having ruby classes, like buttons or icons.

## Tailwind

Tailwind v4 is used to handle the design system and styles as a whole. It's greatly advised to rely on ruby components and partials to ease up writing content with tailwind and enforcing the design system.

The tailwind config is located in `frontend/styles/theme.css`.

You'll notice a few differences from a default tailwind installation. Most notably, the spacing utilities are quite different, and lots of utilities are disabled by default. This is done to help us follow the brand design system as much as possible without unintentionally using some "out of design system" utilities.

_Note that while a goal is to match a specific, cohesive design system, the Figma design is sometimes not as strict as we would think, so for now we already have lots of different spacing values._

For example, you can't write `px-18` like you could by default in tailwind. When needed, you can explicitely use tailwind [arbitrary values](https://tailwindcss.com/docs/styling-with-utility-classes#using-arbitrary-values), like `px-[18rem]`. While this is not encouraged, it's still available when needed, and at least that way it's explicit in the code when something doesn't follow the design system.

If you have questions about specific design tokens choices, all your questions should be answered in comments in the theme file.

Besides writing custom global tailwind utilities (or tailwind components), you should not need to write any CSS in actual CSS files and should prefer sticking to using tailwind classes directly.

_Note: as the Bridgetown esbuild config is not really extendable, a somewhat hacky way to handle tailwind live-reload in development is setup. It follows the [bridgetown tailwind automation](https://github.com/bridgetownrb/tailwindcss-automation) example._

### Tailwind VS Code configuration

You might want to have your editor help you write tailwind classes. If you are using VS Code, you can install the official Tailwind CSS IntelliSense extension, and configure the IDE. Note that you can setup workspace-specific settings to avoid conflicts with global settings.

Below is a sample VS Code config.

The most important part is telling VS Code where to find the tailwind config so that completions understand our theme.

```jsonc
/* path to the tailwind config, so that completion works with our theme */
"tailwindCSS.experimental.configFile": "frontend/styles/index.css",
/* enable class autocomplete in erb templates */
"tailwindCSS.includeLanguages": {
  "erb": "html"
},
/* Enable tailwind completion on "*Styles" variables.
Allows to write variables like <% buttonStyles = "..." %> and have tailwind classes completion work there */
"tailwindCSS.classAttributes": [
  "class",
  "className",
  "ngClass",
  "class:list",
  ".*Styles.*"
],
/* make sure css files are understood as tailwind */
"files.associations": {
  "*.css": "tailwindcss"
}
```

## Fonts

Font loading is handled in a specific way. Refer to the [fonts documentation](./frontend/fonts/README.md) for more information.

## Deployment

To build a production version of the website:

```bash
BRIDGETOWN_ENV=production ./bin/bridgetown deploy
```

This generates a static website in the `output` directory.

Refer to the [Bridgetown deployment docs](https://www.bridgetownrb.com/docs/deployment) for more information.
