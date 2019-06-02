var images = {
  article: "/icons/002-contract.svg",
  course: "/icons/001-class.svg",
  question: "/icons/003-question.svg",
}

var users = [
  {
    "id": 1,
    "name": "Dr. med Silber Boch",
    "address": "Werdener Str. 8",
    "image": "profiles/GilbertBoch.jpg",
    "lat_lon": [51.2191094, 6.8043112],
    "specialty": "Allgemeinmediziner"
  },
  {
    "id": 2,
    "name": "Dr. med Martin Reith",
    "address": "Werdener Str. 8",
    "image": "profiles/MartinReith.jpg",
    "lat_lon": [51.217469, 6.804767],
    "specialty": "Internist"
  },
  {
    "id": 3,
    "name": "Anselm k. Gottstein",
    "address": "Werdener Str. 8",
    "image": "profiles/AnselmKGottstein.jpg",
    "lat_lon": [51.217004, 6.802058],
    "specialty": "Allgemeinmediziner"
  },
  {
    "id": 4,
    "name": "Dr. med. Kathrin Voigt",
    "address": "Friedrichstr. 13-15",
    "image": "profiles/KathrinVoigt.jpg",
    "lat_lon": [51.217796, 6.776869],
    "specialty": "Internistin"
  },
  {
    "id": 5,
    "name": "Dr. med. Andrea Birkhain",
    "address": "Friedrichstr. 13-15",
    "image": "profiles/AndreaBirkhahn.jpg",
    "lat_lon": [51.219190, 6.776710],
    "specialty": "Internist"
  },
  {
    "id": 6,
    "name": "ApoBank Filiale",
    "address": "Richard-Oskar-Mattern Str. 6",
    "image": "data:image/png;base64,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",
    "lat_lon": [51.24517, 6.73644],
    "specialty": "Finanzierung"
  },
  {
    "id": 6,
    "name": "Ulrich Sommer (ApoBank)",
    "address": "Richard-Oskar-Mattern Str. 6",
    "image": "https://img.aerzteblatt.de/800x/bilder/2018/04/img138808143.jpg",
    "lat_lon": [51.24513, 6.73704],
    "specialty": "Finanzierung"
  },
  {
    "id": 7,
    "name": "Dr. med Bernadette Adamek",
    "address": "Heinrich-Heine-Allee 35",
    "image": "https://cdn3.jameda-elements.de/premium/_uploads/portraits/medi/bild1379495991303.jpg",
    "lat_lon": [51.226060, 6.776398],
    "specialty": "Internistin"
  },
  {
    "id": 8,
    "name": "Priv.-Doz. Dr. med. Christian Berg",
    "address": "Königsallee 11",
    "image": "https://cdn3.jameda-elements.de/premium/_uploads/portraits/medi/bild1433947899577.jpg",
    "lat_lon": [51.226344, 6.783554],
    "specialty": "Laboratoriumsmediziner"
  },
  {
    "id": 9,
    "name": "Ali Reza Samary",
    "address": "Am Wehrhahn 2 a",
    "image": "https://cdn3.jameda-elements.de/premium/_uploads/portraits/medi/bild1493987128737.jpg",
    "lat_lon": [51.22793, 6.78724],
    "specialty": "Internist"
  },
  {
    "id": 10,
    "name": "Dr. med. Gunther Öhlschläger",
    "address": "Oststrasse 51",
    "image": "https://cdn3.jameda-elements.de/premium/_uploads/portraits/medi/bild1502965272251.jpg",
    "lat_lon": [51.22671, 6.78894],
    "specialty": "Internist"
  },

];
var banks = [{
  "id": 1,
  "name": "Rene Braun (ApoBank)",
  "address": "Richard-Oskar-Mattern Str. 6",
  "image": "https://www.inwerk-bueromoebel.de/media/wysiwyg/Bueromoebel/DE/Content/apobank/apobank-rene-braun.jpg",
  "lat_lon": [51.24495, 6.73557],
  "specialty": "Finanzierung"
}];


var courses = [
  {
    "id": 1,
    "name": "How to hire good employees.",
    "address": "Louise-Dumont-Straße 1, 40211 Düsseldorf",
    "image": images.course,
    "lat_lon": [51.228604, 6.787391],
    "specialty": "Finanzierung"
  },
  {
    "id": 2,
    "name": "Arztneimittelinteraktionen bei multimorbiden Patienten",
    "address": "Louise-Dumont-Straße 5, 40211 Düsseldorf",
    "image": images.course,
    "lat_lon": [51.24382, 6.73003],
    "specialty": "Notfallmedizin"
  },
  {
    "id": 3,
    "name": "Tabakkonsum und Strategien zur Vermeidung",
    "address": "Glehner Weg 8, 40211 Düsseldorf",
    "image": images.course,
    "lat_lon": [51.24368, 6.72541],
    "specialty": "Lungenarzt"
  },
  {
    "id": 4,
    "name": "Bakterien als Erreger nosokomialer Infektionen",
    "address": "Auf den Steinen 13, 40211 Düsseldorf",
    "image": images.course,
    "lat_lon": [51.2468, 6.6921],
    "specialty": "Innere Medizin"
  }
];

var acts = [
  {
    user: 3,
    views: 10,
    target: "",
    text: "I need a new X-Ray. Can someone give advice.",
    activity: "question",
    image: images.question,
  },
  {
    user: 2,
    views: 3,
    target: "",
    text: "Ich will eine eigen Praxis haben, aber kein finanzielles Risiko eingehen. Was gibt es fuer Optionen?",
    activity: "question",
    image: images.question,
  },
  {
    user: 2,
    tags: ["Fettabsaugung entstehen", "Falten entstehen", "NahtLift entstehen", "Unterhautfettgewebe", "Haut bleibende Faden"],
    views: 33,
    target: "",
    text: "Fettabsaugung mit anschliessendem Nahtlift",
    activity: "article",
    image: images.article,
    article: (["Fettabsaugung mit abschließendem NahtLift", "", "Fachbeitrag von Dr. med. Alamouti", "", "Bei einer Liposuktion (Fettabsaugung) werden Fettzellen abgesaugt. Es entsteht ein Hautüberschuss, der zur unerwünschte Falten führen kann. In einigen Fällen bietet es sich an, nach der Fettabsaugung das neue NahtLift-Verfahren einzusetzen, um die Haut zu straffen.", "", "Die Fettabsaugung-Operation", "", "Doch fangen wir vorne an: Was passiert eigentlich mit den Fettzellen bei einer Fettabsaugung (Liposuktion)? Bei der Fettabsaugung in Tumeszenz-Lokalanästhesie wird nach einer örtlichen Betäubung des Gewebes eine lange, stumpfe Nadel in das Unterhautfettgewebe eingeführt. Durch das Einspritzen großer Mengen einer verdünnten Lokalanästhesie-Lösung ins Unterhautfettgewebe (bis zu sechs Liter Flüssigkeit), werden die Fettzellen gelockert, getrennt und können so abgesaugt werden. ", "", "Warum können Falten entstehen?", "", "Nach der Absaugung fehlen die abgesaugten Fettzellen unter der Haut, wodurch Falten oder Dellen entstehen können. Dem beugt man vor, indem die Haut angedrückt wird. Nach der Fettabsaugung am Hals muss man deshalb während der Nachbehandlung ein Tuch tragen, bei den Hüften hilft eine Kompressionshose, die mindestens zwei Wochen bei Tag und Nacht angelegt werden muss. Durch die Kompressionshose wird das Unterhautfettgewebe zusammengedrückt. Dadurch wird verhindet, dass sich in den schmalen Tunneln, die bei der Fettabsaugung entstehen, keine Flüssigkeit ansammelt. ", "", "Die Fettabsaugung-Operation", "", "Doch fangen wir vorne an: Was passiert eigentlich mit den Fettzellen bei einer Fettabsaugung (Liposuktion)? Bei der Fettabsaugung in Tumeszenz-Lokalanästhesie wird nach einer örtlichen Betäubung des Gewebes eine lange, stumpfe Nadel in das Unterhautfettgewebe eingeführt. Durch das Einspritzen großer Mengen einer verdünnten Lokalanästhesie-Lösung ins Unterhautfettgewebe (bis zu sechs Liter Flüssigkeit), werden die Fettzellen gelockert, getrennt und können so abgesaugt werden. ", "", "Warum können Falten entstehen?", "", "Nach der Absaugung fehlen die abgesaugten Fettzellen unter der Haut, wodurch Falten oder Dellen entstehen können. Dem beugt man vor, indem die Haut angedrückt wird. Nach der Fettabsaugung am Hals muss man deshalb während der Nachbehandlung ein Tuch tragen, bei den Hüften hilft eine Kompressionshose, die mindestens zwei Wochen bei Tag und Nacht angelegt werden muss. Durch die Kompressionshose wird das Unterhautfettgewebe zusammengedrückt. Dadurch wird verhindet, dass sich in den schmalen Tunneln, die bei der Fettabsaugung entstehen, keine Flüssigkeit ansammelt. ", "", "Um sich den NahtLift besser vorstellen zu können, kann man das Beispiel eines Knopfes heranziehen. Denken Sie an einen Knopf, der an einer Jacke locker nach unten hängt. Um diesen Knopf anzuheben, zieht man einen Faden erst durch den Stoff und dann durch den Knopf. Mit dem Faden kann so der Knopf wieder nach oben und an den Stoff angezogen werden. ", "", "Bei Falten oder Dellen der Haut wird dieser Faden also wie ein „Lasso“ unter der Haut ausgerichtet und zum Schluss angezogen. Durch das Anziehen erfolgt ein Aufhängen des Bindegewebeapparates und es kommt zu einer deutlichen Straffung. ", "", "Mögliche Folgen und Nebenwirkungen des NahtLifts?", "", "Das NahtLift-Verfahren ist neu. Es wurde Anfang 2004 von Dr. med. Alamouti (Haranni Clinic, Herne) entwickelt. ", "", "Das NahtLift-Verfahren erfolgt wie auch die vorherige Liposuktion bei örtlicher Betäubung; eine Vollnarkose mit all ihren Vor- und Nachteilen ist nicht notwendig. Falls der Faden als störend empfunden wird, kann man versuchen ihn nach einer Woche nach der Liposuktion wieder zu entfernen. Ansonsten lösst sich der Faden nach einer gewissen Zeit von selber.", "", "Der NahtLift-Faden besteht aus einem 45 Zentimeter langem monofilem Polyamid. An diesem befindet sich eine feine Nadel. Bereits seit vielen Jahrzehnten wird der unter der Haut bleibende Faden in anderen Bereichen der Medizin, wie der Augenheilkunde, der allgemeinen Chirurgie, der Herz- und Neurochirurgie, verwendet. Nach Aussagen des Herstellers zersetzt sich der Faden nach einigen Wochen und führt zu keinen Hautreaktionen.", "", "Durch den NahtLift entstehen keine große Narben, denn es erfolgt nur ein kleiner Einstich. Minimale Beschwerden, wie kurzzeitiges Spannungsgefühl, sind möglich. Bei den meisten Patienten tritt eine schnelle Erholung ein und die Schwellungen sind nach ein paar Tagen abgeklungen."]).reduce((a, b) => a.concat(b))
  },
  {
    user: 4,
    views: 207,
    tags: ["Haartransplantationen", "Selbstvertrauen", "stumpfes Haar", "Danuta Sobczak",],
    target: "",
    text: "Haartransplantationen",
    activity: "article",
    image: images.article,
    article: (["Mehr Haar, mehr Selbstvertrauen, mehr Lebensfreude", "", "Ein Video-Interview mit Frau Dr. Sobczak zu den wichtigsten Fragen moderner Haartransplantation", "", "Auch wenn Schönheitsoperationen heute gesellschaftlich akzeptierter sind denn je: Viele Menschen haben immer noch großen Respekt vor der Vollnarkose und dem Skalpell und überlegen es sich deshalb sehr genau, ob sie sich des Aussehens wegen unter das Messer legen. Doch zum Glück ist nicht jeder Eingriff invasiv, und dankenswerterweise gibt es immer mehr Verfahren, die bei minimalen Risiken maximale Wirkung zeigen. Eines der besten Beispiele dafür sind Haartransplantationen. Sie sind inzwischen so perfektioniert worden und zudem so nachgefragt, dass man sie auf vielen Ebenen fast schon mit einem Besuch beim Zahnarzt vergleichen könnte.", "", "Haarpracht mit zunehmenden Jahren immer mehr verabschiedet und schließlich nur noch vergleichsweise dünnes und stumpfes Haar zurücklässt. Doch Menschen, bei denen das Haar ganz ausfällt, erleben manchmal sogar echte Verzweiflung und büßen erheblich an Selbstvertrauen ein. Nicht nur für Frauen stellt Haarverlust eine echte Krise dar, auch Männer können sich damit nur schwer abfinden. Doch das muss heute auch niemand mehr. Dr. Danuta Sobczak aus Freiburg ist Dermatologin und hat sich auf Haarerkrankungen spezialisiert. Sie weiß aus über 20-jähriger Erfahrung: „Haartransplantationen sind ein problemloser und schmerzfreier Eingriff, der heute mit so gut wie keinen Risiken mehr verbunden ist.\""]).reduce((a, b) => a.concat(b))
  },
  {
    user: 4,
    views: 35,
    target: "",
    tags:["Acetylcholin", "Thalamus", "cholinerge Neuronen", "Gehirn", "motorischen Nerven", "sensorischer Reize", "Cortex"],
    activity: "article",
    text: "Multitalent Acetylcholin",
    image: images.article,
    article: (["Acetylcholin wurde wohl deshalb als erster Neurotransmitter entdeckt, weil er für das vegetative Nervensystem sowie an der Schnittstelle zwischen motorischen Nerven und Skelettmuskulatur eine entscheidende Rolle spielt. Aber auch im Gehirn finden sich cholinerge Neuronen. Die wichtigsten davon lassen sich zu zwei diffusen Modulationssystemen zusammenfassen.", "", "Das eine System innerviert von der Basis des Großhirns aus (zwischen und unter den Basalganglien) Hippocampus, Neocortex und Riechkolben. Diese Zellen gehören zu den ersten, die bei der Alzheimer-Krankheit absterben. Inwieweit es darüber hinaus eine Verbindung zu der Krankheit gibt, ist unklar. Unter den zugelassenen Alzheimer-Medikamenten, die den Verlust geistiger Fähigkeiten zumindest verzögern sollen, befinden sich aber Wirkstoffe, die den Acetylcholin-Abbau im Gehirn verlangsamen. Das zweite System besteht aus Zellen im Pons und im Tegmentum des Mittelhirns. Es wirkt vor allem in den Thalamus hinein, darüber aber auch stark ins Großhirn.", "", "Beteiligt sind die cholinergen Neuronen etwa an der Steuerung von Aufmerksamkeit und der Erregbarkeit des Gehirns während Schlaf– und Wachrhythmus. In Tierversuchen wurde deutlich, dass Acetylcholin die Weiterleitung sensorischer Reize vom Thalamus in die zuständigen Cortex-Regionen fördert. Darüber hinaus dürfte es für Plastizität und Lernen eine entscheidende Rolle spielen."]).reduce((a, b) => a.concat(b))
  }
]

var dialog = [
  [
    {
      user: 4,
      text: "Hello, I have a question."
    },
    {
      user: 2,
      text: "Sorry, I don't know about that."
    }],
  [{
    user: 1,
    text: "I was wondering about it also!"
  },
    {
      user: 3,
      text: "Are you sure it is going to be ok from a legal perspective?"
    }],
  [{
    user: 1,
    text: "Thank you!"
  },
    {
      user: 4,
      text: "This reminds me of 2017. Someone asked exactly this question."
    }],
  [{
    user: 2,
    text: "I did not really understand that"
  }],
  [{
    user: 4,
    text: "Etwas neues Gelernt, danke!"
  }],
];
export {
  users,
  banks,
  courses,
  acts,
  dialog
}


