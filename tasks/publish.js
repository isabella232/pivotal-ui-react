var argv = require('yargs').argv;
var gulp = require('gulp');
var npm = require('npm')
var path = require('path');

gulp.task('publish', function(){
  var component = argv.component;
  if(!component) {
    console.log('Usage: gulp publish --component=componentName');
    console.log('You must be logged in to npm');
    return;
  }
  console.log('Publishing', component);

  var packageDir = path.resolve(__dirname, '..', 'dist', component);
  var packageJson = require(path.join(packageDir, 'package.json'));

  npm.load({}, function(error) {
    if (error) {
      console.error(error);
      return;
    }

    npm.commands.publish([packageDir], function(error) {
      if (error) {
        console.error(error);
      }
      var owners = ['rdy', 'charleshansen', 'stubbornella', 'ial-ahmed', 'vinsonchuong'];
      (function next() {
        if (owners.length) {
          npm.commands.owner(['add', owners.pop(), packageJson.name], next);
        }
      })();
    });
  });
});