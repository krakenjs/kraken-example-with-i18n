# i18n-example

An example kraken 1.0 app with i18n.
The supported locales in the sample are

* en-US
* es-ES
* de-DE

To see it working with different locales:

```
Start the app:
$ node .

In your browser:

localhost:8000/setLocale/en-US
(or)
localhost:8000/setLocale/es-ES
(or)
localhost:8000/setLocale/de-DE

This will automatically set the locale and redirect to the index page in the right locale
```
###What does the sample app demonstrate ?
* [Setting up middleware-config to be invoked after cookie parser middleware is set up](https://github.com/krakenjs/kraken-examples/blob/master/i18n-example/config/middleware.json#L26)

* [Adding locale specific property files](https://github.com/krakenjs/kraken-examples/tree/master/i18n-example/locales)

* [Setting up middleware to populate locale for each request](https://github.com/krakenjs/kraken-examples/blob/master/i18n-example/lib/locale.js#L4)

* [Setting the locale in a cookie](https://github.com/krakenjs/kraken-examples/blob/master/i18n-example/controllers/index.js#L16)


