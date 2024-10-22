import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

interface INavbar {
  onMenuClick: () => void;
}

interface Schedule {
  id: string;
  date: string;
  description: string;
  time: string;
  title: string;
  email: string;
}

const Navbar = ({ onMenuClick }: INavbar) => {
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [searchResults, setSearchResults] = useState<Schedule[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const q = query(
          collection(db, "schedules"),
          where("email", "==", user?.primaryEmailAddress?.emailAddress)
        );
        const querySnapshot = await getDocs(q);
        const schedulesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Schedule[];
        setSchedules(schedulesData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    if (user) {
      fetchSchedules();
    }
  }, [user]);

  useEffect(() => {
    const searchTermLower = searchTerm.toLowerCase();

    const filtered = searchTerm
      ? schedules.filter(
          (schedule) =>
            schedule.title?.toLowerCase().includes(searchTermLower) ||
            schedule.description?.toLowerCase().includes(searchTermLower)
        )
      : [];

    setSearchResults(filtered);
  }, [searchTerm, schedules]);

  const handleResultClick = () => {
    setFocus(false);
    setSearchTerm("");
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 sticky top-0 z-[40] bg-bgsecondary md:bg-bgprimary border-b-[1px] border-b-slate-700">
      <Logo onlyLogo className="md:hidden" />

      {/* Expanding Search Bar */}
      <div
        className={`relative hidden sm:flex items-center bg-bgprimary px-4 rounded-full md:bg-bgsecondary transition-all duration-300 ease-in-out ${
          focus ? "w-[600px]" : "w-64"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent h-10 outline-none border-none w-full text-sm"
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            // Only blur if we're not clicking on a search result
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (!relatedTarget?.closest(".search-result-link")) {
              setTimeout(() => setFocus(false), 200);
            }
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className={`transition-all ${focus ? "text-white" : "text-gray-500"}`}
          size={18}
        />

        {/* Search Results */}
        {focus && searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-bgsecondary rounded-md shadow-lg overflow-hidden">
            {searchResults.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {searchResults.map((schedule) => (
                  <Link
                    key={schedule.id}
                    className="search-result-link block hover:bg-bgprimary transition-colors"
                    to="/dashboard/schedule"
                    onClick={handleResultClick}
                    tabIndex={0}
                  >
                    <div className="p-3 border-b border-gray-700 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 bg-bgprimary rounded-md p-2 text-center">
                          <div className="text-xs text-gray-400">
                            {schedule.time}
                          </div>
                          <div className="text-xs text-gray-400">on</div>
                          <div className="text-xs text-gray-400">
                            {schedule.date}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate">
                            {schedule.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {schedule.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-sm text-gray-400">
                No matches found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-3">
            <Link
              to="/sign-in"
              className="bg-bgsecondary py-2 px-4 rounded-md text-sm cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-primary py-2 px-4 rounded-md text-sm cursor-pointer"
            >
              Register
            </Link>
          </div>
        </SignedOut>
        <div
          className="flex items-center justify-center size-10 bg-bgsecondary cursor-pointer rounded-md md:hidden"
          onClick={onMenuClick}
        >
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
