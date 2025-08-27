// src/server/cloudflare.server.ts
import { unstable_createContext } from "react-router";
var CloudflareContext = unstable_createContext({});
function getBindings(context) {
  return context.get(CloudflareContext).env;
}
function getExecutionContext(context) {
  return context.get(CloudflareContext).ctx;
}
function getRequestProperties(context) {
  return context.get(CloudflareContext).cf;
}
function waitUntil(context, promise) {
  return getExecutionContext(context).waitUntil(promise);
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
var store2;
function getGlobalMessage(lang) {
  return store2?.get(lang);
}
var store3;
function getSchemaMessage(lang) {
  return store3?.get(lang);
}
var store4;
function getSpecificMessage(reference, lang) {
  return store4?.get(reference)?.get(lang);
}
function _stringify(input) {
  const type = typeof input;
  if (type === "string") {
    return `"${input}"`;
  }
  if (type === "number" || type === "bigint" || type === "boolean") {
    return `${input}`;
  }
  if (type === "object" || type === "function") {
    return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
  }
  return type;
}
function _addIssue(context, label, dataset, config2, other) {
  const input = other && "input" in other ? other.input : dataset.value;
  const expected = other?.expected ?? context.expects ?? null;
  const received = other?.received ?? _stringify(input);
  const issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config2.lang,
    abortEarly: config2.abortEarly,
    abortPipeEarly: config2.abortPipeEarly
  };
  const isSchema = context.kind === "schema";
  const message2 = other?.message ?? context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config2.message ?? getGlobalMessage(issue.lang);
  if (message2 !== undefined) {
    issue.message = typeof message2 === "function" ? message2(issue) : message2;
  }
  if (isSchema) {
    dataset.typed = false;
  }
  if (dataset.issues) {
    dataset.issues.push(issue);
  } else {
    dataset.issues = [issue];
  }
}
function _getStandardProps(context) {
  return {
    version: 1,
    vendor: "valibot",
    validate(value2) {
      return context["~run"]({ value: value2 }, getGlobalConfig());
    }
  };
}
function _joinExpects(values2, separator) {
  const list = [...new Set(values2)];
  if (list.length > 1) {
    return `(${list.join(` ${separator} `)})`;
  }
  return list[0] ?? "never";
}
function getFallback(schema, dataset, config2) {
  return typeof schema.fallback === "function" ? schema.fallback(dataset, config2) : schema.fallback;
}
function getDefault(schema, dataset, config2) {
  return typeof schema.default === "function" ? schema.default(dataset, config2) : schema.default;
}
function enum_(enum__, message2) {
  const options = [];
  for (const key in enum__) {
    if (`${+key}` !== key || typeof enum__[key] !== "string" || !Object.is(enum__[enum__[key]], +key)) {
      options.push(enum__[key]);
    }
  }
  return {
    kind: "schema",
    type: "enum",
    reference: enum_,
    expects: _joinExpects(options.map(_stringify), "|"),
    async: false,
    enum: enum__,
    options,
    message: message2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      if (this.options.includes(dataset.value)) {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
function object(entries2, message2) {
  return {
    kind: "schema",
    type: "object",
    reference: object,
    expects: "Object",
    async: false,
    entries: entries2,
    message: message2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== undefined) {
            const value2 = key in input ? input[key] : getDefault(valueSchema);
            const valueDataset = valueSchema["~run"]({ value: value2 }, config2);
            if (valueDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value2
              };
              for (const issue of valueDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = valueDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!valueDataset.typed) {
              dataset.typed = false;
            }
            dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== undefined) {
            dataset.value[key] = getFallback(valueSchema);
          } else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
            _addIssue(this, "key", dataset, config2, {
              input: undefined,
              expected: `"${key}"`,
              path: [
                {
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  value: input[key]
                }
              ]
            });
            if (config2.abortEarly) {
              break;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
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

// src/server/intent.server.ts
async function getIntent(requestOrFormData, values, options = {}) {
  const { name = "intent" } = options;
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();
  const enumValues = values.reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {});
  const intentSchema = object({
    [name]: enum_(enumValues, `Invalid ${name}. Must be one of: ${values.join(", ")}`)
  });
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value instanceof File ? value : String(value);
  });
  const result = safeParse(intentSchema, formObject);
  if (result.success) {
    return {
      intent: result.output[name],
      errors: null
    };
  }
  const fieldErrors = parseIssues(result.issues);
  return {
    intent: null,
    errors: fieldErrors
  };
}
export {
  waitUntil,
  getRequestProperties,
  getIntent,
  getExecutionContext,
  getBindings,
  CloudflareContext
};

//# debugId=7C15BE4BC71B608664756E2164756E21
