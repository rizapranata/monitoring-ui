export function convertIsoToIndonesianFormat(isoDateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // timeZoneName: 'short',
      timeZone: 'Asia/Jakarta', // Set the desired time zone
    };
  
    const isoDate = new Date(isoDateString);
    const indonesianDate = new Intl.DateTimeFormat('id-ID', options).format(isoDate);
  
    return indonesianDate;
  }
  
  