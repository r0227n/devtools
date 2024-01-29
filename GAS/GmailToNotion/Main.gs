function Main() {
  var accountNumber = PropertiesService.getScriptProperties().getProperty('ACCOUNT_NUMBER');

  var apiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');
  var databaseId = PropertiesService.getScriptProperties().getProperty('NOTION_DATABASE_ID');

  var messageWebhook = PropertiesService.getScriptProperties().getProperty('MESSAGE_SLACK_INCOMING_WEBHOOKS');
  var errorWebhook =  PropertiesService.getScriptProperties().getProperty('ERROR_SLACK_INCOMING_WEBHOOKS');
  
  var today = new Date();;
  var yesterday = getYesterday(today);
  var tomorrow = getTomorrow(today);

  var threads = [];

  try {
    // 実行日受信したメールを全取得
    threads = GmailApp.search('after:' + formatDate(yesterday) + ' before:' + formatDate(tomorrow));
    console.log(`I have received ${threads.length + 1} emails today`)
  } catch(e) {
    console.log(e);
    sendToSlack(e.stack, errorWebhook);
    throw e;
  }

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];

      // 件名取得
      var subject = message.getSubject(); 

      // 本文取得
      var htmlContent = message.getBody(); // HTMLが含まれる内容を取得する
      var body = convertHtmlToPlainText(htmlContent); // HTMLが含まれる文字列をプレーンテキストに変換

      // メールアドレス取得
      var sender = message.getFrom(); // 送信者の情報を取得
      var emailMatch = sender.match(/<(.+?)>/); // 正規表現を使ってメールアドレスを抽出
      var email = emailMatch ? emailMatch[1] : sender; // メールアドレスを抽出、または全送信者情報をそのまま使用

      // 受信時刻取得
      var receivedDate = message.getDate();

      // URL作成
      var messageId = message.getId(); // メールのIDを取得
      var emailUrl = `https://mail.google.com/mail/u/${accountNumber}/#inbox/${messageId}`;
      
      try {
        sendToNotion(
          apiKey,
          databaseId,
          subject,
          body,
          email,
          receivedDate,
          emailUrl,
          "📩"
        );
      } catch(e) {
        console.log(e);

        var slackMessage = `${subject} \n ${body} \n ${emailUrl}`;
        sendToSlack(slackMessage, messageWebhook);
        sendToSlack(e.stack, errorWebhook);
      }
    }
  }
}