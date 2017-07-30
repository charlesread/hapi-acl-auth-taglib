# hapi-acl-auth-taglib

Taglib for Marko to be used in concert with [`hapi-acl-auth`](https://www.npmjs.com/package/hapi-acl-auth), or not.  If you have an array of roles that a user possesses, and an array of roles the are necessary, you can use this taglib.
 
## Installation

```bash
npm install --save hapi-acl-auth-taglib
```

## Tags

### `<haa:if>`

#### Attributes

##### `userRoles`

Required.  An array of roles that the user possesses.

##### `roles`

An array of roles required by the user needed to display the body of the tag.

##### `mode`

A string.  Can be `any` or `all`, `any` by default.  If `any` is specified the body will be rendered if the user has any of the roles listed in `roles`.  If `all` the specified body will only be rendered if the user has _all_ of the roles in `roles`

##### `not`

An array of roles.  The body of the tag will only be displayed if the user does _not_ have one of the roles specified here.

#### Example

#### server.js

```js
'use strict'

// allowing Marko template requires
require('marko/node-require')
require('marko/compiler').defaultOptions.writeToDisk = false

const Hapi = require('hapi')

const server = new Hapi.Server()

const plugins = [
  {
    register: require('hapi-auth-basic')
  },
  {
    register: require('hapi-acl-auth'),
    options: {
      handler: function (request, callback) {
        // callback(err, obj) takes an error object and an arbitrary object, although
        // this object must contain a `roles` attribute that contains an array of
        // roles, or a function that returns an array of roles or returns a promise
        // that resolves an array of roles, that are possessed by the user
        callback(null, request.auth.credentials)
      }
    }
  }
]

const validateFunc = function (request, username, password, callback) {
  callback(null, true, {id: username, username: username, roles: ['admin']})
}

server.connection({
  host: 'localhost',
  port: 8000
})

server.register(
  plugins,
  function (err) {
    if (err) {
      throw err
    }
    server.auth.strategy('simple', 'basic', {validateFunc: validateFunc})
    server.route({
      method: 'GET',
      path: '/',
      config: {
        auth: 'simple',
        plugins: {
          hapiAclAuth: {
            roles: ['user', 'admin']
          }
        }
      },
      handler: function (request, reply) {
        const page = require('./index.marko')
        return reply(page.stream(
          {
            userRoles: request.auth.credentials.roles
          }
        ))
      }
    })


    server.start((err) => {
      if (err) {
        throw err
      }
      console.log('Server running at:', server.info.uri)
    })

  }
)
```

#### index.marko

```html
<html>
<head>
    <title>
        /
    </title>
</head>
<body>
<h1>
    /
</h1>
<haa:if roles=['admin'] userRoles=input.userRoles>
    some content
</haa:if>
</body>
</html>
```