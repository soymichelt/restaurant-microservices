/* eslint-disable security/detect-non-literal-regexp */
import { EnumValueObject } from './enumValueObject';

export enum DateRangeEnum {
  today = 'today',
  month = 'month',
  all = 'all',
}

const DATE_RANGE_ENUM_VALUES = Object.values(DateRangeEnum);

export class DateRange extends EnumValueObject<DateRangeEnum> {
  public static build(value: DateRangeEnum): DateRange {
    return new DateRange(value, DATE_RANGE_ENUM_VALUES);
  }

  public static fromString(value: string): DateRange {
    return this.build(value as DateRangeEnum);
  }

  public static today(): DateRange {
    return this.build(DateRangeEnum.today);
  }

  public static month(): DateRange {
    return this.build(DateRangeEnum.month);
  }

  public static all(): DateRange {
    return this.build(DateRangeEnum.all);
  }

  public static getTodayRegex(): RegExp {
    const today = new Date().toISOString().substring(0, 10);
    return new RegExp(today, 'i');
  }

  public static getMonthRegex(): RegExp {
    const yearAndMonth = new Date().toISOString().substring(0, 7);
    return new RegExp(yearAndMonth, 'i');
  }

  public isToday(): boolean {
    return this.value === DateRangeEnum.today;
  }

  public isMonth(): boolean {
    return this.value === DateRangeEnum.month;
  }

  public isAll(): boolean {
    return this.value === DateRangeEnum.all;
  }
}
