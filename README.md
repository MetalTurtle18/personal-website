[![Deploy Astro site to Pages](https://github.com/MetalTurtle18/personal-website/actions/workflows/astro.yml/badge.svg)](https://github.com/MetalTurtle18/personal-website/actions/workflows/astro.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/28a08935-ae0f-47fa-b332-332a326ff997/deploy-status)](https://app.netlify.com/projects/mt18-pwp-83fbyjs8j/deploys)

# MetalTurtle18 Personal Website

This is my personal website. I will add more to the README as interesting things come up. I am using Astro.js because it
easy to use and seems to be faster than the bloat of React and friends.

## Development

Clone the repo and run `npm install`.

`npm run dev` will run the Astro development server with the environment variable `PREVIEW=true`, which allows draft articles to be rendered and shows a preview banner, as well as a few other changes.

`npm run dev-prod` runs with `PREVIEW=false`, giving the same output as would be deployed in the deploy branch.

`npm run lint` and `npm run format` do what you'd expect with Prettier and ESLint configured for Astro.

### Building

Similar to the development servers, there are two scripts to build in production or preview mode. Since production is the default for building:

`npm run build` will build with `PREVIEW=false`, and 

`npm run build-draft` will build with `PREVIEW=true`.

`npm run preview` will run the built server with `astro preview`.

These two build scripts allow GitHub Pages and Netlify to build the production and preview sites, respectively.

## Deployments

The main site is [deployed to GitHub Pages](https://dekolis.com/). This site gets built and deployed through a GitHub Actions when I push to the deploy branch.

The preview site is [deployed on Netlify](https://preview.dekolis.com/). This site gets built and deployed on every push to main.

## AI Agents (A personal lamentation irrelevant to the technologies of the repository)

### Claude Code

I am also using this as a chance to learn how to interact with agentic AI, specifically Claude Code. I am not happy about this, but I know I need to 
have experience doing it.

Update: it's nice for CSS

### Update August 2026

Done with Claude Code. I tried OpenCode, and I much prefer it, though I can't really say why.

I have moved to the Zed editor, which I like for its lightness and performance. Within Zed, there is a built-in agent and support for external agents. 
I have had more success using OpenCode from within Zed than using the Zed agent. Again, I'm not sure why.

I have several options for models:

* Zed has their own model aggregation service. As a student, I am entitled to $10/month of credits for a year from them. It gives access to all the common frontier models.
* My most used has been OpenCode Zen, OpenCode's similar service. I have found success too with their free models.
* I finally got around to playing with my school's AI offerings. It includes API access with the OpenAI API protocol, so I can actually use frontier models through there in any standard agents.

In addition, I have been using OpenSpec to keep the agents organized.

Overall, I am not a huge fan. I have made a couple feature additions using them, but I never feel very confident at the end. Most recently, I had 
Claude Opus 5 do a major change to preprocess markdown to replace images with Astro-optimized images. After 25 minutes, I had a working prototype in 
front of me. But, Claude really could not explain things well, and I could not decipher the mess of javascript it had created (maybe this says more 
about my understanding of web technologies---or javascript itself).

I ended up scrapping it all and pivoting to a much simpler implementation of 
writing Astro components direclty in MDX. I wrote all the code for the parsing, and realized how much fun I was having. I simply find no joy in asking 
agents to write features for me. Writing that feature and a subsequent one to tag images for lightbox grouping reminded me that I actually did like 
programming at one point and almost went all-in on being a software developer.

Now the trouble is I will have to ask it to read my code and update the specs to keep in sync.

I know I will have to continue using it to not fall behind. But maybe I can try to find ways to code the things I enjoy still. One thing I do know is 
Claude can write all the CSS for me that it wants!
