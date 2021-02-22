## Core SDK requirements

#### Dynamic Content App changes required?

- Nice to have: enable visualisation even when the content item isn't saved (if SDK enabled)
- Should be able: to open a full screen version (With no realtime loading)
- To think about: Should be enable multiple connections (If open full screen feature uses connection)
- To think about: You may not need a hub level vse url if you're only doing realtime visualisation
- To think about: Should we try detect message-event or require a meta tag in markup

Triggers that refresh the visualisation

- onSave
- onVersionChange

1.
2.
3.
4.

VisualizationRenderAreaController

set up connection with message-event-channel
set up event handlers to get data

open new tab should be disabled until we know if its sdk or url params

ContentItemEditor

remove retrictions on vis if message-event-channel is enabled, unsure how this wiill work as if its url params the snapshot in url params won't work, maybe try load vis with a spinner if connection made show vis if not show error message - 'Pre save vis is only enabled when using sdk ect'

- usages

  - content-item-editor
  - slot-form
  - version-control-editor
  - content-item-library
  - snapshots-browser

  How to deal with

  Comp

  - SubComp - requests data -not saved
  - SubComp - requests data -looking at this content and can live data

how to convert content links to delivery api with parity
how to only update the model dc side so we're not bombarding with requests

#### What does a user need to create visualisation?

Model

```js
{
	/**
	 * Locale that the current content form is displaying,
	 * it will default to locale set as default in settings.
	 */
    locale: string,

	/**
	 * Body of content item you're viewing
	 */
	body: {},

    /**
     *
     */
    device: Device;
}

Context Object
{
    config: {
		snapshotId: string,
		contentId: string,
		contentTypeId: string,
        effectiveContentType: schema,

        //
        hub: {
            id: string;
            name: string
        }
		hub: Hub
	},

	devices: Device[];

	visualizationSettings: {
		actualTemplatedUri: string
		default:  boolean
		hasLocaleToken:  boolean
		label:  string
		templatedUri:  string
		vseDomain:  string
    },

    preview: {
        vse: string;
        contentItemId: string;
    }
}
```

#### SDK API

```html
<head>
  <meta name="dc-visualization" />
</head>
```

```ts
/**
 * Any helpers that will help with url aurgmentations / decoding
 */
module "@dc-visualization-sdk/uri-params" {
  class Uri extends URLSearchParams {
    contructor(templatedUri: string) {}

    static extract(uri: string): UriParams;
    static encode(uri: string, params: UriParams): string;

    append(key: string, value: any) {}
    set(key: string, value: any) {}
    delete(key: string) {}
    get(key: string) {}

    hasLocaleToken() {}
    hasLocalisedProperty() {}

    get vse(): string;
    get contentId(): string;
    get snapshotId(): string;
    get iri(): string;
    get locale(): string;
  }
}

/**
 * Helpers to set up connections and a handler to react to content/version/locale
 * changes
 */
module "@dc-visualization-sdk/core" {
  class Visualization {
    connection: null | mc.ClientConnection;

    init(): Promise<mc.ClientConnection>;

    onModelChange(cb: (context: ModelObject) => void): dispose;

    getContext(): ContextObject;
  }
}

/**
 * For use with delivery SDK, it doesn't currently accept a HTTP client but we
 * could refactor to match management sdk
 */
module "@dc-visualization-sdk/http-client" {
  class HttpClient {
    request(config: HttpRequest): Promise<HttpResponse>;
  }
}
```

## Preview

I think vse ect should still be passed as url param as it allows the app to bootstrap with correct DynamicContent base url.

For preview to work it will supply a content item id and a vse domain, that you use to pass to delivery-sdk to fetch the correct content.

For this to work on vis-sdk could tell http-client lib to allow the request and no call the onModelChange handler and all should work perfectl.

i.e normally

-> load vis
-> mock http-client to return data from content form
-> set up handler for user to update their model

for preview

-> load preview
-> tell http-client to execute the request with the vse and content item id
-> dont have a event handler for model updates

    // enable helping passing correct delivery keys to different routes
    // may not be needed

we will need to make changes to message-event-channel to enable passing a window instead of a iframe to allow to pass data to the app but we were planning on making these changes for vis anyway.

## Example stacks

https://stackshare.io/zalando/zalando
https://stackshare.io/argos-technology/argos-technology
https://stackshare.io/gap/gaptech
https://stackshare.io/otto/otto

https://stackshare.io/alibaba-group/alibaba-travels
https://stackshare.io/boohoo-com/boohoo-com

https://awesometechstack.com/analysis/website/gamestop.de/

https://www2.moovweb.com/example-react-progressive-web-apps-ecommerce?mpId=17791176a4591-0ca59a98526aef-33647508-1aeaa0-17791176a468e5&_gl=1*1h9i92v*_ga*MTkxMDU1MDEzMS4xNjEyOTUyMjU5*_ga_ZYE452XVJ8*MTYxMzA0Njk2NS40LjAuMTYxMzA0Njk2OS41Ng..

Popular SSR

ASP.NET
Next.js
Nuxt.js
Ruby On Rails
Django
laravel
Spring

## Connection to websockets

```js
// client

if (process.env.NODE_ENV === "visualization") {
  const [visualization, websockets] = await Promise.all([
    import("@dc-visualization-sdk/core"),
  ]);

  const sdk = await visualization.create();
  const context = await visualization.getContext();

  sdk.onModelChange((model) =>
    fetch({
      url: "https://localhost:1234?",
      method: "POST",
      body: JSON.stringify({ model, context }),
    }).then((res) => {
      const html = res.json();
      document.innerHTML = html;
    })
  );
}

// server
const express = require("express");
const app = express();

app.post("/vis", (req) => {
  res.redirect("/", model);
});

app.get("/", async (req, res) => {
  const home = req.model ? model : await client.getContentItemByKey("home");

  //
  asdasdasd;

  sadasd;
  asdasdasd;

  asdasd;

  res.render("home", home);
});
```

## Redux

```ts
function authReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.todos.push(action.value);
  }
}

const rootReducer = combineReducers([
  authReducer,
  eventsReducer,

  visualizationReducer,
]);

import Visualization from "@dc-visualization-sdk/core";
import Store from "";
import dispatch from "redux";

function createVisualizationReducer(arrayOfActions) {
  const sdk = Visualization.create();

  sdk.onModelChange((model) => {
    arraryOfActions.forEach(([schema, callback]) => {
      if (item.schema === schema) {
        callback(dispatch, model);
      }
    });
  });
}

{
  title: {
    type: "string";
  }
  todos: {
    type: "array";
  }
}
const visualizationReducer = createVisualizationReducer([
  "http://todos.com",
  (dispatch, context) => {
    dispatch({
      type: "ADD_TODO",
      payload: context.todos,
    });
    dispatch({
      type: "ADD_TITLE",
      payload: context.title,
    });
  },
]);
```

```ts

// schema

{
    $id: "https://bigcontent.io/button",
    properties: {
        text: {
            type: "string"
        },
        type: {
            type: "enum",
            options: [
                "primary",
                "secondary"
            ]
        }
    }
}


// dc-visualization-sdk.config.js
import { MockFetch } from "@dc-visualization-sdk/requests/fetch"
import { ReactConnector } from "@dc-visualization-sdk/react-connector"

export default {
    include: ["./**/*.visualization.ts"],
    plugins: [
        new MockFetch(),
        new ReactConnector()
    ]
}

// button.component.js
import React from "react"

export default ({ text, type }) => (
    <button type={type}>{text}</button>
)

// button.visualization.js

import Button from "./button.component.js"

export default {
  name: 'button',
  component: context => (
      <Provider.Context value={context.locale}>
        <Button {...context.data} />
      </Provider.Context>
  ),

  // not required: sometimes you might want to wrap a vis in a component e.g you use material design and needs the wrapper comp to be styled correctly
  decorators: [
      (Visualization) => <div style={{ margin: '3em' }}><Visualization/></div>
  ]
}

// about.container.ts
import React from "react"
import client from "dc-delivery-sdk"


function useVisualization(onChange = noop) {
    if (process.env.NODE_ENV === 'visualization') {
        useEffect(() => {
            import("./visualizations").then(on => {
                on((context) => onChange(context))
            })
        }, [])
    }
}

function About() {
    const [content, setContent] = useState([]);
    const [joke, setJoke] = useState(null);

    useVisualization((context) => setContent(context.data))

    useEffect(() => {
        Promise.all([
          // we need to mock this for inital load
          client.getContentItem('content')
          fetch('https://official-joke-api.appspot.com/random_joke')
        ]).then(([content, jokes]) => {
           setContent(content)
           setJoke(jokes)
        })
    }, [])


    return (
        <>
            <Joke joke={joke}/>
            {content.map(article => <Article {...article}>)}
        </>
    );
}

export default  About
// about.visualization.js

import About from "./about.container.ts"

export default {
    name: 'about',
    component: About,
    requests: context => [
        // route the channel data to the request that would normally fetch it
        {
            url: 'https://c1-qa.adis.ws/cms/content/whatever',
            response: context.data
        },

        // not required: you don't need to mock all requests but lets say you don't want live reload to keep hitting an endpoint you could mock it here
        {
            url: 'https://official-joke-api.appspot.com/random_joke',
            response: {
                id: 337,
                type: "general",
                setup: "Why did the cowboy have a weiner dog?",
                punchline: "Somebody told him to get a long little doggy."
            }
        }
    ]
}

// package.json

{
    "scripts": "@dc-visualization-sdk/cli -o ./visualizations"
}

// this would output a website with routes for each vis
```

```python

// dc-visualization-sdk.config.js
import styles from 'styles/main.css'

import { HTMLConnector } from "@dc-visualization-sdk/react-connector"

export default {
    include: ["./**/*.visualization.js"],
    plugins: [
        new HTMLConnector({
            delimiter: '{{}}',
            global: {
               styles
            }
        })
    ]
}


// app/server
from app import app
from flask import render_template
import requests


app = Flask(__name__)


@app.route('/')
def home():
  response = requests.get("https://c1-qa.adis.ws/cms/content/whatever")

  return render_template('main.html', title="Home", content=response.data)

if __name__ == '__main__':
    app.run()

// app/templates/main.html

<!DOCTYPE html>

<html>
  <head>
    <title>Flask App - {{title}}</title>
  </head>

  <body>
    {{content}}
  </body>
</html>


// app.visualization.js

export default {
   name: 'home',
   component: (context, render) => render('main.html', context.data),
}
```
