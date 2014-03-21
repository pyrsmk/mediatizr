mediatizr 0.3.2
===============

Mediatizr adds media queries handling to browsers that don't support it (like Internet Explorer 5.5-8). It's based on [Sheethub](https://github.com/pyrsmk/Sheethub) and [W](https://github.com/pyrsmk/W) to have great compatibility

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

Link the script at the top of your page

Caveats
-------

There's some issues between IE<8 and em values in W. If you've planned to use `em` units in your media queries and you want to support IE6/7, then you _must_ load mediatizr when the DOM is ready.

Using mediatizr with `STYLE` stylesheets (sheets that have been included to the HTML page itself) doesn't work, because when the browser parses the `STYLE` stylesheet and encounters rules that it doesn't understand then it will simply drops these rules: your media queries are lost. For...ever.

License
-------

Mediatizr is brought to you with the MIT license.
