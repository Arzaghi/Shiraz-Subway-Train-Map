import Texts from "./Texts";

export function CompareTime(time1, time2) {
    var s1 =
        parseInt(time1.split(":")[0], 10) * 3600 + parseInt(time1.split(":")[1], 10) * 60 + parseInt(time1.split(":")[2], 10);
    var s2 =
        parseInt(time2.split(":")[0], 10) * 3600 + parseInt(time2.split(":")[1], 10) * 60 + parseInt(time2.split(":")[2], 10);

    return (s1 - s2);
}


export function CalcNextTrainTime(StationSchedule, direction, currentTime) {

    let nextTrainTime = StationSchedule[(direction === 'east' ? 'ToDastgheib' : 'ToEhsan')].filter(w =>
        CompareTime(w , currentTime) >= -20
    )[0]


    if (nextTrainTime !== undefined) {
        let difSeconds = CompareTime(
            nextTrainTime , currentTime);
        if (difSeconds > 1800) {
            return 'ساعت ' + StationSchedule[(direction === 'east' ? 'ToDastgheib' : 'ToEhsan')][0];
        }
        else if (difSeconds > 0) {
            return pad(Math.floor(difSeconds / 60)) + ':' + pad(difSeconds % 60)
        }
        else {
            return Texts.CurrentlyInStation
        }
    }
    else {
        return 'پایان ساعت کاری ایستگاه'
    }
}

export function pad(num) {
    if (num < 10)
        return "0" + num;
    else
        return num;
}