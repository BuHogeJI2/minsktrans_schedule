export function decode_times(encoded_line) {

    var index = encoded_line.indexOf(",");
    var direction_id = encoded_line.substr(0, index);
    encoded_line = encoded_line.substr(index + 1);
    var decoded_data = decode(encoded_line);

    function decode(encoded_data) {

        var timetable = [];
        var weekdays = [];
        var valid_from = [];
        var valid_to = [];

        var w;
        var h;

        var times = encoded_data.split(",");
        var i, prev_t;
        var i_max = times.length;

        var zero_ground = [], plus = "+", minus = "-";

        for (i = -1, w = 0, h = 0, prev_t = 0; ++i < i_max;) {
            var t = times[i];

            if (t == "") {
                break;
            }

            var tag = t.charAt(0);
            if (tag == plus || (tag == minus && t.charAt(1) == "0")) {
                zero_ground[i] = "1";
            }

            prev_t += +(t);
            timetable[w++] = prev_t;
        }

        for (var j = zero_ground.length; --j >= 0;) {
            if (!zero_ground[j]) {
                zero_ground[j] = "0";
            }
        }

        // atkoduojame isigaliojimo datas
        for (var j = 0; ++i < i_max;) {
            var day = +(times[i]);
            var k = times[++i];

            if (k == "") {
                k = w - j;
                i_max = 0;
            } else {
                k = +(k);
            }

            while (k-- > 0) {
                valid_from[j++] = day;
            }
        }

        --i;

        for (var j = 0, i_max = times.length; ++i < i_max;) {
            var day = +(times[i]);
            var k = times[++i];

            if (k == "") {
                k = w - j;
                i_max = 0;
            } else {
                k = +(k);
            }

            while (k-- > 0) {
                valid_to[j++] = day;
            }
        }

        --i;

        for (var j = 0, i_max = times.length; ++i < i_max;) {
            var weekday = times[i];
            var k = times[++i];

            if (k == "") {
                k = w - j;
                i_max = 0;
            } else {
                k = +(k);
            }

            while (k-- > 0) {
                weekdays[j++] = weekday;
            }
        }

        --i;
        h = 1;

        for (var j = w, w_left = w, dt = 5, i_max = times.length; ++i < i_max;) {
            dt += +(times[i]) - 5;
            var k = times[++i];

            if (k != "") {
                k = +(k);
                w_left -= k;
            } else {
                k = w_left;
                w_left = 0;
            }

            while (k-- > 0) {
                timetable[j] = dt + timetable[j - w];
                ++j;
            }

            if (w_left <= 0) {
                w_left = w;
                dt = 5;
                ++h;
            }
        }

        return {
            direction_id: direction_id,
            workdays: weekdays,
            times: timetable,
            tag: zero_ground.join(""),
            valid_from: valid_from,
            valid_to: valid_to
        };
    }

    return decoded_data;
}
