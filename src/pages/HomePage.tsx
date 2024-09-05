import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Wrapper from "../components/Wrapper";
import { topStreams } from "../source";

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
    </Wrapper>
  );
};

export default HomePage;
