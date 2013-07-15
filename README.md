jQuery-i18n Plug-in
==================

The jquery-i18n plug-in is responsible for loading a translation dictionary file, parsing the DOM looking for a `data-i18n` attribute, and then updating the text with the translated value.

Whether its with in a specific element selector or the entire body element the jQuery-i18n plug-in will load a translation file and find all children DOM elements that have a `data-i18n` attribute. Once an attribute is found its value will become the look up key in the translation file.  Depending on the element type it will then update the text value with the appropriate translation. 

All translation files are loaded as needed and you do not have include translation dictionary in a the `script` tag in your HTML. This means we only load appropriately requested translation file which means less network requests.

Options
-------



**path:** _Default: i18n_
```
The folder that contains the translations files
```

**baseFilename:** _Default: strings_
```
The base file name for all translation files.
```

**language:** _Default: en_us_
```
The language to use.
```

**missing:** 
```
An object that contains the default values that will be displayed if we are not able to locate the `data-i18n` key in the translation file.
{
	title: '', // For A tags
	alt: '', //For IMG tags
	placeholder: '', //For INPUT/TEXTAREA tags
	text: '' // For SPAN, DIV, LABEL, P, etc tags
}
```

The language file used is a concatenation of the path, baseFilename, and the language. 



Examples
--------

With the default setting, the application will load and use this translation file: i18n/strings_en_us.js.
```javascript
$('body').i18n();
```

If you were to pass the language as ja_jp, the plug-in would then load and use the values from this file i18n/strings_ja_jp.js.
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

You can even specify the div id `myId` instead of `body` to narrow down DOM parsing.  You can even multiple `div` with a different ids and then have those div translated into different language. 


Translation file format
-----------------------

The file must be in the following format. 
Here we are showing a strings file that ends in `en_us`. The ending to the file must match the object name in the translation file.

```javascript
window.i18n.en_us = {
	welcome: 'Welcome in English', 
	enter_name: 'Enter Name'
}
```

**Note:** The language value doesn't have to be a language_country format, you could specify and format that makes sense to your application as long as there is a file that exists in the path pattern above and it matches the window.i18n.`ending` format.

Methods
-------

**getValue**
When called on the same element that was used to instantiated the plug-in the return value of getValue will be the translated value in that language.

**Example:**
```javascript
$('body').i18n('getValue', 'welcome') //returns: Welcome in English
```
```javascript
$('body').i18n('getValue', 'doesntExist') //returns: undefined
```

**destroy**
Removes the translations.  Call this before reapplying new translations.

```javascript
$('body').i18n('destroy');
```

Elements supported 
------------------

Below is a list of the HTML elements that are currently supported with the with the `data-i18n` attribute

`A` 
Updates the title attribute

`IMG`
Updates the alt attribute

`INPUT` or `TEXTAREA`
Updates the placeholder attribute

`SPAN`, `DIV`, `P`, `LABEL`
Updates the text value of that element.  Does a `$(el).text('new value');` It recommended to use span for normal text.


