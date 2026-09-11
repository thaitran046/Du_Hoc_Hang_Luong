import React, { useEffect, useRef, useState } from 'react';
import { content } from '../lib/content';
import LeadForm from './LeadForm';
import { Calendar } from 'lucide-react';

const YOUTUBE_VIDEO_ID = '7vQ1S7m4NtE';

export default function Hero() {
  const playerRef = useRef(null);
  const [youtubeReady, setYoutubeReady] = useState(false);

  // ==========================================
  // LOAD YOUTUBE IFRAME API
  // ==========================================
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setYoutubeReady(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (existingScript) {
      window.onYouTubeIframeAPIReady = () => {
        setYoutubeReady(true);
      };

      return;
    }

    const script = document.createElement('script');

    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;

    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      setYoutubeReady(true);
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  // ==========================================
  // INIT YOUTUBE PLAYER
  // ==========================================
  useEffect(() => {
    if (!youtubeReady || playerRef.current) return;

    playerRef.current = new window.YT.Player(
      'hero-youtube-player',
      {
        videoId: YOUTUBE_VIDEO_ID,

        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          playsinline: 1,
          fs: 1,
          iv_load_policy: 3,
        },

        events: {
          onReady: (event) => {
            event.target.pauseVideo();
          },
        },
      }
    );

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.log(error);
        }

        playerRef.current = null;
      }
    };
  }, [youtubeReady]);

  return (
    // Đã tăng pt-12 md:pt-16 để tránh đè lên thanh Header phía trên
    <section className="relative overflow-hidden bg-slate-50 pt-12 pb-20 md:pt-16 md:pb-24">

      {/* ================================================= */}
      {/* VIDEO YOUTUBE */}
      {/* FULL THEO CONTAINER - KHÔNG QUÁ CAO */}
      {/* ================================================= */}

      <div className="container mx-auto px-4">

        <div
          className="
            relative
            w-full
            aspect-[21/9]
            max-h-[380px]
            md:max-h-[460px]
            mx-auto
            overflow-hidden
            rounded-2xl
            bg-black
            shadow-2xl
          "
        >
          <div
            id="hero-youtube-player"
            className="absolute inset-0 w-full h-full"
          />
        </div>

      </div>


      {/* ================================================= */}
      {/* HERO CONTENT */}
      {/* ================================================= */}

      <div className="relative mt-12">

        {/* Background pattern */}
        <div
          className="
            absolute
            top-0
            right-0
            w-1/2
            h-full
            bg-brand-blue
            opacity-[0.03]
            -skew-x-12
            translate-x-1/4
            pointer-events-none
          "
        />

        <div className="container mx-auto px-4 relative z-10">

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* ================================================= */}
            {/* LEFT - HERO CONTENT */}
            {/* ================================================= */}

            <div className="flex-1 text-center lg:text-left">

              {/* Badge */}
              <div
                className="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  rounded-full
                  bg-red-50
                  text-brand-blue
                  text-sm
                  font-bold
                  mb-6
                  border
                  border-red-100
                "
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span
                    className="
                      animate-ping
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-red-400
                      opacity-75
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      rounded-full
                      h-2
                      w-2
                      bg-brand-blue
                    "
                  />
                </span>

                Tư vấn du học chuyên nghiệp
              </div>


              {/* Heading */}
              <h1
                className="
                  text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-extrabold
                  text-slate-900
                  leading-[1.1]
                  mb-6
                "
              >
                MỞ CỬA TƯƠNG LAI

                <br />

                <span className="text-brand-blue italic">
                  CÙNG DU HỌC HẰNG LƯƠNG
                </span>
              </h1>


              {/* Description */}
              <p
                className="
                  text-lg
                  md:text-xl
                  text-slate-600
                  mb-8
                  max-w-2xl
                  mx-auto
                  lg:mx-0
                  leading-relaxed
                "
              >
                Tư vấn du học cá nhân hóa: định hướng lộ trình,
                chọn trường & ngành, hỗ trợ hồ sơ phù hợp năng lực
                và tài chính từng gia đình.
              </p>


              {/* ================================================= */}
              {/* USP */}
              {/* ================================================= */}

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-4
                  mb-10
                  max-w-xl
                  mx-auto
                  lg:mx-0
                  text-left
                "
              >
                {content.usp.map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className="
                        flex
                        items-center
                        space-x-2
                        text-slate-700
                        font-medium
                      "
                    >
                      <Icon
                        className="
                          w-5
                          h-5
                          text-green-500
                          flex-shrink-0
                        "
                      />

                      <span className="text-sm md:text-base">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>


              {/* ================================================= */}
              {/* CTA */}
              {/* ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-4
                "
              >
                <a
                  href="#registration-form"
                  className="
                    w-full
                    sm:w-auto
                    px-8
                    py-4
                    bg-brand-blue
                    text-white
                    rounded-xl
                    font-bold
                    shadow-xl
                    shadow-red-500/20
                    hover:bg-red-700
                    transition-all
                    flex
                    items-center
                    justify-center
                  "
                >
                  NHẬN TƯ VẤN MIỄN PHÍ
                </a>


                <a
                  href="#events"
                  className="
                    w-full
                    sm:w-auto
                    px-8
                    py-4
                    bg-white
                    text-slate-900
                    border-2
                    border-slate-200
                    rounded-xl
                    font-bold
                    hover:bg-slate-50
                    transition-all
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <Calendar className="w-5 h-5" />

                  <span>
                    ĐĂNG KÝ SỰ KIỆN
                  </span>
                </a>
              </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT - LEAD FORM */}
            {/* ================================================= */}

            <div
              id="registration-form"
              className="
                flex-1
                w-full
                max-w-xl
                lg:max-w-md
                xl:max-w-lg
                scroll-mt-24
              "
            >
              <LeadForm />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}