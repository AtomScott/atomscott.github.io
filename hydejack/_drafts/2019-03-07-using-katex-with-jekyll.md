---
layout: post
title: How to use KaTeX with Jekyll on GitHub Pages 
# image: /assets/img/blog/wade-lambert.jpg
# description: >
#   Hydejack 8.3.2 introduces new options to bring Hydejack's build time in line with other Jekyll themes. 
---

There are many ways to enable math / LaTeX support on Jekyll pages, but IMO none is quite as performant and good-looking as [KaTeX]. While KaTeX doesn't support the same feature set as MathJax, the improved performance 

Inspired by [this question on StackOverflow](https://stackoverflow.com/questions/26275645/how-to-support-latex-in-github-pages) I thought I could share the technique I use to render math in Hydejack so you can use it on your own site.

While kramdown does support KaTeX math engines by now, these haven't found their way into GitHub Pages yet. Luckily, we can work around this buy using the MathJax backend and massaging the data on the frontend, so that we can render it using KaTeX.

[katex]: https://katex.org/
