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

## Examples

### Flat JSON
before.json:
```{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}```

after.json:
```{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}```

[![asciicast](https://asciinema.org/a/YrgRVpjeftgSvvuo0a7E1Zt1s.svg)](https://asciinema.org/a/YrgRVpjeftgSvvuo0a7E1Zt1s)

### Flat YAML
before.yml:
```host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false```

after.yml:
```timeout: 20
verbose: true
host: hexlet.io```

[![asciicast](https://asciinema.org/a/MpvpP3ssquBK1BkZAUTc5zl9Y.svg)](https://asciinema.org/a/MpvpP3ssquBK1BkZAUTc5zl9Y)

### Flat ini
### Flat YAML
before.ini:
```host=hexlet.io
timeout=50
proxy=123.234.53.22
follow=false```

after.ini:
```timeout=20
verbose=true
host=hexlet.io```

[![asciicast](https://asciinema.org/a/D0g7nN1rs7Rt3BCLu0R4PPAqW.svg)](https://asciinema.org/a/D0g7nN1rs7Rt3BCLu0R4PPAqW)

### Multi-level JSON
before.json
```{
  "common": {
    "setting1": "Value 1",
    "setting2": "200",
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": "12345"
  }
}```

after.json
```{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": "100500"
  }
}```

[![asciicast](https://asciinema.org/a/Cjgt51o2W9PjC9SvdmxfCzwfc.svg)](https://asciinema.org/a/Cjgt51o2W9PjC9SvdmxfCzwfc)

### Plain format
[![asciicast](https://asciinema.org/a/mDb0dOV2JyeplfbvWYywrpA7W.svg)](https://asciinema.org/a/mDb0dOV2JyeplfbvWYywrpA7W)

### JSON format
[![asciicast](https://asciinema.org/a/0cRPKNZ448rChVY6hd7GiuzWJ.svg)](https://asciinema.org/a/0cRPKNZ448rChVY6hd7GiuzWJ)
