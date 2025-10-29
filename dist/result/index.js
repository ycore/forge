// ../../node_modules/.bun/valibot@1.1.0+1fb4c65d43e298b9/node_modules/valibot/dist/index.js
var store;
function getGlobalConfig(config2) {
  return {
    lang: config2?.lang ?? store?.lang,
    message: config2?.message,
    abortEarly: config2?.abortEarly ?? store?.abortEarly,
    abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
  };
}
var ValiError = class extends Error {
  constructor(issues) {
    super(issues[0].message);
    this.name = "ValiError";
    this.issues = issues;
  }
};
function safeParse(schema, input, config2) {
  const dataset = schema["~run"]({ value: input }, getGlobalConfig(config2));
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}

// src/result/@types/result.types.ts
function isAppError(value) {
  if (value == null || typeof value !== "object" || !("message" in value) || typeof value.message !== "string") {
    return false;
  }
  const obj = value;
  if (!obj.message)
    return false;
  if (obj.details !== undefined && (typeof obj.details !== "object" || obj.details === null)) {
    return false;
  }
  if (obj.code !== undefined && typeof obj.code !== "string") {
    return false;
  }
  if (obj.status !== undefined && typeof obj.status !== "number") {
    return false;
  }
  const allowedErrorProperties = new Set(["message", "details", "cause", "code", "status"]);
  const hasNonErrorProperties = Object.keys(obj).some((key) => !allowedErrorProperties.has(key));
  if (hasNonErrorProperties) {
    return false;
  }
  return true;
}

// src/result/core/result.ts
function ok(value) {
  return value;
}
function err(message, details, options) {
  return {
    message,
    details,
    cause: options?.cause,
    code: options?.code,
    status: options?.status
  };
}
function isError(result) {
  return isAppError(result);
}
function isOk(result) {
  return !isAppError(result);
}
function getData(result) {
  return isError(result) ? undefined : result;
}
function getError(result) {
  return isError(result) ? result : undefined;
}
function unwrap(result) {
  if (isError(result)) {
    throw new Error(result.message);
  }
  return result;
}
function unwrapOr(result, defaultValue) {
  return isError(result) ? defaultValue : result;
}
function map(result, fn) {
  return isError(result) ? result : fn(result);
}
function mapError(result, fn) {
  return isError(result) ? fn(result) : result;
}
function andThen(result, fn) {
  return isError(result) ? result : fn(result);
}
function orElse(result, fn) {
  return isError(result) ? fn() : result;
}
async function tryCatch(fn, errorMessage) {
  try {
    return await fn();
  } catch (error) {
    return err(errorMessage || "Operation failed", undefined, { cause: error });
  }
}
function combine(results) {
  const values = [];
  for (const result of results) {
    if (isError(result)) {
      return result;
    }
    values.push(result);
  }
  return values;
}
function combineObject(results) {
  const values = {};
  for (const [key, result] of Object.entries(results)) {
    if (isError(result)) {
      return result;
    }
    values[key] = result;
  }
  return values;
}

// src/result/core/error.ts
function toAppError(error) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    const e = error;
    return {
      message: e.message,
      details: e.details,
      cause: e.cause,
      code: e.code,
      status: e.status
    };
  }
  if (error instanceof Error) {
    return err(error.message, undefined, { cause: error });
  }
  if (typeof error === "string") {
    return err(error);
  }
  return err("Unknown error occurred", { error });
}
function transformError(error) {
  if (error instanceof ValiError) {
    const fieldErrors = {};
    for (const issue of error.issues || []) {
      const field = issue.path?.length > 0 ? String(issue.path[0].key) : "form";
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return err("Validation failed", fieldErrors, { cause: error });
  }
  return toAppError(error);
}
function extractFieldErrors(error) {
  if (!error) {
    return {};
  }
  const result = {};
  if (error.message && (!error.details || Object.keys(error.details).length === 0)) {
    result.form = error.message;
  }
  if (error.details && typeof error.details === "object") {
    for (const [field, value] of Object.entries(error.details)) {
      result[field] = typeof value === "string" ? value : String(value);
    }
  }
  return result;
}
function flattenError(error) {
  if (!error) {
    return "Unknown error";
  }
  if (typeof error === "object" && "message" in error) {
    const appError = error;
    if (appError.details && typeof appError.details === "object") {
      const fieldErrors = Object.entries(appError.details).filter(([_, value]) => typeof value === "string" || typeof value === "number").map(([field, message]) => `${field}: ${message}`).join("; ");
      if (fieldErrors) {
        return `${appError.message} - ${fieldErrors}`;
      }
    }
    return appError.message;
  }
  return String(error);
}
function validationError(fieldErrors, message = "Validation failed") {
  return err(message, fieldErrors, { code: "VALIDATION_ERROR", status: 400 });
}
function notFoundError(resource, identifier) {
  const message = identifier ? `${resource} not found: ${identifier}` : `${resource} not found`;
  return err(message, { resource, identifier }, { code: "NOT_FOUND", status: 404 });
}
function unauthorizedError(message = "Unauthorized") {
  return err(message, undefined, { code: "UNAUTHORIZED", status: 401 });
}
function forbiddenError(message = "Forbidden") {
  return err(message, undefined, { code: "FORBIDDEN", status: 403 });
}
function badRequestError(message, details) {
  return err(message, details, { code: "BAD_REQUEST", status: 400 });
}
function serverError(message = "Internal server error", cause) {
  return err(message, undefined, { cause, code: "INTERNAL_ERROR", status: 500 });
}
function isSystemError(error) {
  return (error.status ?? 0) >= 500;
}
function isUserError(error) {
  const status = error.status ?? 400;
  return status < 500;
}
function serviceUnavailableError(message = "Service temporarily unavailable", cause) {
  return err(message, undefined, { cause, code: "SERVICE_UNAVAILABLE", status: 503 });
}
function configError(message, details) {
  return err(message, details, { code: "CONFIG_ERROR", status: 500 });
}
// src/result/http/headers.ts
var HEADER_NAMES = Object.freeze([
  "CF-Connecting-IP",
  "X-Azure-ClientIP",
  "X-Client-IP",
  "X-Forwarded-For",
  "HTTP-X-Forwarded-For",
  "Fly-Client-IP",
  "Fastly-Client-Ip",
  "True-Client-Ip",
  "X-Real-IP",
  "X-Cluster-Client-IP",
  "X-Forwarded",
  "Forwarded-For",
  "Forwarded",
  "DO-Connecting-IP",
  "oxygen-buyer-ip"
]);
function getClientIP(requestOrHeaders) {
  const headers = requestOrHeaders instanceof Request ? requestOrHeaders.headers : requestOrHeaders;
  const ipAddress = HEADER_NAMES.flatMap((headerName) => {
    const value = headers.get(headerName);
    if (headerName === "Forwarded") {
      return parseForwardedHeader(value);
    }
    if (!value?.includes(","))
      return value;
    return value.split(",").map((ip) => ip.trim());
  }).find((ip) => {
    if (ip === null)
      return false;
    return isValidIP(ip);
  });
  return ipAddress ?? null;
}
function isValidIP(ip) {
  if (!ip)
    return false;
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip))
    return true;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  if (ipv6Regex.test(ip))
    return true;
  return false;
}
function parseForwardedHeader(value) {
  if (!value)
    return null;
  for (const part of value.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith("for=")) {
      let ip = trimmed.slice(4);
      ip = ip.replace(/^["']|["']$/g, "");
      ip = ip.replace(/^\[|\]$/g, "");
      return ip;
    }
  }
  return null;
}
// src/result/http/middleware.ts
function middlewareFailure(error, options) {
  const responseData = typeof error === "object" && error && "message" in error ? error : err(String(error));
  const status = options?.status ?? 403;
  const headers = new Headers(options?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return new Response(JSON.stringify(responseData), { status, headers });
}
function middlewarePassthrough(response, headerModifications) {
  if (!headerModifications) {
    return response;
  }
  const headers = new Headers(response.headers);
  if (headerModifications.set) {
    Object.entries(headerModifications.set).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
  if (headerModifications.append) {
    Object.entries(headerModifications.append).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
// src/result/http/response.ts
import { data, redirect } from "react-router";
function respond(result, meta, ...callbacks) {
  const defaultStatus = isError(result) ? 400 : 200;
  const status = meta?.status ?? defaultStatus;
  callbacks.forEach((callback) => {
    if (callback)
      callback();
  });
  return data(result, { status, headers: meta?.headers });
}
function respondOk(value, meta, ...callbacks) {
  return respond(value, { ...meta, status: meta?.status ?? 200 }, ...callbacks);
}
function respondError(error, meta, ...callbacks) {
  const status = meta?.status ?? error.status ?? 400;
  return respond(error, { ...meta, status }, ...callbacks);
}
function respondRedirect(path, meta) {
  throw redirect(path, { status: meta?.status ?? 302, headers: meta?.headers });
}
function throwSystemError(message, status = 500) {
  throw new Response(message, { status });
}
// src/result/validation/form.ts
function parseValibotIssues(issues) {
  if (!issues?.length) {
    return err("Validation failed");
  }
  const fieldErrors = {};
  for (const issue of issues) {
    const field = issue.path?.length > 0 ? String(issue.path[0].key) : "form";
    if (!fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return err("Validation failed", fieldErrors, {
    code: "VALIDATION_ERROR",
    status: 400
  });
}
async function validate(schema, input) {
  const result = safeParse(schema, input);
  if (result.success) {
    return result.output;
  }
  return parseValibotIssues(result.issues);
}
async function validateFormData(schema, requestOrFormData) {
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();
  const object = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      object[key] = value;
    } else if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(String(value));
      } else {
        object[key] = [object[key], String(value)];
      }
    } else {
      object[key] = String(value);
    }
  });
  return validate(schema, object);
}
async function validateJsonData(schema, data2) {
  return validate(schema, data2);
}
async function validateQueryParams(schema, requestOrUrl) {
  let searchParams;
  if (requestOrUrl instanceof Request) {
    const url = new URL(requestOrUrl.url);
    searchParams = url.searchParams;
  } else if (requestOrUrl instanceof URL) {
    searchParams = requestOrUrl.searchParams;
  } else {
    searchParams = requestOrUrl;
  }
  const object = {};
  searchParams.forEach((value, key) => {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });
  return validate(schema, object);
}
function createValidationMiddleware(schema, options) {
  return async (args) => {
    let result;
    switch (options?.source) {
      case "json": {
        const json = await args.request.json();
        result = await validateJsonData(schema, json);
        break;
      }
      case "query":
        result = await validateQueryParams(schema, args.request);
        break;
      default:
        result = await validateFormData(schema, args.request);
        break;
    }
    args.context.set("validationResult", result);
    if (options?.onError && typeof result === "object" && "message" in result) {
      return options.onError(result);
    }
  };
}
export {
  validationError,
  validateQueryParams,
  validateJsonData,
  validateFormData,
  unwrapOr,
  unwrap,
  unauthorizedError,
  tryCatch,
  transformError,
  toAppError,
  throwSystemError,
  serviceUnavailableError,
  serverError,
  respondRedirect,
  respondOk,
  respondError,
  orElse,
  ok,
  notFoundError,
  middlewarePassthrough,
  middlewareFailure,
  mapError,
  map,
  isUserError,
  isSystemError,
  isOk,
  isError,
  getError,
  getData,
  getClientIP,
  extractFieldErrors as formErrors,
  forbiddenError,
  flattenError,
  extractFieldErrors,
  err,
  createValidationMiddleware,
  configError,
  combineObject,
  combine,
  badRequestError,
  andThen
};

//# debugId=D07626615AE4FCA864756E2164756E21
