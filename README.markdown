Mediatizr 0.1.4
===============

This library adds media queries support to browsers that don't support it (like Internet Explorer 5.5-8).

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

Simply link the script to your page as usual. Mediatizr will run by itself.

Dependencies
------------

Mediatizr uses [Sheethub](https://github.com/pyrsmk/Sheethub) and [W](https://github.com/pyrsmk/W) libraries. Then, you can choose among 4 script versions to minimize bandwith use and maximize simplicity. If you've already added one of these libraries (or both) into your project, then take the simple minified mediatizr version, else take the one with the script(s) that you haven't included.

Caveats
-------

There's some issues between IE<8 and em values in W. If you've planned to use em units on your media queries and you want to support IE6/7, then you _must_ load mediatizr when the DOM is ready.

Unlike [Respond](https://github.com/scottjehl/Respond), you don't need to put `/*/mediaquery*/` comments to help mediatizr to parse media queries.

Using mediatizr with `STYLE` stylesheets (sheets that have been included to the HTML page itself) can't work. Because, when the browser parses the `STYLE` stylesheet and encounters rules that it doesn't understand then it will simply drops these rules: your media queries are lost. For...ever.

License
-------

Mediatizr is brought to you with the MIT license.
