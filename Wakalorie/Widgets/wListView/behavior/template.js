WAF.define('wListView/behavior/template', function() {
	/*globals Handlebars*/
	"use strict";
	var Template = function(html) {
		this.setHtml(html || 'no html specified');
	};

    function getVariables(statements, variables) {
        statements.forEach(function(node) {
            if (node.type === 'mustache' && variables.indexOf(node.id.string) === -1) {
                variables.push(node.id.string);
            } else if (node.type === 'block') {
                getVariables(node.program.statements, variables);

                if (node.inverse && node.inverse.statements) {
                    getVariables(node.inverse.statements, variables);
                }

                // add {{#if foo}} as variable too
                if (node.mustache && node.mustache.params.length) {
                    node.mustache.params.forEach(function(node) {
                        if (node.string && variables.indexOf(node.string) === -1) {
                            variables.push(node.string);
                        }
                    });
                }
            }
        });
    }

	Template.prototype = {
		setHtml: function(html) {
			this.html = html;
			this.template = Handlebars.compile(html);
		},
		// very simple render method for now, simply replaces elements
		render: function(data, domNode) {
            var text = '';

            text = this.template(data);

            if (domNode) {
                jQuery(domNode).html(text);
            }

            return text;
		},
        // get a list of variables found inside the template
        getVariables: function() {
            var variables = [],
                parser = Handlebars.parse(this.html);

            getVariables(parser.statements, variables);

            return variables;
        },
        setHelper: function(name, fn) {
            Handlebars.registerHelper(name, fn);
        },
        addPartial: function(name, html) {
            Handlebars.registerPartial(name, html);
        }
	};

    return Template;
});
