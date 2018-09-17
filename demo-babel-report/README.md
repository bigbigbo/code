## Report

In this scenario, errors will be reported.

package.json
```json
"devDependencies": {
  "@babel/preset-env": "^7.0.0" // ^7.0.0-rc.2 run well
}
```

.babelrc
```json
{
  ...
  "plugins": [
    [
      "@babel/transform-runtime",
      {
        "helpers": false // or remove it and run well
      }
    ]
}
```

## Solution

set `@babel/preset-env^7.0.0-rc.2` or remove `helpers: false`, it can run well.
