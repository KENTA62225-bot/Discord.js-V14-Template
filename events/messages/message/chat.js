const axios = require('axios');

module.exports = function (client, message, args) {
    if (message.content.startsWith('<@1021747490434842734>')){
        if (message.author.bot) return;

        const msg = message.content.replace('<@1021747490434842734>', '').trim();

        if (msg.length > 0) {

            let formdata = new FormData();
            //- apikeyパラメーター 
            formdata.append('apikey','DZZGMaMxMlvmJabAc3Rkpoy0pzIe2bia');
            //- コメント
            formdata.append('query',msg);

            fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
                method: 'post',
                body: formdata,
            }).then(response => {
                //- レスポンス取得
                response.json().then(data => {
                    //- 返答取得
                    const reply = data.results[0].reply;
                    //- 出力
                    message.reply(reply);
                });
            });
        } else {
            message.react('1084462558288826368')
        }
    };
}
