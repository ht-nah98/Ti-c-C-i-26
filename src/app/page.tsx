"use client";

import { useState } from "react";

import { CoverOverlay } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/CoverOverlay";
import { AmbientPetals } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/AmbientPetals";
import { MusicPlayer } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/MusicPlayer";
import { HeroSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/HeroSection";
import { WeddingInfoSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/WeddingInfoSection";
import { LoveQuotesSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/LoveQuotesSection";
import { StorySection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/StorySection";
import { PhotoAlbumSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/PhotoAlbumSection";
import { PartyInfoSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/PartyInfoSection";
import { VenueSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/VenueSection";
import {
  DressCodeSection,
  TimelineSection,
} from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/TimelineSection";
import { GuestbookSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/GuestbookSection";
import { GiftBoxSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/GiftBoxSection";
import { ClosingSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/ClosingSection";
import { SiteFooter } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/SiteFooter";
import { asset } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/data";

export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen w-full">
      <CoverOverlay onOpen={() => setOpened(true)} hidden={opened} />

      {/* Nhạc nền bắt đầu khi khách mở thiệp */}
      <MusicPlayer autoStart={opened} />

      <div className="flex w-full justify-center overflow-x-clip bg-white">
        <div className="relative isolate w-full max-w-[480px] overflow-hidden bg-[#fff7f3] md:mx-auto md:max-w-[900px] md:border md:border-[#7c6a6022]">
          {/* Lớp texture giấy phủ toàn thiệp */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `url(${asset.theme("paper.webp")})`,
              backgroundSize: "cover",
            }}
          />

          <AmbientPetals />

          {/* 1. Mở đầu — tên, ảnh cưới */}
          <HeroSection />

          {/* 2. Gia đình hai bên */}
          <WeddingInfoSection />

          {/* 3. Lời yêu thương */}
          <LoveQuotesSection />

          {/* 4. Câu chuyện của chúng tôi */}
          <StorySection />

          {/* 5. Album ảnh */}
          <PhotoAlbumSection />

          {/* 6. Nghi lễ — đếm ngược, 2 lễ, lịch */}
          <PartyInfoSection />

          {/* 7. Bản đồ tới lễ thành hôn */}
          <VenueSection />

          {/* 8. Trang phục */}
          <DressCodeSection />

          {/* 9. Lịch trình trong ngày */}
          <TimelineSection />

          {/* 10. Lời chúc */}
          <GuestbookSection />

          {/* 11. Mừng cưới */}
          <GiftBoxSection />

          {/* 12. Lời kết */}
          <ClosingSection />

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
