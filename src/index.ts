export interface TimeFromSecondsOptions {
    hours_padding?: number;
    minutes_padding?: number;
    seconds_padding?: number;
    seconds_decimal_places?: number;
    decimal_symbol?: string;
    output_template?: (
        hours: string,
        minutes: string,
        seconds: string,
        fractional_seconds?: string
    ) => string;
}

export interface SecondsFromTimeOptions {
    decimal_symbol?: string;
    template_string?: string;
}

export function timeFromSeconds(
    input_seconds: number | string,
    options: TimeFromSecondsOptions = {}
): string {
    let seconds = parseFloat(String(input_seconds));

    const is_negative = seconds < 0;

    if (is_negative) {
        seconds *= -1;
    }

    const options_sum: Required<TimeFromSecondsOptions> = {
        hours_padding: 2,
        minutes_padding: 2,
        seconds_padding: 2,
        seconds_decimal_places: 0,
        decimal_symbol: '.',
        output_template: (hours, minutes, secs) => `${hours}:${minutes}:${secs}`,
        ...options,
    };

    const decimal_mult =
        options_sum.seconds_decimal_places === 0 ? 1 : 10 ** options_sum.seconds_decimal_places;

    seconds = Math.round(seconds * decimal_mult) / decimal_mult;

    const calculated = {
        hours: '' + Math.floor(seconds / 3600),
        minutes: '' + Math.floor((seconds %= 3600) / 60),
        seconds: '' + Math.round((seconds % 60) * decimal_mult) / decimal_mult,
    };

    const dc_split = calculated.seconds.split('.');

    calculated.hours = calculated.hours.padStart(options_sum.hours_padding, '0');
    calculated.minutes = calculated.minutes.padStart(options_sum.minutes_padding, '0');
    calculated.seconds = calculated.seconds.replace(
        dc_split[0],
        dc_split[0].padStart(options_sum.seconds_padding, '0')
    );

    if (dc_split[1]) {
        calculated.seconds = calculated.seconds
            .replace(
                '.' + dc_split[1],
                '.' + dc_split[1].padEnd(options_sum.seconds_decimal_places, '0')
            )
            .replace('.', options_sum.decimal_symbol);
    } else if (!calculated.seconds.includes('.') && options_sum.seconds_decimal_places > 0) {
        calculated.seconds += options_sum.decimal_symbol.padEnd(
            options_sum.seconds_decimal_places + 1,
            '0'
        );
    }

    return (
        (is_negative ? '- ' : '') +
        options_sum.output_template(calculated.hours, calculated.minutes, calculated.seconds)
    );
}

export function secondsFromTime(input_time: string, options: SecondsFromTimeOptions = {}): number {
    const options_sum: Required<SecondsFromTimeOptions> = {
        decimal_symbol: '.',
        template_string: '{H}:{M}:{S}',
        ...options,
    };

    const template = options.template_string ?? options_sum.template_string;

    const positions = {
        h: template.indexOf('{H}'),
        m: template.indexOf('{M}'),
        s: template.indexOf('{S}'),
    };

    const to_order: ('h' | 'm' | 's')[] = [];

    if (positions.h > -1) {
        to_order.push('h');
    }

    if (positions.m > -1) {
        to_order.push('m');
    }

    if (positions.s > -1) {
        to_order.push('s');
    }

    const order = to_order.sort((a, b) => positions[a] - positions[b]);

    const hours_minutes_match = '([0-9]+)';
    const seconds_match = `([0-9]+([\\${options_sum.decimal_symbol}][0-9+]*)?)`;

    const built_regex = options_sum.template_string
        .replace('{H}', hours_minutes_match)
        .replace('{M}', hours_minutes_match)
        .replace('{S}', seconds_match);

    const regex_with_negative = `^(?:-[ ]?)?${built_regex}$`;

    const match = (input_time + '').match(new RegExp(regex_with_negative));

    if (!match) {
        throw new Error("Input time doesn't match required pattern.");
    }

    const hours = order.indexOf('h') > -1 ? parseInt(match[order.indexOf('h') + 1]) : 0;
    const minutes = order.indexOf('m') > -1 ? parseInt(match[order.indexOf('m') + 1]) : 0;
    const seconds = order.indexOf('s') > -1 ? parseInt(match[order.indexOf('s') + 1]) : 0;

    return (hours * 3600 + minutes * 60 + seconds) * (input_time.trim().startsWith('-') ? -1 : 1);
}
