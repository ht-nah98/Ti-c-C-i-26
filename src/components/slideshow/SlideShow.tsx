"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides, usedPhotos } from "./slides";
import { useWishes } from "./useWishes";
import { SlideRenderer } from "./SlideRenderer";
import { AmbientPetalLayer } from "./AmbientPetalLayer";
import { StartScreen } from "./StartScreen";
import { LeavingProvider, photoSrc } from "./slides/SlideParts";
import { useYouTubeAudio } from "@/components/shared/YouTubeAudio";

/**
 * Chuyển cảnh chia làm hai pha NỐI TIẾP nhau, không chồng lấn:
 *
 *   [0 → EXIT_MS]            slide cũ mờ dần cho tới khi biến mất hẳn
 *   [EXIT_MS → +ENTER_MS]    slide mới mới bắt đầu hiện ra
 *
 * Trước đây hai pha chạy song song, nên giữa quãng chuyển cảnh cả hai lớp
 * cùng ở opacity ~0.5 và chữ cũ đè lên chữ mới suốt hơn một giây — đó là
 * cảm giác "giật" khi đọc. Tách ra thì mắt chỉ đọc một khối chữ tại một
 * thời điểm.
 */
const EXIT_MS = 2000;
const ENTER_MS = 1100;

/**
 * Chữ bên trong slide bắt đầu trôi ra sớm hơn lớp nền một nhịp, nên nội
 * dung "tan ra" trước rồi nền mới mờ theo — mềm hơn nhiều so với việc cả
 * màn hình cùng tắt một lúc.
 */
const CONTENT_OUT_MS = 1200;

/**
 * Bộ máy slideshow: hẹn giờ chuyển slide, hoà tan chéo, nhạc nền và phím tắt.
 *
 * Luôn giữ hai lớp slide chồng nhau — lớp cũ mờ đi trong khi lớp mới hiện
 * lên, nên không bao giờ có khoảng đen ở giữa hai slide.
 */
export function SlideShow() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  /** Slide vừa rời đi, giữ lại để hoà tan; null khi hoà tan xong */
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  /** Tăng mỗi lần chuyển slide để ép React dựng lại DOM, animation chạy từ đầu */
  const [cycle, setCycle] = useState(0);

  /**
   * Nhạc nền phát qua trình phát YouTube nhúng thay vì file trong repo:
   * lượt nghe vẫn tính cho kênh gốc và tác giả vẫn nhận doanh thu.
   */
  const {
    element: khungNhac,
    playing: dangPhatNhac,
    toggle: bapTatNhac,
  } = useYouTubeAudio({ autoStart: started, volume: 40 });
  const wishes = useWishes();

  const current = slides[index];

  const enterAnimation = "slide-cross-in";
  const exitAnimation = "slide-cross-out";
  const exitMs = EXIT_MS;
  const enterMs = ENTER_MS;
  /** Tổng thời gian một lần chuyển cảnh, để trừ vào thời lượng slide */
  const transitionMs = exitMs + enterMs;
  /** Có đang trong lúc chuyển cảnh hay không — dùng để bật/tắt `will-change` */
  const transitioning = leaving !== null;

  /** Chuyển sang slide kế tiếp (hoặc lùi lại), bật hoà tan chéo */
  const goTo = useCallback(
    (next: number) => {
      setLeaving(index);
      setIndex(((next % slides.length) + slides.length) % slides.length);
      setCycle((c) => c + 1);
    },
    [index],
  );

  /** Dọn lớp slide cũ sau khi hoà tan (hoặc lật trang) xong */
  useEffect(() => {
    if (leaving === null) return;
    const id = setTimeout(() => setLeaving(null), transitionMs);
    return () => clearTimeout(id);
  }, [leaving, cycle, transitionMs]);

  /**
   * Hẹn giờ tự chuyển slide.
   *
   * Cộng thêm `exitMs` vì slide mới chỉ thật sự hiện ra sau khi slide cũ đã
   * tan hết. Không cộng thì `seconds` khai báo bị ăn mất quãng chờ đó, và
   * slide nào cũng ngắn hơn dự tính gần một giây.
   */
  useEffect(() => {
    if (!started || paused) return;
    const hienThiMs = current.seconds * 1000 + (transitioning ? exitMs : 0);
    const id = setTimeout(() => goTo(index + 1), hienThiMs);
    return () => clearTimeout(id);
  }, [started, paused, index, current.seconds, goTo, transitioning, exitMs]);

  /** Phím tắt: điều khiển tay khi cần, vẫn giữ được chế độ tự chạy */
  useEffect(() => {
    if (!started) return;

    function onKey(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          setPaused(true);
          goTo(index + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setPaused(true);
          goTo(index - 1);
          break;
        case "p":
        case "P":
          setPaused((p) => !p);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) {
            void document.exitFullscreen();
          } else {
            void document.documentElement.requestFullscreen().catch(() => undefined);
          }
          break;
        case "m":
        case "M":
          bapTatNhac();
          break;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, index, goTo, bapTatNhac]);

  /** Tải trước toàn bộ ảnh để slide không bao giờ hiện ra lúc ảnh chưa kịp về */
  useEffect(() => {
    usedPhotos.forEach((name) => {
      const img = new Image();
      img.src = photoSrc(name);
    });
  }, []);

  function handleStart() {
    // Trình phát nhạc tự bắt đầu khi `started` thành true — cú bấm này
    // chính là tương tác mà trình duyệt đòi hỏi để cho phát tiếng
    setStarted(true);
    void document.documentElement.requestFullscreen().catch(() => undefined);
  }

  return (
    <div
      data-slideshow
      className="relative h-dvh w-screen overflow-hidden bg-[#fff7f3]"
    >
      {khungNhac}

      {/* Cánh hoa trôi rất mờ phía sau mọi slide */}
      {started ? <AmbientPetalLayer /> : null}

      {/* Lớp slide đang rời đi — mờ dần rồi bị gỡ bỏ.
          `will-change` + `translateZ(0)` đẩy lớp này lên GPU: trình duyệt
          chỉ việc pha trộn hai ảnh bitmap có sẵn thay vì vẽ lại toàn bộ
          khung hình bằng CPU, đó là khác biệt giữa mượt và giật. */}
      {leaving !== null ? (
        <div
          key={`leave-${cycle}`}
          className="absolute inset-0 z-[5]"
          style={{
            // `will-change` chỉ bật trong lúc lớp này đang chuyển động.
            // Để thường trực thì trình duyệt ôm layer mãi không giải phóng,
            // càng nhiều slide càng nặng bộ nhớ.
            willChange: "opacity, transform",
            backfaceVisibility: "hidden",
            // Pha 1: mờ đi hẳn trong exitMs, không chờ ai
            // `ease-in-out` cho độ mờ giảm chậm ở hai đầu — không có điểm
            // nào chuyển động đột ngột để mắt bắt được
            animation: `${exitAnimation} ${exitMs}ms ease-in-out forwards`,
          }}
        >
          {/* Khối nội dung trôi ra sớm hơn lớp nền, nên chữ tan trước */}
          <div
            className="h-full w-full"
            style={{
              animation: `content-drift-out ${CONTENT_OUT_MS}ms ease-in forwards`,
              willChange: "opacity, transform",
            }}
          >
            <LeavingProvider>
              <SlideRenderer
                slide={slides[leaving]}
                index={leaving}
                wishes={wishes}
              />
            </LeavingProvider>
          </div>
        </div>
      ) : null}

      {/* Lớp slide hiện tại */}
      {started ? (
        <div
          key={`enter-${cycle}`}
          className="absolute inset-0 z-[6]"
          style={{
            opacity: 0,
            /**
             * Chỉ khai báo `will-change` khi còn đang chuyển cảnh, và bỏ hẳn
             * `transform: translateZ(0)` đặt tay: keyframe lật trang cũng
             * animate `transform` nên hai thứ ghi đè nhau. Bản thân animation
             * trên opacity/transform đã đủ để trình duyệt tự tách layer.
             */
            willChange: transitioning ? "opacity, transform" : "auto",
            backfaceVisibility: "hidden",
            /**
             * Pha 2: chờ đúng exitMs cho lớp cũ tan hết rồi mới hiện ra.
             * `opacity: 0` ở trên giữ lớp này vô hình suốt thời gian chờ.
             */
            animation: `${enterAnimation} ${enterMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${transitioning ? exitMs : 0}ms forwards`,
          }}
        >
          <SlideRenderer slide={current} index={index} wishes={wishes} />
        </div>
      ) : null}

      {/* Thanh tiến trình đáy màn hình */}
      {started ? (
        <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-[rgba(124,106,96,0.14)]">
          <div
            key={`progress-${cycle}-${paused}`}
            className="h-full origin-left bg-[rgba(124,106,96,0.75)]"
            style={{
              transform: "scaleX(0)",
              // Chờ slide mới hiện ra rồi thanh mới chạy, để nó khớp với
              // đúng quãng thời gian khách thật sự nhìn thấy nội dung
              animation: paused
                ? "none"
                : `progress-fill ${current.seconds}s linear ${transitioning ? exitMs : 0}ms forwards`,
            }}
          />
        </div>
      ) : null}

      {/* Báo nhạc đang tắt — người chiếu biết mà bấm M bật lại */}
      {started && !dangPhatNhac ? (
        <div className="absolute bottom-6 left-7 z-30 rounded-full bg-[rgba(124,106,96,0.7)] px-4 py-1.5">
          <span className="font-serif text-[13px] text-white">
            Nhạc đang tắt · bấm M để bật
          </span>
        </div>
      ) : null}

      {/* Báo tạm dừng */}
      {started && paused ? (
        <div className="absolute bottom-6 right-7 z-30 rounded-full bg-[rgba(124,106,96,0.85)] px-4 py-1.5">
          <span className="font-serif text-[13px] text-white">
            Tạm dừng · bấm P để chạy tiếp
          </span>
        </div>
      ) : null}

      {!started ? (
        <StartScreen onStart={handleStart} />
      ) : null}
    </div>
  );
}
