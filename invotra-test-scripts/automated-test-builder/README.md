# Automated Selenium Test Builder

This builder uses [Grunt](http://gruntjs.com/) and the [Assemble](http://assemble.io/) package.
It takes a bunch of partial xml files and assembles them into ready made tests in the [compiled-tests](../compiled-tests) folder.

## Installation & Setup
1. `npm install`
2. `grunt`
3. Load a test in selenium ide

## Benefits
* write once recompile for multiple authors (scalable)
* fix in one place to fix them all (maintainable)
* still fixable in just the compiled html files (backwards compatible)

## File Structure of note
```
automated-test-builder
│	Gruntfile.js  :  instructions on how to compile each template.  
│
└──test-templates
   	│   
	├───meta_test_templates
	│       these are the layouts that partials are iteratively injected into.
	│
	├───general_includes
	│		These are non-specific partials like 'variables' file	
	├───users
	├───content
	├───taxonomy
```

## Variables 
The following are global variables that you may find in the layouts or partials (more documentation is needed)
```
url
title
user
Publisher/Author/Editor/Webmaster
userCantDelete
```

##Tasks
* discussion topic on discussion
* general topic on everything else