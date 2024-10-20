import { useEffect, useState } from "react";
import { Delete, Edit, EllipsisVertical, ShieldPlus } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Bounce, toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Wrapper from "../components/Wrapper";
import ScheduleForm from "../components/ScheduleForm";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [displayScheduleForm, setDisplayScheduleForm] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [preloadedData, setPreloadedData] = useState<any>(null);
  const { user } = useUser();

  const fetchData = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "schedules"),
        where("email", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(dataList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const deleteSchedule = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "schedules", id));
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const copyStreamDetails = async (
    type: "Cohost" | "Audience",
    schedule: any
  ) => {
    const { scheduleId, title, date, time, description } = schedule || {};
    let url =
      window.location.origin +
      "/dashboard/golive?roomID=" +
      scheduleId +
      "&role=" +
      type;
    navigator.clipboard.writeText(`
      Event: ${title}
      Description: ${description}
      Date: ${date}
      Time: ${time}
      Link: ${url}
    `);
    toast.success(type + " stream details copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <Wrapper>
      {displayScheduleForm && (
        <div>
          <ScheduleForm
            mode={mode}
            onClose={() => setDisplayScheduleForm(false)}
            preloadedData={preloadedData}
            onComplete={() => {
              fetchData();
            }}
          />
        </div>
      )}
      {!schedules.length && !loading && (
        <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
          <ShieldPlus size={100} className="text-primary" />
          <p className="text-gray-500">
            You have not schedule any live stream yet.
          </p>
          <button
            className="py-2 px-5 bg-primary rounded-2xl"
            onClick={() => {
              setPreloadedData(null);
              setMode("create");
              setDisplayScheduleForm(!displayScheduleForm);
            }}
          >
            Schedule Live Stream
          </button>
        </div>
      )}
      {!loading && schedules.length && (
        <>
          <div className="my-5">
            <button
              onClick={() => {
                setPreloadedData(null);
                setMode("create");
                setDisplayScheduleForm(!displayScheduleForm);
              }}
              className="py-2 px-5 from-primary to-blue-600 bg-gradient-to-r rounded-2xl"
            >
              Add Schedule 📅
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {schedules.map((schedule: any, index: number) => (
              <div className="bg-bgsecondary p-4 rounded-lg" key={index}>
                <div className="flex items-center justify-end gap-4 my-2">
                  <div
                    onClick={() => {
                      setPreloadedData(schedule);
                      setMode("update");
                      setDisplayScheduleForm(!displayScheduleForm);
                    }}
                    className="bg-bgprimary size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary cursor-pointer"
                  >
                    <Edit size={18} />
                  </div>

                  <div
                    onClick={() => deleteSchedule(schedule.id)}
                    className="bg-bgprimary size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary cursor-pointer"
                  >
                    <Delete size={18} />
                  </div>

                  <div className="relative group bg-bgprimary size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary cursor-pointer">
                    <EllipsisVertical />
                    <ul className="absolute top-full right-0 hidden group-hover:block bg-bgprimary p-2 rounded-lg text-gray-500 w-[130px] text-sm text-center">
                      <li
                        className="py-2 hover:text-primary"
                        onClick={() => copyStreamDetails("Cohost", schedule)}
                      >
                        Invite Co-host
                      </li>
                      <li
                        className="py-2 hover:text-primary"
                        onClick={() => copyStreamDetails("Audience", schedule)}
                      >
                        Invite Audience
                      </li>
                    </ul>
                  </div>
                </div>
                <h2>{schedule.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {schedule.title}
                </p>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500">Date:</span> {schedule.date}
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500">Time:</span> {schedule.time}
                </div>
                {schedule.date === moment().format("MM-DD-YYYY") ? (
                  <Link
                    to={`/dashboard/golive?roomID=${schedule.scheduleId}&role=Host`}
                    target="_blank"
                    className="block w-full bg-gradient-to-r from-primary to-blue-600 py-2 px-4 rounded-lg mt-4 text-center"
                  >
                    Go live
                  </Link>
                ) : moment(schedule.date).isBefore(
                    moment().format("MM-DD-YYYY")
                  ) ? (
                  <Link
                    to={""}
                    className="block w-full bg-gradient-to-r from-primary to-blue-600 py-2 px-4 rounded-lg mt-4 text-center"
                  >
                    Ended
                  </Link>
                ) : moment(schedule.date).isAfter(
                    moment().format("MM-DD-YYYY")
                  ) ? (
                  <Link
                    to={""}
                    className="block w-full bg-gradient-to-r from-primary to-blue-600 py-2 px-4 rounded-lg mt-4 text-center"
                  >
                    Upcoming
                  </Link>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SchedulePage;
