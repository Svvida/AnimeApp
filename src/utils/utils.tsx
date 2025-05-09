import dayjs from '@/configs/day-js-config';
import { NullableString, UndefinedString } from '@/types/global-types';

export const safeDateFormat = (date: NullableString, format = 'DD.MM.YYYY'): UndefinedString => {
  return date ? dayjs(date).format(format) : undefined;
};
