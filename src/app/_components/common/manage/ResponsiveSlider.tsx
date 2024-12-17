"use client";

// Carousel.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

type CarouselProps = {
  items: string[]; // 캐러셀에 표시할 아이템 (문자열 배열)
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const settings = {
    dots: true, // 하단 네비게이션 점 표시
    infinite: true, // 무한 스크롤
    speed: 500, // 슬라이드 속도 (ms)
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    responsive: [
      {
        breakpoint: 768, // 반응형: 화면 너비가 768px 이하일 때
        settings: {
          slidesToShow: 1, // 한 번에 1개 표시
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-4/5 mx-auto">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2 pt-7">
            {/* 간격을 위한 padding */}
            <div className="text-center">{item}</div>
            <div className="flex items-center justify-center h-[170px] rounded-lg">
              <Image
                src="/images/testimage.svg"
                alt="Example SVG"
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
