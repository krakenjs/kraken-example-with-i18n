# Kraken example with.i18n

An example kraken 1.0 app with i18n.

The supported locales in the sample are

* `en-US`
* `es-ES`
* `de-DE`

To see it working with different locales, in the shell, run

```
$ npm install
$ npm start
```

Then in your browser, visit [`http://localhost:8000/setLocale/en-US`](http://localhost:8000/setLocale/en-US) or [`http://localhost:8000/setLocale/es-ES`](http://localhost:8000/setLocale/es-ES) or [`http://localhost:8000/setLocale/de-DE`](http://localhost:8000/setLocale/de-DE)

This will automatically set the locale and redirect to the index page in the right locale.

###What does the sample app demonstrate ?

* [Adding locale specific property files](locales)

* [Setting up middleware to populate locale for each request](lib/locale.js#L4)

* [Setting the locale in a cookie](controllers/index.js#L16)


