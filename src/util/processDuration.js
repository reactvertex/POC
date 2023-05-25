const processDuration = (duration) => {
    const durations = duration / 60;
    return durations > 1 ? durations + " Hours" : durations + " Hour";
 };
export default processDuration;