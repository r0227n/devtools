function getYesterday(date) {
  var yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1); // 現在の日付から1日引く
  return yesterday;
}

function getTomorrow(date) {
  
  var tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1); // 現在の日付に1日足す
  return tomorrow;
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy/MM/dd");
}