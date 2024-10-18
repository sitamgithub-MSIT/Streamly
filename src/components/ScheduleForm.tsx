import { useEffect, useState } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import generateUniqueId from "generate-unique-id";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface IScheduleForm {
  mode: "create" | "update";
  onClose?: any;
  preloadedData?: any;
  onComplete?: any;
}

const ScheduleForm = ({
  mode,
  onClose,
  preloadedData,
  onComplete,
}: IScheduleForm) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { user } = useUser();
  const [data, setData] = useState<any>({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    if (preloadedData)
      setData({
        ...preloadedData,
        date: timeStringToDate(
          preloadedData.time,
          new Date(preloadedData.date)
        ),
        time: timeStringToDate(preloadedData.time),
      });
  }, [preloadedData]);

  const timeStringToDate = (timeString: any, date = new Date()) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return new Date(date.setHours(hours, minutes, 0, 0));
  };

  const createSchedule = async () => {
    setError("");
    if (!data.date) setError("Date is required");
    if (!data.time) setError("Time is required");

    let upload = {
      ...data,
      date: moment(data.date).format("MM-DD-YYYY"),
      time: moment(data.time).format("hh:mm a"),
      email: user?.primaryEmailAddress?.emailAddress,
      scheduleId: generateUniqueId({ length: 6 }),
    };
    try {
      setLoading(true);
      if (mode === "create") {
        await addDoc(collection(db, "schedules"), upload);
        onComplete(upload);
        return onClose();
      }
      if (mode === "update") {
        delete upload.scheduleId;
        await updateDoc(doc(db, "schedules", preloadedData.id), upload);
        onComplete(upload);
        return onClose();
      }
      //else{
      //     await updateSchedule(upload)
      // }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[300] w-full h-full p-4 bg-dark-overlay flex justify-center overflow-y-auto">
      <div className="bg-bgsecondary py-8 px-4 rounded-2xl h-fit w-full max-w-[400px]">
        <div className="flex items-center justify-between">
          <h1>Schedule Live Streams</h1>
          <div
            className="bg-bgprimary size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary cursor-pointer"
            onClick={onClose}
          >
            <X />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div>
          <input
            className="block w-full h-[50px] my-5 text-sm bg-bgprimary px-2 rounded-md outline-none border border-gray-700 focus:border-primary"
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="flex justify-center">
          <DatePicker
            inline
            selected={data.date}
            minDate={new Date()}
            onChange={(value) => setData({ ...data, date: value, time: value })}
            showTimeSelect
            timeIntervals={30}
            dateFormat={"h:mm a"}
          />
        </div>
        <textarea
          placeholder="Live Stream Description"
          className="block w-full h-[100px] py-2 my-5 text-sm bg-bgprimary px-2 rounded-md outline-none border border-gray-700 focus:border-primary"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        ></textarea>
        <button
          onClick={createSchedule}
          className="block w-full bg-gradient-to-r from-primary to-blue-600 py-2 px-4 rounded-lg"
        >
          {loading
            ? "Please wait..."
            : mode === "create"
            ? "Create Now"
            : "Edit now"}
        </button>
      </div>
    </div>
  );
};

export default ScheduleForm;
