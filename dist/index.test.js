"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('timeFromSeconds', () => {
    describe('basic conversions', () => {
        test('converts 0 seconds to 00:00:00', () => {
            expect((0, index_1.timeFromSeconds)(0)).toBe('00:00:00');
        });
        test('converts 1 second to 00:00:01', () => {
            expect((0, index_1.timeFromSeconds)(1)).toBe('00:00:01');
        });
        test('converts 59 seconds to 00:00:59', () => {
            expect((0, index_1.timeFromSeconds)(59)).toBe('00:00:59');
        });
        test('converts 60 seconds to 00:01:00', () => {
            expect((0, index_1.timeFromSeconds)(60)).toBe('00:01:00');
        });
        test('converts 61 seconds to 00:01:01', () => {
            expect((0, index_1.timeFromSeconds)(61)).toBe('00:01:01');
        });
        test('converts 3599 seconds to 00:59:59', () => {
            expect((0, index_1.timeFromSeconds)(3599)).toBe('00:59:59');
        });
        test('converts 3600 seconds to 01:00:00', () => {
            expect((0, index_1.timeFromSeconds)(3600)).toBe('01:00:00');
        });
        test('converts 3661 seconds to 01:01:01', () => {
            expect((0, index_1.timeFromSeconds)(3661)).toBe('01:01:01');
        });
        test('converts 86399 seconds to 23:59:59', () => {
            expect((0, index_1.timeFromSeconds)(86399)).toBe('23:59:59');
        });
        test('converts 86400 seconds to 24:00:00', () => {
            expect((0, index_1.timeFromSeconds)(86400)).toBe('24:00:00');
        });
    });
    describe('negative values', () => {
        test('converts -1 second to - 00:00:01', () => {
            expect((0, index_1.timeFromSeconds)(-1)).toBe('- 00:00:01');
        });
        test('converts -3661 seconds to - 01:01:01', () => {
            expect((0, index_1.timeFromSeconds)(-3661)).toBe('- 01:01:01');
        });
        test('converts -60 seconds to - 00:01:00', () => {
            expect((0, index_1.timeFromSeconds)(-60)).toBe('- 00:01:00');
        });
    });
    describe('decimal seconds', () => {
        test('converts 1.5 seconds with 1 decimal place', () => {
            expect((0, index_1.timeFromSeconds)(1.5, { seconds_decimal_places: 1 })).toBe('00:00:01.5');
        });
        test('converts 1.55 seconds with 2 decimal places', () => {
            expect((0, index_1.timeFromSeconds)(1.55, { seconds_decimal_places: 2 })).toBe('00:00:01.55');
        });
        test('converts 1.555 seconds with 3 decimal places', () => {
            expect((0, index_1.timeFromSeconds)(1.555, { seconds_decimal_places: 3 })).toBe('00:00:01.555');
        });
        test('rounds to specified decimal places', () => {
            expect((0, index_1.timeFromSeconds)(1.999, { seconds_decimal_places: 2 })).toBe('00:00:02.00');
        });
        test('pads decimal places with zeros', () => {
            expect((0, index_1.timeFromSeconds)(1, { seconds_decimal_places: 2 })).toBe('00:00:01.00');
        });
        test('handles decimal seconds with negative values', () => {
            expect((0, index_1.timeFromSeconds)(-1.5, { seconds_decimal_places: 1 })).toBe('- 00:00:01.5');
        });
    });
    describe('custom decimal symbol', () => {
        test('uses comma as decimal symbol', () => {
            expect((0, index_1.timeFromSeconds)(1.5, {
                seconds_decimal_places: 1,
                decimal_symbol: ',',
            })).toBe('00:00:01,5');
        });
        test('uses custom decimal symbol with padding', () => {
            expect((0, index_1.timeFromSeconds)(1, {
                seconds_decimal_places: 2,
                decimal_symbol: ',',
            })).toBe('00:00:01,00');
        });
    });
    describe('custom padding', () => {
        test('uses custom hours padding', () => {
            expect((0, index_1.timeFromSeconds)(3661, { hours_padding: 3 })).toBe('001:01:01');
        });
        test('uses custom minutes padding', () => {
            expect((0, index_1.timeFromSeconds)(61, { minutes_padding: 3 })).toBe('00:001:01');
        });
        test('uses custom seconds padding', () => {
            expect((0, index_1.timeFromSeconds)(1, { seconds_padding: 3 })).toBe('00:00:001');
        });
        test('uses no padding (0)', () => {
            expect((0, index_1.timeFromSeconds)(3661, {
                hours_padding: 0,
                minutes_padding: 0,
                seconds_padding: 0,
            })).toBe('1:1:1');
        });
        test('uses single digit padding', () => {
            expect((0, index_1.timeFromSeconds)(3661, {
                hours_padding: 1,
                minutes_padding: 1,
                seconds_padding: 1,
            })).toBe('1:1:1');
        });
    });
    describe('custom output template', () => {
        test('uses custom template with different separator', () => {
            expect((0, index_1.timeFromSeconds)(3661, {
                output_template: (h, m, s) => `${h}-${m}-${s}`,
            })).toBe('01-01-01');
        });
        test('uses custom template with labels', () => {
            expect((0, index_1.timeFromSeconds)(3661, {
                output_template: (h, m, s) => `${h}h ${m}m ${s}s`,
            })).toBe('01h 01m 01s');
        });
        test('uses custom template showing only hours and minutes', () => {
            expect((0, index_1.timeFromSeconds)(3660, {
                output_template: (h, m) => `${h}:${m}`,
            })).toBe('01:01');
        });
    });
    describe('string input', () => {
        test('handles string input "3661"', () => {
            expect((0, index_1.timeFromSeconds)('3661')).toBe('01:01:01');
        });
        test('handles string input with decimals', () => {
            expect((0, index_1.timeFromSeconds)('1.5', { seconds_decimal_places: 1 })).toBe('00:00:01.5');
        });
    });
    describe('large values', () => {
        test('handles values over 100 hours', () => {
            expect((0, index_1.timeFromSeconds)(360000)).toBe('100:00:00');
        });
        test('handles values over 1000 hours', () => {
            expect((0, index_1.timeFromSeconds)(3600000, { hours_padding: 4 })).toBe('1000:00:00');
        });
    });
    describe('runtime type validation', () => {
        test('throws TypeError when input_seconds is undefined', () => {
            expect(() => (0, index_1.timeFromSeconds)(undefined)).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(undefined)).toThrow('input_seconds is required');
        });
        test('throws TypeError when input_seconds is null', () => {
            expect(() => (0, index_1.timeFromSeconds)(null)).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(null)).toThrow('input_seconds is required');
        });
        test('throws TypeError when input_seconds is not a number or string', () => {
            expect(() => (0, index_1.timeFromSeconds)({})).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)({})).toThrow('input_seconds must be a number or string');
        });
        test('throws TypeError when input_seconds is NaN string', () => {
            expect(() => (0, index_1.timeFromSeconds)('not a number')).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)('not a number')).toThrow('input_seconds must be a valid number');
        });
        test('throws TypeError when options is not an object', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, 'invalid')).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(100, 'invalid')).toThrow('options must be an object');
        });
        test('throws TypeError when hours_padding is not a number', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, { hours_padding: 'two' })).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(100, { hours_padding: 'two' })).toThrow('options.hours_padding must be a number');
        });
        test('throws TypeError when minutes_padding is not a number', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, {
                minutes_padding: 'two',
            })).toThrow(TypeError);
        });
        test('throws TypeError when seconds_padding is not a number', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, {
                seconds_padding: 'two',
            })).toThrow(TypeError);
        });
        test('throws TypeError when seconds_decimal_places is not a number', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, {
                seconds_decimal_places: 'two',
            })).toThrow(TypeError);
        });
        test('throws TypeError when decimal_symbol is not a string', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, { decimal_symbol: 123 })).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(100, { decimal_symbol: 123 })).toThrow('options.decimal_symbol must be a string');
        });
        test('throws TypeError when output_template is not a function', () => {
            expect(() => (0, index_1.timeFromSeconds)(100, {
                output_template: 'template',
            })).toThrow(TypeError);
            expect(() => (0, index_1.timeFromSeconds)(100, {
                output_template: 'template',
            })).toThrow('options.output_template must be a function');
        });
    });
});
describe('secondsFromTime', () => {
    describe('basic conversions', () => {
        test('converts 00:00:00 to 0 seconds', () => {
            expect((0, index_1.secondsFromTime)('00:00:00', { template_string: '{H}:{M}:{S}' })).toBe(0);
        });
        test('converts 00:00:01 to 1 second', () => {
            expect((0, index_1.secondsFromTime)('00:00:01', { template_string: '{H}:{M}:{S}' })).toBe(1);
        });
        test('converts 00:00:59 to 59 seconds', () => {
            expect((0, index_1.secondsFromTime)('00:00:59', { template_string: '{H}:{M}:{S}' })).toBe(59);
        });
        test('converts 00:01:00 to 60 seconds', () => {
            expect((0, index_1.secondsFromTime)('00:01:00', { template_string: '{H}:{M}:{S}' })).toBe(60);
        });
        test('converts 00:01:01 to 61 seconds', () => {
            expect((0, index_1.secondsFromTime)('00:01:01', { template_string: '{H}:{M}:{S}' })).toBe(61);
        });
        test('converts 01:00:00 to 3600 seconds', () => {
            expect((0, index_1.secondsFromTime)('01:00:00', { template_string: '{H}:{M}:{S}' })).toBe(3600);
        });
        test('converts 01:01:01 to 3661 seconds', () => {
            expect((0, index_1.secondsFromTime)('01:01:01', { template_string: '{H}:{M}:{S}' })).toBe(3661);
        });
        test('converts 23:59:59 to 86399 seconds', () => {
            expect((0, index_1.secondsFromTime)('23:59:59', { template_string: '{H}:{M}:{S}' })).toBe(86399);
        });
    });
    describe('negative values', () => {
        test('converts -00:00:01 to -1 second', () => {
            expect((0, index_1.secondsFromTime)('-00:00:01', { template_string: '{H}:{M}:{S}' })).toBe(-1);
        });
        test('converts - 01:01:01 to -3661 seconds (with space)', () => {
            expect((0, index_1.secondsFromTime)('- 01:01:01', { template_string: '{H}:{M}:{S}' })).toBe(-3661);
        });
        test('converts -01:01:01 to -3661 seconds (without space)', () => {
            expect((0, index_1.secondsFromTime)('-01:01:01', { template_string: '{H}:{M}:{S}' })).toBe(-3661);
        });
    });
    describe('custom templates', () => {
        test('parses minutes:seconds format', () => {
            expect((0, index_1.secondsFromTime)('05:30', { template_string: '{M}:{S}' })).toBe(330);
        });
        test('parses hours:minutes format', () => {
            expect((0, index_1.secondsFromTime)('02:30', { template_string: '{H}:{M}' })).toBe(9000);
        });
        test('parses seconds only format', () => {
            expect((0, index_1.secondsFromTime)('45', { template_string: '{S}' })).toBe(45);
        });
        test('parses with different separator', () => {
            expect((0, index_1.secondsFromTime)('01-01-01', { template_string: '{H}-{M}-{S}' })).toBe(3661);
        });
        test('parses with text labels', () => {
            expect((0, index_1.secondsFromTime)('01h 01m 01s', { template_string: '{H}h {M}m {S}s' })).toBe(3661);
        });
    });
    describe('variable length inputs', () => {
        test('handles single digit values', () => {
            expect((0, index_1.secondsFromTime)('1:1:1', { template_string: '{H}:{M}:{S}' })).toBe(3661);
        });
        test('handles mixed digit lengths', () => {
            expect((0, index_1.secondsFromTime)('1:01:01', { template_string: '{H}:{M}:{S}' })).toBe(3661);
        });
        test('handles large hour values', () => {
            expect((0, index_1.secondsFromTime)('100:00:00', { template_string: '{H}:{M}:{S}' })).toBe(360000);
        });
    });
    describe('decimal seconds', () => {
        test('parses time with decimal seconds', () => {
            expect((0, index_1.secondsFromTime)('00:00:01.5', { template_string: '{H}:{M}:{S}' })).toBe(1);
        });
        test('parses time with custom decimal symbol', () => {
            expect((0, index_1.secondsFromTime)('00:00:01,5', {
                template_string: '{H}:{M}:{S}',
                decimal_symbol: ',',
            })).toBe(1);
        });
    });
    describe('error handling', () => {
        test('throws error for invalid format', () => {
            expect(() => (0, index_1.secondsFromTime)('invalid', { template_string: '{H}:{M}:{S}' })).toThrow("Input time doesn't match required pattern.");
        });
        test('throws error for empty string', () => {
            expect(() => (0, index_1.secondsFromTime)('', { template_string: '{H}:{M}:{S}' })).toThrow("Input time doesn't match required pattern.");
        });
        test('throws error for mismatched template', () => {
            expect(() => (0, index_1.secondsFromTime)('01:01:01', { template_string: '{H}-{M}-{S}' })).toThrow("Input time doesn't match required pattern.");
        });
    });
    describe('runtime type validation', () => {
        test('throws TypeError when input_time is undefined', () => {
            expect(() => (0, index_1.secondsFromTime)(undefined)).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)(undefined)).toThrow('input_time is required');
        });
        test('throws TypeError when input_time is null', () => {
            expect(() => (0, index_1.secondsFromTime)(null)).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)(null)).toThrow('input_time is required');
        });
        test('throws TypeError when input_time is not a string', () => {
            expect(() => (0, index_1.secondsFromTime)(123)).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)(123)).toThrow('input_time must be a string');
        });
        test('throws TypeError when options is not an object', () => {
            expect(() => (0, index_1.secondsFromTime)('00:00:00', 'invalid')).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)('00:00:00', 'invalid')).toThrow('options must be an object');
        });
        test('throws TypeError when decimal_symbol is not a string', () => {
            expect(() => (0, index_1.secondsFromTime)('00:00:00', {
                decimal_symbol: 123,
            })).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)('00:00:00', {
                decimal_symbol: 123,
            })).toThrow('options.decimal_symbol must be a string');
        });
        test('throws TypeError when template_string is not a string', () => {
            expect(() => (0, index_1.secondsFromTime)('00:00:00', {
                template_string: 123,
            })).toThrow(TypeError);
            expect(() => (0, index_1.secondsFromTime)('00:00:00', {
                template_string: 123,
            })).toThrow('options.template_string must be a string');
        });
    });
    describe('round trip conversions', () => {
        test('timeFromSeconds -> secondsFromTime returns original value', () => {
            const original = 3661;
            const formatted = (0, index_1.timeFromSeconds)(original);
            const result = (0, index_1.secondsFromTime)(formatted, { template_string: '{H}:{M}:{S}' });
            expect(result).toBe(original);
        });
        test('round trip with negative value', () => {
            const original = -3661;
            const formatted = (0, index_1.timeFromSeconds)(original);
            const result = (0, index_1.secondsFromTime)(formatted, { template_string: '{H}:{M}:{S}' });
            expect(result).toBe(original);
        });
        test('round trip with large value', () => {
            const original = 360000;
            const formatted = (0, index_1.timeFromSeconds)(original, { hours_padding: 3 });
            const result = (0, index_1.secondsFromTime)(formatted, { template_string: '{H}:{M}:{S}' });
            expect(result).toBe(original);
        });
    });
});
