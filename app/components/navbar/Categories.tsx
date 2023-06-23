"use client";

import Container from "../shared/Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

import { category } from "@/app/types";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../shared/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories: category[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the country side!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <Container>
      <div
        // id="scroll"
        className="pt-4 flex flex-row items-center justify-between overflow-x-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg "
      >
        {categories.map((item) => (
          <CategoryBox
            {...item}
            selected={category === item.label}
            key={item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
