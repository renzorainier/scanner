import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function StudentCollection() {
  const [students, setStudents] = useState([
    // { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "1D", strand: "STEM", present: false },
    // { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1D", strand: "STEM", present: false },
    // { id: "03", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1D", strand: "STEM", present: false },

    // { id: "01", lrn: "109329100329", name: "MALICDEM, CARLO", section: "1D", strand: "STEM", present: false },
    // { id: "02", lrn: "109351121643", name: "PUREZA, XEDRICK", section: "1D", strand: "STEM", present: false },
    // { id: "03", lrn: "109311100219", name: "ILAO, GIAN RUSSEL", section: "1D", strand: "STEM", present: false },
    // { id: "04", lrn: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "1D", strand: "STEM", present: false },

    {
      id: "01",
      lrn: "402969160037",
      name: "ALARCON, RHYZEA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "02",
      lrn: "109339100105",
      name: "BANTOG, THAMZ JAZLEY",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "03",
      lrn: "114235070063",
      name: "BUCOG, JESSIELYN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "04",
      lrn: "109327100246",
      name: "BUAL, GABRIEL JOHN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "05",
      lrn: "109351121673",
      name: "DAEP, CASSANDRA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "06",
      lrn: "117873090005",
      name: "CAMIRING, LEO",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "07",
      lrn: "402941150090",
      name: "EDANG, CHESKA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "08",
      lrn: "109309120128",
      name: "DELA CRUZ, MICHAEL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "09",
      lrn: "109311100191",
      name: "GALARION, MIRALYN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "10",
      lrn: "109351121499",
      name: "DOMINGO, EZEKIEL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "11",
      lrn: "109327100789",
      name: "LOGRONIO, JENNIFER",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "12",
      lrn: "402889150055",
      name: "GA, JAZPER SID",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "13",
      lrn: "109354100093",
      name: "MEDALLADA, ANDREA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "14",
      lrn: "109350090352",
      name: "GELAGA, MARK AARON",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "15",
      lrn: "109352130003",
      name: "MERIOLES, KEZEAH",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "16",
      lrn: "109329100333",
      name: "MALLARI, JHAZREAL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "17",
      lrn: "109350100604",
      name: "NALZARO, CHRISTIAN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "18",
      lrn: "109311100426",
      name: "VALLECERA, ROEL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "19",
      lrn: "109336100225",
      name: "INAS, JUSTIN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "20",
      lrn: "109352100024",
      name: "BELDA, CAMILLE SHAINNE",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "21",
      lrn: "109351121626",
      name: "FURAQUE, REYNALDO JR",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "22",
      lrn: "109328100017",
      name: "ARBOLEDA, JERICHO",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "23",
      lrn: "109311100063",
      name: "BATALLER, ADRIAN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "24",
      lrn: "109329100110",
      name: "BULATAO, ALEXA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "25",
      lrn: "136487100093",
      name: "CALIO, JOHN PAUL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "26",
      lrn: "109329100178",
      name: "DAGOOC, SHARMAINE",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "27",
      lrn: "109320120604",
      name: "CARAGAN, AARON",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "28",
      lrn: "109311100161",
      name: "ESPONILLA, ALYSSA",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "29",
      lrn: "136890080155",
      name: "DINDO, JOMAR",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "30",
      lrn: "109339131281",
      name: "HULLEZA, PRECIOUS",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "31",
      lrn: "109339100469",
      name: "LOPEZ, ERIN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "32",
      lrn: "109328100149",
      name: "LONQUINO, KLAUS",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "33",
      lrn: "109311100271",
      name: "MENDI, CELINE JOY",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "34",
      lrn: "109343100139",
      name: "POLINAR, MARJORIE",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "35",
      lrn: "109329100329",
      name: "MALICDEM, CARLO",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "36",
      lrn: "109351121641",
      name: "PASAGDAN, RENZ RAINIER",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "37",
      lrn: "109351121636",
      name: "SAMANIEGO, SEAN",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "38",
      lrn: "109351121643",
      name: "PUREZA, XEDRICK",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "39",
      lrn: "109311100219",
      name: "ILAO, GIAN RUSSEL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    {
      id: "40",
      lrn: "425707150124",
      name: "REGIS, YESTIN GABRIEL",
      section: "1D",
      strand: "STEM",
      present: false,
    },
    // { id: "41", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "1D", strand: "STEM", present: false },
    // { id: "42", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1D", strand: "STEM", present: false },
    // { id: "43", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1D", strand: "STEM", present: false },
    // { id: "44", lrn: "109327100246", name: "BUAL, GABRIEL JOHN", section: "1D", strand: "STEM", present: false },
    // { id: "45", lrn: "109351121673", name: "DAEP, CASSANDRA", section: "1D", strand: "STEM", present: false },
    // { id: "46", lrn: "117873090005", name: "CAMIRING, LEO", section: "1D", strand: "STEM", present: false },
    // { id: "47", lrn: "402941150090", name: "EDANG, CHESKA", section: "1D", strand: "STEM", present: false },
    // { id: "48", lrn: "109309120128", name: "DELA CRUZ, MICHAEL", section: "1D", strand: "STEM", present: false },
    // { id: "49", lrn: "109311100191", name: "GALARION, MIRALYN", section: "1D", strand: "STEM", present: false },
    // { id: "50", lrn: "109351121499", name: "DOMINGO, EZEKIEL", section: "1D", strand: "STEM", present: false },
    // { id: "51", lrn: "109327100789", name: "LOGRONIO, JENNIFER", section: "1D", strand: "STEM", present: false },
    // { id: "52", lrn: "402889150055", name: "GA, JAZPER SID", section: "1D", strand: "STEM", present: false },
    // { id: "53", lrn: "109354100093", name: "MEDALLADA, ANDREA", section: "1D", strand: "STEM", present: false },
    // { id: "54", lrn: "109350090352", name: "GELAGA, MARK AARON", section: "1D", strand: "STEM", present: false },
    // { id: "55", lrn: "109352130003", name: "MERIOLES, KEZEAH", section: "1D", strand: "STEM", present: false },
    // { id: "56", lrn: "109329100333", name: "MALLARI, JHAZREAL", section: "1D", strand: "STEM", present: false },
    // { id: "57", lrn: "109350100604", name: "NALZARO, CHRISTIAN", section: "1D", strand: "STEM", present: false },
    // { id: "58", lrn: "109311100426", name: "VALLECERA, ROEL", section: "1D", strand: "STEM", present: false },
    // { id: "59", lrn: "109336100225", name: "INAS, JUSTIN", section: "1D", strand: "STEM", present: false },
    // { id: "60", lrn: "109352100024", name: "BELDA, CAMILLE SHAINNE", section: "1D", strand: "STEM", present: false },
    // { id: "61", lrn: "109351121626", name: "FURAQUE, REYNALDO JR", section: "1D", strand: "STEM", present: false },
    // { id: "62", lrn: "109328100017", name: "ARBOLEDA, JERICHO", section: "1D", strand: "STEM", present: false },
    // { id: "63", lrn: "109311100063", name: "BATALLER, ADRIAN", section: "1D", strand: "STEM", present: false },
    // { id: "64", lrn: "109329100110", name: "BULATAO, ALEXA", section: "1D", strand: "STEM", present: false },
    // { id: "65", lrn: "136487100093", name: "CALIO, JOHN PAUL", section: "1D", strand: "STEM", present: false },
    // { id: "66", lrn: "109329100178", name: "DAGOOC, SHARMAINE", section: "1D", strand: "STEM", present: false },
    // { id: "67", lrn: "109320120604", name: "CARAGAN, AARON", section: "1D", strand: "STEM", present: false },
    // { id: "68", lrn: "109311100161", name: "ESPONILLA, ALYSSA", section: "1D", strand: "STEM", present: false },
    // { id: "69", lrn: "136890080155", name: "DINDO, JOMAR", section: "1D", strand: "STEM", present: false },
    // { id: "70", lrn: "109339131281", name: "HULLEZA, PRECIOUS", section: "1D", strand: "STEM", present: false },
    // { id: "71", lrn: "109339100469", name: "LOPEZ, ERIN", section: "1D", strand: "STEM", present: false },
    // { id: "72", lrn: "109328100149", name: "LONQUINO, KLAUS", section: "1D", strand: "STEM", present: false },
    // { id: "73", lrn: "109311100271", name: "MENDI, CELINE JOY", section: "1D", strand: "STEM", present: false },
    // { id: "74", lrn: "109343100139", name: "POLINAR, MARJORIE", section: "1D", strand: "STEM", present: false },
    // { id: "75", lrn: "109329100329", name: "MALICDEM, CARLO", section: "1D", strand: "STEM", present: false },
    // { id: "76", lrn: "109351121641", name: "PASAGDAN, RENZ RAINIER", section: "1D", strand: "STEM", present: false },
    // { id: "77", lrn: "109351121636", name: "SAMANIEGO, SEAN", section: "1D", strand: "STEM", present: false },
    // { id: "78", lrn: "109351121643", name: "PUREZA, XEDRICK", section: "1D", strand: "STEM", present: false },
    // { id: "79", lrn: "109311100219", name: "ILAO, GIAN RUSSEL", section: "1D", strand: "STEM", present: false },
    // { id: "80", lrn: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "1D", strand: "STEM", present: false },

    // { id: "04", lrn: "109352100024", name: "BELDA, CAMILLE SHAINNE", section: "1D", strand: "STEM", present: false },

    // { id: "109329100329", name: "MALICDEM, CARLO", section: "ST-1D", strand: "STEM" },
    // { id: "109351121643", name: "PUREZA, XEDRICK", section: "ST-1D", strand: "STEM" },
    // { id: "109311100219", name: "ILAO, GIAN RUSSEL", section: "ST-1D", strand: "STEM" },
    // { id: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "ST-1D", strand: "STEM" }
  ]);

  // { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "1D", strand: "STEM", present: false },
  // { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1D", strand: "STEM", present: false },
  // { id: "03", lrn: "114235070063", name: "BUCOG, JESSIELYN", section: "1D", strand: "STEM", present: false },
  // { id: "04", lrn: "109327100246", name: "BUAL, GABRIEL JOHN", section: "1D", strand: "STEM", present: false },
  // { id: "05", lrn: "109351121673", name: "DAEP, CASSANDRA", section: "1D", strand: "STEM", present: false },
  // { id: "06", lrn: "117873090005", name: "CAMIRING, LEO", section: "1D", strand: "STEM", present: false },
  // { id: "07", lrn: "402941150090", name: "EDANG, CHESKA", section: "1D", strand: "STEM", present: false },
  // { id: "08", lrn: "109309120128", name: "DELA CRUZ, MICHAEL", section: "1D", strand: "STEM", present: false },
  // { id: "09", lrn: "109311100191", name: "GALARION, MIRALYN", section: "1D", strand: "STEM", present: false },
  // { id: "10", lrn: "109351121499", name: "DOMINGO, EZEKIEL", section: "1D", strand: "STEM", present: false },
  // { id: "11", lrn: "109327100789", name: "LOGRONIO, JENNIFER", section: "1D", strand: "STEM", present: false },
  // { id: "12", lrn: "402889150055", name: "GA, JAZPER SID", section: "1D", strand: "STEM", present: false },
  // { id: "13", lrn: "109354100093", name: "MEDALLADA, ANDREA", section: "1D", strand: "STEM", present: false },
  // { id: "14", lrn: "109350090352", name: "GELAGA, MARK AARON", section: "1D", strand: "STEM", present: false },
  // { id: "15", lrn: "109352130003", name: "MERIOLES, KEZEAH", section: "1D", strand: "STEM", present: false },
  // { id: "16", lrn: "109329100333", name: "MALLARI, JHAZREAL", section: "1D", strand: "STEM", present: false },
  // { id: "17", lrn: "109350100604", name: "NALZARO, CHRISTIAN", section: "1D", strand: "STEM", present: false },
  // { id: "18", lrn: "109311100426", name: "VALLECERA, ROEL", section: "1D", strand: "STEM", present: false },
  // { id: "19", lrn: "109336100225", name: "INAS, JUSTIN", section: "1D", strand: "STEM", present: false },
  // { id: "20", lrn: "109352100024", name: "BELDA, CAMILLE SHAINNE", section: "1D", strand: "STEM", present: false },
  // { id: "21", lrn: "109351121626", name: "FURAQUE, REYNALDO JR", section: "1D", strand: "STEM", present: false },
  // { id: "22", lrn: "109328100017", name: "ARBOLEDA, JERICHO", section: "1D", strand: "STEM", present: false },
  // { id: "23", lrn: "109311100063", name: "BATALLER, ADRIAN", section: "1D", strand: "STEM", present: false },
  // { id: "24", lrn: "109329100110", name: "BULATAO, ALEXA", section: "1D", strand: "STEM", present: false },
  // { id: "25", lrn: "136487100093", name: "CALIO, JOHN PAUL", section: "1D", strand: "STEM", present: false },
  // { id: "26", lrn: "109329100178", name: "DAGOOC, SHARMAINE", section: "1D", strand: "STEM", present: false },
  // { id: "27", lrn: "109320120604", name: "CARAGAN, AARON", section: "1D", strand: "STEM", present: false },
  // { id: "28", lrn: "109311100161", name: "ESPONILLA, ALYSSA", section: "1D", strand: "STEM", present: false },
  // { id: "29", lrn: "136890080155", name: "DINDO, JOMAR", section: "1D", strand: "STEM", present: false },
  // { id: "30", lrn: "109339131281", name: "HULLEZA, PRECIOUS", section: "1D", strand: "STEM", present: false },
  // { id: "31", lrn: "109339100469", name: "LOPEZ, ERIN", section: "1D", strand: "STEM", present: false },
  // { id: "32", lrn: "109328100149", name: "LONQUINO, KLAUS", section: "1D", strand: "STEM", present: false },
  // { id: "33", lrn: "109311100271", name: "MENDI, CELINE JOY", section: "1D", strand: "STEM", present: false },
  // { id: "34", lrn: "109343100139", name: "POLINAR, MARJORIE", section: "1D", strand: "STEM", present: false },
  // { id: "35", lrn: "109329100329", name: "MALICDEM, CARLO", section: "1D", strand: "STEM", present: false },
  // { id: "36", lrn: "109351121641", name: "PASAGDAN, RENZ RAINIER", section: "1D", strand: "STEM", present: false },
  // { id: "37", lrn: "109351121636", name: "SAMANIEGO, SEAN", section: "1D", strand: "STEM", present: false },
  // { id: "38", lrn: "109351121643", name: "PUREZA, XEDRICK", section: "1D", strand: "STEM", present: false },
  // { id: "39", lrn: "109311100219", name: "ILAO, GIAN RUSSEL", section: "1D", strand: "STEM", present: false },
  // { id: "40", lrn: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "1D", strand: "STEM", present: false },

  // { id: "109329100329", name: "MALICDEM, CARLO", section: "ST-1D", strand: "STEM" },

  // { id: "109351121643", name: "PUREZA, XEDRICK", section: "ST-1D", strand: "STEM" },
  // { id: "109311100219", name: "ILAO, GIAN RUSSEL", section: "ST-1D", strand: "STEM" },
  // { id: "425707150124", name: "REGIS, YESTIN GABRIEL", section: "ST-1D", strand: "STEM" }

  // { id: "01", lrn: "402969160037", name: "ALARCON, RHYZEA", section: "ST-1D", strand: "STEM", present: false },
  // { id: "02", lrn: "109339100105", name: "BANTOG, THAMZ JAZLEY", section: "1D", strand: "STEM", present: false },
  // { id: "03", lrn: "114235070063", na  me: "BUCOG, JESSIELYN", section: "1D", strand: "STEM", present: false },

  const createCollection = async () => {
    const sectionDocRef = doc(db, "STEM", "1D");
    const sectionData = {};

    students.forEach((student) => {
      const { id, name, section, strand, present, lrn } = student;
      sectionData[`${id}badge`] = [];
      sectionData[`${id}name`] = name;
      sectionData[`${id}lastScan`] = "";
      sectionData[`${id}present`] = present;
      sectionData[`${id}lrn`] = lrn;
      sectionData[`${id}status`] = "";
      sectionData[`${id}dif`] = "";
      sectionData[`${id}strand`] = strand;
      sectionData[`${id}section`] = section;
      sectionData[`${id}A`] = "";
      sectionData[`${id}As`] = "";
      sectionData[`${id}B`] = "";
      sectionData[`${id}Bs`] = "";
      sectionData[`${id}C`] = "";
      sectionData[`${id}Cs`] = "";
      sectionData[`${id}D`] = "";
      sectionData[`${id}Ds`] = "";
      sectionData[`${id}E`] = "";
      sectionData[`${id}Es`] = "";
      // sectionData[`${id}F`] = "";
      // sectionData[`${id}Fs`] = "";
      // sectionData[`${id}G`] = "";
      // sectionData[`${id}Gs`] = "";
      // sectionData[`${id}H`] = "";
      // sectionData[`${id}Hs`] = "";
      // sectionData[`${id}I`] = "";
      // sectionData[`${id}Is`] = "";
      // sectionData[`${id}J`] = "";
      // sectionData[`${id}Js`] = "";
      // sectionData[`${id}K`] = "";
      // sectionData[`${id}Ks`] = "";
      // sectionData[`${id}L`] = "";
      // sectionData[`${id}Ls`] = "";
      // sectionData[`${id}M`] = "";
      // sectionData[`${id}Ms`] = "";
      // sectionData[`${id}N`] = "";
      // sectionData[`${id}Ns`] = "";
      // sectionData[`${id}O`] = "";
      // sectionData[`${id}Os`] = "";
      // sectionData[`${id}P`] = "";
      // sectionData[`${id}Ps`] = "";
      // sectionData[`${id}Q`] = "";
      // sectionData[`${id}Qs`] = "";
      // sectionData[`${id}R`] = "";
      // sectionData[`${id}Rs`] = "";
      // sectionData[`${id}S`] = "";
      // sectionData[`${id}Ss`] = "";
      // sectionData[`${id}T`] = "";
      // sectionData[`${id}Ts`] = "";
      // sectionData[`${id}U`] = "";
      // sectionData[`${id}Us`] = "";
      // sectionData[`${id}V`] = "";
      // sectionData[`${id}Vs`] = "";
      // sectionData[`${id}W`] = "";
      // sectionData[`${id}Ws`] = "";
      // sectionData[`${id}X`] = "";
      // sectionData[`${id}Xs`] = "";
      // sectionData[`${id}Y`] = "";
      // sectionData[`${id}Ys`] = "";
      // sectionData[`${id}Z`] = "";
      // sectionData[`${id}Zs`] = "";
    });

    try {
      await setDoc(sectionDocRef, sectionData);
      console.log("Students collection created successfully");
    } catch (e) {
      console.error("Error creating students collection: ", e);
    }
  };

  return (
    <div>
      <button onClick={createCollection}>Create Students Collection</button>
    </div>
  );
}

export default StudentCollection;
