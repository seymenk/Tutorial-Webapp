const http = require("http");
const url = require("url");
const persistence = require("./models/persistence.js");

let server = http
  .createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    const queryParams = url.parse(req.url, true).query;

    if (queryParams.search) {
      console.log("Suchbegriff ", queryParams.search);
      let matchedTutorials = getTutorials(queryParams.search);
      if (matchedTutorials != 0) {
        res.end(getErfolgreichesHTML(queryParams.search, matchedTutorials));
      } else {
        res.end(getFehlgeschlagenesHTML(queryParams.search));
      }
    }
    else{
      res.end("Kein Suchbegriff angegeben.");
    }
  })
  .listen(8844, function () {
    console.log("Server gestartet und lauscht auf Port 8844");
  });

function getTutorials(name) {
  return persistence.tutorials.filter((tutorial) =>
    tutorial.name.includes(name)
  );
}

function getFehlgeschlagenesHTML(suchbegriff) {
  return `<!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Liste</title>
          <link rel="stylesheet" href="../v0/assets/css/styles.css" />
          <link rel="stylesheet" href="../v0/assets/css/forms.css" />
          <link rel="stylesheet" href="../v0/assets/css/flexbox.css" />
          <link rel="stylesheet" href="../v0/assets/css/tiles.css" />
          <script src="../v0/assets/js/script.js"></script>
          <script src="../v0/assets/js/burgermenu.js"></script>
        </head>
        <body>
          <header>
            <img src="../v0/assets/img/bild1.png" alt="Logo für die Web-Anwendung" />
            <h1>Tutorial-Übersicht</h1>
          </header>
          <nav>
            <a href="../v0/list.html">list.html</a>
            <a href="../v0/form.html">form.html</a>
            <a href="../v0/tutorial.html">tutorial.html</a>
            <a href="../v0/tutorials.html">tutorials.html</a>
          </nav>
          <main>
          <h2>Tutorials mit<: ${suchbegriff}</h2>
          <p>Keine Tutorials gefunden!</p>
          </main>
          <aside>
            <h3>Neue Tutorials</h3>
            <ul>
              <li>
                Node.js - Der schnelle Einstieg, 28.Sep.2025 - Dauer: 1Std 5 Min
              </li>
              <li>
                Node.js - Der schnelle Einstieg, 28.Sep.2025 - Dauer: 1Std 5 Min
              </li>
            </ul>
          </aside>
        </div>
        <footer><p>&copy; by WebTech Inc.</p></footer>
      </body>
    </html>`;
}

function getErfolgreichesHTML(suchbegriff, matchedTutorials) {
  return `<!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Liste</title>
          <link rel="stylesheet" href="../v0/assets/css/styles.css" />
          <link rel="stylesheet" href="../v0/assets/css/forms.css" />
          <link rel="stylesheet" href="../v0/assets/css/flexbox.css" />
          <link rel="stylesheet" href="../v0/assets/css/tiles.css" />
          <script src="../v0/assets/js/script.js"></script>
          <script src="../v0/assets/js/burgermenu.js"></script>
        </head>
        <body>
          <header>
            <img src="../v0/assets/img/bild1.png" alt="Logo für die Web-Anwendung" />
            <h1>Tutorial-Übersicht</h1>
          </header>
          <nav>
          <a href="../v0/list.html">list.html</a>
          <a href="../v0/form.html">form.html</a>
          <a href="../v0/tutorial.html">tutorial.html</a>
          <a href="../v0/tutorials.html">tutorials.html</a>
          </nav>
          <main>
          <h2>Tutorials mit: ${suchbegriff}</h2>
          <ul>${createTutorialListItems(matchedTutorials)}</ul>
          </main>
          <aside>
            <h3>Neue Tutorials</h3>
            <ul>
              <li>
                Node.js - Der schnelle Einstieg, 28.Sep.2025 - Dauer: 1Std 5 Min
              </li>
              <li>
                Node.js - Der schnelle Einstieg, 28.Sep.2025 - Dauer: 1Std 5 Min
              </li>
            </ul>
          </aside>
        </div>
        <footer><p>&copy; by WebTech Inc.</p></footer>
      </body>
    </html>`;
}

function createTutorialListItems(tutorials) {
  let result = "";
  for (tutorial of tutorials) {
    result += `<li>${tutorial.name} ${tutorial.datum}</li>`;
  }
  return result;
}
