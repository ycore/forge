// src/http/request.ts
function getDomainUrl(request) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host") ?? new URL(request.url).host;
  const protocol = request.headers.get("X-Forwarded-Proto") ?? "http";
  return `${protocol}://${host}`;
}

// src/http/response.ts
function json(body, options) {
  return new Response(JSON.stringify(body), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
}
export {
  getDomainUrl,
  json
};
//# sourceMappingURL=index.mjs.map