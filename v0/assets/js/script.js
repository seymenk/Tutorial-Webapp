function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
}
console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

class Kategorie {
  constructor(name, bild) {
    this.name = name;
    this.bild = bild;
  }
}

class Bild {
  constructor(url, name) {
    this.url = url + name;
  }
}

class Tutorial {
  constructor(name, sprache, beschreibung, dauer, datum, url, embedCode, bild) {
    this.name = name;
    this.sprache = sprache;
    this.beschreibung = beschreibung;
    this.dauer = dauer; // HH:MM
    this.datum = datum;
    this.url = url;
    this.embedCode = embedCode;
    this.bild = bild;
    this.kategorien = [];
    this.kapitelliste = [];
  }
  fuegeKategorieHinzu(kat) {
    this.kategorien.push(kat);
  }

  fuegeKapitelHinzu(kap) {
    this.kapitelliste.push(kap);
  }
}

function getDauerInStundenUndMinuten(dauer) {
  let zeitElemente = dauer.split(":"); // Trennen der Stunden und Minuten mit split-Methode
  let stunden = parseInt(zeitElemente[0]);
  let minuten = parseInt(zeitElemente[1]);
  return `${stunden} Std. ${minuten} Min.`;
}

class Kapitel {
  constructor(name, beschreibung, dauer) {
    this.name = name;
    this.beschreibung = beschreibung;
    this.dauer = dauer;
  }
}

let kochenKategorie = new Kategorie("Kochen", new Bild("assets/img/", "bild1.png"));
let programmierenKategorie = new Kategorie("Programmieren", new Bild("assets/img/", "bild1.png"));
let fussballKategorie = new Kategorie("Fußball", new Bild("assets/img/", "bild1.png"));
let gamingKategorie = new Kategorie("Gaming", new Bild("assets/img/", "bild1.png"));

let programmierenTutorial1 = new Tutorial("Top 100 Features in Swift", "English", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
, "00:18", new Date("2023/02/20"), "www.abcd.de", "<html>...</html>", new Bild("assets/img/", "bild1.png"));

let kochenTutorial1 = new Tutorial("Spaghetti Bolognese", "Deutsch", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
, "00:18", new Date("2023/02/20"), "www.abcd.de", "<html>...</html>", new Bild("assets/img/", "bild1.png"));

let kapitel1 = new Kapitel("Kapitel 1", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat", "02:22");
let kapitel2 = new Kapitel("Kapitel 2", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat", "01:11");
let kapitel3 = new Kapitel("Kapitel 3", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat", "00:42");

programmierenTutorial1.fuegeKapitelHinzu(kapitel1);
programmierenTutorial1.fuegeKapitelHinzu(kapitel2);
programmierenTutorial1.fuegeKapitelHinzu(kapitel3);

kochenTutorial1.fuegeKapitelHinzu(kapitel1);
kochenTutorial1.fuegeKapitelHinzu(kapitel2);
kochenTutorial1.fuegeKapitelHinzu(kapitel3);

programmierenTutorial1.fuegeKategorieHinzu(programmierenKategorie);
kochenTutorial1.fuegeKategorieHinzu(kochenKategorie);

let kategorien = [kochenKategorie, programmierenKategorie, fussballKategorie, gamingKategorie];
let tutorials = [programmierenTutorial1, kochenTutorial1];

kategorien.sort((a, b) => a.name.localeCompare(b.name));

function getTutorialsZuKategorie(kategorieName) {
  return tutorials.filter(tutorial => tutorial.kategorien.some(kategorie => kategorie.name === kategorieName));
}

for (let kategorie of kategorien) {
  console.log(`Kategorie: ${kategorie.name}`);
  console.log(`Bild: ${kategorie.bild.name}`);

  let tutorialsZuKategorie = getTutorialsZuKategorie(kategorie.name);

  for (let tutorial of tutorialsZuKategorie) {
    console.log(`${tutorial.name} (${tutorial.sprache}) ${tutorial.datum}`);
    console.log(`${tutorial.beschreibung}`);
    console.log(`${getDauerInStundenUndMinuten(tutorial.dauer)}`);
    console.log(`${tutorial.embedCode} bzw. ${tutorial.url}`);
    
    for (let kapitel of tutorial.kapitelliste) {
      console.log(`${getDauerInStundenUndMinuten(kapitel.dauer)} ${kapitel.name}: ${kapitel.beschreibung}`);
    }
  }
}
