import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyPhotoCarouselProps {
  photos: string[];
  address: string;
  price: number;
}

const PropertyPhotoCarousel = ({ photos, address, price }: PropertyPhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) {
    return (
      <Card className="relative h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <p className="text-muted-foreground">No photos available</p>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Card className="relative h-[500px] overflow-hidden group">
        <img
          src={photos[currentIndex]}
          alt={`${address} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        
        {/* Overlay with address and price */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
          <h2 className="text-white text-2xl font-bold mb-2">{address}</h2>
          <p className="text-white text-3xl font-bold">{formatPrice(price)}</p>
        </div>

        {/* Navigation buttons */}
        {photos.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
              onClick={prevPhoto}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
              onClick={nextPhoto}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Photo counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      </Card>

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary/50"
              }`}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyPhotoCarousel;
