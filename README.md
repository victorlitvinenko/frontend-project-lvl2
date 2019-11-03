<h1 align="center">Gendiff</h1>
<p align="center">
<a href="https://travis-ci.org/victorlitvinenko/frontend-project-lvl2.svg?branch=master"><img src="https://travis-ci.org/victorlitvinenko/frontend-project-lvl2.svg?branch=master"></a>
<a href="https://codeclimate.com/github/victorlitvinenko/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/ca2ac9d4aebb1fff519e/maintainability" /></a>
<a href="https://codeclimate.com/github/victorlitvinenko/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/ca2ac9d4aebb1fff519e/test_coverage" /></a>
</p>

## Description
Gendiff is a command-line difference calculator.  
Compares two configuration files and shows a difference.

## Installation
```sudo npm install -g frontend-gendiff-lvl2```

## Usage
```gendiff [options] <pathToFile1> <pathToFile2>```

Options:  
`-V, --version` output the version number  
`-f, --format [type]` Output format  
`-h, --help` output usage information  

`[type]` - `plain`, `json`, `nested`  
`<pathToFile>` - path to json, yaml or ini configuration file

[![asciicast](https://asciinema.org/a/mDkLZm4HNMw9emKexJNvfSMHB.svg)](https://asciinema.org/a/mDkLZm4HNMw9emKexJNvfSMHB)
