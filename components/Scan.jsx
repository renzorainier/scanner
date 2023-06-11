import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function Scan() {
  const [lastScanned, setLastScanned] = useState(null);
  const [data, setData] = useState("");
  const [log, setLog] = useState([]);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [bgColor, setBgColor] = useState("gray");


  const now = new Date();
  const startTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    5,
    0,
    0
  );
  const endTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    24,
    0,
    0
  );

  const mappingTable = {
    Z: "0",
    X: "1",
    C: "2",
    V: "3",
    B: "4",
    N: "5",
    M: "6",
    "-": "-",
    L: "8",
    K: "9",
    D: "7",
    Q: "A",
    R: "B",
    E: "C",
    F: "D",
    G: "E",
    H: "F",
    I: "G",
    J: "H",
    P: "I",
    S: "J",
    U: "K",
    Y: "L",
    A: "M",
    O: "N",
    W: "O",
    T: "P",
    1: "Q",
    2: "R",
    3: "S",
    4: "T",
    5: "U",
    6: "V",
    7: "W",
    8: "X",
    9: "Y",
    0: "Z",
  };

  const schedules = {
    STEM: {
      "1A": {
        Monday: {
          startTime: "6:00:00",
        },
        Tuesday: {
          startTime: "6:00:00",
        },
        Wednesday: {
          startTime: "6:00:00",
        },
        Thursday: {
          startTime: "6:00:00",
        },
        Friday: {
          startTime: "6:00:00",
        },
        Saturday: {
          startTime: "6:00:00",
        },
        Sunday: {
          startTime: "6:00:00",
        },
      },
      "1B": {
        Monday: {
          startTime: "6:00:00",
        },
        Tuesday: {
          startTime: "6:00:00",
        },
        Wednesday: {
          startTime: "6:30:00",
        },
        Thursday: {
          startTime: "6:00:00",
        },
        Friday: {
          startTime: "6:00:00",
        },
        Saturday: {
          startTime: "6:00:00",
        },
        Sunday: {
          startTime: "6:00:00",
        },
      },
      "1C": {
        Monday: {
          startTime: "6:00:00",
        },
        Tuesday: {
          startTime: "6:00:00",
        },
        Wednesday: {
          startTime: "6:00:00",
        },
        Thursday: {
          startTime: "6:00:00",
        },
        Friday: {
          startTime: "6:00:00",
        },
        Saturday: {
          startTime: "6:00:00",
        },
        Sunday: {
          startTime: "6:00:00",
        },
      },
      "1D": {
        Monday: {
          startTime: "6:00:00",
        },
        Tuesday: {
          startTime: "6:00:00",
        },
        Wednesday: {
          startTime: "6:00:00",
        },
        Thursday: {
          startTime: "6:00:00",
        },
        Friday: {
          startTime: "6:00:00",
        },
        Saturday: {
          startTime: "6:00:00",
        },
        Sunday: {
          startTime: "6:00:00",
        },
      },
      "2A": {
        Monday: {
          startTime: "12:30:00",
        },
        Tuesday: {
          startTime: "12:00:00",
        },
        Wednesday: {
          startTime: "12:30:00",
        },
        Thursday: {
          startTime: "12:00:00",
        },
        Friday: {
          startTime: "12:00:00",
        },
        Saturday: {
          startTime: "12:00:00",
        },
        Sunday: {
          startTime: "12:00:00",
        },
      },
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData("");
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, [data]);


  const updateBackgroundColor = (color) => {
    setBgColor(color);
    setTimeout(() => {
      setBgColor("gray");
    }, 1000);
  };



  const handleMarkPresent = async (code) => {
    if (scannedCodes.has(code)) {
      console.log(`Student ${code} has already been scanned`);
      return;
    }
    try {
      const studentInfo = await markStudentPresent(code);
      if (studentInfo) {
        const { name, time } = studentInfo;
        setData(`${name} | ${time}`);
        setScannedCodes(new Set(scannedCodes.add(code)));
        updateBackgroundColor("green"); // Valid QR code, set background color to green
      }
    } catch (e) {
      console.error("Error marking student as present: ", e);
      updateBackgroundColor("red"); // Invalid QR code, set background color to red
    }
  };


  const markStudentPresent = async (code) => {
    const [strand, section, id, lrn] = code.split("-");
    const sectionRef = doc(db, strand, section);
    const sectionDoc = await getDoc(sectionRef);
    if (sectionDoc.exists()) {
      const sectionData = sectionDoc.data();
      const studentKeys = Object.keys(sectionData).filter(
        (key) => key.startsWith(id) && key.endsWith("lastScan")
      );
      if (studentKeys.length > 0) {
        const studentData = {};
        studentKeys.forEach((key) => {
          studentData[key] = new Date();
        });
        const currentDay = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        // Check student's attendance status and update it
        let attendanceStatus = "";
        let topNumber = "";

        const scheduleData = schedules[strand][section][currentDay];

        const startTimeParts = scheduleData.startTime.split(":");
        const classStartTime = new Date();
        classStartTime.setHours(parseInt(startTimeParts[0]));
        classStartTime.setMinutes(parseInt(startTimeParts[1]));
        classStartTime.setSeconds(parseInt(startTimeParts[2]));

        const scanTime = new Date();
        const timeDifference = scanTime.getTime() - classStartTime.getTime();

        let badgeFieldName = "";
        if (timeDifference <= -300000) {
          // Student is early (arrived 5 minutes or more before class start time)
          attendanceStatus = "early";
        } else if (timeDifference <= 60000) {
          // Student is on time (arrived within 5 minutes of class start time)
          attendanceStatus = "ontime";
        } else {
          // Student is late (arrived more than 5 minutes after class start time)
          attendanceStatus = "late";
        }

        const dayOfWeek = currentDay.substring(0, 3);
        let dayCode;
        switch (dayOfWeek) {
          case "Mon":
            dayCode = "A";
            break;
          case "Tue":
            dayCode = "B";
            break;
          case "Wed":
            dayCode = "C";
            break;
          case "Thu":
            dayCode = "D";
            break;
          case "Fri":
            dayCode = "E";
            break;
          default:
            dayCode = "X";
        }

        const lastScanField = `${id}${dayCode}`;
        const attendanceStatusField = `${id}${dayCode}s`;

        studentData[lastScanField] = new Date();
        studentData[attendanceStatusField] = attendanceStatus;
        studentData[`${id}present`] = true;
        studentData[`${id}status`] = attendanceStatus;
        studentData[`${id}dif`] = timeDifference;

        await updateDoc(sectionRef, studentData);
        console.log(
          `Student ${id} marked as present with ${attendanceStatus} status`
        );
        const timeString = new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return {
          name: sectionData[id + "name"],
          time: timeString,
        };
      } else {
        console.log(`No student found with ID ${id}`);
        return undefined;
      }
    } else {
      console.log(
        `No section found with Strand ${strand} and Section ${section}`
      );
      return undefined;
    }
  };

  useEffect(() => {
    if (data) {
      const newLogEntry = {
        id: lastScanned,
        info: data,
      };

      const existingEntryIndex = log.findIndex(
        (entry) => entry.id === lastScanned
      );
      if (existingEntryIndex !== -1) {
        const updatedLog = [...log];
        updatedLog[existingEntryIndex] = newLogEntry;
        setLog(updatedLog);
      } else {
        const updatedLog = [newLogEntry, ...log.slice(0, 9)];
        setLog(updatedLog);
      }
    }
  }, [data, lastScanned, log]);

  if (now >= startTime && now <= endTime) {
    return (
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full h-full ">
          <div className={`bg-${bgColor}-100`}>
          <QrReader
            onResult={async (result) => {
              if (!!result) {
                const code = result.text;
                if (code !== lastScanned) {
                  const decodedCode = code
                    .split("")
                    .map((char) => mappingTable[char] || "")
                    .join("");
                  setLastScanned(code);
                  handleMarkPresent(decodedCode);
                  // console.log(decodedCode);
                  // console.log(result);
                }
              }
            }}
            constraints={{ facingMode: "environment" }}
            style={{ width: "100%", height: "100%" }}
          />
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-lg font-bold text-gray-600 mb-2">Scan Result:</p>
            <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
              <p className="text-base text-blue-600 font-semibold">{data}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-8">
          {bgColor}
            <h1 className="text-3xl font-semibold">
              Recent{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
                Scans
              </span>
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg mt-6 w-full overflow-y-scroll">
            <ul className="text-gray-500 divide-y divide-gray-300">
              {log.map((entry, index) => (
                <li key={entry.id} className="py-4 px-6">
                  <span className="block font-semibold">{entry.info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 flex items-center justify-center h-full">
        <p className="text-lg font-bold text-gray-600">
          Scanner is only available between 5:00 AM and 1:00 PM.
        </p>
      </div>
    );
  }
}

export default Scan;
