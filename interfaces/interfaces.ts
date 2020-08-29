// * Name of fitness activity, time spent, coordinates of location the fitness activity occurred

interface coordinates{
    lattitude : number,
    longitude : number,
}

interface fintessData{
    activityName : string,
    startTime : Date,
    endTime : Date,
    position : coordinates,
}

interface loginData{
    userName : string,
    passWord : string,
}