import moment from "moment";

export function formatTimestamp(timestamp, format = "LLL") {
    moment.locale("id");
    const date = moment(timestamp).utc();
    return date.format(format);
}
