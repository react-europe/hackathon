jasmine.VERBOSE = true;

require('jasmine-reporters');
var fs = require('fs');

if (!fs.existsSync('testresults')) {
  fs.mkdirSync('testresults');
}

var reporter = new jasmine.JUnitXmlReporter("testresults/");
jasmine.getEnv().addReporter(reporter);
