export const useformatRelativeTime = () => {

  const convertToAgoFormat = (timestampInSeconds) => {
    const now = Math.floor(Date.now() / 1000);
    const timeDiff = now - timestampInSeconds;
    if (timeDiff < 60) {
      return '방금 전';
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes}분 전`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(timeDiff / 86400);
      return `${days}일 전`;
    }
  }

  const convertToDateFormat = (timestampInSeconds) => {
    const date = new Date(timestampInSeconds * 1000); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  return { convertToAgoFormat, convertToDateFormat }
}
