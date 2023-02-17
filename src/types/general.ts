import { z } from "zod";

const HourMinuteTime = z.custom<`${string}:${string}`>((val) =>
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val as string)
);

const YMDDate = z.custom<`${string}-${string}-${string}`>((val) =>
  /^(\d{4})-(1[0-2]|0[0-9])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])$/.test(val as string)
);

export { HourMinuteTime, YMDDate };
