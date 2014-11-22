(function(wListView) {
    /*jshint multistr: true, devel: true*/
    "use strict";
    var studioTemplate = WAF.require('wListView/studio-template'),
        options = [];

    // Keep WAK8 compatibility
    wListView._studioOn = wListView._studioOn || wListView.on;
    wListView._addAttribute = wListView._addAttribute || wListView.addAttribute;

    wListView._studioOn('Create', function(tag) {
        var templateNum = tag.getAttribute('data-template').getValue(),
            existingBinding = tag.getAttribute('data-variables-binding').getValue(),
            optionsToUpdate = tag.getAttributeOptions('data-variables-binding', 1),
            templateInfo = studioTemplate.parseTemplate(tag.getWidget()._templates.list[templateNum].template, optionsToUpdate, tag.getWidget()._templates.defaultData),
            todo = false,
            bindingHistory = {};         // we'll hold binding history there

        if (existingBinding.length) {
            bindingHistory[templateNum] = existingBinding;
            bindingHistory.previousTemplate = templateNum;
        }

        tag.getWidget()._bindingHistory = bindingHistory;

        // fullsize
        setTimeout(function() {
            tag.fitToParent(true);
        }, 0);

        // populate options with the list of templates
        if (!options.length) {
            tag.getWidget()._templates.list.forEach(function(template, i) {
                options.push({
                    key: i.toString(),
                    value: template.description
                });
            });
        }

        // we only need to parse the template on the first creation of the widget (or when the template is changed, but this is done elsewhere)
        try{
            existingBinding = JSON.parse(existingBinding);
            if (existingBinding.length === 0) {
                todo = true;
            }
        } catch(e) {
            todo = true;
        }

        studioTemplate.updateAttributesList(tag, tag.getAttribute('data-collection').getValue());

        // set default binding
        if (todo === true) {
            studioTemplate.setVariablesBinding(tag, templateInfo.variables);
        }

        // set html with some default data
        studioTemplate.setDesignerHtml(tag, templateInfo.defaultText);
    });

    // remove default data from the final html file
    wListView._studioOn('Save', function() {
        var node = this && this.getElementNode() || null;

        if (node && node._json.childNodes) {
            node._json.childNodes.length = 0;
        }
    });

    // add Template list
    //
    wListView._addAttribute({
        name: 'data-template',
        type: 'dropdown',
        options: options,
        defaultValue: '0',
        /**** This will be simplified in the next version ****/
        onchange: function(e) {
            var tag = this.data.tag,
                bindingHistory = tag.getWidget()._bindingHistory,
                oldId = bindingHistory.previousTemplate,
                selectedId = this.data.value;

            // get previous value ?

            // save previous binding
            bindingHistory[oldId] = tag.getAttribute('data-variables-binding').getValue();

            studioTemplate.setVariablesBinding(tag, tag.getAttributeOptions('data-variables-binding', 1), bindingHistory[selectedId] || undefined);

            bindingHistory.previousTemplate = selectedId;
        }
    });

    wListView._addAttribute({
        name: 'data-variables-binding',
        description: 'Template Variables',
        type: 'grid',
        defaultValue: '[]',
        reloadOnChange: true,
        columns: [
            {
                title: 'Variable Name',
                name: 'variable',
                type: 'textfield',
                disabled: true
            },
            {
                title: 'Attribute',
                name: 'attribute',
                type: 'dropdown',
                options: [""]
            }
        ],
        canDeleteRow: function() {
            return false;
        },
        afterReady: function() {
            // TODO: parse template
            $('#waform-form-gridmanager-template-variables .actions button').hide();
        }
    });

    wListView._addAttribute('data-collection', {
        typeValue: 'datasource',
        type: 'datasource',
        onchange: function() {
            studioTemplate.DSChanged(this.data.tag, this.getValue());
        }
    });

    // since the onchange event is only sent on form change, we have to listen on DSDrop too
    wListView._studioOn('DSDrop', function(data) {
        var collectionName = data.source.getName(),
            tag = this._tag;

        studioTemplate.DSChanged(tag, collectionName);
    });

    // events
    wListView.addEvent({
        'name': 'rowHold',
        'description': 'Sent upon tap hold on a row'
    });

    wListView.addEvent({
        'name': 'rowSwapLeft',
        'description': 'Sent upon left swipe on a row'
    });

    wListView.addEvent({
        'name': 'rowSwapRight',
        'description': 'Sent upon right swipe on a row'
    });

    wListView.addEvent({
        'name': 'listUpdate',
        'description': 'Sent upon collection change'
    });

    /* Hide not needed options from the user */
    wListView.customizeProperty('start', {
        sourceDisplay: false
    });

    wListView.customizeProperty('currentPage', {
        sourceDisplay: false,
        display: false
    });

    wListView.customizeProperty('pageSize', {
        sourceDisplay: false
    });

    wListView.customizeProperty('navigationMode', {
        sourceDisplay: false,
        display: false
    });

    wListView.customizeProperty('start', {
        display: false
    });
});
