/// [apiKey]: Notion API Integration Your Key https://www.notion.so/my-integrations
/// [databaseId]: Your Notion's Database ID
/// [title]: Insert Title properties properties elements.
/// [body]: Insert RichText properties into children elements
/// [email] Insert Email properties into properties elements.
/// [receivedDate]: Insert Date properties into properties elements.
/// [url]: Insert URL properties into properties elements.
/// [icon]: Insert emoji properties into icon elements.

function sendToNotion(
  apiKey,
  databaseId,
  title,
  body,
  email,
  receivedDate,
  url,
  icon,
) {
  var endpoint = 'https://api.notion.com/v1/pages';
  var payload = {
    "parent": {
      "database_id": databaseId
    },
    "icon": {
      "emoji": icon
    },
    "properties": {
      "Title": {
        "title": [
          {
            "text": {
              "content": title
            }
          }
        ]
      },
      "Received Date": {
        "type": "date",
        "date": {
          "start": receivedDate.toISOString(),
          "end": null,
          "time_zone": "Asia/Tokyo"
        }
      },
      "URL": {
        "type": "url",
        "url": url
      },
      "Email": {
        "type": "email",
        "email": email
      },
      "Status": {
        "status": {
          "name": "Not started"
        }
      }
    },
    "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": body
              }
            }
          ]
        }
      }
    ]
  };
  var options = {
    "method" : "post",
    "headers": {
      "Authorization": `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    "payload" : JSON.stringify(payload)
  };
  UrlFetchApp.fetch(endpoint, options);
}
