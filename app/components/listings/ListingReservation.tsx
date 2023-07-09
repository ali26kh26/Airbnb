"use client";

import { Range } from "react-date-range";
import Button from "../shared/Button";
import Calendar from "../shared/inputs/Calendar";

interface Props {
  price: number;
  totalPrice: number;
  onchangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingResevation: React.FC<Props> = ({
  dateRange,
  disabled,
  disabledDates,
  onchangeDate,
  onSubmit,
  price,
  totalPrice,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-4 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600 ">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onchangeDate(value.selection)}
      />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="flex flex-row justify-between items-center p-4 font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingResevation;
