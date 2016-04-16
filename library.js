var plugin = {};
var meta = module.parent.require('./meta');

var appId = meta.config['wechat-share:appId'];
var appSecret = meta.config['wechat-share:appSecret'];

var API = require('wechat-api');
var api = new API(appId, appSecret);

plugin.init = function (params, callback) {
    var app = params.router,
        middleware = params.middleware,
        controllers = params.controllers;

    app.get('/admin/wechat-share', middleware.admin.buildHeader, renderAdmin);
    app.get('/api/admin/wechat-share', renderAdmin);

    app.post('/api/wechat-sdk', function (req, res, next) {
        var url = req.body.url;
 
        var param = {
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            url: url
        };

        api.getJsConfig(param, function (err, result) {
            if (err) next(err);
            else {
                result.url = url;
                res.json(result);
            }
        });
    });

    callback();
};

plugin.addAdminNavigation = function (header, callback) {
    header.plugins.push({
        route: '/wechat-share',
        icon: 'fa-tint',
        name: 'Wechat Share'
    });

    callback(null, header);
};

plugin.resetAPI = function (obj) {
    if (obj.key == 'wechat-share:appId') {
        appId = obj.value;
    }

    if (obj.key == 'wechat-share:appSecret') {
        appSecret = obj.value;
    }

    if (appId && appSecret)
        api = new API(appId, appSecret);
};

function renderAdmin(req, res, next) {
    res.render('admin/wechat', {});
}

module.exports = plugin;