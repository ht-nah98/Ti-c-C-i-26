"use client";

import type { Slide } from "./types";
import type { WishPool } from "./useWishes";
import { TitleSlideView } from "./slides/TitleSlideView";
import { QuoteSlideView } from "./slides/QuoteSlideView";
import { ChapterSlideView } from "./slides/ChapterSlideView";
import { StorySlideView } from "./slides/StorySlideView";
import { PhotoSlideView } from "./slides/PhotoSlideView";
import { WishesSlideView } from "./slides/WishesSlideView";
import { ClosingSlideView } from "./slides/ClosingSlideView";

/** Chọn đúng thành phần hiển thị cho từng kiểu slide */
export function SlideRenderer({
  slide,
  index,
  wishes,
}: {
  slide: Slide;
  index: number;
  wishes: WishPool;
}) {
  switch (slide.kind) {
    case "title":
      return <TitleSlideView slide={slide} />;
    case "quote":
      return <QuoteSlideView slide={slide} />;
    case "chapter":
      return <ChapterSlideView slide={slide} />;
    case "story":
      return <StorySlideView slide={slide} index={index} />;
    case "photo":
      return <PhotoSlideView slide={slide} index={index} />;
    case "wishes":
      return <WishesSlideView slide={slide} wishes={wishes} />;
    case "closing":
      return <ClosingSlideView slide={slide} />;
  }
}
