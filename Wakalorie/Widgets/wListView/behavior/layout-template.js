WAF.define(
'wListView/behavior/layout-template',
[
    'waf-core/behavior',
    'waf-core/event',
    'waf-core/error',
    'wListView/behavior/template'
],
function(Behavior, Event, WakError, Template) {
    "use strict";

    var tplBehavior = Behavior.create();

    // extend behavior with needed methods
    WAF.extend(tplBehavior.prototype, {
        _initBehavior: function() {
            this._hooks = {};
            this.mapping = null;
        },
        setTemplate: function(handlebarTpl) {
            if (typeof handlebarTpl !== undefined) {
                this._template = new Template(handlebarTpl, true);
                this._templateCache = '';
            }

            return this._template || null;
        },
        resetTemplateCache: function() {
            this._templateCache = '';
        },
        setHook: function(hookName, fn) {
            this._hooks[hookName] = fn;
        },
        setVarAttributeMapping: function(variables) {
            var hooks = this._hooks,
                hook = null,
                that = this;

            this.mapping = variables;
        },
        renderTemplate: function(data, appendContent) {
            var mappedData = {};

            this.mapping.forEach(function(map) {
                if (data[map.attribute] && data[map.attribute].__deferred && data[map.attribute].__deferred.image === true) {
                    mappedData[map.variable] = data[map.attribute].__deferred.uri;
                } else {
                    mappedData[map.variable] = data[map.attribute];
                }
            });

            if (appendContent === true) {
                this._templateCache += this._template.render(mappedData);
            } else {
                this._templateCache = this._template.render(mappedData);
            }

            return this._templateCache;
        },
        updateDom: function(appendContent) {
            if (appendContent === true) {
                $(this.node).append(this._templateCache);

            } else {
                $(this.node).html(this._templateCache);
            }
        }
    });

    return tplBehavior;
});
