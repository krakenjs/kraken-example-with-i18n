# Kraken example with.i18n

An example kraken 1.0 app with i18n (internationalization).

# What is i18n/internationalization

Internationalization is the designing and re-engineering of a product so that it can be localized easily for global markets.
In the context of kraken-1.0, including i18n would mean, to optionally decorate an express app to consume pre-localized templates (production mode), or localize templates on-the-fly (dev mode).
By adding the appropriate i18n and view engine configs for your kraken 1.0 app, content bundles will be automatically loaded from a specific location and templates that require translation will get localized.
Currently i18n is only supported for dustjs templates.

# What does the example demonstrate ?

The sample app demonstrates how to enable i18n in your app. It has simple support for localization in 3 different languages.

* `en-US`
* `es-ES`
* `de-DE`

# How to setup the app with i18n from scratch by using generator-kraken ?

### Create a simple scaffolded app using generator-kraken

* Install Generator
```
$ npm install -g generator-kraken

```

* Create an app using the generator

```
$ yo kraken

     ,'""`.
hh  / _  _ \
    |(@)(@)|   Release the Kraken!
    )  __  (
   /,'))((`.\
  (( ((  )) ))
   `\ `)(' /'

Tell me a bit about your application:

[?] Name: foo
[?] Description: bar
[?] Author: foobar
[?] Template library? Dust
[?] CSS preprocessor library? LESS
[?] JavaScript library? None

```

### Setting up the right configs for i18n in the app

* Check the config/config.json file. You must see the following config for i18n.

```
"i18n": {
    "contentPath": "path:./locales",
    "fallback": "en-US"
}
```

`contentPath` refers to the default path where the localization files reside, `fallback` is the default locale in case there is no specific locale for a request.

* Check the view engines setup. You must see the following config for view engines.

```
"view engines": {
     "js": {
         "module": "engine-munger",
         "renderer": {
             "method": "js",
             "arguments": [
                 { "cache": true },
                 {
                     "views": "config:express.views",
                     "view engine": "config:express.view engine",
                     "i18n": "config:i18n"
                 }
             ]
         }
     }
}
```
The above config tells the express app to use the function returned by the method `js` provided by the module `engine-munger`,  as its engine function. `arguments` array gets passed while invoking `js`.
`engine-munger` module helps add i18n into the render work-flow for your views. You can read more about `engine-munger` [here](https://github.com/krakenjs/engine-munger).

Similarly in your development.json, make sure you have a config like the following:

```
"view engines": {
    "dust": {
        "module": "engine-munger",
        "renderer": {
            "method": "dust",
            "arguments": [
                { "cache": false },
                {
                    "views": "config:express.views",
                    "view engine": "config:express.view engine",
                    "i18n": "config:i18n"
                }
            ]
        }
    }
}
```

### Localizing your templates

Lets demo adding a greeting and message localization in your index.dust

* Adding `@pre` tags to your `index.dust` to specify what to translate in your view.

```
{<body}
    <h1>{@pre type="content" key="greeting"/}</h1>
    <h4>{@pre type="content" key="message"/}</h4>
{/body}
```

* Adding localization aka `.properties` files

In kraken 1.0 projects, the localized files have the extension `.properties` and translations are expressed as simple key value pairs, eg.`foo=bar`.
To demonstrate greeting and message translation for your index.dust for three different locales: `en-US`, `es-ES` and `de-DE`:

* create `locales/US/en/index.properties` and add:

```
greeting=Hello, {name}!
message=Time is precious...
```

* create `locales/ES/es/index.properties` and add:

```
greeting=Hola, {name}!
message=El tiempo es precioso...
```

* create `locales/DE/de/index.properties` and add:

```
greeting=Hallo, {name}!
message=Zeit ist kostbar...
```
You may have already noticed that we add the `.properies` files to `locales/` folder because we set the `contentPath` in the i18n config above as `locales/`.

### Checking the default locale translation in your app

Now when you start the app by doing `$ node .` and point your browser to `localhost:8000` you will see `index.dust` rendered in the fallback locale `en-US` per our `i18n` config.

### Adding a hook to set the locale on the fly

* In your `routes.js` add the following route and controller code

```
router.get('/setLocale/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/');
});
```


* In your `config.json` add the following for setting the locale in the `res.locals`of your express app by reading it from cookie.
```
"locale": {
    "priority": 95,
    "enabled": true,
    "module": {
        "name": "path:./lib/locale"
    }
}
```

The reason above middleware has a priority of `95` is it needs to happen after the cookie parse middleware has executed ([which inside kraken-js has a priority of `90`](https://github.com/krakenjs/kraken-js/blob/master/config/config.json#L90).)

* Set up the middleware in the path specified in the above config to read locale from cookie, and setting it in the res.locals. So add the file `lib/locale.js` and the following snippet into the file:

```
'use strict';
module.exports = function () {
    return function (req, res, next) {
        var locale = req.cookies && req.cookies.locale;
        //Set the locality for this response. The template will pick the appropriate bundle
        res.locals.context = {
            locality: locale
        };
        next();
    };
};
````

That is it!!! You are done!

## Installation of this demo

Clone, install and run.

```shell
git clone git@github.com:krakenjs/kraken-example-with-i18n.git
cd kraken-examples-with-i18n
npm install
npm start
```

### See it working with different locales:

In your browser, visit [`http://localhost:8000/setLocale/en-US`](http://localhost:8000/setLocale/en-US) or [`http://localhost:8000/setLocale/es-ES`](http://localhost:8000/setLocale/es-ES) or [`http://localhost:8000/setLocale/de-DE`](http://localhost:8000/setLocale/de-DE)

This will automatically set the locale and redirect to the index page in the right locale.

Now if you would like to see it work in `production` mode with compiled templates:

```shell
grunt build
NODE_ENV=production node .
```

And repeat 1 and 2.
