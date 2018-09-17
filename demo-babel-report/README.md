## Report

In this scenario, errors will be reported.

package.json
```json
"devDependencies": {
  "@babel/preset-env": "^7.0.0"
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
        "helpers": false 
      }
    ]
}
```

## Solution
Both of the following methods can solve the problem

- set `@babel/preset-env^7.0.0-rc.2`
- remove `helpers: false`
  .babelrc
  ```json
  {
    "plugins": ["@babel/transform-runtime"]
  }
  ```
