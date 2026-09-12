"use client";

import { useState } from "react";
import { CoverOverlay } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/CoverOverlay";
import { HeroSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/HeroSection";
import { WeddingInfoSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/WeddingInfoSection";
import { PhotoAlbumSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/PhotoAlbumSection";
import { PartyInfoSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/PartyInfoSection";
import { VenueSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/VenueSection";
import {
  DressCodeSection,
  TimelineSection,
} from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/TimelineSection";
import { GuestbookSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/GuestbookSection";
import { GiftBoxSection } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/GiftBoxSection";
import { SiteFooter } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/SiteFooter";
import { asset } from "@/components/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2/data";

export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen w-full">
      <CoverOverlay onOpen={() => setOpened(true)} hidden={opened} />

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

          <HeroSection />
          <WeddingInfoSection />
          <PhotoAlbumSection />
          <PartyInfoSection />
          <VenueSection />
          <DressCodeSection />
          <TimelineSection />
          <GuestbookSection />
          <GiftBoxSection />
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
