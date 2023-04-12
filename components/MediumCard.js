import React from "react";
import Image from "next/image";
const MediumCard = ({ img, title }) => {
  return (
    <div className="cursor-pointer ease-out duration-300 transform transition hover:scale-105">
      <div className="relative h-80 w-80">
        <div className="h-20 w-full mt-3">
          <Image
            src={img}
            fill
            style={{ objectFit: "contain" }}
            className="rounded-xl"
          />
        </div>
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
};

export default MediumCard;
