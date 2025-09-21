## WebTemplate:
When you want to make a website, but you don't like boilerplate, WebTemplate is a pretty good idea.

## FAQ

### How does the server work?
I have decided to use JSON for hard-coded values that my server uses. There are two uses of this: 
The first thing is to map requests to responses, and the second is to control headers that are sent to the client.

I have also decided to make a "module" for my server, so that the server can be directly edited more easily.
The most obvious application of editing the server directly is to suit your app's needs, and now it is easier to do that.
You can decide which functions to include, which to use, etc. You can also add new functions,
and if you don't like mine, feel free to delete them, or tell me about it so I can make better functions.

I have decided to create an array of "middlewares" that have the call signature of
  (req: any, res: any): void
These functions are called before the main server logic, promoting modularity.

### How do I add a new path so the server knows to send my file?
If you do not add a new request/response pair to the "routes" property of config.json,
your file will not be sent by the server. You can "fix" this problem by opening your favorite text editor,
and adding a new property to the "routes" object.
An example would be this:
  "/": {
    "path": "./app/index.html",
    "type": "text/html"
  }
The above object translates to "When the client requests '/', send the file './app/index.html' with type 'text/html'".
That's pretty much how it works.

### How to change the server's settings?
Other than changing the server's code, you can edit the settings in config.json,
by changing the properties of "settings" to different values.
