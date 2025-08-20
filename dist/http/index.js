// src/http/headers.ts
function getRequestMetadata(request) {
  const headers = request.headers;
  return {
    userAgent: headers.get("user-agent") || "Unknown",
    country: headers.get("cf-ipcountry") || "Unknown",
    ipAddress: headers.get("cf-connecting-ip") || headers.get("x-forwarded-for") || "127.0.0.1"
  };
}
export {
  getRequestMetadata
};

//# debugId=74A77ED3C5AB895F64756E2164756E21
