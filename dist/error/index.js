// src/error/error-helpers.ts
import { dataWithToast } from "@ycore/componentry/impetus/toast";
import { data, href, redirect } from "react-router";
function createBaseErrors(messages) {
  return messages.map((message) => ({ messages: [message] }));
}
function makeError(message) {
  return { messages: [message] };
}
function makeErrors(messages) {
  return createBaseErrors(messages);
}
function makeFieldError(field, messages) {
  return {
    [field]: createBaseErrors(messages)
  };
}
function returnSuccess(data2) {
  return { data: data2, errors: null };
}
function returnFailure(errors) {
  return { data: null, errors };
}
function dataSuccess(successData, options) {
  return data(buildResponseData(true, successData, null), { status: options?.status ?? 200, headers: options?.headers });
}
function buildResponseData(success, data2, errors) {
  return { success, data: data2, errors };
}
function dataFailure(errors, options) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }
  return data(buildResponseData(false, null, errors), { status: options?.status ?? 400, headers: options?.headers });
}
function actionSuccess(successData, options) {
  const responseData = buildResponseData(true, successData, null);
  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: "success" });
  }
  return data(responseData, { status: options?.status ?? 200, headers: options?.headers });
}
function actionFailure(errors, options) {
  if (options?.href) {
    throw redirect(href(options.href), { status: options.status ?? 302, headers: options.headers });
  }
  const responseData = buildResponseData(false, null, errors);
  if (options?.toast) {
    return dataWithToast(responseData, { message: options.toast, type: "error" });
  }
  return data(responseData, { status: options?.status ?? 400, headers: options?.headers });
}
// ../../node_modules/valibot/dist/index.js
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

// src/error/error-transformer.ts
function transformError(error) {
  if (error instanceof ValiError) {
    return { messages: [error.issues?.[0]?.message || "Validation failed"] };
  }
  if (error instanceof Error) {
    return { messages: [error.message] };
  }
  if (typeof error === "string") {
    return { messages: [error] };
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = error.message;
    return { messages: [typeof message === "string" ? message : String(message)] };
  }
  return { messages: ["Unknown error occurred"] };
}
function parseIssues(issues) {
  if (!issues?.length) {
    return {
      _global: [{ messages: ["Validation failed"] }]
    };
  }
  const fieldErrors = {};
  for (const issue of issues) {
    const field = String(issue.path?.[0]?.key ?? "_global");
    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push({
      messages: [issue.message]
    });
  }
  return fieldErrors;
}
function flattenErrors(errors) {
  if (Array.isArray(errors)) {
    return errors.flatMap((error) => error.messages).join("; ");
  }
  return Object.values(errors).flatMap((fieldErrors) => fieldErrors.flatMap((error) => error.messages)).join("; ");
}
// src/error/form-error.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
function FormError({ errors, for: fieldName, className, ...props }) {
  const errorMessages = errors?.[fieldName]?.flatMap((error) => error.messages) || [];
  if (errorMessages.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "form-error",
    role: "alert",
    "aria-live": "polite",
    "aria-atomic": "true",
    className: clsx("text-destructive text-sm", className),
    ...props,
    children: errorMessages.map((error, idx) => /* @__PURE__ */ jsx("div", {
      children: error
    }, idx))
  });
}
// src/error/validate-helpers.ts
async function validate(schema, input) {
  const result = safeParse(schema, input);
  if (result.success) {
    return returnSuccess(result.output);
  }
  return returnFailure(parseIssues(result.issues));
}
async function validateParams(schema, params) {
  return await validate(schema, params);
}
async function validateFormData(schema, requestOrFormData) {
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value instanceof File ? value : String(value);
  });
  return await validate(schema, object);
}
async function validateRequest(schema, request) {
  return validateFormData(schema, request);
}
export {
  validateRequest,
  validateParams,
  validateFormData,
  transformError,
  returnSuccess,
  returnFailure,
  parseIssues,
  makeFieldError,
  makeErrors,
  makeError,
  flattenErrors,
  dataSuccess,
  dataFailure,
  actionSuccess,
  actionFailure,
  FormError
};

//# debugId=AC3240706F8E638264756E2164756E21
