import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
const InfoCard = ({
  img,
  title,
  description,
  star,
  price,
  total,
  location,
}) => {
  return (
    <div className="flex flex-col md:flex-row py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg duration-200 ease-out first:border-t">
      <div className="relative ml-2 mb-2 h-44 w-full md:mb-0 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={img}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-2xl w-full"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
