import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import Wrapper from "../components/Wrapper";
import { topStreams } from "../source";
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
              Join live and also create your stream
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
    </Wrapper>
  );
};

export default HomePage;
