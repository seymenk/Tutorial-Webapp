const express = require("express");
const router = express.Router();
const persistence = require("../models/persistence");

router.get("/", function (req, res) {
  // [TODO]
  // Implementieren: Liste der Kategorien anzeigen
  res.render("list", { categories: persistence.kategorien });
});

router.get("/tutorials", function (req, res) {
  // [TODO]
  // Implementieren: Tutorials zur gegebenen Kategorie anzeigen
  // (Kategorie als Anfrage/Query-Parameter gegeben,
  // Zugriff erfolgt mit: req.query.category)
  let category = req.query.category;
  res.render("tutorials", {
    tutorials: persistence.getTutorialsZuKategorie(category),
  });
});

router.get("/tutorial", function (req, res) {
  // [TODO]
  // Implementieren: Details zum Tutorial mit gegebenem Namen anzeigen
  // (Name als Anfrage/Query-Parameter gegeben,
  // Zugriff erfolgt mit: req.query.name)
  let name = req.query.name;
  let tutorial = persistence.tutorials.find(tutorial => tutorial.name === name);

  res.render("tutorial", { tutorial:  tutorial, getDauerInStundenUndMinuten: persistence.getDauerInStundenUndMinuten});
});

router.get("/form", function (req, res) {
  // [TODO]
  // Implementieren: Formular zum Hinzufügen eines neuen Tutorials anzeigen
  res.render("form");
});

router.post("/form", function (req, res) {
  // [TODO]
  // Implementieren: Hinzufügen eines neuen Tutorials, danach Weiterleitung nach "/"
  const tutorialData = req.body;

  // Konvertiere die Kategorien in ein Array und trimme jeden Eintrag
  const kategorieNamen = tutorialData.categories.split(',').map(catName => catName.trim());

  // Überprüfen Sie jede Kategorie und fügen Sie sie zum Tutorial hinzu, wenn sie existiert
  const kategorien = kategorieNamen.map(name => {
    // Finden Sie das Kategorie-Objekt basierend auf dem Namen
    return persistence.kategorien.find(kat => kat.name === name);
  }).filter(kat => kat !== undefined); // Entfernen Sie undefined Einträge, falls eine Kategorie nicht gefunden wurde

  let newTutorial = new persistence.Tutorial(
    tutorialData.name,
    tutorialData.language,
    tutorialData.description,
    tutorialData.duration,
    new Date(tutorialData.date),
    tutorialData.content,
    tutorialData.video,
    // tutorialData.bild,
    '',
    ''
  );

  // Füge die Kategorien zum Tutorial hinzu
  kategorien.forEach(kat => newTutorial.fuegeKategorieHinzu(kat))

  persistence.tutorials.push(newTutorial);
  res.redirect("/");
});

router.use(function (req, res) {
  res.status(404);
  res.render("notFound");
});

module.exports = router;
