function convertHtmlToPlainText(html) {
  // HTMLタグを取り除く
  var plainText = html.replace(/<[^>]*>/g, '');

  // 連続する空白を1つの空白に変換
  plainText = plainText.replace(/\s+/g, ' ');

  // HTMLエンティティをデコードする（例: &amp; -> &）
  plainText = decodeHtmlEntities(plainText);

  return plainText;
}

function decodeHtmlEntities(text) {
  // 簡単なHTMLエンティティのデコード
  return text.replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
}