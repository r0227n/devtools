function sendToSlack(message, webhook) {
  var payload = JSON.stringify({text: message});

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'charset': 'utf-8',
    'payload': payload
  };

  UrlFetchApp.fetch(webhook, options);
}