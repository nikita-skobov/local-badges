# config tests

These tests are snapshot tests to ensure that a specific configuration file will output the same badge svg every time. It's basically testing the whole badge generating process from start to finish.

To add a configTest, simply add a config file to this directory. The config.test.js file will use the following command on all of the config files in this directory:

```sh
node bin/local-badges.js --config configTests/${YOUR_FILE_NAME}
```

Your config file should output all badges to:
```js
module.exports = {
  badges: [
    {
      // other properties...
      folder: './configTests/temp/',
    }
  ],
}
```

The config.test.js file will then generate a snapshot of all files within the temp directory, test the snapshot, and then delete the temp directory before moving on to the next config file.

Before running the config.test.js file, you should test your config file with the above command and look at the output badges manually to see if they look the way you want. If so, then run the config test to add your configuration to the snapshot file. That way every time tests are ran, we will know that the config files generate the badges correctly.
