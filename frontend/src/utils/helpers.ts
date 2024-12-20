import { Session } from "../Types";

export const millisToMinutesAndSeconds = function(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
}

export const filterToday = function(sessions: Session[]) {
  const today = new Date().toDateString()
  return sessions.filter(session => {
    return today === new Date(session.session_start).toDateString();
  })
}

export const filterYday = function(sessions: Session[]) {
  let yday: string | Date = new Date()
  yday.setDate(yday.getDate() - 1)
  yday = yday.toDateString()
  return sessions.filter(session => {
    return yday === new Date(session.session_start).toDateString();
  })
}

export const filterRange = function(sessions: Session[], range: number) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (range - 1));
  return sessions.filter(session => {
    const sessionDate = new Date(session.session_start);
    return sessionDate >= startDate
  })

}

export const sorter = function(
  sessions: Session[], 
  sortType: string
): Session[] {
  return sessions.slice().sort((a, b) => {
    const dateA = new Date(a.session_start).getTime();
    const dateB = new Date(b.session_start).getTime();

    switch (sortType) {
      case 'Time Ascending':
        return dateA - dateB;
      case 'Time Descending':
        return dateB - dateA
      default:
        return 0;
    }
  })
}