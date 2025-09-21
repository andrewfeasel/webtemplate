## WebTemplate:
When you want to make a website, but you don't like boilerplate, WebTemplate is a pretty good idea.

## FAQ

### How does the server work?
I have decided to use JSON for hard-coded values that my server uses.
These hard-coded values can be found in config.json.

There is an array of "middlware" functions with the call signature
  ```(req: any, res: any): void```. This array is iterated over and its functions are called
before the main logic of the server.

### How do I add a new path so the server knows to send my file?
Add an object to config.json's "routes" object, with a schema identical to this:```
  "/": {
    "path": "./app/index.html",
    "type": "text/html"
  }```

### How to change the server's settings?
Change the properties of config.json's "settings" object.
