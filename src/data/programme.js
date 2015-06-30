/* eslint no-multi-str:0 */ // I got 99 problems but an ES<5 browser ain't one
module.exports = [
    {
        title: "Keynote",
        time: 'Thu Jul 02 2015 10:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Christopher",
            lastName: "Chedeau",
            twitter: "https://twitter.com/Vjeux",
            web: "http://blog.vjeux.com/",
            github: "https://github.com/vjeux",
            pic: "https://www.react-europe.org/images/christopher-chedeau.jpg",
            interview:
                "https://medium.com/@patcito/\
                reacteurope-interview-19-christopher-chedeau-b191e0f67286",
        }],
        description: "For more than a year now, React.js has changed the way \
        we think about client-side applications through concepts such as the \
        virtual dom, one-way data flow, immutable data structures \
        and isomorphism.\
        \
        ReactEurope is the occasion to meet the core team and other awesome \
        members of the community to learn, socialize and have fun in the \
        beautiful city of Paris with great food, entertainment, connectivity, \
        prizes and more!",
    },
    {
        title: "Inline Styles: themes, media queries, contexts, and when it's best to use CSS",
        shortTitle: "Inline Styles",
        time: 'Thu Jul 02 2015 10:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Michael",
            lastName: "Chan",
            twitter: "https://twitter.com/chantastic",
            github: "https://github.com/chantastic",
            web: "http://chantastic.io/",
            pic: "https://www.react-europe.org/images/michael-chan.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-10-michael-chan-f47183912785",
        }],
        description: "React allows you to write styles inline and bypass a \
            host of CSS shortcomings. Scope, dependency management, dead code \
            elimination, these problems go away when adding your styles \
            directly to components. But it's not all rainbows and unicorns. \
            Things like theming and media queries become much more difficult \
            when all your styles live directly on components. In this talk, \
            we'll look at how to solve these problems with contexts and plain \
            old JavaScript. We'll also look at the role of \
            container-components and when it's better to just use CSS.",
    },
    {
        title: "Flux over the Wire",
        time: 'Thu Jul 02 2015 11:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Elie",
            lastName: "Rotenberg",
            twitter: "https://twitter.com/elierotenberg",
            github: "https://github.com/elierotenberg",
            web: "https://elie.rotenberg.io/",
            pic: "https://www.react-europe.org/images/elie-rotenberg.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-2-elie-rotenberg-20d2bec578ad",
        }],
        description: "Flux is most often used to implement shared state \
        within a single window. But done properly, this architecture can be \
        used to implement real-time, multi-user shared state between many \
        users of the same web applications. Using HTTP requests to dispatch \
        stores, and Websocket to broadcast updates, Flux over the Wire has \
        the potential to trivialize several hard problems. While the idea of \
        using Websockets to back Flux is rather straightforward, doing it in a \
        way that scales up to tens of thousands of concurrent viewers can \
        prove challenging. In addition, Flux over the Wire offers an interface \
        which considerably eases server-side rendering, as it completely \
        abstracts data fetching and data syncing from the React views \
        that tap into its stores and dispatch its actions.",
    },
    {
        title: "React Native: Building Fluid User Experiences",
        shortTitle: "React Native",
        time: 'Thu Jul 02 2015 12:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Spencer",
            lastName: "Ahrens",
            github: "https://github.com/sahrens",
            facebook: "https://www.facebook.com/spencer",
            linkedin: "https://www.linkedin.com/pub/spencer-ahrens/6/733/360",
            pic: "https://www.react-europe.org/images/spencer-ahrens.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-9-spencer-arhens-72c50c7e7abb",
        }],
        description: "React Native's architecture has opened up many \
        possibilities for re-inventing the clunkier aspects of UX construction \
        on traditional platforms, making it easier and faster to build \
        world-class experiences. This talk will walk through building an \
        advanced gestural UI leveraging the unique power of the React Native \
        layout and animation systems to build a complex and fluid experience.",
    },
    {
        title: "Exploring GraphQL",
        time: 'Thu Jul 02 2015 14:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Lee",
            lastName: "Byron",
            twitter: "https://twitter.com/leeb",
            linkedin: "http://leebyron.com/",
            github: "https://github.com/leebyron",
            pic: "https://www.react-europe.org/images/lee-byron.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-18-lee-byron-af81838df52a",
        }],
        description: "At React.js Conf last January, we introduced the idea \
        of GraphQL: a data fetching language that allows clients to \
        declaratively describe their data requirements. Let's explore more of \
        GraphQL, it's core principles, how it works, and what makes it a \
        powerful tool.",
    },
    {
        title: "Don't Rewrite, React!",
        time: 'Thu Jul 02 2015 14:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Ryan",
            lastName: "Florence",
            twitter: "https://twitter.com/ryanflorence",
            web: "https://reactjs-training.com/",
            github: "https://github.com/ryanflorence",
            pic: "https://www.react-europe.org/images/ryan-florence.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-16-ryan-florence-cc9e89f8ee1",
        }],
        description: "Your front and back ends are already successfully in \
        production but you don't have to miss out on the productivity that \
        React brings. Forget the rewrites, this is brownfield!",
    },
    {
        title: "Live React: Hot Reloading with Time Travel",
        shortTitle: "Live React",
        time: 'Thu Jul 02 2015 15:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Dan",
            lastName: "Abramov",
            twitter: "https://twitter.com/dan_abramov",
            web: "https://medium.com/@dan_abramov",
            github: "https://github.com/gaearon",
            pic: "https://www.react-europe.org/images/dan-abramov.jpg",
            interview: "https://medium.com/@patcito/\
            first-reacteurope-interview-dan-abramov-de328761cd5a",
        }],
        description: "React’s unique strength is bringing to JavaScript \
        development some of the benefits previously exclusive to more \
        radically functional languages such as Elm and ClojureScript, \
        without forcing you to completely eschew local state or rewrite code \
        with exclusively immutable data structures. In this talk, Dan will \
        demonstrate how React can be used together with Webpack Hot Module \
        Replacement to create a live editing environment with time travel \
        that supercharges your debugging experience and transforms the way \
        you work on real apps every day.",
    },
    {
        title: "Relay: An Application Framework For React",
        shortTitle: "Relay",
        time: 'Thu Jul 02 2015 16:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Joseph",
            lastName: "Savona",
            twitter: "https://twitter.com/en_js",
            web: "http://josephsavona.com/",
            github: "https://github.com/josephsavona",
            pic: "https://www.react-europe.org/images/joseph-savona.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-11-joseph-savona-4c0a5fb92193",
        }],
        description: "Relay is a new framework from Facebook that enables \
        declarative data fetching & updates for React applications. Relay \
        components use GraphQL to specify their data requirements, and \
        compose together to form truly modular applications. This talk will \
        explore the problems Relay solves, its architecture and the query \
        lifecycle, and how can you use Relay to build more scalable apps. \
        We’ll also see examples of how Relay powers applications as complex \
        as the Facebook News Feed.",
    },
    {
        title: "Back to Text UI",
        time: 'Thu Jul 02 2015 17:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Mikhail",
            lastName: "Davydov",
            twitter: "https://twitter.com/azproduction",
            linkedin: "http://azproduction.ru/",
            github: "https://github.com/azproduction",
            pic: "https://www.react-europe.org/images/mikhail-davydov.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-3-mikhail-davydov-3c72924d52ee",
        }],
        description: "Paradoxically that today it is easier to create GUI \
        than Text UI. Developer has an arsenal of different GUI libraries \
        and layout engines. When one decides to write Terminal Text UI app he \
        faces obstacles of Text UI DSL Library, imperative layouts, \
        constantly increasing complexity and underdeveloped approaches. \
        In this talk I will show you how to ask browser layout engine for \
        help, how to avoid slavery of DSL and build declarative Text UI \
        using only web-technologies like HTML, JS, CSS and React.",
    },
    {
        title: "DOM as a Second-class Citizen",
        time: 'Thu Jul 02 2015 17:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Sebastian",
            lastName: "Markbåge",
            twitter: "https://twitter.com/sebmarkbage",
            linkedin: "https://www.linkedin.com/in/sebmarkbage",
            github: "https://github.com/sebmarkbage/",
            pic: "https://www.react-europe.org/images/SebastianProfile.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-17-sebastian-markb%C3%A5ge-23bef96905af",
        }],
        description: "React has always been about the Virtual DOM. A nice \
        way to render HTML (and some of SVG and maybe some Web Components). \
        Although there's also react-art, react-three, react-canvas, \
        react-curses... Oh, and react-native! Even if you bottom out at HTML, \
        most of what React does really well is rendering to OTHER React \
        components. Meanwhile most projects still try to retrofit our needs \
        into HTML and CSS primitives. I'll talk about why the DOM is flawed \
        and how it is becoming a second-class citizen in the land of React apps.",
    },
    {
        title: "Lightning Talks",
        time: 'Thu Jul 02 2015 18:00:00 UTC+0200 (CEST)',
    },
    {
        title: "Improving Your Workflow With Code Transformation",
        shortTitle: "BabelJS",
        time: 'Thu Jul 03 2015 10:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Sebastian",
            lastName: "McKenzie",
            twitter: "https://twitter.com/sebmck",
            web: "https://babeljs.io/",
            github: "https://github.com/sebmck",
            pic: "https://www.react-europe.org/images/sebastian-mcKenzie.png",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-14-sebastian-mckenzie-6096aa6261da",
        }],
        description: "Most React developers already use a build pipeline to \
        transform their JSX into vanilla JavaScript. This is usually \
        under-utilised only doing basic transformations such as concatenation, \
        minification and linting. In this talk, Sebastian will go over how \
        this already existing infrastructure can be further utilised to \
        perform even more significant code transformations such as \
        transpilation, optimisation, profiling and more, reducing bugs, \
        making your code faster and you as a developer more \
        productive and happy.",
    },
    {
        title: "The State of Animation in React",
        shortTitle: "Animation in React",
        time: 'Thu Jul 03 2015 10:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Cheng",
            lastName: "Lou",
            twitter: "https://twitter.com/_chenglou",
            // LinkedIn URL listed on the conference page doesn't work for me :-(
            pic: "https://www.react-europe.org/images/cheng-lou.jpg",
        }],
        description: "A talk on the past, the present and the future of \
        animation, and the place React can potentially take in this. \
        I will be focusing on a few experiments on animation I've done, \
        specifically: react-tween-state, react-state-stream and some \
        unreleased transition-group related thoughts and work.",
    },
    {
        title: "Simplifying the data layer",
        time: 'Thu Jul 03 2015 11:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Kevin",
            lastName: "Robinson",
            twitter: "https://twitter.com/krob",
            linkedin: "https://www.linkedin.com/pub/kevin-robinson/4/676/11a",
            github: "https://github.com/kevinrobinson",
            pic: "https://www.react-europe.org/images/kevin-robinson.png",
            interview: "https://medium.com/@patcito/\
                reacteurope-interview-5-kevin-robinson-9d5f382ac13b",
        }],
        description: "At Twitter, teams have starting adopting React because \
        it’s enabled UI engineers to forget about time when writing \
        rendering code. And we've started exploring similar simplifications \
        in the data layer, embracing the UI’s role as part of a distributed \
        system. First, we'll share how user experience choices are a primary \
        influence on how we design the data layer, especially for teams \
        developing new products with full-stack capabilities. Working with \
        data from multiple backend services has powerful benefits, and shapes \
        the problem space for UI engineering. Next, we'll look at how React \
        and Flux approaches can help in our problem scenarios. Yet even \
        after the advances in React’s component model, the data layer is \
        still an important source of complexity as an app grows and changes \
        over time. Finally, we'll look at new approaches we’ve been \
        exploring, and how designs like decoupling 'recording facts' \
        from 'computing views of those facts' have influenced UI engineering. \
        These designs nudge teams towards simplicity when creating impactful \
        user-facing improvements like real-time updates, optimistic commits, \
        and graceful handling of network outages.",
    },
    {
        title: "Going Mobile with React",
        time: 'Thu Jul 03 2015 12:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Jed",
            lastName: "Watson",
            twitter: "https://twitter.com/JedWatson",
            web: "http://thinkmill.com.au/",
            github: "https://github.com/JedWatson",
            pic: "https://www.react-europe.org/images/jed-watson.jpg",
        }],
        description: "React.js is changing the way developers think about \
        mobile app development, especially with the recent announcement of \
        React Native. However, in many ways hybrid (web + mobile) app \
        development is here to stay for a large number of mobile apps. \
        Everyone's heard \"you can't build a native experience in a web view\".\
        We disagree. You just have to know the right tricks. And when you do, \
        the web becomes an incredibly powerful platform for delivering \
        amazing user experience using the technology you know. At \
        Thinkmill in Sydney, over the course of developing several \
        commercial apps, we've experienced the power of using ReactJS \
        for mobile apps built on web technology, and developed a framework \
        we call TouchstoneJS (which Tom Occhino called \"the best looking \
        and feeling implementation of this that I've seen\" during the Q&A \
        session at React Conf) to share this capability with developers \
        around the world. In this talk I'll share what we've learned and \
        how we've approached the unique challenges of mobile web apps - \
        with tools that are useful to all developers building touch \
        interfaces with React, as well as a walkthrough of our development \
        process and framework. I'll also talk about what you can do with \
        the web platform that you can't with native apps, \
        and even React Native.",
    },
    {
        title: "React Router",
        time: 'Thu Jul 03 2015 14:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Michael",
            lastName: "Jackson",
            twitter: "https://twitter.com/mjackson",
            web: "https://reactjs-training.com/",
            github: "https://github.com/mjackson",
            pic: "https://www.react-europe.org/images/michael-jackson.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-14-michael-jackson-a9d3af90774f",
        }],
        description: "Since May 2014 over 100 people have contributed code to \
        React Router and many, many more have filed issues, given talks, \
        and used the router in both server and client environments. It has \
        been mine and Ryan's privilege to work with and learn from these \
        wonderful people and to guide the direction of a library that we hope \
        will help us all build amazing products and tools with React over the \
        next few years.\
        \
        This year we are introducing support for React Native and we are \
        working closely with the Relay team to ensure the router meets the \
        needs of React developers everywhere React runs. More importantly \
        though, we are focused on bringing great experiences to consumers of \
        applications built using React Router. In this talk, we will discuss \
        how your users can benefit from the many tools the router provides \
        including server-side rendering, real URLs on native devices, \
        and much, much more.",
    },
    {
        title: "Creating a GraphQL Server",
        shortTitle: "GraphQL",
        time: 'Thu Jul 03 2015 14:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Nick",
            lastName: "Schrock",
            twitter: "https://twitter.com/schrockn",
            facebook: "http://www.facebook.com/schrockn",
            github: "https://github.com/schrockn",
            pic: "https://www.react-europe.org/images/schrockn.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-6-nick-schrock-c71f99fe78e6",
        },
        {
            firstName: "Dan",
            lastName: "Schafer",
            twitter: "https://twitter.com/dlschafer",
            facebook: "https://www.facebook.com/dschafer",
            github: "https://github.com/dschafer",
            pic: "https://www.react-europe.org/images/dlschafer.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-7-dan-schafer-b93f09485a63",
        }],
        description: "In this talk, we'll take a deeper dive into putting \
        GraphQL to work. How can we build a GraphQL API to work with an \
        existing REST API or server-side data model? What are best practices \
        when building a GraphQL API, and how do they differ from traditional \
        REST best practices? How does Facebook use GraphQL? Most importantly, \
        what does a complete and coherent GraphQL API looks like, and how can \
        we get started building one?",
    },
    {
        title: "Isomorphic Flux",
        time: 'Thu Jul 03 2015 15:30:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Michael",
            lastName: "Ridgway",
            twitter: "https://twitter.com/TheRidgway",
            web: "http://theridgway.com/",
            github: "https://github.com/mridgway",
            pic: "https://www.react-europe.org/images/michael-ridgway.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-4-michael-ridgway-f773ae92c212",
        }],
        description: "Flux provides a good framework for building rich client \
        applications, but did you know you can reuse the flux architecture for \
        server rendering? In this talk, I'll walk you through an isomorphic \
        Flux architecture to give you the holy grail of frontend development. \
        With this architecture you'll be able to reuse all of your application \
        code on the server and client without worrying about server-side \
        concurrency issues that you may see with stock Flux. Once the \
        concepts have been explained, I will introduce the open source \
        libraries that we have open sourced and are powering many of Yahoo's \
        high-traffic web applications.",
    },
    {
        title: "Building submarines that don't leak",
        shortTitle: "Pure Components",
        time: 'Thu Jul 03 2015 16:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Aria",
            lastName: "Buckles",
            twitter: "https://twitter.com/ariabuckles",
            web: "https://sourcegraph.com/ariabuckles",
            github: "https://github.com/ariabuckles",
            pic: "https://www.react-europe.org/images/aria-buckles.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-8-aria-buckles-f51b6ab34d2b",
        }],
        description: "React provides us with a lot of tools for building \
        components, but isn't prescriptive about how we use those. Objects \
        can have props, state, and instance fields. When is it best to use \
        each? We've heard a lot about pure components, but how do we make \
        pure components when we have to deal with the realities of a stateful \
        world? How do we make more complex components whose props actually \
        represent them? We'll cover how we've answered these questions at \
        Khan Academy, including techniques and patterns to make dealing with \
        large pure components simpler, as well as current open questions.",
    },
    {
        title: "How React & Flux Turn Applications Into Extensible Platforms",
        shortTitle: "Extensible Platforms",
        time: 'Thu Jul 03 2015 17:00:00 UTC+0200 (CEST)',
        speakers: [{
            firstName: "Evan",
            lastName: "Morikawa ",
            twitter: "https://twitter.com/E0M",
            linkedin: "https://www.linkedin.com/in/evanmorikawa",
            github: "https://github.com/emorikawa",
            pic: "https://www.react-europe.org/images/evan-morikawa.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-12-evan-morikawa-2d077dbdaa3",
        },
        {
            firstName: "Ben",
            lastName: "Gotow",
            twitter: "https://twitter.com/bengotow",
            linkedin: "http://foundry376.com/",
            github: "https://github.com/bengotow",
            pic: "https://www.react-europe.org/images/ben-gotow.jpg",
            interview: "https://medium.com/@patcito/\
            reacteurope-interview-13-ben-gotow-6fe44a5da751",
        }],
        description: "Chrome is great, but 3rd party extensions make it \
        better. The iPhone is great, but apps make it better. You React-app \
        may be great, but imagine if you could safely and robustly allow \
        3rd party extensions to enhance it. We'll talk about specific \
        features of React & Flux, React CSS, programming design patterns, \
        and custom libraries, which can turn a static application into a \
        dynamic platform that an ecosystem of developers can build on top of. \
        We've built a highly-extensible desktop email client with React & \
        Flux on Atom Shell, and we'll also show concrete examples of where \
        these tools enabled a 3rd party ecosystem of email plugins. Our goal \
        is for you to take away how to use React to be more than just great \
        application developers, but now great platform developers as well.",
    },
    {
        title: "Q and A",
        time: 'Thu Jul 03 2015 17:30:00 UTC+0200 (CEST)',
        pic: "img/reacteurope.png",
    },
];
