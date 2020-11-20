# Storybook for ReasonML/ReScript

This is a very short demonstration illustrating how to use Storybook MDX
with ReasonML and ReScript.  For those of you unfamiliar with ReasonML
and ReScript, they are a new Javascript syntax that parses directly to
OCaml and then into native and fairly performant Javascript.

# Background

There were three generations of ReScript:

- [Bucklescript](https://jaredforsyth.com/posts/getting-started-with-reason-and-bucklescript/),
  a project by Bloomberg News that converted OCaml directly into
  Javascript.  The Bucklescript compiler is at the root of all of future
  projects.
- ReasonML, a compiler that converted a Javascript-like syntax into the
  OCaml language, and then called Bucklescript.  ReasonML was supposed
  to be "Javascript friendly," and looked much more like the Algol-like
  syntax of Javascript and less the indented style of OCaml.
- [ReScript](https://rescript-lang.org/), the latest iteration of the
  ReasonML compiler with a cleaner and much better Javascript interop.

I enjoy working in ReScript, but at this point I can't find a good use
for it in my own ecosystem.  There are pain points with Javascript
interop that I still find unacceptable.  There's
[ReasonReact](https://reasonml.github.io/reason-react/), but using a lot
of third-party React components can get dreary very quickly.

I wish that weren't the case, but until ReScript matures a little more
I'm not going to be using it professionally.

# This Project's Purpose:

There are a lot of good tools in the Javascript ecosystem that I would
like to leverage when working with ReScript.  One of them is
[Storybook](https://storybook.js.org/), a tool that allows developers to
see their
[WebComponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
rendering independent of the framework in which they're being developed.
I firmly believe in the separation of responsibilities between
[effectful](https://dev.to/busypeoples/notes-on-typescript-handling-side-effects-3nid)
and effect-free code, and if you build your WebComponents responsibly,
that should be an easy condition to meet.

This project shows the endpoint of adding Storybook to an existing
ReScript project.  There is a tool for [writing Storybook stories with
ReScript](https://github.com/draftbit/bs-storybook), but what I wanted
was something easier: I wanted to used
[MDX](https://storybook.js.org/docs/react/api/mdx), a format that allows
you to mix Markdown and JSX.

The steps are straightforward.  First, add Storybook:

``` sh
$ yarn global add storybook
$ npx sb init
```

Storybook installs MDX by default, so you should have it.

☝ By default, every ReasonReact functional component exports itself as a
ReScript *module*, a container similar to a library but with much more
capability, and that module exports a function named `make` as the
functional React component name.

☝ By default and convention, the Bucklescript compiler converts all
ReScript files, ending in `.res`, into Javascript with a `.bs.js`
extension.

☝ MDX files have two parts: The header, and the body.  The header is
everything before the first blank line, and is interpreted as Javascript
directives.  After a blank line, everything is treated as Markdown
*unless* it is obviously parsable as JSX, in which case it is treated as
JSX.

☝ ReScripts's internal types come with internal type annotations that
continue to live in other code.  If you want to use a React object that
takes a ReScript linked list, you will want to generate that object with
ReScript.

With this knowledge, a complete example of importing a ReScript object
into an MDX documentation module is simple:

``` markdown
import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';
import { make as Card } from "../Card.bs";

<Meta title="MDX/Card" component={Card} />

A simple Card API:

<Card content={"This is a test"}/>
```

And that's it.  Include the component with `{ make as Component }` and
include the `.bs` part of the extension (but *not* the `.js` that will
be visible in the filesystem).

If you want to use a more complex dataset as your example argument to a
Storybook React component, especially one written using ReasonReact,
you're going to have to encapsulate that dataset in ReScript.  Look in
`./src/stories/NoncardSupport` and the accompanying compiled output to
see how you use Storybook to demo a ReasonReact component that takes a
Bucklescript linked list.

## Credits

The example here is derived from Juan Pedro Villa Isaza's [Nonsense!
Getting started with Reason and ReasonReact
](https://www.stackbuilders.com/tutorials/reason/nonsense-getting-started-with-reason-and-reason-react/),
although I have separated the effectful and rendering components into
separate modules, the better to illustrate how to test the visual
components of the renderer.

## License

This repository was initialized with `yarn`, `bsb -init`, and `npx sb
init`.  Mr. Isaza's work is clearly his.  The conversion from ReasonML
to Rescript, the refactor into effect and view, and the storybook
additions are entirely my own.

My contributions are Copyright [Elf
M. Sternberg](https://elfsternberg.com) (c) 2019, and licensed with the
Mozilla Public License vers. 2.0.  A copy of the license file is
included in the root folder.



