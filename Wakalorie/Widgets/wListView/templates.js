WAF.define('wListView/templates', function() {
    /*jshint multistr: true */
    "use strict";
    return {
        list: [
            {
                description: 'EMail List',
                className: 'emailList',
                template: '<li class="emailList{{#if isRead}} read{{/if}}">\
                                <date>\
                                    {{date}}\
                                </date>\
                                {{#if attachment}}\
                                    <span class="attachment">⚑</span>\
                                {{/if}}\
                                <img src="{{avatar}}" />\
                                <h3>{{email}}</h3>\
                                <button class="star">★</button>\
                                <p>\
                                    {{text}}\
                                </p>\
                                <span class="tag">\
                                    {{tag}}\
                                </span>\
                            </li>',
            },
            {
                description: 'Navigation',
                className: 'navList',
                template: '<li class="navList">\
                                <img class="thumb" class="thumb" src="{{avatar}}" />\
                                <a class="nav" href="#">&gt;</a>\
                                <strong>\
                                    {{name}}\
                                </strong>\
                                <p>\
                                    {{text}}\
                                </p>\
                           </li>'
            },
            {
                description: 'RSS Feed',
                className: 'rssList',
                template: '<li class="rssList">\
                                <p>\
                                    <img class="thumb" class="thumb" src="{{avatar}}" />\
                                    {{text}}\
                                </p>\
                                <div class="links">\
                                    <a href="#">\
                                        {{name}}\
                                    </a>\
                                    | 3 Comments |\
                                    {{date}}\
                                </div>\
                            </li>'
            },
            {
                description: 'Simple 1',
                className: 'simple1',
                template: '<li>{{name}}</li>'
            },
            {
                description: 'Simple 2',
                className: 'simple2',
                template: '<li class="{{class}}">\
                                {{name}}\
                            </li>'
            }
        ],
        defaultData: {
            items: [
                {
                    name: 'John Smith',
                    tag: 'cinema',
                    isRead: true,
                    date: 'Fri Mar 21 2014',
                    time: '12:40',
                    attachment: false,
                    avatar: 'data:image/jpeg;base64,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',
                    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    email: 'foo@bar.de'
                }
            ]
        }
    };
});
