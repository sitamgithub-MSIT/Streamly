import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import Wrapper from "../components/Wrapper";
import { streams, topStreams } from "../source";
import { banner4 } from "../assets";

const HomePage = () => {
  return (
    <Wrapper enableRightbar>
      <div className="w-full overflow-hidden rounded-md">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, EffectFade]}
        >
          {topStreams.map((list, index) => (
            <SwiperSlide className="h-[150px] md:h-[250px]" key={index}>
              <img src={list.image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-between gap-4 bg-bgsecondary p-4">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-md flex items-center justify-center">
            <img src={banner4} alt="" />
          </div>
          <div>
            <h3 className="text-base">Streamly live</h3>
            <p className="text-gray-500 text-sm">
              Join live and create your own stream.
            </p>
          </div>
        </div>
        <SignedOut>
          <Link
            to={"/sign-up"}
            className="bg-transparent transition-all text-primary hover:bg-primary hover:text-white rounded-lg border-[2px] border-primary border-solid py-2 px-4 inline-block text-sm"
          >
            Create Account
          </Link>
        </SignedOut>
      </div>
      <div className="pt-8">
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4">
          {streams.map((stream, index) => (
            <div className="bg-bgsecondary p-3 rounded-lg" key={index}>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={stream.image}
                  alt=""
                  className="transition-all hover:scale-110"
                />
              </div>
              <p className="py-2">
                <h3 className="text-sm line-clamp-2">{stream.title}</h3>
                <div className="flex items-center justify-between gap-1 mt-3 max-[400px]:flex-col max-[400px]:items-start">
                  <div className="flex items-center gap-2">
                    <Eye className="text-primary" size={16} />
                    <span className="text-sm text-gray-500">
                      {stream.watching} watching
                    </span>
                  </div>
                  <span className="py-1 px-3 bg-primary text-sm rounded-lg">
                    live
                  </span>
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomePage;
