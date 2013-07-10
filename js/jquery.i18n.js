/**
 * jQuery Localization - i18n
 * Version: 0.2
 * URL: http://www.terrymooreii.com/localization
 * Description: Client side javascript localization
 * Requires: jquery 
 * Author: Terry Moore II 
 * Copyright: Copyright 2013 Terry Moore
 * License: MIT
 */


;(function($, document, window, undefined) {
    "use strict";

    var pluginName = 'i18n';

    // Default options for the plugin as a simple object
    var defaults = {
        missingText:'<missing>',
        missingPlaceholder:'', 
        displayErrorMessage:true,
        path:'i18n',
        baseFilename: 'strings',
        language: 'en_us'
    };

    // Plugin constructor
    // This is the boilerplate to set up the plugin to keep our actual logic in one place
    function Plugin(element, options) {
        this.element = element;
        
        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        //kick it off
        this.init();
    }

    Plugin.prototype = {
      
        init: function() {
            if (!window.i18n)
            	window.i18n = {};

        	if(!window.i18n[this.options.language])
            	loadLocaleFile(this.options.path + '/' + this.options.baseFilename + '_' + this.options.language + '.js');

            parseDOM(this.$el, window.i18n[this.options.language], this.options);
        },

        getValue: function(key){
        	var l = window.i18n[this.options.language];
        	return l[key];
        }
    };

	// Private function that is only called by the plugin
    var loadLocaleFile = function(filename) {
     	var script=document.createElement('script')
	  	script.setAttribute("type","text/javascript")
	  	script.setAttribute("src", filename);
	  	$('body').append(script);   
     };

     var parseDOM = function(element, translation, options){
     	element.find('[data-'+pluginName+']').each(function () {   
            var $this = $(this);
            var attr = $this.attr('data-' + pluginName);
            var tag = this;
            var text = translation[attr] || options.missingPlaceholder; 
            
            if (tag.tagName.toUpperCase() === 'INPUT' || tag.tagName.toUpperCase() === 'TEXTAREA'){
                $this.attr('placeholder', text);    
            }else if(tag.tagName.toUpperCase() === 'IMG'){
                $this.attr('alt', text);  
            }else if(tag.tagName.toUpperCase() === 'A'){
                $this.attr('title', text);        
            }else{
                $this.text(text === '' ? options.missingText : text);
            }    
        });
     };

	$.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
	            // prevent multiple instantiations
	            if (!$.data(this, 'plugin_' + pluginName)) {
	                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
	            }
        	});
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };









    

})(jQuery, document, window);	