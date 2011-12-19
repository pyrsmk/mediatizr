Mediatizr 0.1.4
===============

This library adds media queries support to browsers that don't support it (like Internet Explorer 5.5-8), using [Sheethub](https://github.com/pyrsmk/Sheethub) and [W](https://github.com/pyrsmk/W). It's easy of use: just add it to your website and it will run by itself.

Features
--------

- px/em values
- min-width/max-width
- min-device-width/max-device-width
- resizing, zooming and text size changing will re-evaluate media queries for live responsive adjustment
- @keyframes friendly
- expose current media queries support with `window.supportMediaQueries`

Dependencies
------------

You can choose among 3 script versions to minimize bandwith use and maximize simplicity. If you've already added one of these libraries (or both) into your project, then take the simple minified mediatizr version, else take one with the script(s) that you haven't included.

Caveats
-------

There's some issues between IE<8 and em values in W. If you've planned to use em units on your media queries and you want to support IE6/7, then you _must_ load mediatizr when the DOM is ready.

License
-------

Mediatizr is brought to you with the MIT license.
