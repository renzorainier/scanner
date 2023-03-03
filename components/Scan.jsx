import { QrReader } from "react-qr-reader";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function Scan() {
  const [lastScanned, setLastScanned] = useState(null);
  const [data, setData] = useState("");
  const [log, setLog] = useState([]);
  const [scannedCodes, setScannedCodes] = useState(new Set());

  const schedules = {
    'STEM': {
      '1A': {
        'Monday': {
          'startTime': "17:00:00",
        },
        'Tuesday': {
          'startTime': '19:10:00',
        },
        'Wednesday': {
          'startTime': '08:00:00',
        },
        'Thursday': {
          'startTime': '08:00:00',
        },
        'Friday': {
          'startTime': '08:00:00',
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

  const handleMarkPresent = async (code) => {
    if (scannedCodes.has(code)) {
      console.log(`Code ${code} has already been scanned`);
      return;
    }
    try {
      const studentInfo = await markStudentPresent(code);
      if (studentInfo) {
        const { name, time } = studentInfo;
        setData(`Name: ${name}, Scanned at: ${time}`);
        setScannedCodes(new Set(scannedCodes.add(code)));
      }
    } catch (e) {
      console.error("Error marking student as present: ", e);
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
        const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });

        // Check student's attendance status and update it
        let attendanceStatus = "";
        const scheduleData = schedules[strand][section][currentDay];

        const startTimeParts = scheduleData.startTime.split(":");
        const classStartTime = new Date();
        classStartTime.setHours(parseInt(startTimeParts[0]));
        classStartTime.setMinutes(parseInt(startTimeParts[1]));
        classStartTime.setSeconds(parseInt(startTimeParts[2]));

        const scanTime = new Date();
        const timeDifference = scanTime.getTime() - classStartTime.getTime();

        if (timeDifference < -300000) {
          // Student is early (5 minutes before class start time)
          attendanceStatus = "early";
        }  else if (timeDifference > 600000) {
          // Student is late (more than 10 minutes after class start time)
          attendanceStatus = "late";
        } else {
          // Student is on time (within 10 minutes of class start time)
          attendanceStatus = "ontime";
        }

        studentData[`${id}present`] = true;
        studentData[`${id}status`] = attendanceStatus;
        studentData[`${id}diff`] = timeDifference; // add this line to set the "attendance" field
        // add this line to set the "attendance" field
        await updateDoc(sectionRef, studentData);
        console.log(`Student ${id} marked as present with ${attendanceStatus} status`);
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

  return (
    <div>
      <QrReader
        onResult={async (result) => {
          if (!!result) {
            const code = result.text;
            if (code !== lastScanned) {
              setLastScanned(code);
              handleMarkPresent(code);
            }
          }
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%", height: "100%" }}
      />
      <p className="text-xl font-bold mt-6">Scan result:</p>
      <p className="text-xl">{data}</p>
      <h1 className="text-3xl font-semibold mt-8">Recent Logs</h1>
      <div className="bg-white rounded-lg shadow-lg mt-6 w-full max-w-md">
        <ul className="text-gray-500 divide-y divide-gray-300">
          {log.map((entry, index) => (
            <li key={entry.id} className="py-4 px-6">
              <span className="block font-semibold">{entry.info}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Scan;
// const handleMarkPresent = async (strand, section, id) => {
//   // Get student data from Firestore
//   const studentRef = doc(db, "strands", strand, section, id);
//   const docSnapshot = await getDoc(studentRef);

//   if (docSnapshot.exists()) {
//     const studentData = docSnapshot.data();

//     // Check student's attendance status and update it
//     let attendanceStatus = "";
//     let scheduleRef;

//     if (studentData.day && studentData.start_time) {
//       scheduleRef = doc(db, "schedules", strand, section, studentData.day);
//     } else {
//       console.log(`No day or start time found for student ${id}`);
//       return undefined;
//     }

//     const scheduleSnapshot = await getDoc(scheduleRef);

//     if (scheduleSnapshot.exists()) {
//       const scheduleData = scheduleSnapshot.data();
//       const studentSchedule = scheduleData[strand];
//       const studentScheduleTime = studentSchedule[id];
//       const classStartTime = new Date(studentScheduleTime.start_time);
//       const scanTime = new Date();
//       const timeDifference = scanTime.getTime() - classStartTime.getTime();

//       if (timeDifference < -300000) {
//         // Student is early (5 minutes before class start time)
//         attendanceStatus = "early";
//       } else if (timeDifference >= -300000 && timeDifference <= 600000) {
//         // Student is on time (within 5 minutes of class start time)
//         attendanceStatus = "on time";
//       } else {
//         // Student is late (more than 5 minutes after class start time)
//         attendanceStatus = "late";
//       }
//     }

//     if (!studentData.present) {
//       await setDoc(
//         studentRef,
//         { present: true, lastScan: new Date(), attendanceStatus },
//         { merge: true }
//       );
//       console.log(`Student ${id} marked as present`);
//     } else {
//       console.log(`Student ${id} is already marked as present`);
//     }

//     const timeString = studentData.lastScan
//       .toDate()
//       .toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//     return {
//       name: studentData.name,
//       time: timeString,
//     };
//   } else {
//     console.log(`No student found with ID ${id}`);
//     return undefined;
//   }
// };

// '1B': {
//   'Monday': {
//     'startTime': '08:00:00',
//   },
//   'Tuesday': {
//     'startTime': '18:00:00',
//   },
//   'Wednesday': {
//     'startTime': '08:00:00',
//   },
//   'Thursday': {
//     'startTime': '08:00:00',
//   },
//   'Friday': {
//     'startTime': '08:00:00',
//   },
// },
// '1C': {
//   'Monday': {
//     'startTime': '08:00:00',
//   },
//   'Tuesday': {
//     'startTime': '08:00:00',
//   },
//   'Wednesday': {
//     'startTime': '08:00:00',
//   },
//   'Thursday': {
//     'startTime': '08:00:00',
//   },
//   'Friday': {
//     'startTime': '08:00:00',
//   },
// },
// '1D': {
//   'Monday': {
//     'startTime': '08:00:00',
//   },
//   'Tuesday': {
//     'startTime': '08:00:00',
//   },
//   'Wednesday': {
//     'startTime': '08:00:00',
//   },
//   'Thursday': {
//     'startTime': '08:00:00',
//   },
//   'Friday': {
//     'startTime': '08:00:00',
//   },
// },
