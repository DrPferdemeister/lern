(function () {
  window.QB1 = {
    sessions: [
      { id: "s1", title: "Sitzung 1 · Block 1", detail: "Studiendesigns und deskriptive Statistik", chapter: "designs" },
      { id: "s2", title: "Sitzung 2 · Block 2", detail: "Diagnostik, Konfidenzintervall, Tests", chapter: "diagnostic" },
      { id: "s3", title: "Sitzung 3 · Block 3", detail: "Welcher Test, lineare und logistische Regression", chapter: "regression" },
      { id: "s4", title: "Sitzung 4 · Übungsskript", detail: "Aufgaben im PDF, die in den Blöcken schiefgingen, plus Aufgabe 19", chapter: "quiz" },
      { id: "s5", title: "Sitzung 5 · Überlebenszeit", detail: "Zensierung, Kaplan-Meier, Log-Rank, Hazard Ratio", chapter: "survival" },
      { id: "s6", title: "Sitzung 6 · Jonas", detail: "Datenschutz, Daten, Terminologien", chapter: "informatics" },
      { id: "s7", title: "Sitzung 7 · Zenker", detail: "KIS, LIS, RIS, PACS, PDMS und Leitlinien", chapter: "informatics" },
      { id: "s8", title: "Sitzung 8 · Klausurtrainer", detail: "Alle MC-Aufgaben noch einmal, ohne in die Lösung zu schauen", chapter: "quiz" }
    ],
    chapters: [
      {
        id: "start",
        nav: "Start",
        kicker: "eKlausur",
        title: "60 Minuten, 30 Aufgaben",
        blocks: [
          { type: "p", text: "20 Aufgaben kommen aus Biometrie und Epidemiologie, 10 aus der medizinischen Informatik. Gefragt wird Rechnen und Zuordnen." },
          { type: "p", text: "Lies pro Kapitel nur den kurzen Text, dann beweg die Grafik. Schwere Wörter klappst du im Kapitel auf. Der Spickzettel sammelt dieselben Ideen auf einer Seite. Die Lösungen im Klausurtrainer bleiben zu, bis du selbst eine Antwort abschickst." },
          { type: "note", text: "Die Anästhesie-PDFs im Ordner gehören nicht zu dieser Klausur. Die lange Vorlesung brauchst du nur, wenn eine Aufgabe hakt." },
          {
            type: "words",
            title: "Klausurfallen",
            items: [
              { word: "trifft nicht zu", text: "Die Aufgabe sucht die falsche Aussage. Die anderen Sätze stimmen." },
              { word: "gegeben", text: "Du zählst nur in dieser Gruppe. „Gegeben krank“ heißt: der Nenner sind die Kranken." },
              { word: "bezogen auf", text: "Die Bezugsgruppe steht im Nenner. Mortalität bezieht sich auf alle Menschen, Letalität auf die Erkrankten." },
              { word: "höchstens", text: "Die Zahl ist die obere Grenze. Kleiner oder gleich zählt mit, größer nicht." },
              { word: "mindestens", text: "Die Zahl ist die untere Grenze. Größer oder gleich zählt mit." },
              { word: "unabhängig", text: "Das Wissen über das eine ändert die Chance des anderen nicht." },
              { word: "adjustiert", text: "Der Einfluss eines weiteren Faktors ist herausgerechnet." }
            ]
          }
        ]
      },
      {
        id: "designs",
        nav: "Studiendesigns",
        kicker: "Block 1",
        title: "Studiendesigns und Effektmaße",
        blocks: [
          {
            type: "plain",
            items: [
              "Eine Studie hat eine Richtung. Du schaust einmal hin, du gehst von der Krankheit zurück, du folgst Menschen nach vorn, oder du verteilst die Behandlung per Los.",
              "Ein Confounder ist ein dritter Faktor. Im Sommer essen mehr Leute Eis, und mehr Leute ertrinken. Das Eis verursacht das Ertrinken nicht. Der Sommer steckt hinter beidem."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Querschnitt", text: "Eine Momentaufnahme. Du zählst, wer gerade krank ist. Die Reihenfolge in der Zeit siehst du nicht." },
              { word: "Fall-Kontroll", text: "Du startest bei Kranken und Gesunden und fragst rückwärts nach der früheren Belastung." },
              { word: "Kohorte", text: "Du startest bei der Belastung und schaust nach vorn, wer später krank wird." },
              { word: "Exposition", text: "Das, dem die Menschen ausgesetzt waren. Ein Medikament, Rauchen, ein Stoff." },
              { word: "Prävalenz", text: "Der Anteil der Kranken zu einem Zeitpunkt. Wie viele in der Klasse gerade eine Brille tragen." },
              { word: "Inzidenz", text: "Neue Fälle in einem Zeitraum, nur unter denen, die das noch bekommen können." },
              { word: "Odds Ratio", text: "Das Verhältnis zweier Chancen. Chance heißt: Anzahl Ja geteilt durch Anzahl Nein." },
              { word: "Recall-Bias", text: "Wer krank ist, erinnert sich anders an die Vergangenheit als wer gesund ist." },
              { word: "Intention-to-treat", text: "Alle bleiben in der Gruppe, in die das Los sie gesteckt hat, auch wenn sie die Therapie abgebrochen haben." }
            ]
          },
          { type: "p", text: "Zuerst die Richtung der Studie: eine Momentaufnahme, von der Krankheit zurück, von der Exposition nach vorn, oder eine zugeloste Intervention." },
          {
            type: "table",
            head: ["Design", "Richtung", "Typisches Maß", "Schwäche"],
            rows: [
              ["Querschnitt", "ein Zeitpunkt", "Prävalenz", "keine zeitliche Reihenfolge"],
              ["Fall-Kontroll", "von der Krankheit zurück", "Odds Ratio", "Recall-Bias, keine Inzidenz"],
              ["Kohorte", "von der Exposition vorwärts", "relatives Risiko", "Aufwand, Verlust der Nachverfolgung"],
              ["Randomisierte Studie", "Zufallszuteilung", "Therapieeffekt", "Ethik, Auswahl der Teilnehmenden"]
            ]
          },
          { type: "ul", items: [
            "**Prävalenz:** Anteil Erkrankter zu einem Zeitpunkt.",
            "**Inzidenz:** neue Fälle in einem Zeitraum, bezogen auf Personen unter Risiko.",
            "**Mortalität:** Gestorbene bezogen auf die Bevölkerung. **Letalität:** Gestorbene bezogen auf die Erkrankten.",
            "**Recall-Bias** ist typisch für Fall-Kontroll-Studien, weil die Exposition rückblickend erfragt wird.",
            "**Confounder:** ein dritter Faktor hängt mit Exposition und Ausgang zusammen. Randomisierung, Stratifizierung und Adjustierung wirken dagegen.",
            "**Intention-to-treat:** alle Randomisierten bleiben in ihrer Gruppe. **Per-Protocol:** nur korrekt Behandelte."
          ] },
          { type: "widget", name: "designs" },
          { type: "widget", name: "risks" },
          { type: "note", text: "Lead-Time-Bias beim Screening: die Diagnose wird früher gestellt, die Überlebenszeit ab Diagnose wirkt länger, ohne dass das Leben verlängert wurde." }
        ]
      },
      {
        id: "descriptive",
        nav: "Deskriptiv",
        kicker: "Block 1",
        title: "Skalenniveau, Lage, Streuung",
        blocks: [
          {
            type: "plain",
            items: [
              "In einer Klassenarbeit liegen fast alle zwischen 40 und 60 Punkten. Eine Person hat 1000 Punkte. Der Mittelwert springt nach oben. Der Median bleibt der mittlere Wert der geordneten Liste.",
              "Die Standardabweichung ist die typische Entfernung der Punkte vom Schnitt. Der Standardfehler sagt, wie genau der Klassenschnitt den wahren Schnitt trifft. Mehr Personen machen ihn kleiner."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Nominal", text: "Nur Namen, ohne Reihenfolge. Blutgruppe A steht nicht über Blutgruppe B." },
              { word: "Ordinal", text: "Es gibt eine Reihenfolge, die Abstände sind ungleich. Stufe 2 ist mehr als Stufe 1, der Sprung zu Stufe 3 kann anders groß sein." },
              { word: "Median", text: "Der mittlere Wert, wenn du alle der Größe nach sortierst. Ein Ausreißer schiebt ihn kaum." },
              { word: "Mittelwert", text: "Summe aller Werte geteilt durch die Anzahl. Ein einzelner sehr großer Wert zieht ihn mit." },
              { word: "IQR", text: "Die Spanne der mittleren 50 Prozent." },
              { word: "Standardabweichung", text: "Wie weit die Werte typischerweise vom Mittelwert weg liegen, in derselben Einheit wie die Messung." },
              { word: "Standardfehler", text: "Wie genau der Mittelwert geschätzt ist. Er wird kleiner, wenn du mehr Personen misst." },
              { word: "Ausreißer", text: "Ein Wert, der weit weg von den übrigen liegt." }
            ]
          },
          {
            type: "table",
            head: ["Niveau", "Eigenschaft", "Beispiel", "Lage"],
            rows: [
              ["Nominal", "nur Namen", "Blutgruppe", "Modus"],
              ["Ordinal", "Ordnung, ungleiche Abstände", "Pflegestufe, Schmerzskala", "Median, Modus"],
              ["Intervall", "gleiche Abstände, kein echter Nullpunkt", "Temperatur in °C", "Mittelwert"],
              ["Verhältnis", "echter Nullpunkt", "Körpergröße", "Mittelwert"]
            ]
          },
          { type: "ul", items: [
            "**Modus:** häufigster Wert, einziges Lagemaß für nominale Daten.",
            "**Median:** mittlerer Wert der geordneten Liste. Bei gerader Anzahl das Mittel der beiden mittleren Werte. Robust gegen Ausreißer.",
            "**Mittelwert:** Summe geteilt durch n. Ausreißer ziehen ihn.",
            "**IQR:** Q3 minus Q1, die mittleren 50 Prozent.",
            "**Varianz:** mittlere quadratische Abweichung. Die Stichprobenvarianz teilt durch n − 1.",
            "**Standardabweichung:** Wurzel aus der Varianz, gleiche Einheit wie die Messwerte.",
            "**Variationskoeffizient:** Standardabweichung geteilt durch den Mittelwert, einheitenfrei.",
            "**Standardfehler:** Standardabweichung geteilt durch Wurzel aus n. Er beschreibt die Genauigkeit des Mittelwerts und wird mit wachsendem n kleiner."
          ] },
          { type: "widget", name: "skew" },
          { type: "widget", name: "normal" },
          { type: "widget", name: "boxplot" }
        ]
      },
      {
        id: "diagnostic",
        nav: "Diagnostik",
        kicker: "Block 2",
        title: "Wahrscheinlichkeit und Tests am Patienten",
        blocks: [
          {
            type: "plain",
            items: [
              "Ein Metalldetektor am Eingang: Sensitivität ist der Anteil der Leute mit Metall, bei denen er piept. Spezifität ist der Anteil ohne Metall, bei denen er still bleibt.",
              "Der positive Vorhersagewert ist der Anteil mit echtem Metall unter allen, bei denen er piept. Tragen fast keine Leute Metall, sind die meisten Pieptöne Fehlalarme."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Sensitivität", text: "Von allen Kranken: wie viele der Test erkennt." },
              { word: "Spezifität", text: "Von allen Gesunden: wie viele der Test als gesund erkennt." },
              { word: "Positiver prädiktiver Wert", text: "Von allen positiven Tests: wie viele wirklich krank sind." },
              { word: "Wahrscheinlichkeit", text: "Eine Zahl zwischen 0 und 1. 0 heißt unmöglich, 1 heißt sicher." },
              { word: "unabhängig", text: "Zwei Ereignisse ändern einander nicht. Dann multiplizierst du ihre Wahrscheinlichkeiten." },
              { word: "gegeben", text: "Du rechnest nur innerhalb dieser Gruppe. Der Nenner ist die Gruppe hinter dem Wort gegeben." }
            ]
          },
          { type: "ul", items: [
            "Wahrscheinlichkeit liegt zwischen 0 und 1. Das Gegenereignis ist 1 minus p.",
            "Schließen sich A und B aus, ist P(A oder B) = P(A) + P(B).",
            "Sind A und B unabhängig, ist P(A und B) = P(A) · P(B).",
            "P(A gegeben B) = P(A und B) / P(B). Unabhängigkeit heißt: das Wissen über B ändert P(A) nicht.",
            "Eine Teilmenge kann nicht wahrscheinlicher sein als die Menge, in der sie liegt. P(A und B) ist höchstens so groß wie P(A)."
          ] },
          { type: "widget", name: "fourfold" },
          { type: "p", text: "**Sensitivität** = richtig positiv / alle Kranken. **Spezifität** = richtig negativ / alle Gesunden. **Positiver prädiktiver Wert** = richtig positiv / alle positiven Tests. **Negativer prädiktiver Wert** = richtig negativ / alle negativen Tests." },
          { type: "note", text: "Sensitivität und Spezifität gehören zum Test. Die prädiktiven Werte hängen von der Prävalenz ab. Ohne Prävalenz gibt es aus Sensitivität und Spezifität allein keinen prädiktiven Wert." }
        ]
      },
      {
        id: "inference",
        nav: "Testen",
        kicker: "Block 2 und 3",
        title: "Schätzen, p-Wert, Testwahl",
        blocks: [
          {
            type: "plain",
            items: [
              "Ein 95-Prozent-Konfidenzintervall ist ein Netz. Wiederholst du dieselbe Studie hundertmal, fängt das Netz den wahren Wert ungefähr 95-mal.",
              "Der p-Wert sagt, wie selten so ein Ergebnis wäre, wenn in Wahrheit nichts dahintersteckt. Wie oft eine faire Münze so extrem fällt. Die Größe des Effekts steht im Unterschied und im Intervall."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Stichprobe", text: "Die Menschen, die du wirklich gemessen hast. Die ganze Bevölkerung ist größer." },
              { word: "Nullhypothese", text: "Die Annahme, dass es keinen Unterschied gibt. Der Test fragt, wie gut die Daten dazu passen." },
              { word: "p-Wert", text: "Die Wahrscheinlichkeit für so extreme Daten, wenn die Nullhypothese stimmt. Ein kleiner Wert heißt: unter dieser Annahme wären die Daten selten." },
              { word: "signifikant", text: "Der p-Wert liegt unter der vorher festgelegten Grenze, oft 0,05. Das Maß für die Größe des Effekts ist der Unterschied selbst." },
              { word: "Fehler 1. Art", text: "Du behauptest einen Effekt, den es nicht gibt." },
              { word: "Fehler 2. Art", text: "Ein Effekt ist da, deine Studie erkennt ihn nicht." },
              { word: "Power", text: "Die Chance, einen vorhandenen Effekt auch zu finden. Sie steigt mit mehr Personen und mit einem größeren Effekt." },
              { word: "Sollwert", text: "Ein festgelegter Vergleichswert, zum Beispiel 50 Prozent oder 170 cm." }
            ]
          },
          { type: "p", text: "Ein 95-Prozent-Konfidenzintervall ist so gebaut, dass es bei wiederholter gleicher Studie in 95 Prozent der Fälle den wahren Wert enthält. Der Stichprobenmittelwert liegt immer in seinem eigenen Intervall, weil das Intervall um ihn herum gebaut wird." },
          { type: "ul", items: [
            "Größeres n oder kleinere Streuung macht das Intervall schmaler.",
            "Ein 90-Prozent-Intervall ist schmaler als ein 95-Prozent-Intervall.",
            "Grob für einen Mittelwert: Schätzwert ± 1,96 · Standardfehler.",
            "Enthält das Intervall die „kein Effekt“-Zahl (Differenz 0 oder Ratio 1), ist das Ergebnis zum Niveau 5 Prozent nicht signifikant."
          ] },
          { type: "widget", name: "ci" },
          { type: "p", text: "Der p-Wert ist die Wahrscheinlichkeit, das beobachtete oder ein noch extremeres Ergebnis zu erhalten, wenn die Nullhypothese wahr ist. p < 0,05 heißt: solche Daten wären unter der Nullhypothese selten. Die Größe des Effekts steht im Unterschied und im Konfidenzintervall." },
          { type: "widget", name: "errors" },
          { type: "p", text: "Die Power steigt mit größerem Effekt, größerem n und größerem α. Sie sinkt bei großer Streuung. In die Fallzahlplanung gehen der angenommene Unterschied, die Streuung, α und die gewünschte Power ein. Der p-Wert entsteht erst nach der Datenerhebung." },
          { type: "widget", name: "tests" }
        ]
      },
      {
        id: "regression",
        nav: "Regression",
        kicker: "Block 3",
        title: "Lineare und logistische Regression",
        blocks: [
          {
            type: "plain",
            items: [
              "Lineare Regression legt eine Gerade durch Punkte. Die Steigung sagt: pro Schritt auf der x-Achse so viel mehr auf der y-Achse.",
              "Die Odds Ratio ist ein Faktor für die Chance. Eine Chance von 1 zu 4 und eine Wahrscheinlichkeit von 20 Prozent beschreiben dieselbe Lage, die Zahl ist eine andere."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Zielgröße", text: "Das, was du erklären willst. Bei der Geraden ist das y." },
              { word: "Einflussgröße", text: "Das, womit du erklärst. Bei der Geraden ist das x." },
              { word: "Korrelation", text: "Wie eng zwei Größen zusammen eine Linie bilden, von −1 bis +1. Enge heißt noch keine Ursache." },
              { word: "Residuum", text: "Der senkrechte Abstand eines Punktes von der Geraden. Ein Bogen in diesen Abständen heißt: eine Gerade passt schlecht." },
              { word: "binär", text: "Nur zwei Ausgänge, zum Beispiel ja oder nein." },
              { word: "stetig", text: "Der Wert kann fein abgestuft sein, wie eine Körpergröße in Zentimetern." },
              { word: "Odds Ratio", text: "Der Faktor, um den die Chance steigt, wenn die Einflussgröße um eins steigt. 1 heißt: die Chance bleibt gleich." }
            ]
          },
          { type: "p", text: "Lineare Regression beschreibt eine stetige Zielgröße durch eine Gerade: Abschnitt plus Steigung mal Einflussgröße. Die Steigung ist die mittlere Änderung der Zielgröße, wenn die Einflussgröße um eine Einheit steigt und die übrigen Einflussgrößen gleich bleiben." },
          { type: "ul", items: [
            "**R²** ist der Anteil der Streuung, den das Modell beschreibt. Es ist kein Beweis für eine Ursache.",
            "**Pearson r** misst den linearen Zusammenhang, von −1 bis +1.",
            "**Spearman** misst den monotonen Rangzusammenhang, passend für ordinale Daten und Ausreißer.",
            "Ein gebogenes Muster in den Residuen spricht für einen nicht-linearen Zusammenhang. Ausreißer werden nicht einfach gestrichen.",
            "Logistische Regression hat eine binäre Zielgröße. Das Ergebnismaß ist die **Odds Ratio**. OR = 1 heißt kein Zusammenhang.",
            "exp(β) ist der Faktor, um den die Chance steigt, wenn die Einflussgröße um eins steigt. Enthält das 95-Prozent-Intervall von exp(β) die 1, ist der Effekt zum Niveau 5 Prozent nicht signifikant.",
            "Ein lineares Modell erwartet eine stetige Zielgröße. Ja/nein gehört in die logistische Regression."
          ] },
          { type: "widget", name: "scatter" },
          { type: "formula", text: "Wahrscheinlichkeit bei logistischer Regression: exp(β0 + β1·x) / (1 + exp(β0 + β1·x))" }
        ]
      },
      {
        id: "survival",
        nav: "Überlebenszeit",
        kicker: "Vorlesung 6",
        title: "Zeit bis zum Ereignis",
        blocks: [
          {
            type: "plain",
            items: [
              "Zensiert heißt: du weißt nur „mindestens bis hier“. Wie ein Film, der bei dir noch läuft. Die Zeit zählt mit. Das Ende kennst du nicht, und du zählst es nicht als Ereignis."
            ]
          },
          {
            type: "words",
            items: [
              { word: "Zensierung", text: "Die Person hat das Ereignis bis zum Schluss nicht gehabt, oder du verlierst sie aus den Augen. Die beobachtete Zeit bleibt in der Rechnung." },
              { word: "Kaplan-Meier", text: "Eine Treppe. Sie fällt, wenn ein Ereignis eintritt. Auf der y-Achse steht der Anteil ohne Ereignis." },
              { word: "medianes Überleben", text: "Der Zeitpunkt, an dem die Treppe die 50 Prozent schneidet." },
              { word: "Hazard Ratio", text: "Das Verhältnis der momentanen Ereignisraten. 1 heißt: die Raten sind gleich. Die Odds Ratio vergleicht dagegen Chancen." },
              { word: "Log-Rank", text: "Ein Test, ob zwei Treppen sich unterscheiden. Der p-Wert sagt das Ob. Die Größe des Unterschieds steht in der Hazard Ratio." }
            ]
          },
          { type: "p", text: "Die Zielgröße ist die Zeit bis zu Tod, Rezidiv oder Heilung. Wer das Ereignis bis zum Ende nicht hat oder vorher ausscheidet, ist zensiert: die Zeit zählt mit, das Ereignis nicht." },
          { type: "ul", items: [
            "Die Kaplan-Meier-Kurve schätzt den Anteil ohne Ereignis. Stufen gibt es bei Ereignissen.",
            "Das mediane Überleben ist der Zeitpunkt, an dem die Kurve 50 Prozent schneidet.",
            "Der Log-Rank-Test vergleicht zwei Kurven. Der p-Wert sagt, ob sie sich unterscheiden, nicht wie groß der Unterschied ist.",
            "Die Cox-Regression liefert eine Hazard Ratio und kann für weitere Merkmale adjustieren.",
            "Die **Hazard Ratio** ist das Verhältnis der momentanen Ereignisraten. HR = 1 heißt kein Unterschied. Sie ist keine Odds Ratio."
          ] },
          { type: "widget", name: "kaplan" }
        ]
      },
      {
        id: "informatics",
        nav: "Informatik",
        kicker: "Zehn von dreißig Aufgaben",
        title: "Kürzel, Datenschutz, Leitlinien",
        blocks: [
          {
            type: "plain",
            items: [
              "KIS ist die Zentrale des Krankenhauses für Patienten, Personal und Abläufe. LIS ist das Labor, RIS die Radiologie, PACS der Schrank für die Bilder, PDMS die Akte auf der Intensivstation.",
              "Anonym heißt: der Name ist verbrannt, niemand kommt zurück zur Person. Pseudonym heißt: auf der Akte steht eine Nummer, der Name liegt getrennt im Tresor."
            ]
          },
          {
            type: "words",
            items: [
              { word: "strukturierte Daten", text: "Feste Felder, die ein Rechner sortieren kann. Freitext ist ein Satz ohne feste Felder." },
              { word: "Zweckbindung", text: "Die Daten dürfen nur für den genannten Zweck verwendet werden." },
              { word: "Datensparsamkeit", text: "Nur die Daten erheben, die du wirklich brauchst." },
              { word: "Anonym", text: "Ein Bezug zur Person lässt sich nicht wiederherstellen." },
              { word: "Pseudonym", text: "Der Name ist ersetzt. Mit einem getrennten Schlüssel kommt man zurück zur Person." },
              { word: "Hashfunktion", text: "Ein Fingerabdruck der Daten. Ändert sich ein Zeichen, ändert sich der Fingerabdruck." },
              { word: "S3", text: "Die stärkste Leitlinie: die Studien sind systematisch gesucht, und die Gruppe hat formal abgestimmt." }
            ]
          },
          { type: "p", text: "Hier wird zugeordnet, nicht programmiert. Daten sind die Zeichen, Information ist ihre Bedeutung. Strukturierte Daten lassen sich rechnen und kodieren, Freitext nicht ohne Weiteres." },
          {
            type: "table",
            head: ["Kürzel", "Bedeutung"],
            rows: [
              ["KIS", "Krankenhausinformationssystem: Technik, Personal und Abläufe"],
              ["LIS", "Labor"],
              ["RIS", "Radiologie, Befunde und Abläufe"],
              ["PACS", "Bildarchiv"],
              ["PDMS", "Dokumentation auf der Intensivstation"],
              ["CPOE", "elektronische Anordnung, zum Beispiel eine CT-Anforderung"],
              ["CDSS", "Entscheidungsunterstützung, zum Beispiel eine Wechselwirkung"],
              ["ePA", "elektronische Patientenakte"]
            ]
          },
          {
            type: "table",
            head: ["System", "Wofür"],
            rows: [
              ["ICD-10-GM", "Diagnosen, kodiert der behandelnde Arzt"],
              ["OPS", "Operationen und Prozeduren"],
              ["DRG", "Fallpauschale aus Hauptdiagnose, Prozeduren und weiteren Merkmalen"],
              ["LOINC", "Labor- und Testergebnisse"],
              ["SNOMED CT", "klinische Begriffe"],
              ["MeSH", "kontrolliertes Vokabular für die Literatursuche"],
              ["HL7 und FHIR", "Nachrichten und Dokumente zwischen Systemen"],
              ["DICOM", "Bilddaten"],
              ["IHE", "Abläufe, die festlegen, wie die Standards zusammenarbeiten"]
            ]
          },
          { type: "widget", name: "match" },
          { type: "ul", items: [
            "**Zweckbindung:** Daten nur für den angegebenen Zweck.",
            "**Datensparsamkeit:** nur die nötigen Daten.",
            "**Anonym:** ein Personenbezug ist nicht mehr herstellbar.",
            "**Pseudonym:** der Name ist ersetzt, mit einem separaten Schlüssel wiederherstellbar.",
            "Eine Hashfunktion prüft, ob Daten unverändert sind. Symmetrische Verschlüsselung nutzt einen gemeinsamen Schlüssel, asymmetrische ein Schlüsselpaar.",
            "**Recall** einer Suche: wie viel vom relevanten Bestand gefunden wird. **Präzision:** wie viel von den Treffern wirklich relevant ist."
          ] },
          {
            type: "table",
            head: ["Leitlinie", "Was dahintersteht"],
            rows: [
              ["S1", "informeller Konsens einer Expertengruppe"],
              ["S2k", "formaler Konsens"],
              ["S2e", "systematische Evidenzrecherche"],
              ["S3", "Evidenz und formaler Konsens"]
            ]
          },
          { type: "widget", name: "cards" }
        ]
      },
      {
        id: "sheet",
        nav: "Spickzettel",
        kicker: "Einfache Worte",
        title: "Alles auf einer Seite",
        blocks: [
          {
            type: "plain",
            items: [
              "Jede Karte ist ein Begriff aus der Klausur, in einem Satz aus dem Alltag. Die Formel steht dort, wo die Aufgabe Rechnen verlangt.",
              "Klapp nur die Gruppe auf, die du gerade brauchst. Die Fachkapitel bleiben die lange Version."
            ]
          },
          {
            type: "groups",
            items: [
              {
                title: "Studien",
                cards: [
                  { term: "Querschnitt", text: "Ein Foto zu einem Zeitpunkt. Du siehst, wer gerade krank ist, und nicht, was zuerst da war." },
                  { term: "Fall-Kontroll", text: "Du startest bei Kranken und Gesunden und fragst zurück. Typisch ist die Odds Ratio, und die Erinnerung kann schief sein." },
                  { term: "Kohorte", text: "Du startest bei der Belastung und gehst nach vorn. Das typische Maß ist das relative Risiko." },
                  { term: "Randomisierte Studie", text: "Das Los entscheidet, wer die Behandlung bekommt. So werden die Gruppen vorab ähnlich." },
                  { term: "Confounder", text: "Ein dritter Faktor hängt an beiden Seiten. Im Sommer gibt es mehr Eis und mehr Ertrunkene. Der Sommer ist der dritte Faktor, das Eis ist es nicht." }
                ]
              },
              {
                title: "Risiken",
                cards: [
                  { term: "Prävalenz", text: "Anteil der Kranken genau jetzt. Wie viele in der Klasse gerade eine Brille tragen." },
                  { term: "Inzidenz", text: "Neue Fälle in einem Zeitraum, nur unter den Personen, die es noch bekommen können." },
                  { term: "Mortalität und Letalität", text: "Mortalität zählt Gestorbene unter allen Menschen. Letalität zählt Gestorbene unter den Erkrankten." },
                  { term: "Relatives Risiko", text: "Wie viel mal so hoch das Risiko in der einen Gruppe ist.", formula: "RR = Risiko exponiert / Risiko Vergleich" },
                  { term: "Odds Ratio", text: "Chance heißt Ja geteilt durch Nein. Die Odds Ratio teilt zwei solche Chancen. 1 heißt: die Chancen sind gleich.", formula: "OR = (a / b) / (c / d)" },
                  { term: "Absolute Risikoreduktion", text: "Risiko der Kontrolle minus Risiko der Therapie. Ein großes relatives Risiko kann hier trotzdem eine kleine Zahl sein." },
                  { term: "NNT", text: "Wie viele du behandeln musst, damit eine Person das Ereignis nicht erlebt.", formula: "NNT = 1 / absolute Risikoreduktion" }
                ]
              },
              {
                title: "Lage",
                cards: [
                  { term: "Modus", text: "Der häufigste Wert. Für reine Namen, etwa Blutgruppen, ist er das passende Lagemaß." },
                  { term: "Median", text: "Der mittlere Wert der sortierten Liste. Eine einzelne 1000-Punkte-Klausur schiebt ihn kaum." },
                  { term: "Mittelwert", text: "Summe geteilt durch die Anzahl. Dieselbe 1000-Punkte-Klausur zieht ihn nach oben." },
                  { term: "IQR", text: "Q3 minus Q1. Die mittleren 50 Prozent der sortierten Liste." },
                  { term: "Standardabweichung", text: "Die typische Entfernung der Werte vom Mittelwert, in derselben Einheit wie die Messung." },
                  { term: "Standardfehler", text: "Standardabweichung geteilt durch die Wurzel aus n. Mehr Personen machen die Schätzung des Mittelwerts enger." }
                ]
              },
              {
                title: "Tests am Menschen",
                cards: [
                  { term: "Sensitivität", text: "Am Metalldetektor: von allen mit Metall, wie viele piepen.", formula: "Sensitivität = richtig positiv / alle Kranken" },
                  { term: "Spezifität", text: "Von allen ohne Metall, wie viele still bleiben.", formula: "Spezifität = richtig negativ / alle Gesunden" },
                  { term: "Positiver prädiktiver Wert", text: "Von allen Pieptönen, wie viele wirklich Metall sind. Tragen fast keine Leute Metall, sind die meisten Töne Fehlalarme." },
                  { term: "Negativer prädiktiver Wert", text: "Von allen stillen Durchgängen, wie viele wirklich ohne Metall sind." },
                  { term: "Prävalenz fehlt", text: "Sensitivität und Spezifität gehören zum Test. Den Vorhersagewert brauchst du erst, wenn du weißt, wie häufig die Krankheit ist." }
                ]
              },
              {
                title: "p-Wert und Fehler",
                cards: [
                  { term: "Konfidenzintervall", text: "Ein Netz um die Schätzung. Bei 100 gleichen Studien fängt ein 95-Prozent-Netz den wahren Wert ungefähr 95-mal. Enthält es die 0 bei einer Differenz oder die 1 bei einem Verhältnis, ist das Ergebnis zum Niveau 5 Prozent nicht signifikant.", formula: "Schätzwert ± 1,96 · Standardfehler" },
                  { term: "p-Wert", text: "Wie selten so ein Ergebnis wäre, wenn nichts dahintersteckt. Eine faire Münze, die extrem oft auf dieselbe Seite fällt. Die Größe des Effekts steht im Unterschied und im Intervall." },
                  { term: "Fehler 1. Art", text: "Du sagst, es gibt einen Effekt. In Wahrheit gibt es keinen. Die Wahrscheinlichkeit dafür heißt α." },
                  { term: "Fehler 2. Art", text: "Es gibt einen Effekt. Deine Studie findet ihn nicht. Die Wahrscheinlichkeit dafür heißt β." },
                  { term: "Power", text: "1 minus β. Die Chance, einen vorhandenen Effekt zu finden. Mehr Personen, ein größerer Effekt und ein größeres α heben sie. Eine große Streuung senkt sie." }
                ]
              },
              {
                title: "Testwahl",
                cards: [
                  { term: "Mittelwert gegen Sollwert, normal", text: "Einstichproben-t-Test. Die Werte sind ungefähr glockenförmig, du vergleichst ihren Schnitt mit einer festen Zahl." },
                  { term: "Mittelwert gegen Sollwert, nicht normal", text: "Vorzeichentest oder Wilcoxon-Vorzeichen-Rang-Test. Das ist ein stetiger Mittelwert. Ein Anteil gehört in den nächsten Zweig." },
                  { term: "Anteil gegen Sollwert", text: "Binomialtest oder Chi-Quadrat-Test. Zum Beispiel: ist der Anteil Geheilter anders als 70 Prozent." },
                  { term: "Zwei Gruppen, dieselben Personen, normal", text: "t-Test für verbundene Stichproben. Du testest die Differenz innerhalb der Paare." },
                  { term: "Zwei Gruppen, dieselben Personen, nicht normal", text: "Wilcoxon-Vorzeichen-Rang-Test." },
                  { term: "Zwei Gruppen, verschiedene Personen, normal", text: "t-Test für unverbundene Stichproben." },
                  { term: "Zwei Gruppen, verschiedene Personen, nicht normal", text: "Mann-Whitney-U-Test." },
                  { term: "Zwei kategoriale Merkmale", text: "Chi-Quadrat-Test, wenn die erwarteten Zahlen groß genug sind. In einer kleinen Vierfeldertafel der exakte Test nach Fisher." }
                ]
              },
              {
                title: "Regression",
                cards: [
                  { term: "Gerade", text: "Abschnitt plus Steigung mal x. Die Steigung ist: pro Schritt auf der x-Achse so viel mehr auf der y-Achse, die übrigen Einflüsse bleiben gleich." },
                  { term: "Pearson r", text: "Der lineare Zusammenhang, von −1 bis +1. Nahe an 1 ist eine enge Gerade und noch kein Beweis für eine Ursache." },
                  { term: "R²", text: "Der Anteil der Streuung, den die Gerade beschreibt." },
                  { term: "Spearman", text: "Der Zusammenhang der Ränge. Passend, wenn die Abstände ungleich sind oder ein Ausreißer die Gerade verzerrt." },
                  { term: "Logistische Regression", text: "Die Zielgröße ist ja oder nein. Das Ergebnismaß ist die Odds Ratio. exp(β) ist der Faktor pro Einheit von x. Liegt die 1 im 95-Prozent-Intervall, ist der Effekt zum Niveau 5 Prozent nicht signifikant.", formula: "Wahrscheinlichkeit = exp(β0 + β1·x) / (1 + exp(β0 + β1·x))" }
                ]
              },
              {
                title: "Überleben",
                cards: [
                  { term: "Zensierung", text: "Du weißt nur: mindestens bis hier. Die Zeit zählt mit, das Ereignis zählst du nicht, und danach ist die Person nicht mehr unter Risiko." },
                  { term: "Kaplan-Meier", text: "Eine Treppe für den Anteil ohne Ereignis. Sie fällt bei Ereignissen. Der Median ist der Schnitt mit 50 Prozent." },
                  { term: "Log-Rank", text: "Vergleicht zwei Treppen. Der p-Wert sagt, ob sie sich unterscheiden." },
                  { term: "Hazard Ratio", text: "Das Verhältnis der momentanen Ereignisraten. 1 heißt: die Raten sind gleich. Die Odds Ratio vergleicht Chancen, die Hazard Ratio vergleicht Raten." }
                ]
              },
              {
                title: "Kürzel und Leitlinien",
                cards: [
                  { term: "KIS, LIS, RIS, PACS, PDMS", text: "Zentrale des Krankenhauses, Labor, Radiologie, Bilderschrank, Akte auf der Intensivstation." },
                  { term: "ICD, OPS, DRG, LOINC, SNOMED, MeSH", text: "Diagnosen, Prozeduren, Fallpauschale, Laborwerte, klinische Begriffe, Suchwörter für die Literatur." },
                  { term: "HL7, FHIR, DICOM, IHE", text: "Nachrichten zwischen Systemen, dasselbe in moderner Form, Bilddaten, und die Abläufe, die festlegen, wie die Standards zusammenarbeiten." },
                  { term: "Anonym und pseudonym", text: "Anonym: der Name ist verbrannt. Pseudonym: die Nummer steht auf der Akte, der Name liegt getrennt im Tresor." },
                  { term: "Hashfunktion", text: "Ein Fingerabdruck der Daten. Ändert sich ein Zeichen, ändert sich der Abdruck. So prüfst du, ob etwas unverändert ist." },
                  { term: "S1, S2k, S2e, S3", text: "S1 ist ein informeller Konsens. S2k ist ein formaler Konsens. S2e ist die systematische Suche nach Studien. S3 ist beides: Studien und formaler Konsens." }
                ]
              },
              {
                title: "Schwere Wörter",
                cards: [
                  { term: "trifft nicht zu", text: "Gesucht ist der falsche Satz. Die übrigen Aussagen stimmen." },
                  { term: "gegeben", text: "Der Nenner ist nur diese Gruppe." },
                  { term: "bezogen auf", text: "Die Gruppe hinter diesen Worten ist der Nenner." },
                  { term: "höchstens / mindestens", text: "Höchstens ist die obere Grenze, einschließlich der Zahl. Mindestens ist die untere Grenze, einschließlich der Zahl." },
                  { term: "unabhängig", text: "Das eine ändert die Chance des anderen nicht. Dann darfst du die Wahrscheinlichkeiten malnehmen." },
                  { term: "adjustiert", text: "Ein weiterer Faktor ist herausgerechnet." },
                  { term: "Stichprobe", text: "Nur die gemessenen Personen, nicht alle Menschen." },
                  { term: "Sollwert", text: "Die feste Vergleichszahl, gegen die du prüfst." },
                  { term: "Zielgröße und Einflussgröße", text: "Die Zielgröße ist das, was du erklären willst. Die Einflussgröße ist das, womit du erklärst." },
                  { term: "stetig und binär", text: "Stetig kann fein abgestuft sein, wie Körpergröße. Binär hat zwei Ausgänge, ja oder nein." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        nav: "Klausurtrainer",
        kicker: "Übungsblöcke",
        title: "Multiple Choice",
        blocks: []
      }
    ],
    designItems: [
      { text: "An einem Nachmittag befragst du 200 Menschen in der Ambulanz, wer aktuell raucht und wer erhöhten Blutdruck hat.", bin: "querschnitt" },
      { text: "Du vergleichst 80 Menschen mit Lungenkrebs und 80 ohne und fragst nach dem Rauchen der letzten 20 Jahre.", bin: "fall" },
      { text: "Du begleitest 2000 Raucher und Nichtraucher über 15 Jahre und zählst neue Lungenkrebsfälle.", bin: "kohorte" },
      { text: "Zufällig erhält die Hälfte ein neues Schmerzmittel, die andere Placebo. Nach vier Wochen vergleichst du die Schmerzskala.", bin: "rct" },
      { text: "Aus alten Akten prüfst du, ob Menschen mit schon bekanntem Bluthochdruck später häufiger einen Schlaganfall hatten.", bin: "kohorte" },
      { text: "Die Krankheit ist sehr selten. Du suchst Betroffene und eine Vergleichsgruppe ohne die Krankheit.", bin: "fall" }
    ],
    matchPairs: [
      { term: "KIS", def: "Krankenhausinformationssystem" },
      { term: "LIS", def: "Laborsystem" },
      { term: "RIS", def: "Radiologieinformationssystem" },
      { term: "PACS", def: "Archiv für medizinische Bilder" },
      { term: "PDMS", def: "Dokumentation auf der Intensivstation" },
      { term: "ICD", def: "Klassifikation der Diagnosen" },
      { term: "OPS", def: "Klassifikation der Prozeduren" },
      { term: "LOINC", def: "Kodes für Laboruntersuchungen" },
      { term: "SNOMED CT", def: "Systematik klinischer Begriffe" },
      { term: "MeSH", def: "Schlagwörter für die Literatursuche" },
      { term: "HL7", def: "Standard für Nachrichten zwischen Kliniksystemen" },
      { term: "FHIR", def: "moderne Schnittstelle für Gesundheitsdaten" },
      { term: "DICOM", def: "Standard für Bilddaten" },
      { term: "Anonym", def: "Personenbezug nicht mehr herstellbar" },
      { term: "Pseudonym", def: "Name ersetzt, mit Schlüssel wiederherstellbar" }
    ],
    cards: [
      { front: "KIS", back: "Krankenhausinformationssystem. Technik, Personal und Abläufe zusammen." },
      { front: "PACS", back: "Bildarchiv, meist neben dem RIS der Radiologie." },
      { front: "ICD-10-GM", back: "Diagnosen. Der behandelnde Arzt kodiert." },
      { front: "OPS", back: "Operationen und Prozeduren." },
      { front: "DRG", back: "Fallpauschale. Der Grouper setzt Hauptdiagnose, Prozeduren und weitere Merkmale zusammen." },
      { front: "ePA", back: "Elektronische Patientenakte." },
      { front: "Anonym", back: "Ein Bezug zur Person ist nicht mehr herstellbar." },
      { front: "Pseudonym", back: "Der Name ist ersetzt. Mit einem separaten Schlüssel lässt sich die Person wiederherstellen." },
      { front: "Zweckbindung", back: "Personenbezogene Daten nur für den angegebenen Zweck." },
      { front: "Datensparsamkeit", back: "Nur so viele Daten erheben, wie für den Zweck nötig sind." },
      { front: "DICOM", back: "Standard für radiologische Bilder." },
      { front: "MeSH", back: "Kontrolliertes Vokabular, mit dem PubMed die Literatur erschließt." },
      { front: "S3-Leitlinie", back: "Höchste AWMF-Stufe: systematische Evidenz und formaler Konsens." },
      { front: "Recall und Präzision", back: "Recall: wie viel vom relevanten Bestand die Suche findet. Präzision: wie viel von den Treffern relevant ist." }
    ],
    quiz: [
      {
        id: "b1-designs",
        block: 1,
        title: "Studiendesigns",
        prompt: "Welche der folgenden Aussagen trifft nicht zu?",
        options: [
          "Studien können grundsätzlich in prospektive und retrospektive Studien eingeteilt werden.",
          "Randomisierte kontrollierte Studien eignen sich am ehesten zum Nachweis kausaler Zusammenhänge.",
          "Kohortenstudien sind immer retrospektiv.",
          "In Querschnittsstudien wird der Ist-Zustand zu einem einzigen Zeitpunkt erfasst.",
          "In Fall-Kontroll-Studien werden in der Regel zwei Gruppen betrachtet."
        ],
        answer: 2,
        why: "Gesucht ist die falsche Aussage. Kohortenstudien können prospektiv oder retrospektiv sein. Die anderen vier Aussagen stimmen."
      },
      {
        id: "b1-demenz",
        block: 1,
        title: "Ernährung und Demenz",
        prompt: "Du willst die Assoziation zwischen Ernährung und neurodegenerativen Erkrankungen untersuchen. Welche Aussage trifft zu?",
        options: [
          "Nur eine randomisierte Phase-3-Studie kann Assoziationen untersuchen.",
          "Bei einer Fall-Kontroll-Studie sollten Drop-outs nach Studienbeginn eingeplant werden.",
          "Bei niedriger Prävalenz sollte eine Kohortenstudie durchgeführt werden.",
          "Nur eine Fall-Kontroll-Studie kann das Erkrankungsrisiko schätzen.",
          "Bei einer Fall-Kontroll-Studie ist die Gefahr für einen Recall-Bias hoch."
        ],
        answer: 4,
        why: "Die Exposition wird rückblickend erfragt. Erkrankte erinnern sich oft anders als Gesunde. Bei seltener Krankheit ist die Fall-Kontroll-Studie effizienter als die Kohorte, und die Inzidenz schätzt eher die Kohorte."
      },
      {
        id: "b1-observer",
        block: 1,
        title: "Observer-Bias",
        prompt: "Welche Strategie hilft gegen einen Observer-Bias?",
        options: [
          "Matching",
          "Doppelverblindung",
          "Randomisierung",
          "Gründe für frühzeitiges Ausscheiden erfassen",
          "Keine der genannten Strategien"
        ],
        answer: 1,
        why: "Doppelverblindung hindert das Studienpersonal daran, das Ergebnis unbewusst nach der Gruppenzugehörigkeit zu bewerten. Matching und Randomisierung zielen auf Confounding, die Drop-out-Gründe auf einen anderen Bias."
      },
      {
        id: "b1-pflege",
        block: 1,
        title: "Pflegestufen",
        prompt: "Pflegebedürftige werden über ein Punktesystem in Stufen von „keine“ bis 5 eingeteilt. Die Abstände zwischen den Stufen sind nicht gleich interpretierbar. Welche Aussage trifft zu?",
        options: [
          "Es handelt sich um eine Nominalskala.",
          "Es handelt sich um eine Ordinalskala.",
          "Es handelt sich um ein dichotomes Merkmal.",
          "Es handelt sich um eine Verhältnisskala.",
          "Das Merkmal lässt sich auf keiner dieser Skalen darstellen."
        ],
        answer: 1,
        why: "Die Stufen haben eine Rangfolge, die Abstände sind aber nicht gleichmäßig interpretierbar. Mehr als zwei Ausprägungen, also nicht dichotom. Ein echter Nullpunkt mit interpretierbaren Verhältnissen fehlt."
      },
      {
        id: "b1-alter",
        block: 1,
        title: "Merkmal Alter",
        prompt: "Ein Histogramm des Alters ist annähernd symmetrisch mit Schwerpunkt um 60 Jahre. Die Werte reichen etwa von 35 bis 85, die meisten liegen grob zwischen 40 und 80. Welche Angaben sind daran gemessen eindeutig fehlerhaft? (A) Mittelwert 60,2 (B) Median 40 (C) Spannweite 80 (D) IQR 60 (E) Standardabweichung 9,9",
        options: [
          "Nur (A) ist eindeutig fehlerhaft.",
          "Nur (C) ist eindeutig fehlerhaft.",
          "Nur (C) und (D) sind eindeutig fehlerhaft.",
          "(A), (B) und (E) sind eindeutig fehlerhaft.",
          "(B), (C) und (D) sind eindeutig fehlerhaft."
        ],
        answer: 4,
        why: "Bei einer symmetrischen Verteilung liegt der Median nahe am Mittelwert, 40 ist zu niedrig. Die Spannweite beträgt etwa 50, nicht 80. Der IQR muss kleiner sein als die Spannweite. Mittelwert 60 und SD 9,9 passen zum Bild."
      },
      {
        id: "b1-cox",
        block: 1,
        title: "Kardiovaskuläre Ereignisse",
        prompt: "Unter Cox-2-Hemmer hatten 46 von 1287 Personen ein Ereignis, unter Placebo 26 von 1299. Wie hoch war die Chance eines Ereignisses unter Therapie im Verhältnis zur Chance unter Placebo?",
        options: [
          "OR = 3,92",
          "OR = 1,81",
          "RR = 3,92",
          "RR = 2,81",
          "Wegen fehlender Inzidenz nicht berechenbar."
        ],
        answer: 1,
        why: "Gefragt ist die Chance, also die Odds Ratio: (46/1241) / (26/1273) ≈ 1,81. Alle nötigen Zahlen stehen in der Tabelle. Das relative Risiko liegt ebenfalls nahe 1,8, die Antwort mit RR = 1,81 wird aber nicht angeboten."
      },
      {
        id: "b1-korr",
        block: 1,
        title: "Korrelation und Boxplots",
        prompt: "Die Lebenserwartung von 25 Ländern steigt von 1952 nach 2007 fast überall, und Länder, die 1952 oben lagen, liegen 2007 tendenziell wieder oben. Welche Aussage trifft zu?",
        options: [
          "Spearman ist kleiner als null, Pearson größer als null.",
          "Spearman ist größer als null, Pearson kleiner als null.",
          "Spearman und Pearson sind beide größer als null.",
          "Zu beiden Koeffizienten lässt sich nichts sagen.",
          "Spearman und Pearson sind beide kleiner als null."
        ],
        answer: 2,
        why: "Die Rangfolge bleibt weitgehend erhalten, also ist Spearman positiv. Auch der metrische Zusammenhang zeigt nach oben, also ist Pearson positiv."
      },
      {
        id: "b2-asthma",
        block: 2,
        title: "Asthma und Neurodermitis",
        prompt: "A ist Asthma in den ersten sechs Lebensjahren, N ist Neurodermitis. Es gilt P(A) < P(N). Beide Ereignisse treten häufig gemeinsam auf. Welche Aussage trifft zu?",
        options: [
          "P(A) < P(N und A)",
          "P(A oder N) = P(N)",
          "P(A oder N) = P(A) + P(N)",
          "P(A und N gegeben N) = P(A gegeben N)",
          "A und N sind stochastisch unabhängig."
        ],
        answer: 3,
        why: "Wer schon Neurodermitis hat und zusätzlich beide Krankheiten hat, ist genau die Gruppe mit Asthma gegeben Neurodermitis. Die Schnittmenge kann nicht wahrscheinlicher sein als A. Weil die Ereignisse gemeinsam auftreten, fehlt im Additionssatz die Schnittmenge, und Unabhängigkeit gilt nicht."
      },
      {
        id: "b2-test",
        block: 2,
        title: "Diagnose nach Verdacht",
        prompt: "Ein Test hat eine Sensitivität von 0,875 und eine Spezifität von 0,905. Welche Aussage trifft zu?",
        options: [
          "Wenn der Patient krank ist, beträgt die Wahrscheinlichkeit für ein positives Testergebnis 0,99.",
          "Wenn der Patient krank ist, ist ein falsch negatives Ergebnis wahrscheinlicher als ein positives.",
          "Wenn der Patient gesund ist, beträgt die Wahrscheinlichkeit für ein positives Testergebnis 0,875.",
          "Fällt der Test positiv aus, kann der Patient trotzdem gesund sein.",
          "Fällt der Test negativ aus, ist der Verdacht mit Sicherheit unbegründet."
        ],
        answer: 3,
        why: "Ein positiver Test kann falsch positiv sein, solange die Spezifität nicht 1 ist. Die Sensitivität ist 0,875, nicht 0,99. Die Falsch-positiv-Rate ist 1 − 0,905 = 0,095. Ein negatives Ergebnis schließt die Krankheit nicht sicher aus."
      },
      {
        id: "b2-groesse",
        block: 2,
        title: "Körpergröße",
        prompt: "Bei 96 Studierenden ist der Mittelwert 169,3 cm, das 95-Prozent-Konfidenzintervall [163,3; 175,3]. Welche Aussage trifft zu?",
        options: [
          "Eine Verdoppelung des Stichprobenumfangs würde das Intervall breiter machen.",
          "Die Wahrscheinlichkeit, dass der Stichprobenmittelwert im Intervall liegt, beträgt 95 Prozent.",
          "Das 90-Prozent-Konfidenzintervall wäre breiter als das angegebene.",
          "Eine Halbierung der Stichprobenvarianz führt zu einem schmaleren Intervall.",
          "Mit 95 Prozent Wahrscheinlichkeit liegt die Körpergröße eines Studierenden in diesem Intervall."
        ],
        answer: 3,
        why: "Weniger Streuung bedeutet ein schmaleres Intervall. Mehr Personen machen es ebenfalls schmaler, ein 90-Prozent-Intervall ist schmaler als ein 95-Prozent-Intervall. Der Stichprobenmittelwert liegt immer im Intervall, das um ihn gebaut wurde. Das Intervall beschreibt den Mittelwert der Population, nicht die einzelne Körpergröße."
      },
      {
        id: "b2-kalium",
        block: 2,
        title: "Kaliumwert",
        prompt: "Bei 50 Personen wird der Kaliumwert vor und nach einem Medikament mit einem zweiseitigen t-Test für verbundene Stichproben geprüft, α = 0,05. Es ergibt sich p = 0,0263. Welche Aussage trifft zu?",
        options: [
          "Das Testergebnis ist nicht signifikant, weil p > α.",
          "Mit Wahrscheinlichkeit 0,0263 ist die Alternativhypothese wahr.",
          "Die Größe des p-Wertes sagt nichts über die Größe des wahren Effekts.",
          "Mit Wahrscheinlichkeit 0,0263 ist die Nullhypothese wahr.",
          "Aus dem p-Wert folgt, dass das Konfidenzintervall für die Differenz die 0 enthält."
        ],
        answer: 2,
        why: "p liegt unter 0,05, das Ergebnis ist signifikant, und die 0 liegt deshalb nicht im passenden 95-Prozent-Intervall. Der p-Wert ist keine Wahrscheinlichkeit für die Hypothesen und kein Maß für die Effektgröße."
      },
      {
        id: "b3-pms",
        block: 3,
        title: "PMS und Serotonin",
        prompt: "Serotonin in µg/l ist normalverteilt. Sekundäre Frage: Sinkt der Wert bei Frauen mit PMS nach dem Eisprung? Welches Vorgehen passt am besten?",
        options: [
          "t-Test für verbundene Stichproben mit den Werten vor und nach dem Eisprung, nur bei Frauen mit PMS.",
          "McNemar-Test mit den Kategorien niedrig/mittel/hoch und der Gruppenzugehörigkeit PMS/kein PMS.",
          "Mann-Whitney-U-Test mit den Werten nach dem Eisprung bei Frauen mit und ohne PMS.",
          "Binomialtest für die Werte nach dem Eisprung bei Frauen mit PMS.",
          "Exakter Test nach Fisher mit Gruppenzugehörigkeit und Serotoninkategorie nach dem Eisprung."
        ],
        answer: 0,
        why: "Dieselben Frauen, ein stetiges normalverteiltes Merkmal, zwei Zeitpunkte: verbundener t-Test. Die anderen Vorschläge ziehen die Gruppe ohne PMS hinein oder machen aus dem Messwert eine Kategorie."
      },
      {
        id: "b3-haut",
        block: 3,
        title: "Neurodermitis",
        prompt: "Von 80 Jungen haben 11 einen positiven serologischen Befund, 69 einen negativen. Von 120 Mädchen haben 33 einen positiven und 87 einen negativen. Der Chi-Quadrat-Test liefert 5,29, der kritische Wert ist 3,84 (α = 0,05). Welche Aussage trifft zu?",
        options: [
          "Die Alternativhypothese ist mit einer Wahrscheinlichkeit von 5,29 Prozent korrekt.",
          "Die relative Häufigkeit eines positiven Befundes ist bei Jungen größer als bei Mädchen.",
          "Es gibt einen statistisch signifikanten Zusammenhang zwischen Befund und Geschlecht.",
          "Der passende Test wäre der McNemar-Test.",
          "Der p-Wert ist größer als 3,84."
        ],
        answer: 2,
        why: "5,29 liegt über 3,84, also ist das Ergebnis signifikant. Bei Jungen sind 11/80 = 13,8 Prozent positiv, bei Mädchen 33/120 = 27,5 Prozent. Der McNemar-Test ist für verbundene Stichproben. Ein p-Wert liegt zwischen 0 und 1."
      },
      {
        id: "b3-seh",
        block: 3,
        title: "Sehschärfe",
        prompt: "Du planst die Fallzahl für einen t-Test zweier unverbundener Gruppen: Nahrungsergänzungsmittel gegen Placebo, Zielgröße Sehschärfe. Was geht nicht in die Fallzahlplanung ein?",
        options: [
          "Der angenommene Unterschied zwischen den Gruppen.",
          "Die angenommene Standardabweichung.",
          "Ein festgelegtes Signifikanzniveau.",
          "Eine festgelegte Power.",
          "Der angenommene p-Wert für den Unterschied."
        ],
        answer: 4,
        why: "Unterschied, Streuung, α und Power legt du vor der Studie fest. Der p-Wert wird erst aus den erhobenen Daten berechnet."
      },
      {
        id: "b3-resid",
        block: 3,
        title: "Residuen",
        prompt: "In einer einfachen linearen Regression mit 500 Beobachtungen zeigen die Residuen ein klares gebogenes Muster: bei niedrigen und hohen geschätzten Werten weichen sie systematisch von null ab, in der Mitte weniger. Welche Aussage trifft zu?",
        options: [
          "Die Grafik zeigt, dass es keinen Zusammenhang zwischen x und y gibt.",
          "Weil die Residuen nicht normalverteilt sind, sollte eine logistische Regression gerechnet werden.",
          "Die Grafik weist auf einen nicht-linearen Zusammenhang zwischen x und y hin.",
          "Alle Punkte mit y < 10 oder y > 50 sollten als Ausreißer entfernt werden.",
          "Die Grafik zeigt eine hinreichend gute Anpassung des Modells."
        ],
        answer: 2,
        why: "Ein systematisches Muster spricht gegen eine Gerade. Die Wahl linear oder logistisch hängt an der Zielgröße, nicht an diesem Plot. Viele extreme y-Werte sind hier kein Grund, sie zu streichen."
      },
      {
        id: "b3-lunge",
        block: 3,
        title: "Lungenkapazität",
        prompt: "Modell: Lungenvolumen = 6,0 − 0,08·Cadmium − 0,04·Alter. Cadmium ist 0 oder 1, Alter in Jahren. Welche Aussage ist falsch?",
        options: [
          "Für einen 40-Jährigen ohne Cadmium-Exposition schätzt das Modell 4,4 Liter.",
          "Alter und Cadmium-Exposition reduzieren laut Modell die Lungenkapazität.",
          "Das Modell nimmt an, dass das Alter in beiden Expositionsgruppen denselben Effekt hat.",
          "Im Vergleich zum Alter hat die Cadmium-Exposition etwa den doppelten Erklärungswert.",
          "Unabhängig vom Alter reduziert Cadmium die Lungenkapazität im Mittel um 0,08 Liter."
        ],
        answer: 3,
        why: "6 − 0,04·40 = 4,4. Beide Koeffizienten sind negativ, und ohne Interaktion wirkt das Alter in beiden Gruppen gleich. Aus der Größe der Koeffizienten allein folgt kein Erklärungswert, weil die Einflussgrößen verschieden skaliert sind: Jahre gegen ja/nein."
      },
      {
        id: "b3-gewicht",
        block: 3,
        title: "Übergewicht",
        prompt: "Logistische Regression, Zielgröße Übergewicht mit 5 Jahren. Geburtsgewicht: β = 0,09, exp(β) = 1,09, 95-Prozent-Intervall 1,04 bis 1,15. Geschlecht männlich: β = 0,02, exp(β) = 1,02, Intervall 0,96 bis 1,08. Welche Aussage trifft zu?",
        options: [
          "Für ein Mädchen mit 4000 g Geburtsgewicht ist die Wahrscheinlichkeit −0,19 + 4·0,09 = 17 Prozent.",
          "Die Chance für Übergewicht steigt laut Modell um den Faktor 1,09 pro kg Geburtsgewicht.",
          "Das Geschlecht hat zum Niveau 0,05 einen signifikanten Effekt.",
          "Mädchen haben bei gleichem Geburtsgewicht eine höhere Wahrscheinlichkeit als Jungen.",
          "Dasselbe Modell lässt sich für 10-jährige Kinder verwenden."
        ],
        answer: 1,
        why: "exp(β) = 1,09 ist der Faktor für die Chance pro Kilogramm. Die lineare Summe ist keine Wahrscheinlichkeit der logistischen Regression. Das Intervall für das Geschlecht enthält die 1, der Effekt ist zum Niveau 5 Prozent nicht signifikant. Der Koeffizient für Jungen ist positiv."
      },
      {
        id: "b3-aki",
        block: 3,
        title: "Akuter Nierenschaden",
        prompt: "Retrospektiv werden 300 Personen mit Herzinfarkt untersucht, 190 mit akutem Nierenschaden und 110 ohne. Risikofaktoren sind unter anderem Alter, Blutdruck und Laborwerte. Welche Analyse passt?",
        options: [
          "Multiple logistische Regression mit Nierenschaden ja/nein als Zielgröße und den Risikofaktoren als Einflussgrößen.",
          "Chi-Quadrat-Test zwischen Nierenschaden ja/nein und Herzinfarkt ja/nein.",
          "Multiple logistische Regression mit Herzinfarkt als Zielgröße.",
          "Multiple lineare Regression mit Nierenschaden ja/nein als Zielgröße.",
          "Verbundener t-Test für jeden Risikofaktor bezüglich des Nierenschadens."
        ],
        answer: 0,
        why: "Die Zielgröße ist binär, mehrere Risikofaktoren sollen gleichzeitig hinein. Alle Personen haben einen Herzinfarkt, ein Test auf Herzinfarkt läuft also ins Leere. Lineare Regression erwartet eine stetige Zielgröße. Die Beobachtungen sind unabhängig, kein verbundener Test."
      }
    ]
  };
}());
