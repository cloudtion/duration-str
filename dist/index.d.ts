export interface TimeFromSecondsOptions {
    hours_padding?: number;
    minutes_padding?: number;
    seconds_padding?: number;
    seconds_decimal_places?: number;
    decimal_symbol?: string;
    output_template?: (hours: string, minutes: string, seconds: string, fractional_seconds?: string) => string;
}
export interface SecondsFromTimeOptions {
    decimal_symbol?: string;
    template_string?: string;
}
export declare function timeFromSeconds(input_seconds: unknown, options?: unknown): string;
export declare function secondsFromTime(input_time: unknown, options?: unknown): number;
