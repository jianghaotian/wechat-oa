const formatMsg = require('./fmtwxmsg');

function userMsg(wxmsg, retmsg) {
    if (wxmsg.MsgType == 'event') {
        if (wxmsg.Event == 'subscribe') {
            retmsg.msg = '欢迎关注';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }
    } else if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'who') {
            retmsg.msg = '姓名：姜皓天\n学号：2017011765';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

