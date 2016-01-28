# Invotra Selenium Regression Suite

## Scripts
* generatesuite.sh is a script to make a suite.html from every .html file in a directory
* The cleanup.sh file will take a suite.html file and replace the subdomain for each of the tests
e.g. 
./cleanup.sh directory_where_suite.html subdomain_to_replace_with
* Golden Test Suite located 
/tests/suite.html

## Test Files
1. All test files should be saved with a .html suffix
2. Test files should not contain spaces, please use an underscore ‘_’ instead
3. Test files should all be named in lower case and should not contain capitals

## Top and tail every test
The first and last steps on selenium tests should always be the same (only if you need to log into the site at a point)-

* first steps: storing the admin username and password
* last step: logging out

## Directory Structure
```
invotra-test-scripts
│   
├───tests
│       Main test directory including golden suite
│       suite.html
│
├───automated-test-builder
│		An automatic test builder that can be used to spit out
│		ready made tests into compiled-tests, has its own README.md
│
└───compiled-tests
		The compiled tests that are created by the test builder.
		The directory structure mirrors the 'tests' directory
		These files are overwritten everytime you run the automated-test-builder
```

## Automated Test Compiler
See the [readme](/automated-test-builder) file in the directory.
