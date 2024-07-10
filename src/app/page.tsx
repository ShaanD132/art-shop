"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";

export default function Home() {
  const plugin = useRef(
    Autoplay({delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true})
  )
  return (
    <div className="m-10 container-xl">
      <p className="inline-block mr-2">Hello, go</p>
      <Link className="inline-block underline"href="/admin">/admin</Link>

      {/* Gallery component */}
      <div>
        <h1>Gallery</h1>
        <br />
        <h2>F2 ...</h2>
      </div>
      <div className="mx-20 mt-10">
        <Carousel className="main-carousel"
        opts={{
          align: "center",
          loop: true
        }}
        plugins={[plugin.current]}
        >
          <CarouselContent>
            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/studio/IMG_9455.jpg"/>
            </CarouselItem>

            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/38b657f7-a049-4dac-827e-6939adb0cb74.JPG"/>
            </CarouselItem>

            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/studio/Studio_1.jpeg"/>
            </CarouselItem>

            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/studio/paintings%20new%20wallpaper.JPG"/>
            </CarouselItem>

            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/OpenDay/7_boats_juniors.jpeg"/>
            </CarouselItem>

            <CarouselItem className="flex justify-center items-center">
              <img src="https://www.chocolart.com.hk/images/OpenDay/ticki_kids_1.jpg"/>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>

    </div>
  );
}