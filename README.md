mediatizr 0.4.2
===============

Mediatizr adds media queries to browsers that don't support it (like Internet Explorer 5.5-8). It's based on [Sheethub](https://github.com/pyrsmk/Sheethub) and [W](https://github.com/pyrsmk/W) to have a better compatibility with retrieving stylesheets and responsive events.

Install
-------

You can pick the minified library or install it with :

```
jam install pyrsmk-mediatizr
bower install mediatizr
npm install pyrsmk-mediatizr --save-dev
```

Features
--------

- px/em values
- min-width/max-width
- min-device-width/max-device-width
- resizing, zooming and text size changing will re-evaluate media queries for live responsive adjustment
- @keyframes friendly
- expose current media queries support with `window.supportMediaQueries`

Use
---

Link the script at the top of your page, under your stylesheet declarations. There's several versions of mediatizr, depending on what dependency is included on. Most of the time you want to pick `mediatizr.Sheethub.W.min.js`.

Caveats
-------

There's some issues between IE<8 and em values in W. If you've planned to use `em` units in your media queries and you want to support IE6/7, then you _must_ load mediatizr when the DOM is ready.

Using mediatizr with `STYLE` stylesheets (sheets that have been included to the HTML page itself) doesn't work, because when the browser parses the `STYLE` node and encounters rules that it doesn't understand then it will simply drop them, and your media queries are just lost. For...ever.

License
-------

Mediatizr is brought to you with the [MIT license](http://dreamysource.mit-license.org).
