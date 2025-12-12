# duration-str

![npm version](https://img.shields.io/npm/v/duration-str)
![license](https://img.shields.io/npm/l/duration-str)
![build](https://github.com/cloudtion/duration-str/actions/workflows/ci.yaml/badge.svg)

Tiny, zero-dependency utility for **formatting seconds into time strings**
and **parsing them back**, with full support for **custom templates**.

Perfect for timers, media players, logs, and UI displays.

---

## Install

```bash
npm install duration-str
```

## Quick Example

```ts
import { timeFromSeconds, secondsFromTime } from 'duration-str';

timeFromSeconds(5053);
// → "01:24:13"

secondsFromTime("01:24:13");
// → 5053
```

## Why this library?

✅ Bidirectional — format and parse durations

✅ Custom templates with round-trip safety

✅ Zero dependencies

✅ Small & predictable

✅ TypeScript support with full type definitions

❌ No Moment / Day.js overhead

## Custom Formats (Round-Trip Safe)

Format seconds using your own template:

```ts
const output_template = (h, m, s) => `${h}H ${m}M ${s}S`;

const str = timeFromSeconds(5053, { output_template });
// "01H 24M 13S"
```

Parse it back using a matching template string:

```ts
secondsFromTime("01H 24M 13S", {
  template_string: "{H}H {M}M {S}S"
});
// → 5053
```

## API

### timeFromSeconds(seconds, options?)

Formats a number of seconds into a string.

**Parameters**

- `seconds` — number

**Options**

- `hours_padding` — number (default: 2)
- `minutes_padding` — number (default: 2)
- `seconds_padding` — number (default: 2)
- `seconds_decimal_places` — number (default: 0)
- `decimal_symbol` — string (default: ".")
- `output_template` — `(hours, minutes, seconds) => string` (Note: parameters are strings)

### secondsFromTime(timeString, options?)

Parses a formatted time string back into seconds.

**Parameters**

- `timeString` — string

**Options**

- `decimal_symbol` — string (default: ".")
- `template_string` — string (default: "{H}:{M}:{S}")

## License

MIT
