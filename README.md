jQuery-i18n Plugin
==================

The jquery-i18n plugin is responsible for looking up a looking up a value on in a locale specific translation file.

Whether its with in a specific element selector or the entire body element the jQuery-i18n plugin will load a translation file and find all children DOM elements that have a `data-i18n` attribute. Once an attribute is found it value will become the look up key in the translation file.  Depending on the element type it will then update the text value with the appropriate translation. 

All translation files are loaded as needed and you do not have include translation's the script tag in your html. This means we only load the requested translation file which means less network requests.

Options
-------

**missingText:** 
_Default: ''_

```
This is the text that will appear if the value is not found in the translation file.
```
**missingPlaceholder:** _Default: ''_
```
The default value to be shown in a placeholder if the value is not found
```

**path:** _Default: i18n_
```
This is the folder that contains the translations files
```

**baseFileName:** _Default: strings_
```
The base file name for all translation files.
```

**language:** _Default: en_us_
```
The language file to use.
```
Examples
--------

The language file file used is a concat of the path, baseFilename, and the languague. 

With the default setting the application will look up the file: i18n/strings_en_us.js. Defaults:
```javascript
$('body').i18n();
```

If you were to pass the language as ja_jp to the plugin it would then look up the values in i18n/strings_ja_jp.js.
```javascript
$('body').i18n( { language : 'ja_jp' } );
```

**Sample HTML**
```
<html>
<body>
    <div id="myId">
    	<span data-i18n="welcome"></span> <!-- Updates the span text with the welcome value from the translation file-->
        <input data-i18n="enter_name"> <!-- Updates the placeholder value with enter_name value fro from the translation file-->
	</div>
	<script src="path/to/jquery"></script>
	<script src="path/to/jquery.i18n.js"></script>
	<script>
		$('body').i18n();
	</script>
</body>
</html>
```

If you could even specify the div id `myId` instead of `body` to narrow down the DOM parsing.  You can even have another `div` with a different id and then have that div translated into different language. 


Translation file format
-----------------------

The file must be in the following format. 
Here we are showing a strings file that ends in en_us. The ending to the file must match the object name in the translation file.

```javascript
window.i18n.en_us = {
	welcome: 'Welcome in English', 
	enter_name: 'Enter Name'
}
```

**Note: ** The langauge value doesn't have to be en_us format, you could also just have en or anything else that makes sense to your application as long as there is a file that exists in the path pattern above.

Methods
-------

**getValue**
When called on the same element as the when its instantated your getValue call will return the value in that language.

**Example:**
```javascript
$('body').i18n('getValue', 'welcome') 
```

This will return the value for the `welcome` key or `undefined` if its not found.

Elements supported 
------------------

The following is a list of the HTML elements that are currently supported witht the with the `data-i18n` attribute

`A` 
Updates the title attribute

`IMG`
Updates the alt attribute

`INPUT` or `TEXTAREA`
Updates the placeholder attribute

`SPAN`, `DIV`, `P`
Updates the text value of that element. It recommended to use span for normal text.


