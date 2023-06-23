//title
console.log(document.title);

//header
console.log(document.querySelector("header"));

//alle kinder des head elements
console.log(document.querySelectorAll("head > *"));
console.log(document.querySelector("head").children);
console.log(document.querySelector("head").childNodes);

//die url des html-dokuments
console.log(document.URL);

//elemente mit der klasse "teaser"
console.log(document.getElementsByClassName("teaser")[0]);
console.log(document.querySelector(".teaser"));

//alle p elemente die nachfahren eines section elements sind
console.log(document.querySelectorAll("section p"));

//text der überschrift von nutzlose webseite zu sehr sinnvolle webseite ändern
document.querySelector("header h1").textContent = "Sinnvolle Webseite";

//inhalt des abschnitts mit der klasse "teaser" von einem "strong" in ein "em"-Element
let em = document.createElement("em");
em.textContent = "Überall dieselbe alte Laier.";
document.getElementsByClassName("teaser")[0].firstChild.replaceWith(em);
//oder
document.querySelector(".teaser").innerHTML = "<em>Überall dieselbe alte Laier.</em>"

//das ziel des hyperlinks auf fh-dortmund.de
document.querySelector("a").href = "fh-dortmund.de";

//füge dem nach dem main element ein fotter mit dem text by Webtech inc
let footer = document.createElement("footer");
footer.textContent = "by Webtech Inc.";
let text = document.createTextNode("Test");
footer.append(text);
//oder
document.querySelector("main").after(footer);

//fügen sie jedem p element einen schwarzen rand mit 1 pixel breite hinzu
document.querySelectorAll("p").forEach((p) => (p.style.border = "1px solid black"));
//oder
let style = document.createElement("style");
style.textContent = "p {border: 1px solid black}";
document.querySelector("head").append(style);