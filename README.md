# tlcraft.github.io
Just a simple personal site and a place where I can play around with things.

Check it out here: [https://travislcraft.com/](https://travislcraft.com/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

[![Install and Build](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/pull-requests.yml/badge.svg)](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/pull-requests.yml) [![Deploy to GitHub Pages](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/deploy.yml) [![pages-build-deployment](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/tlcraft/tlcraft.github.io/actions/workflows/pages/pages-build-deployment)

## Contents

- [Gettings Started](#getting-started)
- [Learn More](#learn-more)
- [Deployment](#deployment)
- [Variable Metrics Analyzer](#variable-metrics-analyzer)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This repo uses [GitHub Actions](https://github.com/features/actions) to deploy to [GitHub Pages](https://pages.github.com/) using  James Ives' [deploy action project](https://github.com/JamesIves/github-pages-deploy-action).

Learn more from James here: https://jamesiv.es/blog/github/actions/2022/01/23/deploying-to-github-pages-with-github-actions

## Variable Metrics Analyzer

This project includes a variable metrics analyzer that measures:
- Span: number of lines between consecutive references to the same variable
- Live Time: number of lines from first reference to last reference (inclusive)

Declarations are counted as references, so declaration lines are included in live-time calculations.

### Commands

- npm run analyze:variables
  - Generates a metrics report at out/variable-metrics.json
  - Prints the top 10 variables by live time in the console

- npm run analyze:variables:check
  - Runs the analyzer with thresholds and fails with exit code 1 when violations are found
  - Current thresholds:
    - max live time: 80
    - max span: 60
    - max average span: 20

### Custom threshold flags

You can run the script directly and override thresholds:
- node scripts/analyze-variables.mjs --max-live-time=100 --max-span=70 --max-avg-span=25

### Notes

- The analyzer only scans source files under src
- Output is written to out, which is ignored by git
