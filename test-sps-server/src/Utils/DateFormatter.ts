import { format, formatInTimeZone, toDate } from "date-fns-tz";
import { parseISO } from "date-fns";

export class DateFormatter {
  private static getFnsTmz(date: any): string {
    return formatInTimeZone(
      date,
      "America/Sao_Paulo",
      "yyyy-MM-dd HH:mm:ss.SSS",
    );
  }

  public static strToDateTime(date?: string): Date {
    if (!date || date === "") {
      date = this.getFnsTmz(new Date());
    }
    return toDate(this.getFnsTmz(date));
  }

  public static timestampNumber(date: Date): string {
    return format(parseISO(this.getFnsTmz(date)), "yyyyMMddHHmmssSSS");
  }

  public static dateToStrBR(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  public static dateToMateraDate(date: Date): string {
    return format(date, "yyyy/MM/dd");
  }

  public static dateToDateStr(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }
  public static dateTimeToDateStr(date: any): any {
    const dateObject = parseISO(date);
    return format(dateObject, "yyyy-MM-dd");
  }

  public static dateTimeFormatToDateStr(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }

  public static dateTimeToStr(date: Date): string {
    return this.getFnsTmz(date).toString();
  }
  public static dateTimeToStrBr(date: Date): string {
    return format(date, "dd/MM/yyyy HH:mm:ss");
  }

  public static getDateTimeStrCurrency(): string {
    return format(new Date(), "yyyy-mm-dd HH:mm:ss.SSS");
  }

  public static isDateExpired(expiresDateTime: string): boolean {
    return new Date() > new Date(expiresDateTime);
  }
}
