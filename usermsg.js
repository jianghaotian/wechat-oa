const titbit = require('titbit');
const crypto = require('crypto');
const parsexml = require('xml2js').parseString;
const wxmsg = require('./weixinmsg');

var app = new titbit();

var {router} = app;

//公众号开发者配置验证并启用后，会通过POST请求转发用户消息。
router.post('/api/wx/oa/msg', async c => {
    try {
        var xmlmsg = await new Promise((rv, rj) => {
            parsexml(c.body, {explicitArray : false}, (err, result) => {
                if (err) {
                    rj(err);
                } else {
                    rv(result.xml);
                }
            });
        });
        var data = {
            touser      : xmlmsg.FromUserName,
            fromuser    : xmlmsg.ToUserName,
            msg         : xmlmsg.Content,
            msgtime     : parseInt(Date.now() / 1000),
            msgtype     : ''
        };

        c.res.body = wxmsg.msgDispatch(xmlmsg, data);
    } catch (err) {
        console.log(err);
    }

});

app.run(55555, 'localhost');
