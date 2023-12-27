const getUserInfo = () => {
  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).userInfo.uid : null;
  return uid
}

export default getUserInfo
