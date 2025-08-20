// src/date/timestamp-utils.ts
function getCurrentTimestamp() {
  return Date.now();
}
function addTimeToNow(timeInSeconds) {
  return getCurrentTimestamp() + timeInSeconds * 1000;
}
function isExpired(expirationTimestamp) {
  return getCurrentTimestamp() > expirationTimestamp;
}
var AUTH_SESSION_TTL = 60 * 60 * 24 * 15;
var AUTH_TOTP_PERIOD = 60 * 10;
export {
  isExpired,
  getCurrentTimestamp,
  addTimeToNow,
  AUTH_TOTP_PERIOD,
  AUTH_SESSION_TTL
};

//# debugId=001CEFF9256E151664756E2164756E21
