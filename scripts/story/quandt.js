const strings = {
	push_bild : "Eine Push-Benachrichtigung von BILD.de erscheint auf deinem Handy.",
	push_welt : "Eine Push-Benachrichtigung von WELT.de erscheint auf deinem Handy.",
}

const conditions = {
	springer_evil : (game) => !game.page_visited('springer'),
	springer_good : (game) => game.page_visited('springer'),
}

const choices = {
	phase1 : ['homeless', 'hartziv', 'wind','springer','taxes','phase2'],
	phase2 : ['fdp', 'australia','toll','wikipedia','homeopathy', 'exit','phase3'],
	phase3 : ['throw', 'turn_self_in'],
	end : ['reallyquandt','print']
}

const springer_pages = ['hartziv_bild','homeless_bild','taxes_welt','australia_bild','wind_bild']

const pages = {
start : {
	text : "Als du eines Morgens aus unruhigen Träumen erwachst, fühlst du dich in deinem Bett auf ungeheure Weise verwandelt.",
	choices : [ { page : 'youare', hide_cost : true } ],
},

youare : {
	title : "Du bist Stefan Quandt",
	cost : -18.5e9,
	text : ["Stefan Quandts Angestellte sind jetzt deine Angestellten. Sein Geld ist jetzt dein Geld. Nichts, das du sagst oder tust, "
	        +"wird irgendwen überzeugen, dass du nicht der BMW-Großaktionär Stefan Quandt bist.", "Was tust du?"],
	choices : [ {page : 'bathroom', hide_cost : true }, 'scream', 'phase1'],
},

bathroom : {
	cost : -10*1e3,
	title : "Ich gehe auf's Klo.",
	text : "In den zehn Minuten, die du auf dem Klo verbringst, wirst du, Stefan Quandt, durch BMW-Dividendenzahlungen um 10.000 € reicher. Das ist etwas mehr als die Gewinnbeteiligung, die ein BMW-Facharbeiter in einem ganzen Jahr erhält.",
	choices : ['shit'],
},

shit : {
	title : "Ach du Scheiße.",
	text : ["Ja, beängstigend, oder?",
			"Wenn du vierundzwandzig Stunden pro Tag arbeiten könntest und dafür einen Stundenlohn von eintausend Euro bekämst, " 
			+ "müsstest du über zweitausend Jahre ohne Wochenenden oder Feiertage arbeiten, um so reich wie Stefan Quandt zu werden."],
	choices : ['getrid','bathroom_again']
},

bathroom_again : {
	title : "Ich gehe noch mal auf's Klo.",
	text : "Netter Versuch.",
	choices : [{page : 'getrid', text : "Und wohin jetzt mit dem ganzen Geld?"}]
},

getrid : {
	title : "Wie werde ich die ganze Kohle wieder los?",
	text : "Du kannst das Geld nicht behalten, investieren oder mehr verdienen. Du musst es ausgeben.",
	choices : ['inefficient',{page:'phase1',text:'Na gut.'}]
},

inefficient : {
	title : "Aber das ist eine total ineffiziente Nutzung von Kapital!",
	text : ["Klar, und Stefan Quandt hat das Geld auch nicht in bar in einem riesigen Geldspeicher herumliegen, es ist in diverse Firmen investiert. "
		+   "Aber darum geht es hier nicht.", "Es geht darum, Stefan Quandts **ganzes verdammtes Geld auszugeben!**"],
	choices : [{page:'phase1',text:'Okay, dann los.'}]
},

scream : {
	title : "Ich schreie.",
	text : ["Du schreist dir die Seele aus dem Leib, doch es hilft nichts.", "Du bist immer noch der BMW-Großaktionär Stefan Quandt."],
	choices : ['phase1']
},

phase1 : {
	title : "Ich gebe sein ganzes verdammtes Geld aus.",
	text : "Stefan Quandts aktuelles Vermögen wird oben angezeigt. Hier sind ein paar Sachen, für die du es ausgeben könntest:",
	choices : choices.phase1,
	revisitable: true,
	redirect: 'phase1_2',
},

phase1_2 : {
	title : "Ich gebe sein ganzes verficktes Geld aus.",
	text : ["Auf deinem Handy siehst du zwei verpasste Anrufe, einen von deiner (noch reicheren) Schwester und einen von deinem Steuerberater. Du ignorierst sie.",
	        "Zeit, noch mehr Geld auszugeben:"],
	choices : choices.phase1,
	redirect: 'phase1_3'
},

phase1_3 : {
	text : ["Auf deinem Handy siehst du zwei verpasste Anrufe, einen von deiner (noch reicheren) Schwester und einen von deinem Steuerberater. Du ignorierst sie.",
	        "Zeit, noch mehr Geld auszugeben:"],
	choices : choices.phase1,
},

hartziv : {
	cost : 4e6 * 100 * 12 * 2,
	title : "Hartz IV für zwei Jahre um 100 € pro Monat erhöhen",
	text : ["[Ungefähr vier Millionen Menschen](https://de.statista.com/statistik/daten/studie/1396/umfrage/leistungsempfaenger-von-arbeitslosengeld-ii-jahresdurchschnittswerte/) "
	+ "in Deutschland beziehen Arbeitslosengeld II, umgangssprachlich Hartz IV genannt. [Oft reicht das Geld kaum zum Leben](https://www.zeit.de/gesellschaft/zeitgeschehen/2018-03/hartz-iv-leser-antworten-armut-jens-spahn), " 
	+ "insbesondere wenn beispielsweise durch eine Krankheit oder einen Unfall plötzlich unerwartete Kosten auftreten. "
	+ "Die Behandlung durch das Jobcenter empfinden viele als demütigend, und vor dem [Einschreiten des Bundesverfassungsgerichts](https://www.zdf.de/nachrichten/heute/verfassungsgericht-urteil-zu-hartz-iv-sanktionen-100.html) "
	+ "konnte das Arbeitslosengeld im Rahmen von Sanktionen unter Umständen vollständig gekürzt werden, so dass Menschen, "
	+ "die darauf angewiesen waren, nicht einmal Miete und Heizung bezahlen konnten.",
	"Dein Geld kann diesen Menschen helfen, in Würde und ohne Angst vor dem nächsten Tag zu leben."],
	choices : ['hartziv_bild']
},

hartziv_bild: {
	//condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Faulenzer-Prämie", "Gaga-Milliardär verschenkt Geld an Hartz-IV-Faulenzer",
			"![Diverse Geldscheine und Münzen](bild/geld.jpg)**Kriegen Hartz-IV-Empfänger bald noch mehr Geld für's Nichtstun?**<br>[Foto: Avij / Public Domain (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"BMW-Milliardär Stefan Quandt will Arbeitslosen Geld schenken. 200 Euro zusätzlich im Monat sollen Hartz-IV-Faulenzer demnächst bekommen.",
			"**Wenn Sie das ungerecht finden, weil Sie für ihr Geld hart arbeiten müssen, dann sagen sie ihm die Meinung!**",
			"Exklusiv bei BILDplus verraten wir Ihnen seine Telefonnummer, damit Sie ihm sagen können, was sie von dieser ungerechten Aktion halten.",
		  	"**FDP-Chef Christian Lindner sagte gegenüber BILD:**",
		  	"„Das ist ein Schlag ins Gesicht für jeden, der arbeitet. Leistung muss belohnt werden! Das Leben ist kein Wunschkonzert und nicht jeder kann einen Job haben der Spaß macht. "
		  	+ "**Man kann den Leuten nicht einfach sagen: 'Du bekommst hier 1.000 Euro überwiesen, wir lassen dich in Ruhe, setz dich auf die Couch, geh zum Aldi, guck RTL II.'** "
		  	+ "Die FDP möchte Arbeitslosigkeit bekämpfen, indem Arbeitsplätze geschaffen werden, aber wer würde denn für Mindestlohn arbeiten, wenn man ohne Job "
		  	+ "ein würdevolles Leben haben könnte? Das greift den Kern des Arbeitsmarkts und damit unseren Wohlstand an! Wie sollen Unternehmen Gewinne machen, wenn sie höheren Lohn zahlen müssen?"
		  	+ " Herr Quandt ist hier offensichtlich der Linkspartei auf die Leimspur gegangen.“"],
	choices: [{page : 'phase1', text : "Fuck."}]
},

homeless : {
	cost : 1e5 * 50 * 2000, //https://www.dabonline.de/2018/04/30/die-preisfrage-bezahlbar-wohnungsbau-mietwohnungen-sozialwohnungen/
	title : "100.000 Wohnungen für Wohnungslose bauen",
	text : ["[Im Jahr 2018 hatten in Deutschland fast 700.000 Menschen mindestens zeitweise keine eigene Wohnung, 41.000 lebten auf der Straße.](https://www.bagw.de/de/presse/show/news.8475.html)",
			"2018 hat der Bund [1,5 Milliarden Euro](https://www.bundeshaushalt.de/#/2018/soll/ausgaben/einzelplan/060488202.html) für Wohnraumförderung ausgegeben "
		  + "und es wurden [27.000 Sozialwohnungen gebaut.](https://www.zeit.de/politik/deutschland/2019-06/wohnungsbau-sozialwohnungen-neubauten-bund-foerderung) "
		  + "Obwohl damit das [eigene Ziel der großen Koalition](https://www.zeit.de/wirtschaft/2018-05/sozialer-wohnungsbau-baukindergeld-mietpreisbremse-hausbau) aus **CDU** und **SPD** verfehlt wurde, "
		  + "soll die Förderung für 2020 auf eine Millarde Euro reduziert werden.",
			"Wer so wie du, Stefan Quandt, [zehn Millionen Euro für ein Ferienhaus ausgibt](https://www.tt.com/wirtschaft/standorttirol/11779623/bmw-erben-auf-einkaufstour-in-kitz), "
		  + "darf hier nicht tatenlos zusehen, denn das wäre herzlos und moralisch nicht vertretbar. ",
			"Du entscheidest dich, 100.000 Wohnungen für wohnungslose Menschen zu bauen. Dabei planst du natürlich nicht, wie es bei sozialem Wohnungsbau sonst oft üblich ist, dass deine Wohnungen in zehn oder zwanzig jahren aus der Sozialbindung fallen "
		  + "und du für Wohnungen, die mit öffentlichen Geldern finanziert wurden, fette Mieten kassieren kannst, und du wirst auch nicht versuchen, [dich aus deiner Verpflichtung freizuklagen](https://www.zeit.de/wirtschaft/2019-02/bgh-urteil-sozialwohnungen-bundesgerichtshof-genossenschaft-sozialbindung). "
		  + "Deine Wohnungen bleiben für die bedürftigsten Menschen dauerhaft kostenlos. Zehn Prozent vermietest du günstig, und mit den jährlichen zweistelligen Millioneneinnahmen aus den Mieten "
		  + "gründest du die *Stiftung gegen Obdachlosigkeit und zynische Innenpolitik*, die sich um die Vergabe und Instandhaltung der Wohnungen kümmert."],
	choices : ['homeless_bild']
},

homeless_bild: {
	//condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Er verschenkt einfach Häuser", "Gaga-Milliardär verschenkt Häuser an Hartz-IV-Faulenzer",
			"![Ein riesiges, luxuriöses Haus mit Swimming-Pool, vor dem ein blauer Sportwagen parkt](bild/house.jpg)**Wohnt so bald jeder Hartz-IV-Empfänger?**<br>[Foto: © Kougbadi / $CC-BY-SA-4.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"BMW-Milliardär Stefan Quandt will 100.000 Wohnungen bauen und an „Bedürftige“ verschenken, und die Kommunen überschlagen sich mit Angeboten von Steuervorteilen und günstigem Bauland, um das Projekt an Land zu ziehen. Doch wer davon profitiert ist unklar.",
			"**Denn viele der Wohnungslosen in Deutschland sind Flüchtlinge oder Hartz-IV-Empfänger, die nicht arbeiten.**",
			"Wenn sich herumspricht, dass man in Deutschland eine Wohnung bekommt, ohne etwas dafür zu tun, "
		  	+ "könnten demnächst Einwanderer nicht nur aus Afrika nach Deutschland kommen, sondern auch aus den europäischen Nachbarländern wie Polen oder Frankreich.",
		  	"**FDP-Chef Christian Lindner sagte gegenüber BILD:**",
		  	"**„Das ist ein Schlag ins Gesicht für die mittelständischen Investoren, die mit der angespannten Lage am Wohnungsmarkt gerechnet haben"
		  	+ " und jetzt davon ausgehen müssen, dass die Mieten sinken und ihre Spekulationsobjekte an Wert verlieren. Es wäre klüger gewesen, hier den Markt wirken zu lassen.“**"],
	choices: [{page : 'phase1', text : "Seufz."}]
},

wind : {
	cost : 7e9,
	title : "1500 Windräder bauen",
	text : ["Für [4,3 Millionen Euro](https://de.wikipedia.org/wiki/Windkraftanlage#Preise) bekommt man ein sehr schönes Windrad mit einer Nennleistung von 3 Megawatt und einem Nutzungsgrad von 26 Prozent. "
			+ "Indem du (für 6,5 Milliarden Euro) 1500 davon baust, erhöst du die [Deutsche Windenergieproduktion](https://www.wind-energie.de/themen/zahlen-und-fakten/) um fast 8 % gegenüber Februar 2021, von 27 % der Gesamtstromproduktion auf 29 %.",
			"Von den etwa 500 Millionen Euro, die noch übrig sind, heuerst du eine Armee von Anwälten an, um die unsinnige Abstandsregel zu kippen, [die den Bau von Windrädern seit 2014 massiv bremst](https://www.nordbayern.de/region/studie-so-konnte-bayern-sich-komplett-mit-erneuerbaren-energien-versorgen-1.11310968), "
			+ "und um CSU-Politiker und Windkraftgegner vor Gericht hinzuhalten, während du Windräder in ihre Vorgärten baust.",
			"Auch **Armin Laschet** und seine **CDU/FDP-Landesregierung** haben jüngst in NRW wieder [demonstriert](https://w3.windmesse.de/windenergie/pm/38068-lee-nrw-nrw-armin-laschet-landtag-bundesland-koalition-flaute-ausbau-abstand-genehmigung-windenergieanlage-sachverstandige), dass sie [kein Interesse daran haben](https://www1.wdr.de/nachrichten/landespolitik/laschet-klimaschutz-kohle-nrw-100.html), die Klimakatastrophe abzuwenden, "
			+"und sollen dementsprechend eigene Windräder in ihren Gärten bekommen."],
	choices : ['wind_bild','wind_bild_good'],
},

wind_bild: {
	condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Immer mehr, immer näher, immer größer", "Windrad-Wahnsinn",
			"![Eine krude Fotomontage eines Dorfes mit etwa 35 riesigen Windrädern im Hintergrund](bild/windpark.jpg)**Unsere heimatliche Idylle ist in Gefahr.**<br>[Fotos: Dietmar Rabich / Wikimedia Commons / “Juist, Dorf -- 2014 -- 3515” / $CC-BY-SA-4.0,<br>Popolon / $CC-BY-SA-4.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"**Windbeutel Stefan Quandt will Deutschland mit Windrädern zupflastern.**",
			"Umweltschutz-Gruppen wie die „Volksinitiative Rettet die Deutschen Vögel“ und das „Bündnis Weg mit Windkraft“ haben angekündigt, dagegen zu klagen. "
			+ "Ein Sprecher der Gruppe „Radioaktiven Infraschall stoppen!“ spricht deutliche Worte:",
			"„Dieser Windrad-Hype der Gretinisierten Gutmenschen ist eine große Gefahr für unser Land! Windräder erzeugen Infraschall und der verursacht Kopfschmerzen, "
			+ "Übelkeit, Krebs und Durchfall. Sie schreddern unsere Vögel, und außerdem sind sie hässlich. Wir wollen sowas hier nicht. Ein Kohlekraftwerk ist viel umweltfreundlicher "
			+ "als ein Windrad, vorallem, weil es nicht hier ist, sondern woanders.“",
			"**CSU-Vorsitzender Markus Söder (54) sagte gegenüber BILD:**",
		  	"**„Wir halten fest an der Abstandsregel, denn sie ist unverzichtbar, um die Akzeptanz für Windräder in Bayern zu erhalten. Und das einzige Windrad, " 
		  	+ "das man in Bayern akzeptiert, ist nun mal eins, das nicht in Bayern steht, deswegen wird es im Freistaat Bayern keine neuen Windparks ge... "
		  	+ "Wie bitte? Da ist ein Bagger in meinem Vorgarten? Äh... Ich muss weg.“**"],
	choices: [{page : 'phase1', text : "Kicher."}]
},

wind_bild_good: {
	condition : conditions.springer_good,
	style : 'bild',
	title : strings.push_bild,
	text : ["Greta wäre stolz", "Stefan Quandt rettet Deutschland",
			"![Ein grünes Feld mit einigen Windrädern im Hintergrund](bild/windpark_good.jpg)**Windräder sichern die Zukunft unserer Kinder.**<br>[Foto: © Scott Davis / $CC-BY-SA-4.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"**BMW-Milliardär Stefan Quandt hat sich entschieden, die Energiewende im Alleingang durchzuziehen.**",
			"Der Milliarden-Erbe hat angekündigt, 1500 Windräder bauen zu lassen. Das ist toll, doch es ist nicht genug.",
			"**Es wäre Aufgabe der Regierung gewesen, in erneuerbare Energien zu investieren.**",
			"Doch stattdessen hält sie mit aller Kraft an der Kohle fest, vermeintlich um ein paar Arbeitsplätze zu sichern. "
			+ "Sie macht [Milliardengeschenke an Kraftwerksbetreiber](https://www.zeit.de/wirtschaft/2020-01/kohleausstieg-milliardenentschaedigungen-fuer-kraftwerksbetreiber), "
			+ "während bei den erneuerbaren Energien [80.000 Arbeitsplätze verloren gehen.](https://www.youtube.com/watch?v=gIek3bi9qvs)",
			"**Wir haben noch 10 Jahre Zeit, den Planeten zu retten.**",
			"Danach ist Schluss, die Klimakatastrophe ist dann nicht mehr aufzuhalten. Deshalb dürfen wir keine Zeit mehr verlieren.",
			"**Letztendlich muss man sagen: Greta ist stolz auf Stefan Quandt, aber enttäuscht von Deutschland.**"],
	choices: [{page : 'phase1', text : "Ach."}]
},

taxes : {
	cost : 1.7e9,
	title : "Einkommenssteuer für BMW-Dividende nachzahlen",
	text : ["2007 beschloss die große Koalition aus **CDU** und **SPD** die [*Unternehmensteuerreform*.](https://de.wikipedia.org/wiki/Unternehmensteuerreform_2008_in_Deutschland)",
			"Unter anderem hatte die Reform zur Folge, dass Kapitalerträge (wie deine BMW-Dividende) pauschal mit 25 % besteuert werden, "
			+ "anstatt wie früher in die Berechnung der Einkommenssteuer einzugehen, bei der du den Spitzensteuersatz von 45 % zahlst. "
			+ "Dieses Steuergeschenk bedeutete für dich und deine Famile alleine bei den BMW-Dividenden von 2010 bis 2020 ca. 1,7 Milliarden Euro Steuerersparnis.",
			"Übrigens erhielt die CDU völlig ohne Zusammenhang dazu zwischen 2006 und 2008 insgesamt 500.987,89 € [Parteispenden](https://lobbypedia.de/wiki/Spezial:Abfrage_ausf%C3%BChren/Parteispenden) von deiner Famile und von BMW. "
			+ "Die SPD erhielt im gleichen Zeitraum immerhin 365.052,55 € von BMW. [Bessere Renditen gibt es nirgendwo.]{strike}",
			"Solche Steuergeschenke für die Superreichen sind natürlich in keinster Weise gerecht, weshalb du den Differenzbetrag nachzahlst. "
			+"Außerdem forderst du öffentlich, dass jeder, der von dieser und anderen Ungerechtigkeiten im Steuersystem profitiert hat, es dir gleichtun soll, falls er noch einen Funken Anstand besitzt.",
			"Da du davon ausgehst, dass deine Schwester eher [kein Fan davon ist, faire Steuern zu zahlen](https://www.zeit.de/2016/32/susanne-klatten-spenden-philanthropie), "
			+ "(und generell ungern mehr als Pillepalle-Beträge freiwillig aus der Hand gibt) zahlst du ihren Anteil gleich mit."],
	choices : ['taxes_welt', 'taxes_welt_good'],
},

taxes_welt: {
	condition : conditions.springer_evil,
	style : 'welt',
	title : strings.push_welt,
	text : ["[Wirtschaft]{ressort} Stefan Quandt",
	        "Stefan Quandt stellt das Privateigentum in Frage",
	        "Stand: $time Uhr | Lesedauer: 5 Minuten",
	        "Von Carsten Oberwürg",
			"![Ein silbergraues Hochhaus, bestehend aus vier verbundenen zylinderförmigen Türmen, mit BMW-Logo auf dem Dach](welt/bmw.jpg)"
			+ "[In der BMW-Zentrale ärgert man sich über Stefan Quandt]{caption}<br>[Quelle: Diego Delso, <a href='http://delso.photo'>delso.photo</a>, License $CC-BY-SA-4.0]{credit}",
			"BMW-Großaktionär Stefan Quandt hat angekündigt, dem Staat 1,7 Milliarden Euro „nachzahlen“ zu wollen. Das sorgt für Ärger, "
			+ "vor allem bei seiner Schwester und anderen deutschen Großaktionären.",
			"Was hat sich Stefan Quandt dabei gedacht? Indem er die Unternehmensteuerreform delegitimiert, fällt er nicht nur der deutschen Wirtschaft "
			+ "in den Rücken, er stellt auch die Autorität der Regierung&mdash;und letztendlich das Privateigentum selbst&mdash;in Frage. Eine Rückkehr zum "
			+ "höheren Steuersatz für Kapitalerträge, wie er vor der Reform galt, käme einer Enteignung gleich, die nicht nur die hart arbeitenden Großaktionäre träfe, sondern vor allem auch "
			+ "mittelständische Familien und Rentner, die sich [durch Aktienbesitz das Einkommen aufbessern](https://www.sueddeutsche.de/wirtschaft/merz-aktien-cdu-1.4237119), "
			+ "und am Erfolg unserer Marktwirtschaft teil haben möchten.",
			"FDP-Chef Christian Lindner sagte zu WELT: „Natürlich kann Herr Quandt mit seinem Geld machen, was er will, also auch an den Staat spenden, das steht außer Frage. "
			+ "Aber das als Steuer-Nachzahlung zu bezeichnen, und zu implizieren, Kapitalerträge würden zu niedrig besteuert, das ist Irrsinn. "
			+ "BMW hat ja bereits Steuern auf seinen Gewinn gezahlt. Und jetzt möchte Herr Quandt, dass darauf auch noch die Einkommenssteuer gezahlt werden soll, "
			+ "nur weil das Geld aus dem Unternehmen entnommen wurde und in seinen Privatbesitz übergegangen ist? Das ist Irrsinn! Eine Dividende ist schließlich etwas ganz anderes "
			+ "als beispielsweise ein einfaches Arbeitergehalt. "
			+ "Wenn Herr Quandt etwas Gutes tun wollte, hätte er das Geld lieber der FDP spenden sollen.“"],
	choices: [{page : 'phase1', text : "Haben die alle Lack gesoffen?"}]
},

taxes_welt_good: {
	condition : conditions.springer_good,
	style : 'welt',
	title : strings.push_welt,
	text : ["[Wirtschaft]{ressort} Stefan Quandt",
	        "Stefan Quandt prangert Ungerechtigkeit des Steuersystems an",
	        "Stand: $time Uhr | Lesedauer: 5 Minuten",
	        "Von Carsten Oberwürg",
			"![Ein silbergraues Hochhaus, bestehend aus vier verbundenen zylinderförmigen Türmen, mit BMW-Logo auf dem Dach](welt/bmw.jpg)"
			+ "[In der BMW-Zentrale ärgern sich die Bosse über Stefan Quandt]{caption}<br>[Quelle: Diego Delso, <a href='http://delso.photo'>delso.photo</a>, License $CC-BY-SA-4.0]{credit}",
			"BMW-Großaktionär Stefan Quandt hat angekündigt, dass er dem Staat 1,7 Milliarden Euro Steuern nachzahlt. Das sorgt für Ärger "
			+ "bei seiner Schwester und anderen deutschen Großaktionären.",
			"Doch Herr Quandt stellt damit einige wichtige Fragen: Wie kann es gerechtfertigt sein, dass die Superreichen weniger Steuern zahlen als "
			+ "der Durchschnitt, weil sich ihr Einkommen größtenteils aus Kapitalerträgen ergibt? Was unterscheidet eine Dividende von einem Gehalt? Und welche Grenzen "
			+ "sollte das Privateigentum ganz allgemein haben?",
			"Eine gerechtere Besteuerung hat mit Enteignung wenig zu tun, auch wenn Superreiche und solche, die sich ihnen [anbiedern wollen](http://web.archive.org/web/20210826175502/https://www.welt.de/wirtschaft/bilanz/plus170374393/Ein-Plaedoyer-fuer-die-Abgeltungssteuer.html), "
			+ "das [immer wieder behaupten](https://www.faz.net/aktuell/wirtschaft/arm-und-reich/gastbeitrag-von-bmw-grossaktionaer-quandt-schuetzt-das-privateigentum-16249425.html). "
			+ "Richtig ist, dass das Grundgesetz in [Artikel 14](https://www.gesetze-im-internet.de/gg/art_14.html) Absatz 1 das Eigentum garantiert, doch gerne vergessen wird Absatz 2: "
			+ "**„Eigentum verpflichtet. Sein Gebrauch soll zugleich dem Wohle der Allgemeinheit dienen.“** Und schon 1780 [schrieb](https://de.wikiquote.org/wiki/Pierre_Joseph_Proudhon#Zitate_mit_Quellenangabe) der Franzose Jacques-Pierre Brissot: "
			+ "„Wenn 40 Taler ausreichen, um unseren Lebensunterhalt zu sichern, dann ist der Besitz von 200.000 Talern ein offenbarer Diebstahl, eine Ungerechtigkeit“. "
			+ "Stefan Quandt wird durch diese Nachzahlung nicht arm, wahrscheinlich bemerkt er den Verlust nicht mal. Es sollte also klar sein, dass die Anwendung des Spitzensteuersatzes von 45 % "
			+"auf Kapitalerträge ein Schritt in Richtung mehr Gerechtigkeit wäre, ja 45 % eher noch zu wenig sind. Denn der Unterschied zwischen einer Dividende und einem "
			+"Gehalt ist, dass das Gehalt als Lohn für eine Leistung gezahlt wird, die Dividende hingegen ohne erbrachte Leistung an diejenigen ausgezahlt wird, die ohnehin schon viel besitzen.",
			"FDP-Chef Christian Lindner konnte die WELT-Redaktion nicht mit einem Kommentar erreichen. (Er hat angerufen, wir sind nicht dran gegangen.)"],
	choices: [{page : 'phase1', text : "Eigentum ist Diebstahl."}]
},


fdp: {
	cost : 50e3 * 70e3 * 0.55,
	title : "Die FDP auflösen",
	text : ["Die FDP hat etwa 70.000 Mitglieder. Mit dem Versprechen von 50.000 Euro für die ersten 38.500, die bei einer Mitgliederversammlung "
	+ "für die Auflösung der Partei stimmen, sollte sich das Problem schnell erledigt haben."],
	choices : ['fdp_bild'],
},

fdp_bild: {
	style: 'bild',
	title: strings.push_bild,
	text: ["Wegen 50.000 Euro","Chaos bei FDP-Mitgliederversammlung",
	        "![Christian Lindner gestikuliert an einem Rednerpult mit der Aufschrift 'Das ist meine FDP'](bild/fdp.jpg)**Ehemaliger FDP-Vorsitzender Christian Lindner.**<br>[Foto: Dirk Vorderstraße / CC-BY-2.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Die FDP kündigte heute spontan eine Mitglieder-Vollversamlung an, nachdem Stefan Quandt (55) den ersten 55 %, die für eine Auflösung der Partei "
			+"stimmen, 50.000 Euro versprochen hatte.",
			"**Nach anderen gemeinnützigen Projekten nimmt sich der exzentrische Milliardär jetzt das Problem FDP vor.**",
			"Großes Gedränge am Eingang des Olympia-Stadions in Berlin, wenige Minuten später ohne lange Diskussion die Entscheidung: Die FDP löst sich auf!",
			"**BILD sprach mit Anwesenden darüber, ob eine Partei so käuflich sein darf:**",
			"*„Wenn Stefan Quandt uns dafür bezahlen möchte uns aufzulösen, dann kann er das tun, und wir können uns frei entscheiden, "
			+ "ob wir das Angebot annehmen wollen. Das ist der Vorteil des freien Markts, daran haben wir bei der FDP immer geglaubt.“*",
			"**Doch einige sind nicht glücklich damit und wollen Stefan Quandt verklagen.**",
			"Sie hatten es nicht bis zur Abstimmung ins Stadion geschafft und sind sauer, dass das Angebot so kurzfristig kam. "
			+ "Ein paar drohten sogar, eine neue Partei zu gründen, wenn sie leer ausgehen.",
			"**BILD konnte den EX-Vorsitzenden Christian Lindner nicht für eine Stellungnahme erreichen.**",
			"Augenzeugen zu Folge soll er mit einem Jet-Ski auf der Spree gesichtet worden sein."],
	choices: [{page: 'phase2', text: "Schön."}]
},

australia : {
    cost : 1e9,
    title : "Spenden für Buschbrand-Hilfe für Australien um das Dreifache erhöhen",
    text : ["Dass die Klimakatastrophe real ist und wir die Folgen schon heute spüren, [haben die Buschbrände in Australien 2020 eindeutig gezeigt.](https://www.zeit.de/news/2020-01/02/feuer-in-australien-liegt-es-am-klimawandel)",
            "Als Großaktionär eines Herstellers von Verbrennungsmotoren trägst du einen Teil der Verantwortung für diese Katastrophe. "
            + "Daher ist es nur richtig, dass du dich auch an den Folgekosten beteiligst. Eine Milliarde Euro sind nicht besonders viel für dich und trotzdem [mehr als damals insgesamt gespendet wurde](https://www.smh.com.au/national/bushfire-donations-near-500-million-as-watchdogs-put-charities-on-notice-20200117-p53sg5.html), "
            + "inklusive der Großspenden von anderen Milliardären.",
            "Die nächste Katastrophe wird kommen."],
    choices : ['australia_bild','australia_bild_good'],
},

australia_bild: {
	condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Deutscher kämpft gegen Flammen-Inferno", "Stefan Quandt stellt Australien-Spenden in den Schatten",
			"![Brennende Bäume und Rauchschwaden](bild/bushfire.jpg)**Feuer-Hölle in Australien.**<br>[Foto: CSIRO / CC-BY-3.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Die Megafeuer in Australien 2020 haben uns alle schockiert, erschüttert und betroffen gemacht. Viele Menschen und Millionen von Tieren sind in den Flammen verendet. Eine Deutsche brach sogar ihren Urlaub ab.",
			"**BMW-Milliardär Stefan Quandt (55) handelt jetzt: Er spendet mehr als alle anderen zusammen, damit Hilfe da ist, wenn das das nächste mal passiert!**",
			"Viele haben damals gespendet, und die Spendenflut zeigt: Ob arm oder reich, wenn es hart auf hart kommt, halten wir zusammen. Da ist es auch OK, wenn wir Deutschen ein bisschen mehr geben. "
			+ "Und wir sagen: „Danke, nichts zu danken, gern geschehen!“",
			"**Heute sind wir alle Australier!**"
			],
	choices: [{page : 'phase2', text : "Schluchz."}]
},

australia_bild_good: {
	condition : conditions.springer_good,
	style: 'bild',
	title: strings.push_bild,
	text: ["Ist das genug?", "Stefan Quandt's Riesen-Spende",
			"![Brennende Bäume und Rauchschwaden](bild/bushfire.jpg)**Feuer-Hölle in Australien.**<br>[Foto: CSIRO / CC-BY-3.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Die Megafeuer in Australien 2020 haben uns alle schockiert, erschüttert und betroffen gemacht, "
			+ "und wir sind heute noch ratlos, was wir tun können, wenn das wieder passiert. Denn es wird wieder passieren.",
			"**BMW-Milliardär Stefan Quandt (55) spendet eine Milliarde Euro.**",
			"Auch viele andere Reiche haben damals gespendet. Das ist schön, doch sollten wir uns wirklich auf die Großzügigkeit der Milliardäre verlassen, "
			+ "um unsere Probleme zu lösen?",
			"**Und wie großzügig ist es wirklich, wenn Jeff Bezos, der reichste Mensch der Welt, seine [Einnahmen aus 5 Minuten](https://www.wired.co.uk/article/jeff-bezos-australia-fire-donation) (690.000 Dollar) spendet?**",
			"Ist es vielleicht viel mehr ein eigennütziges Ablenkungsmanöver, dass uns vergessen lassen soll, dass sein Konzern Amazon [keine Steuern zahlt](https://www.zeit.de/2018/09/hightech-konzerne-umsatzsteuer-steuerausfall-europaeische-union)?",
			"**Wenn wir die Milliardäre zur Kasse bitten, brauchen wir keine Spenden mehr.**",
			"Dann können wir selbst entscheiden, was mit dem Geld passiert. "
			+ "Dann können wir endlich die Schritte einleiten, die solche Katastrophen in Zukunft verhindern, "
			+ "anstatt uns mit ein paar Euros zum Trost zufrieden zu geben, wenn es zu spät ist. Wäre das nicht was?",
			"**Dieses Erotik-Model sammelte ebenfalls Spenden für Australien: mit NACKT-Fotos! Lesen Sie jetzt mit BILDplus, was sie PO-stete.**"],
	choices: [{page : 'phase2', text : "Uff."}]
},

toll : {
    cost : 7e8,
    title : "Die vergeigte PKW-Maut bezahlen",
    text : ["Das von Verkehrsminister **Andreas Scheuer** vergeigte, in einem [illegalen](https://www.sueddeutsche.de/politik/pkw-maut-scheuer-bundestag-1.5187669) "
            + "Vergabeverfahren unter [Täuschung der Öffentlichkeit](https://www.zeit.de/2020/30/pkw-maut-andreas-scheuer-verkehrsministerium-gescheitertes-projekt/komplettansicht) "
            + "durchgeboxte, [europarechtswidrige](https://www.zeit.de/mobilitaet/2019-06/pkw-maut-verstoesst-gegen-eu-recht) "
            + " **CSU-Prestigeprojekt** Pkw-Maut hat den deutschen Steuerzahler [700 Millionen Euro](https://fragdenstaat.de/blog/2020/05/18/wir-veroffentlichen-geheimvertrag-zu-pkw-maut/) gekostet.",
            "Scheuer und die CSU müssen dafür endlich zur Rechenschaft gezogen werden, auch wenn du die Rechnung jetzt erstmal aus der "
            + "Portokasse zahlst."],
    choices : [{page : 'phase2', text : "Was für eine Geldverschwendung."}],
},

springer : {
	cost : 7.5e9,
	title : "Axel Springer Verlag kaufen und sie zwingen, aufzuhören Scheiße zu schreiben",
	text : ["Zur Axel Springer SE gehören viele schlimme Publikationen, die schon lange schlimme Sachen schreiben, "
	     + "doch die *Bild* [ist mit Abstand die schlimmste.](https://bildblog.de/)",
	       "Deine erste Handlung als neuer Eigentümer ist, den [heuchlerischen, hetzenden](https://bildblog.de/?s=reichelt) Bild-Chefredakteur Julian Reichelt zu feuern. Eigentlich müsstest du sie alle feuern, denn [es sind schlechte Menschen, die Falsches tun](https://de.wikiquote.org/wiki/Max_Goldt), "
		 + "doch kurz nach der Entlassung von Reichelt erhälst du einen Anruf aus der Bild-Redaktion, "
		 + "dessen Inhalt sich in etwa so zusammenfassen lässt:",
		 " „Nachricht erhalten, Genosse! Ab heute wird bei Bild ein anderer Kurs gefahren.“"], 
	choices : ['springer2'],
	condition : (game) => (game.visited_any(springer_pages))
},

springer2 : {
	title : strings.push_bild,
	style : 'bild',
	text : ["Nach Quandt-Kauf", "Reichelt-Rauswurf sorgt für Schlagzeilen",
	"![Ein bärtiger Mann mit Brille in einem dunkelblauen Anzug und einem weißen Hemd mit blauen Streifen, oben aufgeknöpft, sichtbare Brustbehaarung.](bild/reichelt.jpg)"
	+ "**EX-BILD-Chefredakteur Julian Reichelt hat nichts mehr zu lachen.**<br>[Bild: © Superbass / $CC-BY-SA-4.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
	"**Ein Schock in der BILD-Redaktion: BMW-Milliardär Stefan Quandt kauft BILD und feuert Julian Reichelt! Exklusiv auf BILD.de zeigen wir, "
	+"was die Umstrukturierung für Sie bedeutet. Als BILD-Leser müssen Sie demnächst verzichten auf:**",
	"**•** Fremdenfeindliche Lügen und rechtspopulistische Meinungsmache<br>",
	"**•** Verschwörungstheorien<br>"
	+"**•** Belästigungen der Angehörigen von Todesopfern durch BILD-Reporter<br>"
	+"**•** Öffentliche Vorverurteilungen nicht rechtskräftig verurteilter Personen<br>",
	"**Natürlich können Sie sich auch weiterhin auf BILD verlassen für:**",
	"**•** Den neusten Promiklatsch<br>"
	+"**•** Die sensationellsten Schlagzeilen<br>"
	+"**•** Einfache Antworten auf schwierige Fragen<br>"
	+"**•** Jede Menge Clickbait („Lange keinen Sex gehabt? DAS kann passieren!“)<br>",
	"**Auch in der Redaktion der WELT ändert sich übrigens einiges!**",
	"Der neue WELT-Chefredakteur sagte gegenüber BILD: „Wir bei der Welt werden ab sofort nicht mehr schamlos nach unten treten "
	+ " und durchschaubar die Interessen von Industrie und Superreichen vertreten. Wir werden auch keine Artikel von Rassisten, Sexisten oder Klimawandel-Leugnern "
	+ "mehr veröffentlichen. Allen, die Texte von Henryk M. Broder nicht missen möchten, empfehlen wir eine lange Phase der tiefen Selbstreflektion. "
	+"Die Kommentarfunktion unter den Artikeln hat sich nicht bewährt und wird ersatzlos geschlossen.“"],
	choices : [{page : 'phase1', text : "Geld kann sehr motivierend sein."}]
},

phase2: {
	revisitable : true,
	title : "Was kann ich sonst noch tun?",
	text : ["Gut gemacht! Von $startmoney runter auf $money in nur ein paar Klicks.", 
	    "Vor deiner Haustür bildet sich ein wütender Mob aus erbberechtigten Verwandten, BMW-Aktionären und FDP-Mitgliedern. Natürlich bist du (wie jeder Milliardär) auf diese Situation vorbereitet. " 
	    + "Durch den Geheimgang hinter dem Ölgemälde von dir selbst begibst du dich in die Tiefgarage und steigst in deinen Fluchtwagen: einen gepanzerten BMW mit getönten Scheiben, "
	     + "Kennzeichen **GE LD 1966**.", "Gib doch ruhig noch ein bisschen mehr aus:"],
	choices : choices.phase2,
	condition : (game) => game.state.money < 11e9,
	redirect: 'phase2_2'
},

phase2_2 : {
	text : ["Du bist dem Mob entkommen und parkst den gepanzerten Wagen am Straßenrand. Hoffentlich kannst du hier ungestört bleiben.",
	        "Zeit, noch mehr Geld auszugeben:"],
	choices : choices.phase2,
	redirect: 'phase2_3'
},

phase2_3 : {
	text : ["In der Ferne hörst du ein Martinshorn. Es wird lauter.",
	        "Schnell noch etwas Geld ausgeben:"],
	choices : choices.phase2,
},

wikipedia : {
	cost : 10*22e6,
	title : "Wikimedia Deutschland für zehn Jahre finanzieren",
	text : ["Die immer aufdringlicher werdenden Wikipedia-Spendenaufrufe gehen dir schon lange auf die Nerven.",
			"Obwohl die Spendenaufrufe in der Vergangenheit [dafür kritisiert wurden](https://de.wikipedia.org/wiki/Wikipedia#Finanzierung), "
			+"dass die Amerikanische Wikimedia Foundation, an die ein Teil des Geldes geht, inzwischen über ein Vermögen von über 100 Millionen Dollar verfügt, "
			+"bist du dir sicher, dass das Geld bei Wikipedia sehr viel besser aufgehoben ist als bei dir."],
	choices : [{ page : 'phase2', text : "Freies Wissen für alle."}],
},


homeopathy : {
	cost: 200e6,
	cost_suffix : " / Jahr",
	title: "Aufhören, die Leute mit Zuckerkugeln zu bescheißen, und so zu tun, als wären sie Medizin",
	text: ["[Die Biologische Heilmittel Heel GmbH ist einer der weltweit größten Hersteller von Homöopathika](https://de.wikipedia.org/wiki/Biologische_Heilmittel_Heel) "
			+ "(die [keine Wirkung über den Plazebo-Effekt hinaus haben](https://www.youtube.com/watch?v=pU3sAYRl4-k)) und in der Vergangenheit dadurch aufgefallen, "
			+ "[dass sie Lobbyisten dafür bezahlt, Kritiker von Homöopathie zu diffamieren](https://www.sueddeutsche.de/wissen/homoeopathie-lobby-im-netz-schmutzige-methoden-der-sanften-medizin-1.1397617).",
			"Du musst die Firma nicht mal kaufen, sie gehört dir schon.",
			"Du feuerst alle Angestellten und verschenkst die Zuckerkugel-Restbestände an die Tafeln."],
	choices : [{ page : 'phase2', text : "Das war einfach."}],

},

exit : {
	cost : 225e3*10*10,
	title : "Staatliche Förderung für Nazi-Ausstiegshilfe zehn Jahre lang verzehnfachen",
	text : ["[EXIT-Deutschland](https://www.exit-deutschland.de/) hilft Menschen, aus der rechten Szene auszusteigen und neue Perspektiven zu finden.",
			"Wer so wie du, Stefan Quandt, durch sein Erbe massiv an Zwangsarbeit im NS-Regime profitiert hat und jahrzehntelang darüber geschwiegen hat, "
			+ "der trägt eine besondere Verantwortung und darf nicht tatenlos zusehen, wenn wichtige Programme wie EXIT regelmäßig [um ihre Finanzierung kämpfen müssen](https://www.jetzt.de/politik/neonazi-aussteiger-interview-mit-exit-gruender-bernd-wagner), "
			+ "während weltweit rechtsradikales Gedankengut wieder im Aufschwung ist.",
			"Mit deiner Spende kann EXIT seine Arbeit fortführen und ausweiten. "
			+ "Für den [Faschisten Björn Höcke](https://www.spiegel.de/politik/deutschland/bjoern-hoecke-darf-als-faschist-bezeichnet-werden-gerichtsurteil-zu-eisenach-a-1289131.html) "
			+ "ist es wohl zu spät, aber manch anderem kann EXIT vielleicht noch helfen, den Weg hinaus aus dieser hasserfüllten Ideologie zu finden."],
	choices : [{ page : 'phase2', text : "Das ist ja wohl das Mindeste."}],
},

phase3: {
	revisitable : true,
	title : "Das Radio anschalten",
	text : ["Aus dem Radio erfährst du, dass du wegen des Verdachts auf Gefährdung der Marktwirtschaft vom Verfassungsschutz gesucht wirst. Beim Blick in den Rückspiegel siehst du ein Polizeiauto. " 
	    + "Zwei Polizisten steigen aus und nähern sich deinem Wagen.",
	    " Was willst du tun?"],
	choices : choices.phase3,
	condition : (game) => game.page_visited('phase2_2') || game.state.money < game.story.pages['exit'].cost
},

throw: {
	cost: 300e3,
	title: "Den Polizisten dein Portemonnaie hinwerfen und wegrennen!",
	text: ["Dein Portemonnaie enthält 300.000 € in 500 €-Scheinen, und hat daher in etwa Größe und Gewicht einer Milchtüte. Du verfehlst einen der Polizisten damit knapp. " 
	    + "Die beiden Polizisten prügeln dich krankenhausreif und du wirst wegen versuchten Mordes angezeigt. ",
	    "Du solltest beim Einkaufen wirklich öfter darauf achten, dein Kleingeld loszuwerden."],
	choices: ['throw_bild', 'ending_bild_good']
},

throw_bild: {
	condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Todes-Angriff", "Mörder-Milliardär greift Polizei an!",
			"![Vier Polizisten drücken das Gesicht eines Mannes gegen den Boden.](bild/polizei.jpg)**Freund und Helfer bei der Arbeit.**<br>[Foto: Vanis~commonswiki / CC-BY-3.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Der vom Verfassungsschutz gesuchte EX-Milliardär Stefan Quandt wurde von der Polizei geschnappt. Laut Angaben der Polizei wurden zwei Polizisten "
			+ "schwer verletzt. Quandt muss sich vor Gericht wegen Terrorismus und versuchten Mordes verantworten.",
			"**Schauspieler Til Schweiger (57) sagte gegenüber BILD:**",
			"„Der Typ ist einfach nur verrückt geworden. Unsere Polizei so fies anzugreifen, das ist feige und dumm. Wer sowas macht, der hat sein Recht "
			+"in dieser Gesellschaft verwirkt! Und geimpft ist der wahrscheinlich auch noch! Wegsperren, für immer!“",
			"Weise Worte."
			],
	choices: ['summary']
},

turn_self_in: {
	title: "Dich der Polizei stellen",
	text: ["Du steigst mit erhobenen Händen aus dem Wagen und stellst dich der Polizei. Die Polizisten sind zunächst unhöflich, " 
	    + "bis sie sich erinnern, dass du ja reich und weiß bist. Einer fragt, ob er dein Auto haben kann, „da sie ja in Gönnerlaune zu sein scheinen“. ",
	    ],
	choices: ['ending_bild', 'ending_bild_good']
},

ending_bild: {
	condition : conditions.springer_evil,
	style: 'bild',
	title: strings.push_bild,
	text: ["Sind Drogen im Spiel?", "Stefan Quandt nach Ausraster festgenommen!",
			"![Ein graues Gebäude mit großen Glasfenstern.](bild/court.jpg)**Das Bundesverfassungsgericht in Karlsruhe.**<br>[Foto: Guido Radig / CC-BY-3.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Der vom Verfassungsschutz gesuchte EX-Milliardär Stefan Quandt (55) wurde von der Polizei geschnappt. Jetzt muss er sich vor dem Bundesverfassungsgericht "
			+ "für seine systemdestabilisierenden Aktivitäten verantworten.",
            "Experten gehen davon aus, dass er mit einem blauen Auge davon kommt, da er sehr gute Anwälte hat.",
            "**BILD fragt: Ist das Gerechtigkeit?**"
			],
	choices: ['summary']
},

ending_bild_good: {
	condition : conditions.springer_good,
	style: 'bild',
	title: strings.push_bild,
	text: ["Politisch unbequem", "Stefan Quandt festgenommen!",
			"![Ein graues Gebäude mit großen Glasfenstern.](bild/court.jpg)**Das Bundesverfassungsgericht in Karlsruhe.**<br>[Foto: Guido Radig / CC-BY-3.0 (via Wikimedia Commons)]{credit}", "**$datetime Uhr**",
			"Der vom Verfassungsschutz gesuchte EX-Milliardär Stefan Quandt (55) wurde festgenommen. Er war zuletzt durch einige Großspenden aufgefallen, "
			+ "die die Gerechtigkeit des kaptalistischen Systems in Frage stellen. "
			+ "Dafür wurde er vom Verfassungsschutz als Staatsfeind hingestellt und soll sich nun vor dem Bundesverfassungsgericht verantworten.",
			"**Doch das ist eine Farce.**",
			"Denn womit soll er sich schuldig gemacht haben? Hat er nicht lediglich auf Probleme aufmerksam gemacht, die das System schon immer hatte? "
			+ "Es scheint, dass Herr Quandt den politischen Entscheidungsträgern unbequem geworden ist und jetzt mundtot gemacht werden soll.",
            "**BILD fragt: Ist das Gerechtigkeit?**",
            "*Transparenz: Die Axel Springer SE Verlagsgruppe, zu der BILD gehört, befindet sich zu 100 % im Besitz von Stefan Quandt.*"
			],
	choices: ['summary']
},

summary: {
	revisitable : true,
	title: "Ende",
	text: ["Damit ist das Spiel zu Ende. Wie hat es sich angefühlt, mal so reich und mächtig zu sein?",
	    "Du findest das alles furchtbar deprimierend? Ich auch. Was kann man dagegen tun?",
	    "**Du solltest wählen gehen. Aber das allein reicht auch nicht. Bei der Klimakatastrophe geht es um nicht weniger als um "
	    + "[eine lebenswerte Welt](https://www.youtube.com/watch?v=Ljcz4tA101U).**",
	    " Du hast insgesamt $seen_pages von $num_pages Seiten gesehen. Wenn du nochmal spielen möchtest, " 
	    +"öffne einfach unten das Menü und klick auf „Neues Spiel“.",],
	choices: choices.end
},

print : {
	revisitable : true,
	title: "Ich mag dieses Spiel und möchte mir die Adresse in mein Zimmer hängen, damit ich sie nicht vergesse.",
	text: ["Damit du die Adresse dieser Seite nicht vergisst haben wir [wunderschöne Merkkarten](./print.html) für dich erstellt."
	       + " Idealerweise hängst du eine in jedes Zimmer deiner Wohnung.","Das beste Druckergebnis erzielst du mit Chromium auf DIN-A4 im Querformat."],
	choices: [{page:'summary',text:"Zurück"}]
},

reallyquandt : {
	title: "Ich bin wirklich Stefan Quandt! Einer meiner Lakaien hat mich hierher geführt!",
	text : ["Hi Stefan,","es sollte klar geworden sein, dass es hier nicht wirklich um *dich* geht. "
			+ "Es geht darum, dass es moralisch nicht vertretbar ist, dass ein Individuum so viel Wohlstand für sich beansprucht, während andere nicht genug zu Essen haben. "
			+ "Und es geht darum, dass die mit dem Geld verbundene Macht und die Verantwortung, von der du selbst immer sprichst, nicht erblich sein sollten. "
			+ "Dieses System wurde eigentlich schon vor über zweihundert Jahren abgeschafft, eine Entwicklung die allgemein positiv bewertet wird. ",
			"Dass du, Stefan Quandt, hier den Kopf dafür hinhalten musst, liegt nur daran, dass dein Vermögen so *offenkundig* unverdient (von Kriegsverbrechern geerbt) "
			+ "und dein Umgang mit dieser Tatsache so [unglaublich](https://www.manager-magazin.de/unternehmen/susanne-klatten-stefan-quandt-erstes-gemeinsames-interview-a-00000000-0002-0001-0000-000164471680) [unsympathisch](https://www.faz.net/aktuell/wirtschaft/arm-und-reich/gastbeitrag-von-bmw-grossaktionaer-quandt-schuetzt-das-privateigentum-16249425.html) ist. "
			+ "*Jeder* Milliardär bedeutet ein Versagen der Politik, bei dir ist es nur besonders einfach zu sehen.",
			"Herzlichste Grüße<br>dein Kevin K."],
	choices: [{page:'summary',text:"Zurück"}]
}}

const facts = [
	"[Ich habe keinen großen Geldspeicher wie Dagobert Duck.]{quote}[Stefan Quandt, Vermögen:&nbsp;18.500.000.000 €<br>(sieben olympische Schwimmbecken voll 1&#8209;Euro&#8209;Münzen)]{cite}",
	"[Viele Menschen denken, das fliegt einem irgendwie zu.]{quote}[Susanne Klatten, erbte mehrere Milliarden Euro]{cite}",
	"[Wer würde denn mit uns tauschen wollen?]{quote}[Susanne Klatten, Vermögen:&nbsp;24.000.000.000 €]{cite}",
	"Wenn du vierundzwandzig Stunden pro Tag arbeiten könntest und dafür einen Stundenlohn von eintausend Euro bekämst, " 
	+ "müsstest du über zweitausend Jahre ohne Wochenenden oder Feiertage arbeiten, um so reich wie Stefan Quandt zu werden.",
	"Kapitalismus fügt ihnen und den Menschen in ihrer Umgebung erheblichen Schaden zu.",
	"[Eine Milliarde Euro kann man nicht verdienen, man kann sie nur stehlen.]{quote}[Stefan Quandt (in einem Paralleluniversum)]{cite}",
	"[Eigentum ist Diebstahl.]{quote}[Stefan Quandt (in einem Paralleluniversum)]{cite}",
	"[Die Beschäftigung von Zwangsarbeitern war im damaligen System notwendig, um die Produktion aufrechtzuerhalten.]{quote}[Stefan Quandt (erbte Milliarden von Kriegsverbrechern)]{cite}",
	"[Was an Günther Quandt beeindruckt, ist der unternehmerische Gestaltungswille.]{quote}[Stefan Quandt über seinen Großvater (der in der NS-Zeit im großen Stil von Zwangsarbeit profitierte)]{cite}"
]

const story = {
	title : "Du bist Stefan Quandt",
	tagline: "Was tust du mit deinen Milliarden?",
	credits : "Mit sehr viel Inspiration von <span class='inline-block'><a lang='en' href='https://direkris.itch.io/you-are-jeff-bezos'>You Are Jeff Bezos</a></span>",
	locale : 'de-DE',
	currency : '€',
    pages : pages,
    facts : facts,
}


export default story