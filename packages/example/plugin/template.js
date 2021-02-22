module.exports = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>

    <script src="https://unpkg.com/message-event-channel/dist/message-event-channel.umd.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.8.4/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.4/umd/react-dom.production.min.js"></script>

    <% styles.forEach(function(style){ %>
      <link rel="stylesheet" href="<%= style %>">
    <% }); %>
  </head>
  <body>
    <div id="root"></div>

    <script src="<%= src %>"></script>

    <script>
      const connection = new mc.ClientConnection();

      connection.init();
      connection.on("data", (content) => {
        ReactDOM.render(
          <window.Visualization.component {...content} />,
          document.getElementById("root")
        );
      });
    </script>
  </body>
</html>`;
