var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// ../../node_modules/.bun/use-sync-external-store@1.6.0+2f44e903108183df/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
import * as React36 from "react";
var require_use_sync_external_store_shim_production = __commonJS((exports) => {
  function is(x, y) {
    return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var objectIs = typeof Object.is === "function" ? Object.is : is;
  var useState11 = React36.useState;
  var useEffect16 = React36.useEffect;
  var useLayoutEffect4 = React36.useLayoutEffect;
  var useDebugValue = React36.useDebugValue;
  function useSyncExternalStore$2(subscribe, getSnapshot) {
    var value = getSnapshot(), _useState = useState11({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
    useLayoutEffect4(function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    }, [subscribe, value, getSnapshot]);
    useEffect16(function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    }, [subscribe]);
    useDebugValue(value);
    return value;
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function useSyncExternalStore$1(subscribe, getSnapshot) {
    return getSnapshot();
  }
  var shim = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? useSyncExternalStore$1 : useSyncExternalStore$2;
  exports.useSyncExternalStore = React36.useSyncExternalStore !== undefined ? React36.useSyncExternalStore : shim;
});

// ../../node_modules/.bun/use-sync-external-store@1.6.0+2f44e903108183df/node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS((exports, module) => {
  if (true) {
    module.exports = require_use_sync_external_store_shim_production();
  } else {}
});

// ../componentry/dist/images/index.js
import clsx22 from "clsx";
import React2 from "react";
import { Await as Await2 } from "react-router";
import clsx3 from "clsx";

// ../componentry/src/images/LazyImage.tsx
import clsx2 from "clsx";
import React from "react";
import { Await } from "react-router";

// ../componentry/src/shadcn-ui/components/spinner.tsx
import clsx from "clsx";

// ../componentry/src/vibrant/components/svg-icon.tsx
var SvgIcon = createSpriteIcon("lucide");

// ../componentry/src/shadcn-ui/components/spinner.tsx
import { jsx } from "react/jsx-runtime";

// ../componentry/src/images/LazyImage.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
// ../componentry/src/images/SpriteIconProvider.tsx
import { createContext, useContext } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var SpriteIconContext = createContext(null);
function useSpriteIcon(spriteKey) {
  const config = useContext(SpriteIconContext);
  if (!config) {
    throw new Error("useSpriteIcon must be used within a SpriteIconProvider. Wrap your app with <SpriteIconProvider sprites={{...}}>.");
  }
  if (!config[spriteKey]) {
    throw new Error(`Sprite key "${spriteKey}" not found in SpriteIconProvider. Available keys: ${Object.keys(config).join(", ")}`);
  }
  return config[spriteKey];
}

// ../componentry/src/images/SpriteIcon.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function SpriteIcon({ spriteUrl, iconId, ...props }) {
  return /* @__PURE__ */ jsx4("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    ...props,
    children: iconId ? /* @__PURE__ */ jsx4("use", {
      href: `${spriteUrl}#${iconId}`
    }) : /* @__PURE__ */ jsx4("use", {
      href: `${spriteUrl}`
    })
  });
}
function createSpriteIcon(spriteKey) {
  return function SpriteIconComponent({ iconId, ...props }) {
    const spriteUrl = useSpriteIcon(spriteKey);
    return /* @__PURE__ */ jsx4(SpriteIcon, {
      spriteUrl,
      iconId,
      ...props
    });
  };
}
// ../componentry/dist/images/index.js
import { jsx as jsx5 } from "react/jsx-runtime";
import { jsx as jsx22 } from "react/jsx-runtime";
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx as jsx32 } from "react/jsx-runtime";
import { jsx as jsx42 } from "react/jsx-runtime";
var SvgIcon2 = createSpriteIcon("lucide");
var SpriteIconContext2 = createContext2(null);
function SpriteIcon2({ spriteUrl, iconId, ...props }) {
  return /* @__PURE__ */ jsx42("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    ...props,
    children: iconId ? /* @__PURE__ */ jsx42("use", {
      href: `${spriteUrl}#${iconId}`
    }) : /* @__PURE__ */ jsx42("use", {
      href: `${spriteUrl}`
    })
  });
}

// ../componentry/dist/impetus/index.js
import { href, isRouteErrorResponse, Link as Link2, useRouteError } from "react-router";
import { jsx as jsx47, jsxs as jsxs9 } from "react/jsx-runtime";
import clsx5 from "clsx";
import { memo } from "react";
import { jsx as jsx210 } from "react/jsx-runtime";
import clsx52 from "clsx";
import { createContext as createContext6, useState as useState27 } from "react";
import { useLocation } from "react-router";

// ../../node_modules/.bun/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
import { clsx as clsx4 } from "clsx";
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx4;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === undefined ? undefined : config.variants) == null)
    return cx(base, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === undefined ? undefined : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === undefined ? undefined : defaultVariants[variant];
    if (variantProp === null)
      return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === undefined) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === undefined ? undefined : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === undefined ? undefined : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
};

// ../componentry/dist/impetus/index.js
import clsx23 from "clsx";

// ../../node_modules/.bun/@radix-ui+react-visually-hidden@1.2.3+1356086b9384fa43/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
import * as React6 from "react";

// ../../node_modules/.bun/@radix-ui+react-primitive@2.1.3+1356086b9384fa43/node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as React5 from "react";
import * as ReactDOM from "react-dom";

// ../../node_modules/.bun/@radix-ui+react-slot@1.2.3+a5924156876af9ae/node_modules/@radix-ui/react-slot/dist/index.mjs
var exports_dist = {};
__export(exports_dist, {
  createSlottable: () => createSlottable,
  createSlot: () => createSlot,
  Slottable: () => Slottable,
  Slot: () => Slot,
  Root: () => Slot
});
import * as React4 from "react";

// ../../node_modules/.bun/@radix-ui+react-compose-refs@1.1.2+a5924156876af9ae/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React3 from "react";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0;i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return React3.useCallback(composeRefs(...refs), refs);
}

// ../../node_modules/.bun/@radix-ui+react-slot@1.2.3+a5924156876af9ae/node_modules/@radix-ui/react-slot/dist/index.mjs
import { Fragment as Fragment2, jsx as jsx6 } from "react/jsx-runtime";
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React4.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React4.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React4.Children.count(newElement) > 1)
            return React4.Children.only(null);
          return React4.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsx6(SlotClone, { ...slotProps, ref: forwardedRef, children: React4.isValidElement(newElement) ? React4.cloneElement(newElement, undefined, newChildren) : null });
    }
    return /* @__PURE__ */ jsx6(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
function createSlotClone(ownerName) {
  const SlotClone = React4.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React4.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React4.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React4.cloneElement(children, props2);
    }
    return React4.Children.count(children) > 1 ? React4.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ jsx6(Fragment2, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
  return React4.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// ../../node_modules/.bun/@radix-ui+react-primitive@2.1.3+1356086b9384fa43/node_modules/@radix-ui/react-primitive/dist/index.mjs
import { jsx as jsx7 } from "react/jsx-runtime";
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node2 = React5.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx7(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target)
    ReactDOM.flushSync(() => target.dispatchEvent(event));
}
var Root = Primitive;

// ../../node_modules/.bun/@radix-ui+react-visually-hidden@1.2.3+1356086b9384fa43/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
import { jsx as jsx8 } from "react/jsx-runtime";
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = React6.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsx8(Primitive.span, {
    ...props,
    ref: forwardedRef,
    style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
  });
});
VisuallyHidden.displayName = NAME;
var Root2 = VisuallyHidden;

// ../../node_modules/.bun/@radix-ui+react-accordion@1.2.12+1356086b9384fa43/node_modules/@radix-ui/react-accordion/dist/index.mjs
var exports_dist3 = {};
__export(exports_dist3, {
  createAccordionScope: () => createAccordionScope,
  Trigger: () => Trigger2,
  Root: () => Root22,
  Item: () => Item,
  Header: () => Header,
  Content: () => Content2,
  AccordionTrigger: () => AccordionTrigger,
  AccordionItem: () => AccordionItem,
  AccordionHeader: () => AccordionHeader,
  AccordionContent: () => AccordionContent,
  Accordion: () => Accordion
});
import React16 from "react";

// ../../node_modules/.bun/@radix-ui+react-context@1.1.2+a5924156876af9ae/node_modules/@radix-ui/react-context/dist/index.mjs
import * as React7 from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
function createContext22(rootComponentName, defaultContext) {
  const Context = React7.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = React7.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsx9(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext22(consumerName) {
    const context = React7.useContext(Context);
    if (context)
      return context;
    if (defaultContext !== undefined)
      return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext22];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = React7.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = React7.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx9(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React7.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== undefined)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React7.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React7.useMemo(() => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }), [scope, contexts]);
    };
  };
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React7.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// ../../node_modules/.bun/@radix-ui+react-collection@1.1.7+1356086b9384fa43/node_modules/@radix-ui/react-collection/dist/index.mjs
import React8 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
import React22 from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
"use client";
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map });
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React8.useRef(null);
    const itemMap = React8.useRef(/* @__PURE__ */ new Map).current;
    return /* @__PURE__ */ jsx10(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React8.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ jsx10(CollectionSlotImpl, { ref: composedRefs, children });
  });
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React8.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = React8.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    React8.useEffect(() => {
      context.itemMap.set(ref, { ref, ...itemData });
      return () => void context.itemMap.delete(ref);
    });
    return /* @__PURE__ */ jsx10(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
  });
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React8.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection,
    createCollectionScope
  ];
}
var __instanciated = /* @__PURE__ */ new WeakMap;
var OrderedDict = class _OrderedDict extends Map {
  #keys;
  constructor(entries) {
    super(entries);
    this.#keys = [...super.keys()];
    __instanciated.set(this, true);
  }
  set(key, value) {
    if (__instanciated.get(this)) {
      if (this.has(key)) {
        this.#keys[this.#keys.indexOf(key)] = key;
      } else {
        this.#keys.push(key);
      }
    }
    super.set(key, value);
    return this;
  }
  insert(index, key, value) {
    const has = this.has(key);
    const length = this.#keys.length;
    const relativeIndex = toSafeInteger(index);
    let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
    if (safeIndex === this.size || has && safeIndex === this.size - 1 || safeIndex === -1) {
      this.set(key, value);
      return this;
    }
    const size = this.size + (has ? 0 : 1);
    if (relativeIndex < 0) {
      actualIndex++;
    }
    const keys = [...this.#keys];
    let nextValue;
    let shouldSkip = false;
    for (let i = actualIndex;i < size; i++) {
      if (actualIndex === i) {
        let nextKey = keys[i];
        if (keys[i] === key) {
          nextKey = keys[i + 1];
        }
        if (has) {
          this.delete(key);
        }
        nextValue = this.get(nextKey);
        this.set(key, value);
      } else {
        if (!shouldSkip && keys[i - 1] === key) {
          shouldSkip = true;
        }
        const currentKey = keys[shouldSkip ? i : i - 1];
        const currentValue = nextValue;
        nextValue = this.get(currentKey);
        this.delete(currentKey);
        this.set(currentKey, currentValue);
      }
    }
    return this;
  }
  with(index, key, value) {
    const copy = new _OrderedDict(this);
    copy.insert(index, key, value);
    return copy;
  }
  before(key) {
    const index = this.#keys.indexOf(key) - 1;
    if (index < 0) {
      return;
    }
    return this.entryAt(index);
  }
  setBefore(key, newKey, value) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index, newKey, value);
  }
  after(key) {
    let index = this.#keys.indexOf(key);
    index = index === -1 || index === this.size - 1 ? -1 : index + 1;
    if (index === -1) {
      return;
    }
    return this.entryAt(index);
  }
  setAfter(key, newKey, value) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index + 1, newKey, value);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    this.#keys = [];
    return super.clear();
  }
  delete(key) {
    const deleted = super.delete(key);
    if (deleted) {
      this.#keys.splice(this.#keys.indexOf(key), 1);
    }
    return deleted;
  }
  deleteAt(index) {
    const key = this.keyAt(index);
    if (key !== undefined) {
      return this.delete(key);
    }
    return false;
  }
  at(index) {
    const key = at(this.#keys, index);
    if (key !== undefined) {
      return this.get(key);
    }
  }
  entryAt(index) {
    const key = at(this.#keys, index);
    if (key !== undefined) {
      return [key, this.get(key)];
    }
  }
  indexOf(key) {
    return this.#keys.indexOf(key);
  }
  keyAt(index) {
    return at(this.#keys, index);
  }
  from(key, offset) {
    const index = this.indexOf(key);
    if (index === -1) {
      return;
    }
    let dest = index + offset;
    if (dest < 0)
      dest = 0;
    if (dest >= this.size)
      dest = this.size - 1;
    return this.at(dest);
  }
  keyFrom(key, offset) {
    const index = this.indexOf(key);
    if (index === -1) {
      return;
    }
    let dest = index + offset;
    if (dest < 0)
      dest = 0;
    if (dest >= this.size)
      dest = this.size - 1;
    return this.keyAt(dest);
  }
  find(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return entry;
      }
      index++;
    }
    return;
  }
  findIndex(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return index;
      }
      index++;
    }
    return -1;
  }
  filter(predicate, thisArg) {
    const entries = [];
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        entries.push(entry);
      }
      index++;
    }
    return new _OrderedDict(entries);
  }
  map(callbackfn, thisArg) {
    const entries = [];
    let index = 0;
    for (const entry of this) {
      entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index, this])]);
      index++;
    }
    return new _OrderedDict(entries);
  }
  reduce(...args) {
    const [callbackfn, initialValue] = args;
    let index = 0;
    let accumulator = initialValue ?? this.at(0);
    for (const entry of this) {
      if (index === 0 && args.length === 1) {
        accumulator = entry;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
      index++;
    }
    return accumulator;
  }
  reduceRight(...args) {
    const [callbackfn, initialValue] = args;
    let accumulator = initialValue ?? this.at(-1);
    for (let index = this.size - 1;index >= 0; index--) {
      const entry = this.at(index);
      if (index === this.size - 1 && args.length === 1) {
        accumulator = entry;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
    }
    return accumulator;
  }
  toSorted(compareFn) {
    const entries = [...this.entries()].sort(compareFn);
    return new _OrderedDict(entries);
  }
  toReversed() {
    const reversed = new _OrderedDict;
    for (let index = this.size - 1;index >= 0; index--) {
      const key = this.keyAt(index);
      const element = this.get(key);
      reversed.set(key, element);
    }
    return reversed;
  }
  toSpliced(...args) {
    const entries = [...this.entries()];
    entries.splice(...args);
    return new _OrderedDict(entries);
  }
  slice(start, end) {
    const result = new _OrderedDict;
    let stop = this.size - 1;
    if (start === undefined) {
      return result;
    }
    if (start < 0) {
      start = start + this.size;
    }
    if (end !== undefined && end > 0) {
      stop = end - 1;
    }
    for (let index = start;index <= stop; index++) {
      const key = this.keyAt(index);
      const element = this.get(key);
      result.set(key, element);
    }
    return result;
  }
  every(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (!Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return false;
      }
      index++;
    }
    return true;
  }
  some(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return true;
      }
      index++;
    }
    return false;
  }
};
function at(array, index) {
  if ("at" in Array.prototype) {
    return Array.prototype.at.call(array, index);
  }
  const actualIndex = toSafeIndex(array, index);
  return actualIndex === -1 ? undefined : array[actualIndex];
}
function toSafeIndex(array, index) {
  const length = array.length;
  const relativeIndex = toSafeInteger(index);
  const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}
function toSafeInteger(number) {
  return number !== number || number === 0 ? 0 : Math.trunc(number);
}
function createCollection2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
  const [CollectionContextProvider, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
    collectionElement: null,
    collectionRef: { current: null },
    collectionRefObject: { current: null },
    itemMap: new OrderedDict,
    setItemMap: () => {
      return;
    }
  });
  const CollectionProvider = ({ state, ...props }) => {
    return state ? /* @__PURE__ */ jsx23(CollectionProviderImpl, { ...props, state }) : /* @__PURE__ */ jsx23(CollectionInit, { ...props });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const CollectionInit = (props) => {
    const state = useInitCollection();
    return /* @__PURE__ */ jsx23(CollectionProviderImpl, { ...props, state });
  };
  CollectionInit.displayName = PROVIDER_NAME + "Init";
  const CollectionProviderImpl = (props) => {
    const { scope, children, state } = props;
    const ref = React22.useRef(null);
    const [collectionElement, setCollectionElement] = React22.useState(null);
    const composeRefs2 = useComposedRefs(ref, setCollectionElement);
    const [itemMap, setItemMap] = state;
    React22.useEffect(() => {
      if (!collectionElement)
        return;
      const observer = getChildListObserver(() => {});
      observer.observe(collectionElement, {
        childList: true,
        subtree: true
      });
      return () => {
        observer.disconnect();
      };
    }, [collectionElement]);
    return /* @__PURE__ */ jsx23(CollectionContextProvider, {
      scope,
      itemMap,
      setItemMap,
      collectionRef: composeRefs2,
      collectionRefObject: ref,
      collectionElement,
      children
    });
  };
  CollectionProviderImpl.displayName = PROVIDER_NAME + "Impl";
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React22.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ jsx23(CollectionSlotImpl, { ref: composedRefs, children });
  });
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React22.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = React22.useRef(null);
    const [element, setElement] = React22.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, setElement);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    const { setItemMap } = context;
    const itemDataRef = React22.useRef(itemData);
    if (!shallowEqual(itemDataRef.current, itemData)) {
      itemDataRef.current = itemData;
    }
    const memoizedItemData = itemDataRef.current;
    React22.useEffect(() => {
      const itemData2 = memoizedItemData;
      setItemMap((map) => {
        if (!element) {
          return map;
        }
        if (!map.has(element)) {
          map.set(element, { ...itemData2, element });
          return map.toSorted(sortByDocumentPosition);
        }
        return map.set(element, { ...itemData2, element }).toSorted(sortByDocumentPosition);
      });
      return () => {
        setItemMap((map) => {
          if (!element || !map.has(element)) {
            return map;
          }
          map.delete(element);
          return new OrderedDict(map);
        });
      };
    }, [element, memoizedItemData, setItemMap]);
    return /* @__PURE__ */ jsx23(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
  });
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useInitCollection() {
    return React22.useState(new OrderedDict);
  }
  function useCollection(scope) {
    const { itemMap } = useCollectionContext(name + "CollectionConsumer", scope);
    return itemMap;
  }
  const functions = {
    createCollectionScope,
    useCollection,
    useInitCollection
  };
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    functions
  ];
}
function shallowEqual(a, b) {
  if (a === b)
    return true;
  if (typeof a !== "object" || typeof b !== "object")
    return false;
  if (a == null || b == null)
    return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length)
    return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key))
      return false;
    if (a[key] !== b[key])
      return false;
  }
  return true;
}
function isElementPreceding(a, b) {
  return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
function sortByDocumentPosition(a, b) {
  return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
}
function getChildListObserver(callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        callback();
        return;
      }
    }
  });
  return observer;
}

// ../../node_modules/.bun/@radix-ui+primitive@1.1.3/node_modules/@radix-ui/primitive/dist/index.mjs
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// ../../node_modules/.bun/@radix-ui+react-use-controllable-state@1.2.2+a5924156876af9ae/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React11 from "react";

// ../../node_modules/.bun/@radix-ui+react-use-layout-effect@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as React9 from "react";
var useLayoutEffect2 = globalThis?.document ? React9.useLayoutEffect : () => {};

// ../../node_modules/.bun/@radix-ui+react-use-controllable-state@1.2.2+a5924156876af9ae/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React23 from "react";

// ../../node_modules/.bun/@radix-ui+react-use-effect-event@0.0.2+a5924156876af9ae/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
import * as React10 from "react";
var useReactEffectEvent = React10[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = React10[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = React10.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      ref.current = callback;
    });
  }
  return React10.useMemo(() => (...args) => ref.current?.(...args), []);
}

// ../../node_modules/.bun/@radix-ui+react-use-controllable-state@1.2.2+a5924156876af9ae/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var useInsertionEffect = React11[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {},
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  if (true) {
    const isControlledRef = React11.useRef(prop !== undefined);
    React11.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = React11.useCallback((nextValue) => {
    if (isControlled) {
      const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
      if (value2 !== prop) {
        onChangeRef.current?.(value2);
      }
    } else {
      setUncontrolledProp(nextValue);
    }
  }, [isControlled, prop, setUncontrolledProp, onChangeRef]);
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = React11.useState(defaultProp);
  const prevValueRef = React11.useRef(value);
  const onChangeRef = React11.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React11.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
var SYNC_STATE = Symbol("RADIX:SYNC_STATE");

// ../../node_modules/.bun/@radix-ui+react-collapsible@1.1.12+1356086b9384fa43/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var exports_dist2 = {};
__export(exports_dist2, {
  createCollapsibleScope: () => createCollapsibleScope,
  Trigger: () => Trigger,
  Root: () => Root3,
  Content: () => Content,
  CollapsibleTrigger: () => CollapsibleTrigger,
  CollapsibleContent: () => CollapsibleContent,
  Collapsible: () => Collapsible
});
import * as React14 from "react";

// ../../node_modules/.bun/@radix-ui+react-presence@1.1.5+1356086b9384fa43/node_modules/@radix-ui/react-presence/dist/index.mjs
import * as React24 from "react";
import * as React12 from "react";
"use client";
function useStateMachine(initialState, machine) {
  return React12.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React24.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef2(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React24.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = React24.useState();
  const stylesRef = React24.useRef(null);
  const prevPresentRef = React24.useRef(present);
  const prevAnimationNameRef = React24.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React24.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React24.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// ../../node_modules/.bun/@radix-ui+react-id@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-id/dist/index.mjs
import * as React13 from "react";
var useReactId = React13[" useId ".trim().toString()] || (() => {
  return;
});
var count = 0;
function useId(deterministicId) {
  const [id, setId] = React13.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId)
      setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

// ../../node_modules/.bun/@radix-ui+react-collapsible@1.1.12+1356086b9384fa43/node_modules/@radix-ui/react-collapsible/dist/index.mjs
import { jsx as jsx11 } from "react/jsx-runtime";
"use client";
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = React14.forwardRef((props, forwardedRef) => {
  const {
    __scopeCollapsible,
    open: openProp,
    defaultOpen,
    disabled,
    onOpenChange,
    ...collapsibleProps
  } = props;
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: COLLAPSIBLE_NAME
  });
  return /* @__PURE__ */ jsx11(CollapsibleProvider, {
    scope: __scopeCollapsible,
    disabled,
    contentId: useId(),
    open,
    onOpenToggle: React14.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
    children: /* @__PURE__ */ jsx11(Primitive.div, {
      "data-state": getState(open),
      "data-disabled": disabled ? "" : undefined,
      ...collapsibleProps,
      ref: forwardedRef
    })
  });
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME = "CollapsibleTrigger";
var CollapsibleTrigger = React14.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, ...triggerProps } = props;
  const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);
  return /* @__PURE__ */ jsx11(Primitive.button, {
    type: "button",
    "aria-controls": context.contentId,
    "aria-expanded": context.open || false,
    "data-state": getState(context.open),
    "data-disabled": context.disabled ? "" : undefined,
    disabled: context.disabled,
    ...triggerProps,
    ref: forwardedRef,
    onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
  });
});
CollapsibleTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "CollapsibleContent";
var CollapsibleContent = React14.forwardRef((props, forwardedRef) => {
  const { forceMount, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME, props.__scopeCollapsible);
  return /* @__PURE__ */ jsx11(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsx11(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
});
CollapsibleContent.displayName = CONTENT_NAME;
var CollapsibleContentImpl = React14.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = React14.useState(present);
  const ref = React14.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = React14.useRef(0);
  const height = heightRef.current;
  const widthRef = React14.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = React14.useRef(isOpen);
  const originalStylesRef = React14.useRef(undefined);
  React14.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsx11(Primitive.div, {
    "data-state": getState(context.open),
    "data-disabled": context.disabled ? "" : undefined,
    id: context.contentId,
    hidden: !isOpen,
    ...contentProps,
    ref: composedRefs,
    style: {
      [`--radix-collapsible-content-height`]: height ? `${height}px` : undefined,
      [`--radix-collapsible-content-width`]: width ? `${width}px` : undefined,
      ...props.style
    },
    children: isOpen && children
  });
});
function getState(open) {
  return open ? "open" : "closed";
}
var Root3 = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;

// ../../node_modules/.bun/@radix-ui+react-direction@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-direction/dist/index.mjs
import * as React15 from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var DirectionContext = React15.createContext(undefined);
function useDirection(localDir) {
  const globalDir = React15.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

// ../../node_modules/.bun/@radix-ui+react-accordion@1.2.12+1356086b9384fa43/node_modules/@radix-ui/react-accordion/dist/index.mjs
import { jsx as jsx13 } from "react/jsx-runtime";
"use client";
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion = React16.forwardRef((props, forwardedRef) => {
  const { type, ...accordionProps } = props;
  const singleProps = accordionProps;
  const multipleProps = accordionProps;
  return /* @__PURE__ */ jsx13(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsx13(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsx13(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
});
Accordion.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = React16.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    collapsible = false,
    ...accordionSingleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? "",
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  return /* @__PURE__ */ jsx13(AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value: React16.useMemo(() => value ? [value] : [], [value]),
    onItemOpen: setValue,
    onItemClose: React16.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
    children: /* @__PURE__ */ jsx13(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsx13(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
  });
});
var AccordionImplMultiple = React16.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React16.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
  const handleItemClose = React16.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
  return /* @__PURE__ */ jsx13(AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value,
    onItemOpen: handleItemOpen,
    onItemClose: handleItemClose,
    children: /* @__PURE__ */ jsx13(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsx13(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
  });
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React16.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
  const accordionRef = React16.useRef(null);
  const composedRefs = useComposedRefs(accordionRef, forwardedRef);
  const getItems = useCollection(__scopeAccordion);
  const direction = useDirection(dir);
  const isDirectionLTR = direction === "ltr";
  const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
    if (!ACCORDION_KEYS.includes(event.key))
      return;
    const target = event.target;
    const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
    const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
    const triggerCount = triggerCollection.length;
    if (triggerIndex === -1)
      return;
    event.preventDefault();
    let nextIndex = triggerIndex;
    const homeIndex = 0;
    const endIndex = triggerCount - 1;
    const moveNext = () => {
      nextIndex = triggerIndex + 1;
      if (nextIndex > endIndex) {
        nextIndex = homeIndex;
      }
    };
    const movePrev = () => {
      nextIndex = triggerIndex - 1;
      if (nextIndex < homeIndex) {
        nextIndex = endIndex;
      }
    };
    switch (event.key) {
      case "Home":
        nextIndex = homeIndex;
        break;
      case "End":
        nextIndex = endIndex;
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          if (isDirectionLTR) {
            moveNext();
          } else {
            movePrev();
          }
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          moveNext();
        }
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          if (isDirectionLTR) {
            movePrev();
          } else {
            moveNext();
          }
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          movePrev();
        }
        break;
    }
    const clampedIndex = nextIndex % triggerCount;
    triggerCollection[clampedIndex].ref.current?.focus();
  });
  return /* @__PURE__ */ jsx13(AccordionImplProvider, {
    scope: __scopeAccordion,
    disabled,
    direction: dir,
    orientation,
    children: /* @__PURE__ */ jsx13(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsx13(Primitive.div, {
      ...accordionProps,
      "data-orientation": orientation,
      ref: composedRefs,
      onKeyDown: disabled ? undefined : handleKeyDown
    }) })
  });
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem = React16.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, value, ...accordionItemProps } = props;
  const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
  const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
  const collapsibleScope = useCollapsibleScope(__scopeAccordion);
  const triggerId = useId();
  const open = value && valueContext.value.includes(value) || false;
  const disabled = accordionContext.disabled || props.disabled;
  return /* @__PURE__ */ jsx13(AccordionItemProvider, {
    scope: __scopeAccordion,
    open,
    disabled,
    triggerId,
    children: /* @__PURE__ */ jsx13(Root3, {
      "data-orientation": accordionContext.orientation,
      "data-state": getState2(open),
      ...collapsibleScope,
      ...accordionItemProps,
      ref: forwardedRef,
      disabled,
      open,
      onOpenChange: (open2) => {
        if (open2) {
          valueContext.onItemOpen(value);
        } else {
          valueContext.onItemClose(value);
        }
      }
    })
  });
});
AccordionItem.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React16.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...headerProps } = props;
  const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
  const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
  return /* @__PURE__ */ jsx13(Primitive.h3, {
    "data-orientation": accordionContext.orientation,
    "data-state": getState2(itemContext.open),
    "data-disabled": itemContext.disabled ? "" : undefined,
    ...headerProps,
    ref: forwardedRef
  });
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME2 = "AccordionTrigger";
var AccordionTrigger = React16.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...triggerProps } = props;
  const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
  const itemContext = useAccordionItemContext(TRIGGER_NAME2, __scopeAccordion);
  const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME2, __scopeAccordion);
  const collapsibleScope = useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ jsx13(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsx13(Trigger, {
    "aria-disabled": itemContext.open && !collapsibleContext.collapsible || undefined,
    "data-orientation": accordionContext.orientation,
    id: itemContext.triggerId,
    ...collapsibleScope,
    ...triggerProps,
    ref: forwardedRef
  }) });
});
AccordionTrigger.displayName = TRIGGER_NAME2;
var CONTENT_NAME2 = "AccordionContent";
var AccordionContent = React16.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...contentProps } = props;
  const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
  const itemContext = useAccordionItemContext(CONTENT_NAME2, __scopeAccordion);
  const collapsibleScope = useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ jsx13(Content, {
    role: "region",
    "aria-labelledby": itemContext.triggerId,
    "data-orientation": accordionContext.orientation,
    ...collapsibleScope,
    ...contentProps,
    ref: forwardedRef,
    style: {
      ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
      ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
      ...props.style
    }
  });
});
AccordionContent.displayName = CONTENT_NAME2;
function getState2(open) {
  return open ? "open" : "closed";
}
var Root22 = Accordion;
var Item = AccordionItem;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger;
var Content2 = AccordionContent;

// ../../node_modules/.bun/@radix-ui+react-alert-dialog@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var exports_dist5 = {};
__export(exports_dist5, {
  createAlertDialogScope: () => createAlertDialogScope,
  Trigger: () => Trigger22,
  Title: () => Title2,
  Root: () => Root23,
  Portal: () => Portal22,
  Overlay: () => Overlay2,
  Description: () => Description2,
  Content: () => Content22,
  Cancel: () => Cancel,
  AlertDialogTrigger: () => AlertDialogTrigger,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialog: () => AlertDialog,
  Action: () => Action
});
import * as React35 from "react";

// ../../node_modules/.bun/@radix-ui+react-dialog@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-dialog/dist/index.mjs
var exports_dist4 = {};
__export(exports_dist4, {
  createDialogScope: () => createDialogScope,
  WarningProvider: () => WarningProvider,
  Trigger: () => Trigger3,
  Title: () => Title,
  Root: () => Root4,
  Portal: () => Portal2,
  Overlay: () => Overlay,
  DialogTrigger: () => DialogTrigger,
  DialogTitle: () => DialogTitle,
  DialogPortal: () => DialogPortal,
  DialogOverlay: () => DialogOverlay,
  DialogDescription: () => DialogDescription,
  DialogContent: () => DialogContent,
  DialogClose: () => DialogClose,
  Dialog: () => Dialog,
  Description: () => Description,
  Content: () => Content3,
  Close: () => Close
});
import * as React34 from "react";

// ../../node_modules/.bun/@radix-ui+react-dismissable-layer@1.1.11+1356086b9384fa43/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import * as React19 from "react";

// ../../node_modules/.bun/@radix-ui+react-use-callback-ref@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as React17 from "react";
function useCallbackRef(callback) {
  const callbackRef = React17.useRef(callback);
  React17.useEffect(() => {
    callbackRef.current = callback;
  });
  return React17.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

// ../../node_modules/.bun/@radix-ui+react-use-escape-keydown@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
import * as React18 from "react";
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
  React18.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

// ../../node_modules/.bun/@radix-ui+react-dismissable-layer@1.1.11+1356086b9384fa43/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import { jsx as jsx14 } from "react/jsx-runtime";
"use client";
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React19.createContext({
  layers: /* @__PURE__ */ new Set,
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set,
  branches: /* @__PURE__ */ new Set
});
var DismissableLayer = React19.forwardRef((props, forwardedRef) => {
  const {
    disableOutsidePointerEvents = false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    ...layerProps
  } = props;
  const context = React19.useContext(DismissableLayerContext);
  const [node, setNode] = React19.useState(null);
  const ownerDocument = node?.ownerDocument ?? globalThis?.document;
  const [, force] = React19.useState({});
  const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
  const layers = Array.from(context.layers);
  const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
  const index = node ? layers.indexOf(node) : -1;
  const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
  const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
  const pointerDownOutside = usePointerDownOutside((event) => {
    const target = event.target;
    const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
    if (!isPointerEventsEnabled || isPointerDownOnBranch)
      return;
    onPointerDownOutside?.(event);
    onInteractOutside?.(event);
    if (!event.defaultPrevented)
      onDismiss?.();
  }, ownerDocument);
  const focusOutside = useFocusOutside((event) => {
    const target = event.target;
    const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
    if (isFocusInBranch)
      return;
    onFocusOutside?.(event);
    onInteractOutside?.(event);
    if (!event.defaultPrevented)
      onDismiss?.();
  }, ownerDocument);
  useEscapeKeydown((event) => {
    const isHighestLayer = index === context.layers.size - 1;
    if (!isHighestLayer)
      return;
    onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }, ownerDocument);
  React19.useEffect(() => {
    if (!node)
      return;
    if (disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
        ownerDocument.body.style.pointerEvents = "none";
      }
      context.layersWithOutsidePointerEventsDisabled.add(node);
    }
    context.layers.add(node);
    dispatchUpdate();
    return () => {
      if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
        ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
      }
    };
  }, [node, ownerDocument, disableOutsidePointerEvents, context]);
  React19.useEffect(() => {
    return () => {
      if (!node)
        return;
      context.layers.delete(node);
      context.layersWithOutsidePointerEventsDisabled.delete(node);
      dispatchUpdate();
    };
  }, [node, context]);
  React19.useEffect(() => {
    const handleUpdate = () => force({});
    document.addEventListener(CONTEXT_UPDATE, handleUpdate);
    return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
  }, []);
  return /* @__PURE__ */ jsx14(Primitive.div, {
    ...layerProps,
    ref: composedRefs,
    style: {
      pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : undefined,
      ...props.style
    },
    onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
    onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
    onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
  });
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = React19.forwardRef((props, forwardedRef) => {
  const context = React19.useContext(DismissableLayerContext);
  const ref = React19.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React19.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsx14(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React19.useRef(false);
  const handleClickRef = React19.useRef(() => {});
  React19.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React19.useRef(false);
  React19.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler)
    target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}

// ../../node_modules/.bun/@radix-ui+react-focus-scope@1.1.7+1356086b9384fa43/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
import * as React20 from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
"use client";
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = React20.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = React20.useState(null);
  const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
  const lastFocusedElementRef = React20.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = React20.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  React20.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container)
          return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container)
          return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null)
          return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body)
          return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0)
            focus(container);
        }
      };
      var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container)
        mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  React20.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = React20.useCallback((event) => {
    if (!loop && !trapped)
      return;
    if (focusScope.paused)
      return;
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
    const focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const container2 = event.currentTarget;
      const [first, last] = getTabbableEdges(container2);
      const hasTabbableElementsInside = first && last;
      if (!hasTabbableElementsInside) {
        if (focusedElement === container2)
          event.preventDefault();
      } else {
        if (!event.shiftKey && focusedElement === last) {
          event.preventDefault();
          if (loop)
            focus(first, { select: true });
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault();
          if (loop)
            focus(last, { select: true });
        }
      }
    }
  }, [loop, trapped, focusScope.paused]);
  return /* @__PURE__ */ jsx15(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement)
      return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container }))
      return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (upTo !== undefined && node === upTo)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}

// ../../node_modules/.bun/@radix-ui+react-portal@1.1.9+1356086b9384fa43/node_modules/@radix-ui/react-portal/dist/index.mjs
import * as React21 from "react";
import ReactDOM2 from "react-dom";
import { jsx as jsx16 } from "react/jsx-runtime";
"use client";
var PORTAL_NAME = "Portal";
var Portal = React21.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React21.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM2.createPortal(/* @__PURE__ */ jsx16(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;

// ../../node_modules/.bun/@radix-ui+react-focus-guards@1.1.3+a5924156876af9ae/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
import * as React25 from "react";
"use client";
var count2 = 0;
function useFocusGuards() {
  React25.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count2++;
    return () => {
      if (count2 === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count2--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

// ../../node_modules/.bun/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length;i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/Combination.js
import * as React33 from "react";

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/UI.js
import * as React29 from "react";

// ../../node_modules/.bun/react-remove-scroll-bar@2.3.8+a5924156876af9ae/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// ../../node_modules/.bun/use-callback-ref@1.3.3+a5924156876af9ae/node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// ../../node_modules/.bun/use-callback-ref@1.3.3+a5924156876af9ae/node_modules/use-callback-ref/dist/es2015/useRef.js
import { useState as useState8 } from "react";
function useCallbackRef2(initialValue, callback) {
  var ref = useState8(function() {
    return {
      value: initialValue,
      callback,
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// ../../node_modules/.bun/use-callback-ref@1.3.3+a5924156876af9ae/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
import * as React27 from "react";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React27.useLayoutEffect : React27.useEffect;
var currentValues = new WeakMap;
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef2(defaultValue || null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
// ../../node_modules/.bun/use-sidecar@1.1.3+a5924156876af9ae/node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === undefined) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === undefined) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
// ../../node_modules/.bun/use-sidecar@1.1.3+a5924156876af9ae/node_modules/use-sidecar/dist/es2015/exports.js
import * as React28 from "react";
var SideCar = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React28.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}
// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {
  return;
};
var RemoveScroll = React29.forwardRef(function(props, parentRef) {
  var ref = React29.useRef(null);
  var _a = React29.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var { forwardProps, children, className, removeScrollBar, enabled, shards, sideCar, noRelative, noIsolation, inert, allowPinchZoom, as: _b } = props, Container = _b === undefined ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React29.createElement(React29.Fragment, null, enabled && React29.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }), forwardProps ? React29.cloneElement(React29.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React29.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children));
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/SideEffect.js
import * as React32 from "react";

// ../../node_modules/.bun/react-remove-scroll-bar@2.3.8+a5924156876af9ae/node_modules/react-remove-scroll-bar/dist/es2015/component.js
import * as React31 from "react";

// ../../node_modules/.bun/react-style-singleton@2.2.3+a5924156876af9ae/node_modules/react-style-singleton/dist/es2015/hook.js
import * as React30 from "react";

// ../../node_modules/.bun/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return;
};

// ../../node_modules/.bun/react-style-singleton@2.2.3+a5924156876af9ae/node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};

// ../../node_modules/.bun/react-style-singleton@2.2.3+a5924156876af9ae/node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    React30.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};

// ../../node_modules/.bun/react-style-singleton@2.2.3+a5924156876af9ae/node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var { styles, dynamic } = _a;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet;
};
// ../../node_modules/.bun/react-remove-scroll-bar@2.3.8+a5924156876af9ae/node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === undefined) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};

// ../../node_modules/.bun/react-remove-scroll-bar@2.3.8+a5924156876af9ae/node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var { left, top, right, gap } = _a;
  if (gapMode === undefined) {
    gapMode = "margin";
  }
  return `
  .`.concat(noScrollbarsClassName, ` {
   overflow: hidden `).concat(important, `;
   padding-right: `).concat(gap, "px ").concat(important, `;
  }
  body[`).concat(lockAttribute, `] {
    overflow: hidden `).concat(important, `;
    overscroll-behavior: contain;
    `).concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && `
    padding-left: `.concat(left, `px;
    padding-top: `).concat(top, `px;
    padding-right: `).concat(right, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(gap, "px ").concat(important, `;
    `),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(zeroRightClassName, ` {
    right: `).concat(gap, "px ").concat(important, `;
  }
  
  .`).concat(fullWidthClassName, ` {
    margin-right: `).concat(gap, "px ").concat(important, `;
  }
  
  .`).concat(zeroRightClassName, " .").concat(zeroRightClassName, ` {
    right: 0 `).concat(important, `;
  }
  
  .`).concat(fullWidthClassName, " .").concat(fullWidthClassName, ` {
    margin-right: 0 `).concat(important, `;
  }
  
  body[`).concat(lockAttribute, `] {
    `).concat(removedBarSizeVariable, ": ").concat(gap, `px;
  }
`);
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  React31.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var { noRelative, noImportant, gapMode: _b } = _a, gapMode = _b === undefined ? "margin" : _b;
  useLockAttribute();
  var gap = React31.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React31.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles = window.getComputedStyle(node);
  return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var { scrollTop, scrollHeight, clientHeight } = _a;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var { scrollLeft, scrollWidth, clientWidth } = _a;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
  } while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
  if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return `
  .block-interactivity-`.concat(id, ` {pointer-events: none;}
  .allow-interactivity-`).concat(id, ` {pointer-events: all;}
`);
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React32.useRef([]);
  var touchStartRef = React32.useRef([0, 0]);
  var activeAxis = React32.useRef();
  var id = React32.useState(idCounter++)[0];
  var Style2 = React32.useState(styleSingleton)[0];
  var lastProps = React32.useRef(props);
  React32.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React32.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React32.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React32.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React32.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React32.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = undefined;
  }, []);
  var scrollWheel = React32.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React32.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React32.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var { removeScrollBar, inert } = props;
  return React32.createElement(React32.Fragment, null, inert ? React32.createElement(Style2, { styles: generateStyle(id) }) : null, removeScrollBar ? React32.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null);
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// ../../node_modules/.bun/react-remove-scroll@2.7.1+a5924156876af9ae/node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React33.forwardRef(function(props, ref) {
  return React33.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// ../../node_modules/.bun/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap;
var uncontrolledNodes = new WeakMap;
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = new WeakMap;
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = new Set;
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = new WeakMap;
      counterMap = new WeakMap;
      uncontrolledNodes = new WeakMap;
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === undefined) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = parentNode || getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};

// ../../node_modules/.bun/@radix-ui+react-dialog@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-dialog/dist/index.mjs
import { Fragment as Fragment6, jsx as jsx17, jsxs } from "react/jsx-runtime";
"use client";
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = React34.useRef(null);
  const contentRef = React34.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsx17(DialogProvider, {
    scope: __scopeDialog,
    triggerRef,
    contentRef,
    contentId: useId(),
    titleId: useId(),
    descriptionId: useId(),
    open,
    onOpenChange: setOpen,
    onOpenToggle: React34.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
    modal,
    children
  });
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME3 = "DialogTrigger";
var DialogTrigger = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, ...triggerProps } = props;
  const context = useDialogContext(TRIGGER_NAME3, __scopeDialog);
  const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
  return /* @__PURE__ */ jsx17(Primitive.button, {
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": context.open,
    "aria-controls": context.contentId,
    "data-state": getState3(context.open),
    ...triggerProps,
    ref: composedTriggerRef,
    onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
  });
});
DialogTrigger.displayName = TRIGGER_NAME3;
var PORTAL_NAME2 = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME2, {
  forceMount: undefined
});
var DialogPortal = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME2, __scopeDialog);
  return /* @__PURE__ */ jsx17(PortalProvider, { scope: __scopeDialog, forceMount, children: React34.Children.map(children, (child) => /* @__PURE__ */ jsx17(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx17(Portal, { asChild: true, container, children: child }) })) });
};
DialogPortal.displayName = PORTAL_NAME2;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = React34.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
  const { forceMount = portalContext.forceMount, ...overlayProps } = props;
  const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
  return context.modal ? /* @__PURE__ */ jsx17(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx17(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var Slot2 = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, ...overlayProps } = props;
  const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx17(Combination_default, { as: Slot2, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsx17(Primitive.div, {
    "data-state": getState3(context.open),
    ...overlayProps,
    ref: forwardedRef,
    style: { pointerEvents: "auto", ...overlayProps.style }
  }) });
});
var CONTENT_NAME3 = "DialogContent";
var DialogContent = React34.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext(CONTENT_NAME3, props.__scopeDialog);
  const { forceMount = portalContext.forceMount, ...contentProps } = props;
  const context = useDialogContext(CONTENT_NAME3, props.__scopeDialog);
  return /* @__PURE__ */ jsx17(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx17(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx17(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
});
DialogContent.displayName = CONTENT_NAME3;
var DialogContentModal = React34.forwardRef((props, forwardedRef) => {
  const context = useDialogContext(CONTENT_NAME3, props.__scopeDialog);
  const contentRef = React34.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
  React34.useEffect(() => {
    const content = contentRef.current;
    if (content)
      return hideOthers(content);
  }, []);
  return /* @__PURE__ */ jsx17(DialogContentImpl, {
    ...props,
    ref: composedRefs,
    trapFocus: context.open,
    disableOutsidePointerEvents: true,
    onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
      event.preventDefault();
      context.triggerRef.current?.focus();
    }),
    onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
      const originalEvent = event.detail.originalEvent;
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
      if (isRightClick)
        event.preventDefault();
    }),
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
  });
});
var DialogContentNonModal = React34.forwardRef((props, forwardedRef) => {
  const context = useDialogContext(CONTENT_NAME3, props.__scopeDialog);
  const hasInteractedOutsideRef = React34.useRef(false);
  const hasPointerDownOutsideRef = React34.useRef(false);
  return /* @__PURE__ */ jsx17(DialogContentImpl, {
    ...props,
    ref: forwardedRef,
    trapFocus: false,
    disableOutsidePointerEvents: false,
    onCloseAutoFocus: (event) => {
      props.onCloseAutoFocus?.(event);
      if (!event.defaultPrevented) {
        if (!hasInteractedOutsideRef.current)
          context.triggerRef.current?.focus();
        event.preventDefault();
      }
      hasInteractedOutsideRef.current = false;
      hasPointerDownOutsideRef.current = false;
    },
    onInteractOutside: (event) => {
      props.onInteractOutside?.(event);
      if (!event.defaultPrevented) {
        hasInteractedOutsideRef.current = true;
        if (event.detail.originalEvent.type === "pointerdown") {
          hasPointerDownOutsideRef.current = true;
        }
      }
      const target = event.target;
      const targetIsTrigger = context.triggerRef.current?.contains(target);
      if (targetIsTrigger)
        event.preventDefault();
      if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
        event.preventDefault();
      }
    }
  });
});
var DialogContentImpl = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
  const context = useDialogContext(CONTENT_NAME3, __scopeDialog);
  const contentRef = React34.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, contentRef);
  useFocusGuards();
  return /* @__PURE__ */ jsxs(Fragment6, { children: [
    /* @__PURE__ */ jsx17(FocusScope, {
      asChild: true,
      loop: true,
      trapped: trapFocus,
      onMountAutoFocus: onOpenAutoFocus,
      onUnmountAutoFocus: onCloseAutoFocus,
      children: /* @__PURE__ */ jsx17(DismissableLayer, {
        role: "dialog",
        id: context.contentId,
        "aria-describedby": context.descriptionId,
        "aria-labelledby": context.titleId,
        "data-state": getState3(context.open),
        ...contentProps,
        ref: composedRefs,
        onDismiss: () => context.onOpenChange(false)
      })
    }),
    /* @__PURE__ */ jsxs(Fragment6, { children: [
      /* @__PURE__ */ jsx17(TitleWarning, { titleId: context.titleId }),
      /* @__PURE__ */ jsx17(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
    ] })
  ] });
});
var TITLE_NAME = "DialogTitle";
var DialogTitle = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, ...titleProps } = props;
  const context = useDialogContext(TITLE_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx17(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, ...descriptionProps } = props;
  const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx17(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = React34.forwardRef((props, forwardedRef) => {
  const { __scopeDialog, ...closeProps } = props;
  const context = useDialogContext(CLOSE_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx17(Primitive.button, {
    type: "button",
    ...closeProps,
    ref: forwardedRef,
    onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
  });
});
DialogClose.displayName = CLOSE_NAME;
function getState3(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext22(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME3,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  React34.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle)
        console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  React34.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription)
        console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root4 = Dialog;
var Trigger3 = DialogTrigger;
var Portal2 = DialogPortal;
var Overlay = DialogOverlay;
var Content3 = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;

// ../../node_modules/.bun/@radix-ui+react-alert-dialog@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
import { jsx as jsx18, jsxs as jsxs2 } from "react/jsx-runtime";
"use client";
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Root4, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog.displayName = ROOT_NAME;
var TRIGGER_NAME4 = "AlertDialogTrigger";
var AlertDialogTrigger = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...triggerProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Trigger3, { ...dialogScope, ...triggerProps, ref: forwardedRef });
});
AlertDialogTrigger.displayName = TRIGGER_NAME4;
var PORTAL_NAME3 = "AlertDialogPortal";
var AlertDialogPortal = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Portal2, { ...dialogScope, ...portalProps });
};
AlertDialogPortal.displayName = PORTAL_NAME3;
var OVERLAY_NAME2 = "AlertDialogOverlay";
var AlertDialogOverlay = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...overlayProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
});
AlertDialogOverlay.displayName = OVERLAY_NAME2;
var CONTENT_NAME4 = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME4);
var Slottable2 = createSlottable("AlertDialogContent");
var AlertDialogContent = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, children, ...contentProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  const contentRef = React35.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, contentRef);
  const cancelRef = React35.useRef(null);
  return /* @__PURE__ */ jsx18(WarningProvider, {
    contentName: CONTENT_NAME4,
    titleName: TITLE_NAME2,
    docsSlug: "alert-dialog",
    children: /* @__PURE__ */ jsx18(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxs2(Content3, {
      role: "alertdialog",
      ...dialogScope,
      ...contentProps,
      ref: composedRefs,
      onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
        event.preventDefault();
        cancelRef.current?.focus({ preventScroll: true });
      }),
      onPointerDownOutside: (event) => event.preventDefault(),
      onInteractOutside: (event) => event.preventDefault(),
      children: [
        /* @__PURE__ */ jsx18(Slottable2, { children }),
        /* @__PURE__ */ jsx18(DescriptionWarning2, { contentRef })
      ]
    }) })
  });
});
AlertDialogContent.displayName = CONTENT_NAME4;
var TITLE_NAME2 = "AlertDialogTitle";
var AlertDialogTitle = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...titleProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
});
AlertDialogTitle.displayName = TITLE_NAME2;
var DESCRIPTION_NAME2 = "AlertDialogDescription";
var AlertDialogDescription = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription.displayName = DESCRIPTION_NAME2;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...actionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx18(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
});
AlertDialogAction.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel = React35.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...cancelProps } = props;
  const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
  const dialogScope = useDialogScope(__scopeAlertDialog);
  const ref = useComposedRefs(forwardedRef, cancelRef);
  return /* @__PURE__ */ jsx18(Close, { ...dialogScope, ...cancelProps, ref });
});
AlertDialogCancel.displayName = CANCEL_NAME;
var DescriptionWarning2 = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME4}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME4}\` by passing a \`${DESCRIPTION_NAME2}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME4}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  React35.useEffect(() => {
    const hasDescription = document.getElementById(contentRef.current?.getAttribute("aria-describedby"));
    if (!hasDescription)
      console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root23 = AlertDialog;
var Trigger22 = AlertDialogTrigger;
var Portal22 = AlertDialogPortal;
var Overlay2 = AlertDialogOverlay;
var Content22 = AlertDialogContent;
var Action = AlertDialogAction;
var Cancel = AlertDialogCancel;
var Title2 = AlertDialogTitle;
var Description2 = AlertDialogDescription;

// ../../node_modules/.bun/@radix-ui+react-avatar@1.1.10+1356086b9384fa43/node_modules/@radix-ui/react-avatar/dist/index.mjs
var exports_dist6 = {};
__export(exports_dist6, {
  createAvatarScope: () => createAvatarScope,
  Root: () => Root5,
  Image: () => Image2,
  Fallback: () => Fallback,
  AvatarImage: () => AvatarImage,
  AvatarFallback: () => AvatarFallback,
  Avatar: () => Avatar
});
import * as React37 from "react";

// ../../node_modules/.bun/@radix-ui+react-use-is-hydrated@0.1.0+a5924156876af9ae/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var import_shim = __toESM(require_shim(), 1);
function useIsHydrated() {
  return import_shim.useSyncExternalStore(subscribe, () => true, () => false);
}
function subscribe() {
  return () => {};
}

// ../../node_modules/.bun/@radix-ui+react-avatar@1.1.10+1356086b9384fa43/node_modules/@radix-ui/react-avatar/dist/index.mjs
import { jsx as jsx19 } from "react/jsx-runtime";
"use client";
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = React37.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, ...avatarProps } = props;
  const [imageLoadingStatus, setImageLoadingStatus] = React37.useState("idle");
  return /* @__PURE__ */ jsx19(AvatarProvider, {
    scope: __scopeAvatar,
    imageLoadingStatus,
    onImageLoadingStatusChange: setImageLoadingStatus,
    children: /* @__PURE__ */ jsx19(Primitive.span, { ...avatarProps, ref: forwardedRef })
  });
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = React37.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = props;
  const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
  const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
  const handleLoadingStatusChange = useCallbackRef((status) => {
    onLoadingStatusChange(status);
    context.onImageLoadingStatusChange(status);
  });
  useLayoutEffect2(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsx19(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
});
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = React37.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, delayMs, ...fallbackProps } = props;
  const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
  const [canRender, setCanRender] = React37.useState(delayMs === undefined);
  React37.useEffect(() => {
    if (delayMs !== undefined) {
      const timerId = window.setTimeout(() => setCanRender(true), delayMs);
      return () => window.clearTimeout(timerId);
    }
  }, [delayMs]);
  return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsx19(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
});
AvatarFallback.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = React37.useRef(null);
  const image = (() => {
    if (!isHydrated)
      return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image;
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = React37.useState(() => resolveLoadingStatus(image, src));
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image)
      return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root5 = Avatar;
var Image2 = AvatarImage;
var Fallback = AvatarFallback;

// ../../node_modules/.bun/@radix-ui+react-use-previous@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-use-previous/dist/index.mjs
import * as React38 from "react";
function usePrevious(value) {
  const ref = React38.useRef({ value, previous: value });
  return React38.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

// ../../node_modules/.bun/@radix-ui+react-use-size@1.1.1+a5924156876af9ae/node_modules/@radix-ui/react-use-size/dist/index.mjs
import * as React39 from "react";
function useSize(element) {
  const [size, setSize] = React39.useState(undefined);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(undefined);
    }
  }, [element]);
  return size;
}

// ../../node_modules/.bun/@radix-ui+react-context-menu@2.2.16+1356086b9384fa43/node_modules/@radix-ui/react-context-menu/dist/index.mjs
var exports_dist10 = {};
__export(exports_dist10, {
  createContextMenuScope: () => createContextMenuScope,
  Trigger: () => Trigger5,
  SubTrigger: () => SubTrigger2,
  SubContent: () => SubContent2,
  Sub: () => Sub2,
  Separator: () => Separator2,
  Root: () => Root25,
  RadioItem: () => RadioItem2,
  RadioGroup: () => RadioGroup2,
  Portal: () => Portal23,
  Label: () => Label2,
  ItemIndicator: () => ItemIndicator2,
  Item: () => Item23,
  Group: () => Group2,
  ContextMenuTrigger: () => ContextMenuTrigger,
  ContextMenuSubTrigger: () => ContextMenuSubTrigger,
  ContextMenuSubContent: () => ContextMenuSubContent,
  ContextMenuSub: () => ContextMenuSub,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuRadioItem: () => ContextMenuRadioItem,
  ContextMenuRadioGroup: () => ContextMenuRadioGroup,
  ContextMenuPortal: () => ContextMenuPortal,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuItemIndicator: () => ContextMenuItemIndicator,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuGroup: () => ContextMenuGroup,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuCheckboxItem: () => ContextMenuCheckboxItem,
  ContextMenuArrow: () => ContextMenuArrow,
  ContextMenu: () => ContextMenu,
  Content: () => Content24,
  CheckboxItem: () => CheckboxItem2,
  Arrow: () => Arrow23
});
import * as React45 from "react";

// ../../node_modules/.bun/@radix-ui+react-menu@2.1.16+1356086b9384fa43/node_modules/@radix-ui/react-menu/dist/index.mjs
import * as React44 from "react";

// ../../node_modules/.bun/@radix-ui+react-popper@1.2.8+1356086b9384fa43/node_modules/@radix-ui/react-popper/dist/index.mjs
import * as React42 from "react";

// ../../node_modules/.bun/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === undefined) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// ../../node_modules/.bun/@floating-ui+core@1.7.3/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? undefined : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0;i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options2) {
  var _await$platform$isEle;
  if (options2 === undefined) {
    options2 = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options2, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? undefined : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? undefined : platform.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? undefined : platform.getOffsetParent(elements.floating));
  const offsetScale = await (platform.isElement == null ? undefined : platform.isElement(offsetParent)) ? await (platform.getScale == null ? undefined : platform.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options2) => ({
  name: "arrow",
  options: options2,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options2, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? undefined : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform.isElement == null ? undefined : platform.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  return {
    name: "flip",
    options: options2,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options2, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? undefined : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? undefined : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? undefined : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? undefined : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? undefined : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  return {
    name: "hide",
    options: options2,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options2, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options2) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? undefined : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options2, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options2) {
  if (options2 === undefined) {
    options2 = 0;
  }
  return {
    name: "offset",
    options: options2,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options2);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? undefined : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  return {
    name: "shift",
    options: options2,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options2, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  return {
    options: options2,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options2, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? undefined : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? undefined : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  return {
    name: "size",
    options: options2,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options2, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform.isRTL == null ? undefined : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// ../../node_modules/.bun/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? undefined : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? undefined : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
var tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
var transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
var willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
var containValues = ["paint", "layout", "strict", "content"];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === undefined) {
    list = [];
  }
  if (traverseIframes === undefined) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? undefined : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// ../../node_modules/.bun/@floating-ui+dom@1.7.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === undefined) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === undefined) {
    includeScale = false;
  }
  if (isFixedStrategy === undefined) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === undefined) {
      skip = false;
    }
    if (threshold === undefined) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options2 = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 0.0000001);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options2,
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options2);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options2;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options2) => {
  const cache = new Map;
  const mergedOptions = {
    platform,
    ...options2
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// ../../node_modules/.bun/@floating-ui+react-dom@2.1.6+2b5434204782a989/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
import * as React40 from "react";
import { useLayoutEffect as useLayoutEffect5 } from "react";
import * as ReactDOM3 from "react-dom";
var isClient = typeof document !== "undefined";
var noop = function noop2() {};
var index = isClient ? useLayoutEffect5 : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length;i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length;i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length;i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React40.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options2;
  const [data, setData] = React40.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React40.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React40.useState(null);
  const [_floating, _setFloating] = React40.useState(null);
  const setReference = React40.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React40.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React40.useRef(null);
  const floatingRef = React40.useRef(null);
  const dataRef = React40.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React40.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM3.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React40.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl)
      referenceRef.current = referenceEl;
    if (floatingEl)
      floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React40.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React40.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React40.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React40.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options2) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options: options2,
    fn(state) {
      const {
        element,
        padding
      } = typeof options2 === "function" ? options2(state) : options2;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var offset3 = (options2, deps) => ({
  ...offset2(options2),
  options: [options2, deps]
});
var shift3 = (options2, deps) => ({
  ...shift2(options2),
  options: [options2, deps]
});
var limitShift3 = (options2, deps) => ({
  ...limitShift2(options2),
  options: [options2, deps]
});
var flip3 = (options2, deps) => ({
  ...flip2(options2),
  options: [options2, deps]
});
var size3 = (options2, deps) => ({
  ...size2(options2),
  options: [options2, deps]
});
var hide3 = (options2, deps) => ({
  ...hide2(options2),
  options: [options2, deps]
});
var arrow3 = (options2, deps) => ({
  ...arrow$1(options2),
  options: [options2, deps]
});

// ../../node_modules/.bun/@radix-ui+react-arrow@1.1.7+1356086b9384fa43/node_modules/@radix-ui/react-arrow/dist/index.mjs
import * as React41 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var NAME2 = "Arrow";
var Arrow = React41.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsx20(Primitive.svg, {
    ...arrowProps,
    ref: forwardedRef,
    width,
    height,
    viewBox: "0 0 30 10",
    preserveAspectRatio: "none",
    children: props.asChild ? children : /* @__PURE__ */ jsx20("polygon", { points: "0,0 30,0 15,10" })
  });
});
Arrow.displayName = NAME2;
var Root6 = Arrow;

// ../../node_modules/.bun/@radix-ui+react-popper@1.2.8+1356086b9384fa43/node_modules/@radix-ui/react-popper/dist/index.mjs
import { jsx as jsx21 } from "react/jsx-runtime";
"use client";
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React42.useState(null);
  return /* @__PURE__ */ jsx21(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = React42.forwardRef((props, forwardedRef) => {
  const { __scopePopper, virtualRef, ...anchorProps } = props;
  const context = usePopperContext(ANCHOR_NAME, __scopePopper);
  const ref = React42.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const anchorRef = React42.useRef(null);
  React42.useEffect(() => {
    const previousAnchor = anchorRef.current;
    anchorRef.current = virtualRef?.current || ref.current;
    if (previousAnchor !== anchorRef.current) {
      context.onAnchorChange(anchorRef.current);
    }
  });
  return virtualRef ? null : /* @__PURE__ */ jsx21(Primitive.div, { ...anchorProps, ref: composedRefs });
});
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME5 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME5);
var PopperContent = React42.forwardRef((props, forwardedRef) => {
  const {
    __scopePopper,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding: collisionPaddingProp = 0,
    sticky = "partial",
    hideWhenDetached = false,
    updatePositionStrategy = "optimized",
    onPlaced,
    ...contentProps
  } = props;
  const context = usePopperContext(CONTENT_NAME5, __scopePopper);
  const [content, setContent] = React42.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const [arrow4, setArrow] = React42.useState(null);
  const arrowSize = useSize(arrow4);
  const arrowWidth = arrowSize?.width ?? 0;
  const arrowHeight = arrowSize?.height ?? 0;
  const desiredPlacement = side + (align !== "center" ? "-" + align : "");
  const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
  const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
  const hasExplicitBoundaries = boundary.length > 0;
  const detectOverflowOptions = {
    padding: collisionPadding,
    boundary: boundary.filter(isNotNull),
    altBoundary: hasExplicitBoundaries
  };
  const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
    strategy: "fixed",
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: updatePositionStrategy === "always"
      });
      return cleanup;
    },
    elements: {
      reference: context.anchor
    },
    middleware: [
      offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
      avoidCollisions && shift3({
        mainAxis: true,
        crossAxis: false,
        limiter: sticky === "partial" ? limitShift3() : undefined,
        ...detectOverflowOptions
      }),
      avoidCollisions && flip3({ ...detectOverflowOptions }),
      size3({
        ...detectOverflowOptions,
        apply: ({ elements, rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          const contentStyle = elements.floating.style;
          contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
          contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
          contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
          contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
        }
      }),
      arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
      transformOrigin({ arrowWidth, arrowHeight }),
      hideWhenDetached && hide3({ strategy: "referenceHidden", ...detectOverflowOptions })
    ]
  });
  const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
  const handlePlaced = useCallbackRef(onPlaced);
  useLayoutEffect2(() => {
    if (isPositioned) {
      handlePlaced?.();
    }
  }, [isPositioned, handlePlaced]);
  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
  const [contentZIndex, setContentZIndex] = React42.useState();
  useLayoutEffect2(() => {
    if (content)
      setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  return /* @__PURE__ */ jsx21("div", {
    ref: refs.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: contentZIndex,
      ["--radix-popper-transform-origin"]: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y
      ].join(" "),
      ...middlewareData.hide?.referenceHidden && {
        visibility: "hidden",
        pointerEvents: "none"
      }
    },
    dir: props.dir,
    children: /* @__PURE__ */ jsx21(PopperContentProvider, {
      scope: __scopePopper,
      placedSide,
      onArrowChange: setArrow,
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow,
      children: /* @__PURE__ */ jsx21(Primitive.div, {
        "data-side": placedSide,
        "data-align": placedAlign,
        ...contentProps,
        ref: composedRefs,
        style: {
          ...contentProps.style,
          animation: !isPositioned ? "none" : undefined
        }
      })
    })
  });
});
PopperContent.displayName = CONTENT_NAME5;
var ARROW_NAME = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = React42.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return /* @__PURE__ */ jsx21("span", {
    ref: contentContext.onArrowChange,
    style: {
      position: "absolute",
      left: contentContext.arrowX,
      top: contentContext.arrowY,
      [baseSide]: 0,
      transformOrigin: {
        top: "",
        right: "0 0",
        bottom: "center 0",
        left: "100% 0"
      }[contentContext.placedSide],
      transform: {
        top: "translateY(100%)",
        right: "translateY(50%) rotate(90deg) translateX(-50%)",
        bottom: `rotate(180deg)`,
        left: "translateY(50%) rotate(-90deg) translateX(50%)"
      }[contentContext.placedSide],
      visibility: contentContext.shouldHideArrow ? "hidden" : undefined
    },
    children: /* @__PURE__ */ jsx21(Root6, {
      ...arrowProps,
      ref: forwardedRef,
      style: {
        ...arrowProps.style,
        display: "block"
      }
    })
  });
});
PopperArrow.displayName = ARROW_NAME;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options2) => ({
  name: "transformOrigin",
  options: options2,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options2.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options2.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root24 = Popper;
var Anchor = PopperAnchor;
var Content5 = PopperContent;
var Arrow2 = PopperArrow;

// ../../node_modules/.bun/@radix-ui+react-roving-focus@1.1.11+1356086b9384fa43/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
import * as React43 from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
"use client";
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS2 = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection2, useCollection2, createCollectionScope2] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope2]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = React43.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsx24(Collection2.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx24(Collection2.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx24(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = React43.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = React43.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = React43.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection2(__scopeRovingFocusGroup);
  const isClickFocusRef = React43.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = React43.useState(0);
  React43.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsx24(RovingFocusProvider, {
    scope: __scopeRovingFocusGroup,
    orientation,
    dir: direction,
    loop,
    currentTabStopId,
    onItemFocus: React43.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
    onItemShiftTab: React43.useCallback(() => setIsTabbingBackOut(true), []),
    onFocusableItemAdd: React43.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
    onFocusableItemRemove: React43.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
    children: /* @__PURE__ */ jsx24(Primitive.div, {
      tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
      "data-orientation": orientation,
      ...groupProps,
      ref: composedRefs,
      style: { outline: "none", ...props.style },
      onMouseDown: composeEventHandlers(props.onMouseDown, () => {
        isClickFocusRef.current = true;
      }),
      onFocus: composeEventHandlers(props.onFocus, (event) => {
        const isKeyboardFocus = !isClickFocusRef.current;
        if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
          const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS2);
          event.currentTarget.dispatchEvent(entryFocusEvent);
          if (!entryFocusEvent.defaultPrevented) {
            const items = getItems().filter((item) => item.focusable);
            const activeItem = items.find((item) => item.active);
            const currentItem = items.find((item) => item.id === currentTabStopId);
            const candidateItems = [activeItem, currentItem, ...items].filter(Boolean);
            const candidateNodes = candidateItems.map((item) => item.ref.current);
            focusFirst2(candidateNodes, preventScrollOnEntryFocus);
          }
        }
        isClickFocusRef.current = false;
      }),
      onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
    })
  });
});
var ITEM_NAME2 = "RovingFocusGroupItem";
var RovingFocusGroupItem = React43.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    focusable = true,
    active = false,
    tabStopId,
    children,
    ...itemProps
  } = props;
  const autoId = useId();
  const id = tabStopId || autoId;
  const context = useRovingFocusContext(ITEM_NAME2, __scopeRovingFocusGroup);
  const isCurrentTabStop = context.currentTabStopId === id;
  const getItems = useCollection2(__scopeRovingFocusGroup);
  const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
  React43.useEffect(() => {
    if (focusable) {
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }
  }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
  return /* @__PURE__ */ jsx24(Collection2.ItemSlot, {
    scope: __scopeRovingFocusGroup,
    id,
    focusable,
    active,
    children: /* @__PURE__ */ jsx24(Primitive.span, {
      tabIndex: isCurrentTabStop ? 0 : -1,
      "data-orientation": context.orientation,
      ...itemProps,
      ref: forwardedRef,
      onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
        if (!focusable)
          event.preventDefault();
        else
          context.onItemFocus(id);
      }),
      onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        if (event.key === "Tab" && event.shiftKey) {
          context.onItemShiftTab();
          return;
        }
        if (event.target !== event.currentTarget)
          return;
        const focusIntent = getFocusIntent(event, context.orientation, context.dir);
        if (focusIntent !== undefined) {
          if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
            return;
          event.preventDefault();
          const items = getItems().filter((item) => item.focusable);
          let candidateNodes = items.map((item) => item.ref.current);
          if (focusIntent === "last")
            candidateNodes.reverse();
          else if (focusIntent === "prev" || focusIntent === "next") {
            if (focusIntent === "prev")
              candidateNodes.reverse();
            const currentIndex = candidateNodes.indexOf(event.currentTarget);
            candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
          }
          setTimeout(() => focusFirst2(candidateNodes));
        }
      }),
      children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
    })
  });
});
RovingFocusGroupItem.displayName = ITEM_NAME2;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst2(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root7 = RovingFocusGroup;
var Item2 = RovingFocusGroupItem;

// ../../node_modules/.bun/@radix-ui+react-menu@2.1.16+1356086b9384fa43/node_modules/@radix-ui/react-menu/dist/index.mjs
import { jsx as jsx26 } from "react/jsx-runtime";
"use client";
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
var LAST_KEYS = ["ArrowUp", "PageDown", "End"];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, "ArrowRight"],
  rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection3, useCollection3, createCollectionScope3] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
  createCollectionScope3,
  createPopperScope,
  createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props) => {
  const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
  const popperScope = usePopperScope(__scopeMenu);
  const [content, setContent] = React44.useState(null);
  const isUsingKeyboardRef = React44.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);
  const direction = useDirection(dir);
  React44.useEffect(() => {
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
      document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
    };
    const handlePointer = () => isUsingKeyboardRef.current = false;
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("pointerdown", handlePointer, { capture: true });
      document.removeEventListener("pointermove", handlePointer, { capture: true });
    };
  }, []);
  return /* @__PURE__ */ jsx26(Root24, { ...popperScope, children: /* @__PURE__ */ jsx26(MenuProvider, {
    scope: __scopeMenu,
    open,
    onOpenChange: handleOpenChange,
    content,
    onContentChange: setContent,
    children: /* @__PURE__ */ jsx26(MenuRootProvider, {
      scope: __scopeMenu,
      onClose: React44.useCallback(() => handleOpenChange(false), [handleOpenChange]),
      isUsingKeyboardRef,
      dir: direction,
      modal,
      children
    })
  }) });
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME2 = "MenuAnchor";
var MenuAnchor = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, ...anchorProps } = props;
  const popperScope = usePopperScope(__scopeMenu);
  return /* @__PURE__ */ jsx26(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
});
MenuAnchor.displayName = ANCHOR_NAME2;
var PORTAL_NAME4 = "MenuPortal";
var [PortalProvider2, usePortalContext2] = createMenuContext(PORTAL_NAME4, {
  forceMount: undefined
});
var MenuPortal = (props) => {
  const { __scopeMenu, forceMount, children, container } = props;
  const context = useMenuContext(PORTAL_NAME4, __scopeMenu);
  return /* @__PURE__ */ jsx26(PortalProvider2, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ jsx26(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx26(Portal, { asChild: true, container, children }) }) });
};
MenuPortal.displayName = PORTAL_NAME4;
var CONTENT_NAME6 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME6);
var MenuContent = React44.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext2(CONTENT_NAME6, props.__scopeMenu);
  const { forceMount = portalContext.forceMount, ...contentProps } = props;
  const context = useMenuContext(CONTENT_NAME6, props.__scopeMenu);
  const rootContext = useMenuRootContext(CONTENT_NAME6, props.__scopeMenu);
  return /* @__PURE__ */ jsx26(Collection3.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsx26(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx26(Collection3.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ jsx26(MenuRootContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx26(MenuRootContentNonModal, { ...contentProps, ref: forwardedRef }) }) }) });
});
var MenuRootContentModal = React44.forwardRef((props, forwardedRef) => {
  const context = useMenuContext(CONTENT_NAME6, props.__scopeMenu);
  const ref = React44.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React44.useEffect(() => {
    const content = ref.current;
    if (content)
      return hideOthers(content);
  }, []);
  return /* @__PURE__ */ jsx26(MenuContentImpl, {
    ...props,
    ref: composedRefs,
    trapFocus: context.open,
    disableOutsidePointerEvents: context.open,
    disableOutsideScroll: true,
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false }),
    onDismiss: () => context.onOpenChange(false)
  });
});
var MenuRootContentNonModal = React44.forwardRef((props, forwardedRef) => {
  const context = useMenuContext(CONTENT_NAME6, props.__scopeMenu);
  return /* @__PURE__ */ jsx26(MenuContentImpl, {
    ...props,
    ref: forwardedRef,
    trapFocus: false,
    disableOutsidePointerEvents: false,
    disableOutsideScroll: false,
    onDismiss: () => context.onOpenChange(false)
  });
});
var Slot3 = createSlot("MenuContent.ScrollLock");
var MenuContentImpl = React44.forwardRef((props, forwardedRef) => {
  const {
    __scopeMenu,
    loop = false,
    trapFocus,
    onOpenAutoFocus,
    onCloseAutoFocus,
    disableOutsidePointerEvents,
    onEntryFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    disableOutsideScroll,
    ...contentProps
  } = props;
  const context = useMenuContext(CONTENT_NAME6, __scopeMenu);
  const rootContext = useMenuRootContext(CONTENT_NAME6, __scopeMenu);
  const popperScope = usePopperScope(__scopeMenu);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
  const getItems = useCollection3(__scopeMenu);
  const [currentItemId, setCurrentItemId] = React44.useState(null);
  const contentRef = React44.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
  const timerRef = React44.useRef(0);
  const searchRef = React44.useRef("");
  const pointerGraceTimerRef = React44.useRef(0);
  const pointerGraceIntentRef = React44.useRef(null);
  const pointerDirRef = React44.useRef("right");
  const lastPointerXRef = React44.useRef(0);
  const ScrollLockWrapper = disableOutsideScroll ? Combination_default : React44.Fragment;
  const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot3, allowPinchZoom: true } : undefined;
  const handleTypeaheadSearch = (key) => {
    const search = searchRef.current + key;
    const items = getItems().filter((item) => !item.disabled);
    const currentItem = document.activeElement;
    const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
    const values = items.map((item) => item.textValue);
    const nextMatch = getNextMatch(values, search, currentMatch);
    const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
    (function updateSearch(value) {
      searchRef.current = value;
      window.clearTimeout(timerRef.current);
      if (value !== "")
        timerRef.current = window.setTimeout(() => updateSearch(""), 1000);
    })(search);
    if (newItem) {
      setTimeout(() => newItem.focus());
    }
  };
  React44.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  useFocusGuards();
  const isPointerMovingToSubmenu = React44.useCallback((event) => {
    const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
    return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
  }, []);
  return /* @__PURE__ */ jsx26(MenuContentProvider, {
    scope: __scopeMenu,
    searchRef,
    onItemEnter: React44.useCallback((event) => {
      if (isPointerMovingToSubmenu(event))
        event.preventDefault();
    }, [isPointerMovingToSubmenu]),
    onItemLeave: React44.useCallback((event) => {
      if (isPointerMovingToSubmenu(event))
        return;
      contentRef.current?.focus();
      setCurrentItemId(null);
    }, [isPointerMovingToSubmenu]),
    onTriggerLeave: React44.useCallback((event) => {
      if (isPointerMovingToSubmenu(event))
        event.preventDefault();
    }, [isPointerMovingToSubmenu]),
    pointerGraceTimerRef,
    onPointerGraceIntentChange: React44.useCallback((intent) => {
      pointerGraceIntentRef.current = intent;
    }, []),
    children: /* @__PURE__ */ jsx26(ScrollLockWrapper, { ...scrollLockWrapperProps, children: /* @__PURE__ */ jsx26(FocusScope, {
      asChild: true,
      trapped: trapFocus,
      onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
        event.preventDefault();
        contentRef.current?.focus({ preventScroll: true });
      }),
      onUnmountAutoFocus: onCloseAutoFocus,
      children: /* @__PURE__ */ jsx26(DismissableLayer, {
        asChild: true,
        disableOutsidePointerEvents,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss,
        children: /* @__PURE__ */ jsx26(Root7, {
          asChild: true,
          ...rovingFocusGroupScope,
          dir: rootContext.dir,
          orientation: "vertical",
          loop,
          currentTabStopId: currentItemId,
          onCurrentTabStopIdChange: setCurrentItemId,
          onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
            if (!rootContext.isUsingKeyboardRef.current)
              event.preventDefault();
          }),
          preventScrollOnEntryFocus: true,
          children: /* @__PURE__ */ jsx26(Content5, {
            role: "menu",
            "aria-orientation": "vertical",
            "data-state": getOpenState(context.open),
            "data-radix-menu-content": "",
            dir: rootContext.dir,
            ...popperScope,
            ...contentProps,
            ref: composedRefs,
            style: { outline: "none", ...contentProps.style },
            onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
              const target = event.target;
              const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
              const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
              const isCharacterKey = event.key.length === 1;
              if (isKeyDownInside) {
                if (event.key === "Tab")
                  event.preventDefault();
                if (!isModifierKey && isCharacterKey)
                  handleTypeaheadSearch(event.key);
              }
              const content = contentRef.current;
              if (event.target !== content)
                return;
              if (!FIRST_LAST_KEYS.includes(event.key))
                return;
              event.preventDefault();
              const items = getItems().filter((item) => !item.disabled);
              const candidateNodes = items.map((item) => item.ref.current);
              if (LAST_KEYS.includes(event.key))
                candidateNodes.reverse();
              focusFirst3(candidateNodes);
            }),
            onBlur: composeEventHandlers(props.onBlur, (event) => {
              if (!event.currentTarget.contains(event.target)) {
                window.clearTimeout(timerRef.current);
                searchRef.current = "";
              }
            }),
            onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
              const target = event.target;
              const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
              if (event.currentTarget.contains(target) && pointerXHasChanged) {
                const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                pointerDirRef.current = newDir;
                lastPointerXRef.current = event.clientX;
              }
            }))
          })
        })
      })
    }) })
  });
});
MenuContent.displayName = CONTENT_NAME6;
var GROUP_NAME2 = "MenuGroup";
var MenuGroup = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, ...groupProps } = props;
  return /* @__PURE__ */ jsx26(Primitive.div, { role: "group", ...groupProps, ref: forwardedRef });
});
MenuGroup.displayName = GROUP_NAME2;
var LABEL_NAME = "MenuLabel";
var MenuLabel = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, ...labelProps } = props;
  return /* @__PURE__ */ jsx26(Primitive.div, { ...labelProps, ref: forwardedRef });
});
MenuLabel.displayName = LABEL_NAME;
var ITEM_NAME3 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = React44.forwardRef((props, forwardedRef) => {
  const { disabled = false, onSelect, ...itemProps } = props;
  const ref = React44.useRef(null);
  const rootContext = useMenuRootContext(ITEM_NAME3, props.__scopeMenu);
  const contentContext = useMenuContentContext(ITEM_NAME3, props.__scopeMenu);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const isPointerDownRef = React44.useRef(false);
  const handleSelect = () => {
    const menuItem = ref.current;
    if (!disabled && menuItem) {
      const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
      menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
      dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
      if (itemSelectEvent.defaultPrevented) {
        isPointerDownRef.current = false;
      } else {
        rootContext.onClose();
      }
    }
  };
  return /* @__PURE__ */ jsx26(MenuItemImpl, {
    ...itemProps,
    ref: composedRefs,
    disabled,
    onClick: composeEventHandlers(props.onClick, handleSelect),
    onPointerDown: (event) => {
      props.onPointerDown?.(event);
      isPointerDownRef.current = true;
    },
    onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
      if (!isPointerDownRef.current)
        event.currentTarget?.click();
    }),
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      const isTypingAhead = contentContext.searchRef.current !== "";
      if (disabled || isTypingAhead && event.key === " ")
        return;
      if (SELECTION_KEYS.includes(event.key)) {
        event.currentTarget.click();
        event.preventDefault();
      }
    })
  });
});
MenuItem.displayName = ITEM_NAME3;
var MenuItemImpl = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
  const contentContext = useMenuContentContext(ITEM_NAME3, __scopeMenu);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
  const ref = React44.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [isFocused, setIsFocused] = React44.useState(false);
  const [textContent, setTextContent] = React44.useState("");
  React44.useEffect(() => {
    const menuItem = ref.current;
    if (menuItem) {
      setTextContent((menuItem.textContent ?? "").trim());
    }
  }, [itemProps.children]);
  return /* @__PURE__ */ jsx26(Collection3.ItemSlot, {
    scope: __scopeMenu,
    disabled,
    textValue: textValue ?? textContent,
    children: /* @__PURE__ */ jsx26(Item2, { asChild: true, ...rovingFocusGroupScope, focusable: !disabled, children: /* @__PURE__ */ jsx26(Primitive.div, {
      role: "menuitem",
      "data-highlighted": isFocused ? "" : undefined,
      "aria-disabled": disabled || undefined,
      "data-disabled": disabled ? "" : undefined,
      ...itemProps,
      ref: composedRefs,
      onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
        if (disabled) {
          contentContext.onItemLeave(event);
        } else {
          contentContext.onItemEnter(event);
          if (!event.defaultPrevented) {
            const item = event.currentTarget;
            item.focus({ preventScroll: true });
          }
        }
      })),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
      onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
      onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
    }) })
  });
});
var CHECKBOX_ITEM_NAME = "MenuCheckboxItem";
var MenuCheckboxItem = React44.forwardRef((props, forwardedRef) => {
  const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
  return /* @__PURE__ */ jsx26(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsx26(MenuItem, {
    role: "menuitemcheckbox",
    "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
    ...checkboxItemProps,
    ref: forwardedRef,
    "data-state": getCheckedState(checked),
    onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false })
  }) });
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME, { value: undefined, onValueChange: () => {} });
var MenuRadioGroup = React44.forwardRef((props, forwardedRef) => {
  const { value, onValueChange, ...groupProps } = props;
  const handleValueChange = useCallbackRef(onValueChange);
  return /* @__PURE__ */ jsx26(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ jsx26(MenuGroup, { ...groupProps, ref: forwardedRef }) });
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "MenuRadioItem";
var MenuRadioItem = React44.forwardRef((props, forwardedRef) => {
  const { value, ...radioItemProps } = props;
  const context = useRadioGroupContext(RADIO_ITEM_NAME, props.__scopeMenu);
  const checked = value === context.value;
  return /* @__PURE__ */ jsx26(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsx26(MenuItem, {
    role: "menuitemradio",
    "aria-checked": checked,
    ...radioItemProps,
    ref: forwardedRef,
    "data-state": getCheckedState(checked),
    onSelect: composeEventHandlers(radioItemProps.onSelect, () => context.onValueChange?.(value), { checkForDefaultPrevented: false })
  }) });
});
MenuRadioItem.displayName = RADIO_ITEM_NAME;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, { checked: false });
var MenuItemIndicator = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
  const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
  return /* @__PURE__ */ jsx26(Presence, {
    present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
    children: /* @__PURE__ */ jsx26(Primitive.span, {
      ...itemIndicatorProps,
      ref: forwardedRef,
      "data-state": getCheckedState(indicatorContext.checked)
    })
  });
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME = "MenuSeparator";
var MenuSeparator = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, ...separatorProps } = props;
  return /* @__PURE__ */ jsx26(Primitive.div, {
    role: "separator",
    "aria-orientation": "horizontal",
    ...separatorProps,
    ref: forwardedRef
  });
});
MenuSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME2 = "MenuArrow";
var MenuArrow = React44.forwardRef((props, forwardedRef) => {
  const { __scopeMenu, ...arrowProps } = props;
  const popperScope = usePopperScope(__scopeMenu);
  return /* @__PURE__ */ jsx26(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
});
MenuArrow.displayName = ARROW_NAME2;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props) => {
  const { __scopeMenu, children, open = false, onOpenChange } = props;
  const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
  const popperScope = usePopperScope(__scopeMenu);
  const [trigger, setTrigger] = React44.useState(null);
  const [content, setContent] = React44.useState(null);
  const handleOpenChange = useCallbackRef(onOpenChange);
  React44.useEffect(() => {
    if (parentMenuContext.open === false)
      handleOpenChange(false);
    return () => handleOpenChange(false);
  }, [parentMenuContext.open, handleOpenChange]);
  return /* @__PURE__ */ jsx26(Root24, { ...popperScope, children: /* @__PURE__ */ jsx26(MenuProvider, {
    scope: __scopeMenu,
    open,
    onOpenChange: handleOpenChange,
    content,
    onContentChange: setContent,
    children: /* @__PURE__ */ jsx26(MenuSubProvider, {
      scope: __scopeMenu,
      contentId: useId(),
      triggerId: useId(),
      trigger,
      onTriggerChange: setTrigger,
      children
    })
  }) });
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME = "MenuSubTrigger";
var MenuSubTrigger = React44.forwardRef((props, forwardedRef) => {
  const context = useMenuContext(SUB_TRIGGER_NAME, props.__scopeMenu);
  const rootContext = useMenuRootContext(SUB_TRIGGER_NAME, props.__scopeMenu);
  const subContext = useMenuSubContext(SUB_TRIGGER_NAME, props.__scopeMenu);
  const contentContext = useMenuContentContext(SUB_TRIGGER_NAME, props.__scopeMenu);
  const openTimerRef = React44.useRef(null);
  const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
  const scope = { __scopeMenu: props.__scopeMenu };
  const clearOpenTimer = React44.useCallback(() => {
    if (openTimerRef.current)
      window.clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  }, []);
  React44.useEffect(() => clearOpenTimer, [clearOpenTimer]);
  React44.useEffect(() => {
    const pointerGraceTimer = pointerGraceTimerRef.current;
    return () => {
      window.clearTimeout(pointerGraceTimer);
      onPointerGraceIntentChange(null);
    };
  }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
  return /* @__PURE__ */ jsx26(MenuAnchor, { asChild: true, ...scope, children: /* @__PURE__ */ jsx26(MenuItemImpl, {
    id: subContext.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": context.open,
    "aria-controls": subContext.contentId,
    "data-state": getOpenState(context.open),
    ...props,
    ref: composeRefs(forwardedRef, subContext.onTriggerChange),
    onClick: (event) => {
      props.onClick?.(event);
      if (props.disabled || event.defaultPrevented)
        return;
      event.currentTarget.focus();
      if (!context.open)
        context.onOpenChange(true);
    },
    onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
      contentContext.onItemEnter(event);
      if (event.defaultPrevented)
        return;
      if (!props.disabled && !context.open && !openTimerRef.current) {
        contentContext.onPointerGraceIntentChange(null);
        openTimerRef.current = window.setTimeout(() => {
          context.onOpenChange(true);
          clearOpenTimer();
        }, 100);
      }
    })),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
      clearOpenTimer();
      const contentRect = context.content?.getBoundingClientRect();
      if (contentRect) {
        const side = context.content?.dataset.side;
        const rightSide = side === "right";
        const bleed = rightSide ? -5 : 5;
        const contentNearEdge = contentRect[rightSide ? "left" : "right"];
        const contentFarEdge = contentRect[rightSide ? "right" : "left"];
        contentContext.onPointerGraceIntentChange({
          area: [
            { x: event.clientX + bleed, y: event.clientY },
            { x: contentNearEdge, y: contentRect.top },
            { x: contentFarEdge, y: contentRect.top },
            { x: contentFarEdge, y: contentRect.bottom },
            { x: contentNearEdge, y: contentRect.bottom }
          ],
          side
        });
        window.clearTimeout(pointerGraceTimerRef.current);
        pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
      } else {
        contentContext.onTriggerLeave(event);
        if (event.defaultPrevented)
          return;
        contentContext.onPointerGraceIntentChange(null);
      }
    })),
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      const isTypingAhead = contentContext.searchRef.current !== "";
      if (props.disabled || isTypingAhead && event.key === " ")
        return;
      if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
        context.onOpenChange(true);
        context.content?.focus();
        event.preventDefault();
      }
    })
  }) });
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "MenuSubContent";
var MenuSubContent = React44.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext2(CONTENT_NAME6, props.__scopeMenu);
  const { forceMount = portalContext.forceMount, ...subContentProps } = props;
  const context = useMenuContext(CONTENT_NAME6, props.__scopeMenu);
  const rootContext = useMenuRootContext(CONTENT_NAME6, props.__scopeMenu);
  const subContext = useMenuSubContext(SUB_CONTENT_NAME, props.__scopeMenu);
  const ref = React44.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  return /* @__PURE__ */ jsx26(Collection3.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsx26(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx26(Collection3.Slot, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsx26(MenuContentImpl, {
    id: subContext.contentId,
    "aria-labelledby": subContext.triggerId,
    ...subContentProps,
    ref: composedRefs,
    align: "start",
    side: rootContext.dir === "rtl" ? "left" : "right",
    disableOutsidePointerEvents: false,
    disableOutsideScroll: false,
    trapFocus: false,
    onOpenAutoFocus: (event) => {
      if (rootContext.isUsingKeyboardRef.current)
        ref.current?.focus();
      event.preventDefault();
    },
    onCloseAutoFocus: (event) => event.preventDefault(),
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
      if (event.target !== subContext.trigger)
        context.onOpenChange(false);
    }),
    onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
      rootContext.onClose();
      event.preventDefault();
    }),
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      const isKeyDownInside = event.currentTarget.contains(event.target);
      const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
      if (isKeyDownInside && isCloseKey) {
        context.onOpenChange(false);
        subContext.trigger?.focus();
        event.preventDefault();
      }
    })
  }) }) }) });
});
MenuSubContent.displayName = SUB_CONTENT_NAME;
function getOpenState(open) {
  return open ? "open" : "closed";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst3(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray2(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray2(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : undefined;
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1;i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(event, area) {
  if (!area)
    return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : undefined;
}
var Root32 = Menu;
var Anchor2 = MenuAnchor;
var Portal3 = MenuPortal;
var Content23 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item22 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow22 = MenuArrow;
var Sub = MenuSub;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;

// ../../node_modules/.bun/@radix-ui+react-context-menu@2.2.16+1356086b9384fa43/node_modules/@radix-ui/react-context-menu/dist/index.mjs
import { Fragment as Fragment8, jsx as jsx27, jsxs as jsxs3 } from "react/jsx-runtime";
"use client";
var CONTEXT_MENU_NAME = "ContextMenu";
var [createContextMenuContext, createContextMenuScope] = createContextScope(CONTEXT_MENU_NAME, [
  createMenuScope
]);
var useMenuScope = createMenuScope();
var [ContextMenuProvider, useContextMenuContext] = createContextMenuContext(CONTEXT_MENU_NAME);
var ContextMenu = (props) => {
  const { __scopeContextMenu, children, onOpenChange, dir, modal = true } = props;
  const [open, setOpen] = React45.useState(false);
  const menuScope = useMenuScope(__scopeContextMenu);
  const handleOpenChangeProp = useCallbackRef(onOpenChange);
  const handleOpenChange = React45.useCallback((open2) => {
    setOpen(open2);
    handleOpenChangeProp(open2);
  }, [handleOpenChangeProp]);
  return /* @__PURE__ */ jsx27(ContextMenuProvider, {
    scope: __scopeContextMenu,
    open,
    onOpenChange: handleOpenChange,
    modal,
    children: /* @__PURE__ */ jsx27(Root32, {
      ...menuScope,
      dir,
      open,
      onOpenChange: handleOpenChange,
      modal,
      children
    })
  });
};
ContextMenu.displayName = CONTEXT_MENU_NAME;
var TRIGGER_NAME5 = "ContextMenuTrigger";
var ContextMenuTrigger = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, disabled = false, ...triggerProps } = props;
  const context = useContextMenuContext(TRIGGER_NAME5, __scopeContextMenu);
  const menuScope = useMenuScope(__scopeContextMenu);
  const pointRef = React45.useRef({ x: 0, y: 0 });
  const virtualRef = React45.useRef({
    getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...pointRef.current })
  });
  const longPressTimerRef = React45.useRef(0);
  const clearLongPress = React45.useCallback(() => window.clearTimeout(longPressTimerRef.current), []);
  const handleOpen = (event) => {
    pointRef.current = { x: event.clientX, y: event.clientY };
    context.onOpenChange(true);
  };
  React45.useEffect(() => clearLongPress, [clearLongPress]);
  React45.useEffect(() => void (disabled && clearLongPress()), [disabled, clearLongPress]);
  return /* @__PURE__ */ jsxs3(Fragment8, { children: [
    /* @__PURE__ */ jsx27(Anchor2, { ...menuScope, virtualRef }),
    /* @__PURE__ */ jsx27(Primitive.span, {
      "data-state": context.open ? "open" : "closed",
      "data-disabled": disabled ? "" : undefined,
      ...triggerProps,
      ref: forwardedRef,
      style: { WebkitTouchCallout: "none", ...props.style },
      onContextMenu: disabled ? props.onContextMenu : composeEventHandlers(props.onContextMenu, (event) => {
        clearLongPress();
        handleOpen(event);
        event.preventDefault();
      }),
      onPointerDown: disabled ? props.onPointerDown : composeEventHandlers(props.onPointerDown, whenTouchOrPen((event) => {
        clearLongPress();
        longPressTimerRef.current = window.setTimeout(() => handleOpen(event), 700);
      })),
      onPointerMove: disabled ? props.onPointerMove : composeEventHandlers(props.onPointerMove, whenTouchOrPen(clearLongPress)),
      onPointerCancel: disabled ? props.onPointerCancel : composeEventHandlers(props.onPointerCancel, whenTouchOrPen(clearLongPress)),
      onPointerUp: disabled ? props.onPointerUp : composeEventHandlers(props.onPointerUp, whenTouchOrPen(clearLongPress))
    })
  ] });
});
ContextMenuTrigger.displayName = TRIGGER_NAME5;
var PORTAL_NAME5 = "ContextMenuPortal";
var ContextMenuPortal = (props) => {
  const { __scopeContextMenu, ...portalProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Portal3, { ...menuScope, ...portalProps });
};
ContextMenuPortal.displayName = PORTAL_NAME5;
var CONTENT_NAME7 = "ContextMenuContent";
var ContextMenuContent = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...contentProps } = props;
  const context = useContextMenuContext(CONTENT_NAME7, __scopeContextMenu);
  const menuScope = useMenuScope(__scopeContextMenu);
  const hasInteractedOutsideRef = React45.useRef(false);
  return /* @__PURE__ */ jsx27(Content23, {
    ...menuScope,
    ...contentProps,
    ref: forwardedRef,
    side: "right",
    sideOffset: 2,
    align: "start",
    onCloseAutoFocus: (event) => {
      props.onCloseAutoFocus?.(event);
      if (!event.defaultPrevented && hasInteractedOutsideRef.current) {
        event.preventDefault();
      }
      hasInteractedOutsideRef.current = false;
    },
    onInteractOutside: (event) => {
      props.onInteractOutside?.(event);
      if (!event.defaultPrevented && !context.modal)
        hasInteractedOutsideRef.current = true;
    },
    style: {
      ...props.style,
      ...{
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
ContextMenuContent.displayName = CONTENT_NAME7;
var GROUP_NAME3 = "ContextMenuGroup";
var ContextMenuGroup = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...groupProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
});
ContextMenuGroup.displayName = GROUP_NAME3;
var LABEL_NAME2 = "ContextMenuLabel";
var ContextMenuLabel = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...labelProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
});
ContextMenuLabel.displayName = LABEL_NAME2;
var ITEM_NAME4 = "ContextMenuItem";
var ContextMenuItem = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...itemProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Item22, { ...menuScope, ...itemProps, ref: forwardedRef });
});
ContextMenuItem.displayName = ITEM_NAME4;
var CHECKBOX_ITEM_NAME2 = "ContextMenuCheckboxItem";
var ContextMenuCheckboxItem = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...checkboxItemProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
});
ContextMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME2;
var RADIO_GROUP_NAME2 = "ContextMenuRadioGroup";
var ContextMenuRadioGroup = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...radioGroupProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
});
ContextMenuRadioGroup.displayName = RADIO_GROUP_NAME2;
var RADIO_ITEM_NAME2 = "ContextMenuRadioItem";
var ContextMenuRadioItem = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...radioItemProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
});
ContextMenuRadioItem.displayName = RADIO_ITEM_NAME2;
var INDICATOR_NAME = "ContextMenuItemIndicator";
var ContextMenuItemIndicator = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
});
ContextMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME2 = "ContextMenuSeparator";
var ContextMenuSeparator = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...separatorProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
});
ContextMenuSeparator.displayName = SEPARATOR_NAME2;
var ARROW_NAME3 = "ContextMenuArrow";
var ContextMenuArrow = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...arrowProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(Arrow22, { ...menuScope, ...arrowProps, ref: forwardedRef });
});
ContextMenuArrow.displayName = ARROW_NAME3;
var SUB_NAME2 = "ContextMenuSub";
var ContextMenuSub = (props) => {
  const { __scopeContextMenu, children, onOpenChange, open: openProp, defaultOpen } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SUB_NAME2
  });
  return /* @__PURE__ */ jsx27(Sub, { ...menuScope, open, onOpenChange: setOpen, children });
};
ContextMenuSub.displayName = SUB_NAME2;
var SUB_TRIGGER_NAME2 = "ContextMenuSubTrigger";
var ContextMenuSubTrigger = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...triggerItemProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(SubTrigger, { ...menuScope, ...triggerItemProps, ref: forwardedRef });
});
ContextMenuSubTrigger.displayName = SUB_TRIGGER_NAME2;
var SUB_CONTENT_NAME2 = "ContextMenuSubContent";
var ContextMenuSubContent = React45.forwardRef((props, forwardedRef) => {
  const { __scopeContextMenu, ...subContentProps } = props;
  const menuScope = useMenuScope(__scopeContextMenu);
  return /* @__PURE__ */ jsx27(SubContent, {
    ...menuScope,
    ...subContentProps,
    ref: forwardedRef,
    style: {
      ...props.style,
      ...{
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
ContextMenuSubContent.displayName = SUB_CONTENT_NAME2;
function whenTouchOrPen(handler) {
  return (event) => event.pointerType !== "mouse" ? handler(event) : undefined;
}
var Root25 = ContextMenu;
var Trigger5 = ContextMenuTrigger;
var Portal23 = ContextMenuPortal;
var Content24 = ContextMenuContent;
var Group2 = ContextMenuGroup;
var Label2 = ContextMenuLabel;
var Item23 = ContextMenuItem;
var CheckboxItem2 = ContextMenuCheckboxItem;
var RadioGroup2 = ContextMenuRadioGroup;
var RadioItem2 = ContextMenuRadioItem;
var ItemIndicator2 = ContextMenuItemIndicator;
var Separator2 = ContextMenuSeparator;
var Arrow23 = ContextMenuArrow;
var Sub2 = ContextMenuSub;
var SubTrigger2 = ContextMenuSubTrigger;
var SubContent2 = ContextMenuSubContent;

// ../../node_modules/.bun/@radix-ui+react-dropdown-menu@2.1.16+1356086b9384fa43/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var exports_dist12 = {};
__export(exports_dist12, {
  createDropdownMenuScope: () => createDropdownMenuScope,
  Trigger: () => Trigger6,
  SubTrigger: () => SubTrigger22,
  SubContent: () => SubContent22,
  Sub: () => Sub22,
  Separator: () => Separator22,
  Root: () => Root26,
  RadioItem: () => RadioItem22,
  RadioGroup: () => RadioGroup22,
  Portal: () => Portal24,
  Label: () => Label22,
  ItemIndicator: () => ItemIndicator22,
  Item: () => Item24,
  Group: () => Group22,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuItemIndicator: () => DropdownMenuItemIndicator,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuArrow: () => DropdownMenuArrow,
  DropdownMenu: () => DropdownMenu,
  Content: () => Content25,
  CheckboxItem: () => CheckboxItem22,
  Arrow: () => Arrow24
});
import * as React46 from "react";
import { jsx as jsx28 } from "react/jsx-runtime";
"use client";
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope2 = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu = (props) => {
  const {
    __scopeDropdownMenu,
    children,
    dir,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  const triggerRef = React46.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DROPDOWN_MENU_NAME
  });
  return /* @__PURE__ */ jsx28(DropdownMenuProvider, {
    scope: __scopeDropdownMenu,
    triggerId: useId(),
    triggerRef,
    contentId: useId(),
    open,
    onOpenChange: setOpen,
    onOpenToggle: React46.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
    modal,
    children: /* @__PURE__ */ jsx28(Root32, { ...menuScope, open, onOpenChange: setOpen, dir, modal, children })
  });
};
DropdownMenu.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME6 = "DropdownMenuTrigger";
var DropdownMenuTrigger = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
  const context = useDropdownMenuContext(TRIGGER_NAME6, __scopeDropdownMenu);
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ jsx28(Primitive.button, {
    type: "button",
    id: context.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": context.open,
    "aria-controls": context.open ? context.contentId : undefined,
    "data-state": context.open ? "open" : "closed",
    "data-disabled": disabled ? "" : undefined,
    disabled,
    ...triggerProps,
    ref: composeRefs(forwardedRef, context.triggerRef),
    onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
      if (!disabled && event.button === 0 && event.ctrlKey === false) {
        context.onOpenToggle();
        if (!context.open)
          event.preventDefault();
      }
    }),
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      if (disabled)
        return;
      if (["Enter", " "].includes(event.key))
        context.onOpenToggle();
      if (event.key === "ArrowDown")
        context.onOpenChange(true);
      if (["Enter", " ", "ArrowDown"].includes(event.key))
        event.preventDefault();
    })
  }) });
});
DropdownMenuTrigger.displayName = TRIGGER_NAME6;
var PORTAL_NAME6 = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
  const { __scopeDropdownMenu, ...portalProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Portal3, { ...menuScope, ...portalProps });
};
DropdownMenuPortal.displayName = PORTAL_NAME6;
var CONTENT_NAME8 = "DropdownMenuContent";
var DropdownMenuContent = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...contentProps } = props;
  const context = useDropdownMenuContext(CONTENT_NAME8, __scopeDropdownMenu);
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  const hasInteractedOutsideRef = React46.useRef(false);
  return /* @__PURE__ */ jsx28(Content23, {
    id: context.contentId,
    "aria-labelledby": context.triggerId,
    ...menuScope,
    ...contentProps,
    ref: forwardedRef,
    onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
      if (!hasInteractedOutsideRef.current)
        context.triggerRef.current?.focus();
      hasInteractedOutsideRef.current = false;
      event.preventDefault();
    }),
    onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
      const originalEvent = event.detail.originalEvent;
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
      if (!context.modal || isRightClick)
        hasInteractedOutsideRef.current = true;
    }),
    style: {
      ...props.style,
      ...{
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
DropdownMenuContent.displayName = CONTENT_NAME8;
var GROUP_NAME4 = "DropdownMenuGroup";
var DropdownMenuGroup = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...groupProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
});
DropdownMenuGroup.displayName = GROUP_NAME4;
var LABEL_NAME3 = "DropdownMenuLabel";
var DropdownMenuLabel = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...labelProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
});
DropdownMenuLabel.displayName = LABEL_NAME3;
var ITEM_NAME5 = "DropdownMenuItem";
var DropdownMenuItem = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Item22, { ...menuScope, ...itemProps, ref: forwardedRef });
});
DropdownMenuItem.displayName = ITEM_NAME5;
var CHECKBOX_ITEM_NAME3 = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...checkboxItemProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
});
DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME3;
var RADIO_GROUP_NAME3 = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioGroupProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME3;
var RADIO_ITEM_NAME3 = "DropdownMenuRadioItem";
var DropdownMenuRadioItem = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioItemProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
});
DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME3;
var INDICATOR_NAME2 = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME2;
var SEPARATOR_NAME3 = "DropdownMenuSeparator";
var DropdownMenuSeparator = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...separatorProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
});
DropdownMenuSeparator.displayName = SEPARATOR_NAME3;
var ARROW_NAME4 = "DropdownMenuArrow";
var DropdownMenuArrow = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...arrowProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(Arrow22, { ...menuScope, ...arrowProps, ref: forwardedRef });
});
DropdownMenuArrow.displayName = ARROW_NAME4;
var DropdownMenuSub = (props) => {
  const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ jsx28(Sub, { ...menuScope, open, onOpenChange: setOpen, children });
};
var SUB_TRIGGER_NAME3 = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subTriggerProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(SubTrigger, { ...menuScope, ...subTriggerProps, ref: forwardedRef });
});
DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME3;
var SUB_CONTENT_NAME3 = "DropdownMenuSubContent";
var DropdownMenuSubContent = React46.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subContentProps } = props;
  const menuScope = useMenuScope2(__scopeDropdownMenu);
  return /* @__PURE__ */ jsx28(SubContent, {
    ...menuScope,
    ...subContentProps,
    ref: forwardedRef,
    style: {
      ...props.style,
      ...{
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
DropdownMenuSubContent.displayName = SUB_CONTENT_NAME3;
var Root26 = DropdownMenu;
var Trigger6 = DropdownMenuTrigger;
var Portal24 = DropdownMenuPortal;
var Content25 = DropdownMenuContent;
var Group22 = DropdownMenuGroup;
var Label22 = DropdownMenuLabel;
var Item24 = DropdownMenuItem;
var CheckboxItem22 = DropdownMenuCheckboxItem;
var RadioGroup22 = DropdownMenuRadioGroup;
var RadioItem22 = DropdownMenuRadioItem;
var ItemIndicator22 = DropdownMenuItemIndicator;
var Separator22 = DropdownMenuSeparator;
var Arrow24 = DropdownMenuArrow;
var Sub22 = DropdownMenuSub;
var SubTrigger22 = DropdownMenuSubTrigger;
var SubContent22 = DropdownMenuSubContent;

// ../../node_modules/.bun/@radix-ui+react-label@2.1.7+1356086b9384fa43/node_modules/@radix-ui/react-label/dist/index.mjs
var exports_dist13 = {};
__export(exports_dist13, {
  Root: () => Root8,
  Label: () => Label3
});
import * as React47 from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
"use client";
var NAME3 = "Label";
var Label3 = React47.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsx29(Primitive.label, {
    ...props,
    ref: forwardedRef,
    onMouseDown: (event) => {
      const target = event.target;
      if (target.closest("button, input, select, textarea"))
        return;
      props.onMouseDown?.(event);
      if (!event.defaultPrevented && event.detail > 1)
        event.preventDefault();
    }
  });
});
Label3.displayName = NAME3;
var Root8 = Label3;

// ../../node_modules/.bun/@radix-ui+react-hover-card@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-hover-card/dist/index.mjs
var exports_dist14 = {};
__export(exports_dist14, {
  createHoverCardScope: () => createHoverCardScope,
  Trigger: () => Trigger7,
  Root: () => Root27,
  Portal: () => Portal4,
  HoverCardTrigger: () => HoverCardTrigger,
  HoverCardPortal: () => HoverCardPortal,
  HoverCardContent: () => HoverCardContent,
  HoverCardArrow: () => HoverCardArrow,
  HoverCard: () => HoverCard,
  Content: () => Content26,
  Arrow: () => Arrow25
});
import * as React48 from "react";
import { jsx as jsx30 } from "react/jsx-runtime";
"use client";
var originalBodyUserSelect;
var HOVERCARD_NAME = "HoverCard";
var [createHoverCardContext, createHoverCardScope] = createContextScope(HOVERCARD_NAME, [
  createPopperScope
]);
var usePopperScope2 = createPopperScope();
var [HoverCardProvider, useHoverCardContext] = createHoverCardContext(HOVERCARD_NAME);
var HoverCard = (props) => {
  const {
    __scopeHoverCard,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    openDelay = 700,
    closeDelay = 300
  } = props;
  const popperScope = usePopperScope2(__scopeHoverCard);
  const openTimerRef = React48.useRef(0);
  const closeTimerRef = React48.useRef(0);
  const hasSelectionRef = React48.useRef(false);
  const isPointerDownOnContentRef = React48.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: HOVERCARD_NAME
  });
  const handleOpen = React48.useCallback(() => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [openDelay, setOpen]);
  const handleClose = React48.useCallback(() => {
    clearTimeout(openTimerRef.current);
    if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) {
      closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
    }
  }, [closeDelay, setOpen]);
  const handleDismiss = React48.useCallback(() => setOpen(false), [setOpen]);
  React48.useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx30(HoverCardProvider, {
    scope: __scopeHoverCard,
    open,
    onOpenChange: setOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onDismiss: handleDismiss,
    hasSelectionRef,
    isPointerDownOnContentRef,
    children: /* @__PURE__ */ jsx30(Root24, { ...popperScope, children })
  });
};
HoverCard.displayName = HOVERCARD_NAME;
var TRIGGER_NAME7 = "HoverCardTrigger";
var HoverCardTrigger = React48.forwardRef((props, forwardedRef) => {
  const { __scopeHoverCard, ...triggerProps } = props;
  const context = useHoverCardContext(TRIGGER_NAME7, __scopeHoverCard);
  const popperScope = usePopperScope2(__scopeHoverCard);
  return /* @__PURE__ */ jsx30(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx30(Primitive.a, {
    "data-state": context.open ? "open" : "closed",
    ...triggerProps,
    ref: forwardedRef,
    onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
    onFocus: composeEventHandlers(props.onFocus, context.onOpen),
    onBlur: composeEventHandlers(props.onBlur, context.onClose),
    onTouchStart: composeEventHandlers(props.onTouchStart, (event) => event.preventDefault())
  }) });
});
HoverCardTrigger.displayName = TRIGGER_NAME7;
var PORTAL_NAME7 = "HoverCardPortal";
var [PortalProvider3, usePortalContext3] = createHoverCardContext(PORTAL_NAME7, {
  forceMount: undefined
});
var HoverCardPortal = (props) => {
  const { __scopeHoverCard, forceMount, children, container } = props;
  const context = useHoverCardContext(PORTAL_NAME7, __scopeHoverCard);
  return /* @__PURE__ */ jsx30(PortalProvider3, { scope: __scopeHoverCard, forceMount, children: /* @__PURE__ */ jsx30(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx30(Portal, { asChild: true, container, children }) }) });
};
HoverCardPortal.displayName = PORTAL_NAME7;
var CONTENT_NAME9 = "HoverCardContent";
var HoverCardContent = React48.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext3(CONTENT_NAME9, props.__scopeHoverCard);
  const { forceMount = portalContext.forceMount, ...contentProps } = props;
  const context = useHoverCardContext(CONTENT_NAME9, props.__scopeHoverCard);
  return /* @__PURE__ */ jsx30(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx30(HoverCardContentImpl, {
    "data-state": context.open ? "open" : "closed",
    ...contentProps,
    onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
    ref: forwardedRef
  }) });
});
HoverCardContent.displayName = CONTENT_NAME9;
var HoverCardContentImpl = React48.forwardRef((props, forwardedRef) => {
  const {
    __scopeHoverCard,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    ...contentProps
  } = props;
  const context = useHoverCardContext(CONTENT_NAME9, __scopeHoverCard);
  const popperScope = usePopperScope2(__scopeHoverCard);
  const ref = React48.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [containSelection, setContainSelection] = React48.useState(false);
  React48.useEffect(() => {
    if (containSelection) {
      const body = document.body;
      originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
      body.style.userSelect = "none";
      body.style.webkitUserSelect = "none";
      return () => {
        body.style.userSelect = originalBodyUserSelect;
        body.style.webkitUserSelect = originalBodyUserSelect;
      };
    }
  }, [containSelection]);
  React48.useEffect(() => {
    if (ref.current) {
      const handlePointerUp = () => {
        setContainSelection(false);
        context.isPointerDownOnContentRef.current = false;
        setTimeout(() => {
          const hasSelection = document.getSelection()?.toString() !== "";
          if (hasSelection)
            context.hasSelectionRef.current = true;
        });
      };
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        context.hasSelectionRef.current = false;
        context.isPointerDownOnContentRef.current = false;
      };
    }
  }, [context.isPointerDownOnContentRef, context.hasSelectionRef]);
  React48.useEffect(() => {
    if (ref.current) {
      const tabbables = getTabbableNodes(ref.current);
      tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
    }
  });
  return /* @__PURE__ */ jsx30(DismissableLayer, {
    asChild: true,
    disableOutsidePointerEvents: false,
    onInteractOutside,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside: composeEventHandlers(onFocusOutside, (event) => {
      event.preventDefault();
    }),
    onDismiss: context.onDismiss,
    children: /* @__PURE__ */ jsx30(Content5, {
      ...popperScope,
      ...contentProps,
      onPointerDown: composeEventHandlers(contentProps.onPointerDown, (event) => {
        if (event.currentTarget.contains(event.target)) {
          setContainSelection(true);
        }
        context.hasSelectionRef.current = false;
        context.isPointerDownOnContentRef.current = true;
      }),
      ref: composedRefs,
      style: {
        ...contentProps.style,
        userSelect: containSelection ? "text" : undefined,
        WebkitUserSelect: containSelection ? "text" : undefined,
        ...{
          "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
          "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
          "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    })
  });
});
var ARROW_NAME5 = "HoverCardArrow";
var HoverCardArrow = React48.forwardRef((props, forwardedRef) => {
  const { __scopeHoverCard, ...arrowProps } = props;
  const popperScope = usePopperScope2(__scopeHoverCard);
  return /* @__PURE__ */ jsx30(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
});
HoverCardArrow.displayName = ARROW_NAME5;
function excludeTouch(eventHandler) {
  return (event) => event.pointerType === "touch" ? undefined : eventHandler();
}
function getTabbableNodes(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
var Root27 = HoverCard;
var Trigger7 = HoverCardTrigger;
var Portal4 = HoverCardPortal;
var Content26 = HoverCardContent;
var Arrow25 = HoverCardArrow;

// ../../node_modules/.bun/@radix-ui+react-menubar@1.1.16+1356086b9384fa43/node_modules/@radix-ui/react-menubar/dist/index.mjs
var exports_dist15 = {};
__export(exports_dist15, {
  createMenubarScope: () => createMenubarScope,
  Trigger: () => Trigger8,
  SubTrigger: () => SubTrigger23,
  SubContent: () => SubContent23,
  Sub: () => Sub23,
  Separator: () => Separator23,
  Root: () => Root33,
  RadioItem: () => RadioItem23,
  RadioGroup: () => RadioGroup23,
  Portal: () => Portal25,
  MenubarTrigger: () => MenubarTrigger,
  MenubarSubTrigger: () => MenubarSubTrigger,
  MenubarSubContent: () => MenubarSubContent,
  MenubarSub: () => MenubarSub,
  MenubarSeparator: () => MenubarSeparator,
  MenubarRadioItem: () => MenubarRadioItem,
  MenubarRadioGroup: () => MenubarRadioGroup,
  MenubarPortal: () => MenubarPortal,
  MenubarMenu: () => MenubarMenu,
  MenubarLabel: () => MenubarLabel,
  MenubarItemIndicator: () => MenubarItemIndicator,
  MenubarItem: () => MenubarItem,
  MenubarGroup: () => MenubarGroup,
  MenubarContent: () => MenubarContent,
  MenubarCheckboxItem: () => MenubarCheckboxItem,
  MenubarArrow: () => MenubarArrow,
  Menubar: () => Menubar,
  Menu: () => Menu2,
  Label: () => Label23,
  ItemIndicator: () => ItemIndicator23,
  Item: () => Item3,
  Group: () => Group23,
  Content: () => Content27,
  CheckboxItem: () => CheckboxItem23,
  Arrow: () => Arrow26
});
import * as React49 from "react";
import { jsx as jsx31 } from "react/jsx-runtime";
"use client";
var MENUBAR_NAME = "Menubar";
var [Collection4, useCollection4, createCollectionScope4] = createCollection(MENUBAR_NAME);
var [createMenubarContext, createMenubarScope] = createContextScope(MENUBAR_NAME, [
  createCollectionScope4,
  createRovingFocusGroupScope
]);
var useMenuScope3 = createMenuScope();
var useRovingFocusGroupScope2 = createRovingFocusGroupScope();
var [MenubarContextProvider, useMenubarContext] = createMenubarContext(MENUBAR_NAME);
var Menubar = React49.forwardRef((props, forwardedRef) => {
  const {
    __scopeMenubar,
    value: valueProp,
    onValueChange,
    defaultValue,
    loop = true,
    dir,
    ...menubarProps
  } = props;
  const direction = useDirection(dir);
  const rovingFocusGroupScope = useRovingFocusGroupScope2(__scopeMenubar);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
    defaultProp: defaultValue ?? "",
    caller: MENUBAR_NAME
  });
  const [currentTabStopId, setCurrentTabStopId] = React49.useState(null);
  return /* @__PURE__ */ jsx31(MenubarContextProvider, {
    scope: __scopeMenubar,
    value,
    onMenuOpen: React49.useCallback((value2) => {
      setValue(value2);
      setCurrentTabStopId(value2);
    }, [setValue]),
    onMenuClose: React49.useCallback(() => setValue(""), [setValue]),
    onMenuToggle: React49.useCallback((value2) => {
      setValue((prevValue) => prevValue ? "" : value2);
      setCurrentTabStopId(value2);
    }, [setValue]),
    dir: direction,
    loop,
    children: /* @__PURE__ */ jsx31(Collection4.Provider, { scope: __scopeMenubar, children: /* @__PURE__ */ jsx31(Collection4.Slot, { scope: __scopeMenubar, children: /* @__PURE__ */ jsx31(Root7, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation: "horizontal",
      loop,
      dir: direction,
      currentTabStopId,
      onCurrentTabStopIdChange: setCurrentTabStopId,
      children: /* @__PURE__ */ jsx31(Primitive.div, { role: "menubar", ...menubarProps, ref: forwardedRef })
    }) }) })
  });
});
Menubar.displayName = MENUBAR_NAME;
var MENU_NAME2 = "MenubarMenu";
var [MenubarMenuProvider, useMenubarMenuContext] = createMenubarContext(MENU_NAME2);
var MenubarMenu = (props) => {
  const { __scopeMenubar, value: valueProp, ...menuProps } = props;
  const autoValue = useId();
  const value = valueProp || autoValue || "LEGACY_REACT_AUTO_VALUE";
  const context = useMenubarContext(MENU_NAME2, __scopeMenubar);
  const menuScope = useMenuScope3(__scopeMenubar);
  const triggerRef = React49.useRef(null);
  const wasKeyboardTriggerOpenRef = React49.useRef(false);
  const open = context.value === value;
  React49.useEffect(() => {
    if (!open)
      wasKeyboardTriggerOpenRef.current = false;
  }, [open]);
  return /* @__PURE__ */ jsx31(MenubarMenuProvider, {
    scope: __scopeMenubar,
    value,
    triggerId: useId(),
    triggerRef,
    contentId: useId(),
    wasKeyboardTriggerOpenRef,
    children: /* @__PURE__ */ jsx31(Root32, {
      ...menuScope,
      open,
      onOpenChange: (open2) => {
        if (!open2)
          context.onMenuClose();
      },
      modal: false,
      dir: context.dir,
      ...menuProps
    })
  });
};
MenubarMenu.displayName = MENU_NAME2;
var TRIGGER_NAME8 = "MenubarTrigger";
var MenubarTrigger = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, disabled = false, ...triggerProps } = props;
  const rovingFocusGroupScope = useRovingFocusGroupScope2(__scopeMenubar);
  const menuScope = useMenuScope3(__scopeMenubar);
  const context = useMenubarContext(TRIGGER_NAME8, __scopeMenubar);
  const menuContext = useMenubarMenuContext(TRIGGER_NAME8, __scopeMenubar);
  const ref = React49.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref, menuContext.triggerRef);
  const [isFocused, setIsFocused] = React49.useState(false);
  const open = context.value === menuContext.value;
  return /* @__PURE__ */ jsx31(Collection4.ItemSlot, { scope: __scopeMenubar, value: menuContext.value, disabled, children: /* @__PURE__ */ jsx31(Item2, {
    asChild: true,
    ...rovingFocusGroupScope,
    focusable: !disabled,
    tabStopId: menuContext.value,
    children: /* @__PURE__ */ jsx31(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ jsx31(Primitive.button, {
      type: "button",
      role: "menuitem",
      id: menuContext.triggerId,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": open ? menuContext.contentId : undefined,
      "data-highlighted": isFocused ? "" : undefined,
      "data-state": open ? "open" : "closed",
      "data-disabled": disabled ? "" : undefined,
      disabled,
      ...triggerProps,
      ref: composedRefs,
      onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
        if (!disabled && event.button === 0 && event.ctrlKey === false) {
          context.onMenuOpen(menuContext.value);
          if (!open)
            event.preventDefault();
        }
      }),
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => {
        const menubarOpen = Boolean(context.value);
        if (menubarOpen && !open) {
          context.onMenuOpen(menuContext.value);
          ref.current?.focus();
        }
      }),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        if (disabled)
          return;
        if (["Enter", " "].includes(event.key))
          context.onMenuToggle(menuContext.value);
        if (event.key === "ArrowDown")
          context.onMenuOpen(menuContext.value);
        if (["Enter", " ", "ArrowDown"].includes(event.key)) {
          menuContext.wasKeyboardTriggerOpenRef.current = true;
          event.preventDefault();
        }
      }),
      onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
      onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
    }) })
  }) });
});
MenubarTrigger.displayName = TRIGGER_NAME8;
var PORTAL_NAME8 = "MenubarPortal";
var MenubarPortal = (props) => {
  const { __scopeMenubar, ...portalProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Portal3, { ...menuScope, ...portalProps });
};
MenubarPortal.displayName = PORTAL_NAME8;
var CONTENT_NAME10 = "MenubarContent";
var MenubarContent = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, align = "start", ...contentProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  const context = useMenubarContext(CONTENT_NAME10, __scopeMenubar);
  const menuContext = useMenubarMenuContext(CONTENT_NAME10, __scopeMenubar);
  const getItems = useCollection4(__scopeMenubar);
  const hasInteractedOutsideRef = React49.useRef(false);
  return /* @__PURE__ */ jsx31(Content23, {
    id: menuContext.contentId,
    "aria-labelledby": menuContext.triggerId,
    "data-radix-menubar-content": "",
    ...menuScope,
    ...contentProps,
    ref: forwardedRef,
    align,
    onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
      const menubarOpen = Boolean(context.value);
      if (!menubarOpen && !hasInteractedOutsideRef.current) {
        menuContext.triggerRef.current?.focus();
      }
      hasInteractedOutsideRef.current = false;
      event.preventDefault();
    }),
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
      const target = event.target;
      const isMenubarTrigger = getItems().some((item) => item.ref.current?.contains(target));
      if (isMenubarTrigger)
        event.preventDefault();
    }),
    onInteractOutside: composeEventHandlers(props.onInteractOutside, () => {
      hasInteractedOutsideRef.current = true;
    }),
    onEntryFocus: (event) => {
      if (!menuContext.wasKeyboardTriggerOpenRef.current)
        event.preventDefault();
    },
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
        const target = event.target;
        const targetIsSubTrigger = target.hasAttribute("data-radix-menubar-subtrigger");
        const isKeyDownInsideSubMenu = target.closest("[data-radix-menubar-content]") !== event.currentTarget;
        const prevMenuKey = context.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
        const isPrevKey = prevMenuKey === event.key;
        const isNextKey = !isPrevKey;
        if (isNextKey && targetIsSubTrigger)
          return;
        if (isKeyDownInsideSubMenu && isPrevKey)
          return;
        const items = getItems().filter((item) => !item.disabled);
        let candidateValues = items.map((item) => item.value);
        if (isPrevKey)
          candidateValues.reverse();
        const currentIndex = candidateValues.indexOf(menuContext.value);
        candidateValues = context.loop ? wrapArray3(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
        const [nextValue] = candidateValues;
        if (nextValue)
          context.onMenuOpen(nextValue);
      }
    }, { checkForDefaultPrevented: false }),
    style: {
      ...props.style,
      ...{
        "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
        "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
        "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
MenubarContent.displayName = CONTENT_NAME10;
var GROUP_NAME5 = "MenubarGroup";
var MenubarGroup = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...groupProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
});
MenubarGroup.displayName = GROUP_NAME5;
var LABEL_NAME4 = "MenubarLabel";
var MenubarLabel = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...labelProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
});
MenubarLabel.displayName = LABEL_NAME4;
var ITEM_NAME6 = "MenubarItem";
var MenubarItem = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...itemProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Item22, { ...menuScope, ...itemProps, ref: forwardedRef });
});
MenubarItem.displayName = ITEM_NAME6;
var CHECKBOX_ITEM_NAME4 = "MenubarCheckboxItem";
var MenubarCheckboxItem = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...checkboxItemProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
});
MenubarCheckboxItem.displayName = CHECKBOX_ITEM_NAME4;
var RADIO_GROUP_NAME4 = "MenubarRadioGroup";
var MenubarRadioGroup = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...radioGroupProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
});
MenubarRadioGroup.displayName = RADIO_GROUP_NAME4;
var RADIO_ITEM_NAME4 = "MenubarRadioItem";
var MenubarRadioItem = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...radioItemProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
});
MenubarRadioItem.displayName = RADIO_ITEM_NAME4;
var INDICATOR_NAME3 = "MenubarItemIndicator";
var MenubarItemIndicator = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
});
MenubarItemIndicator.displayName = INDICATOR_NAME3;
var SEPARATOR_NAME4 = "MenubarSeparator";
var MenubarSeparator = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...separatorProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
});
MenubarSeparator.displayName = SEPARATOR_NAME4;
var ARROW_NAME6 = "MenubarArrow";
var MenubarArrow = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...arrowProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(Arrow22, { ...menuScope, ...arrowProps, ref: forwardedRef });
});
MenubarArrow.displayName = ARROW_NAME6;
var SUB_NAME3 = "MenubarSub";
var MenubarSub = (props) => {
  const { __scopeMenubar, children, open: openProp, onOpenChange, defaultOpen } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SUB_NAME3
  });
  return /* @__PURE__ */ jsx31(Sub, { ...menuScope, open, onOpenChange: setOpen, children });
};
MenubarSub.displayName = SUB_NAME3;
var SUB_TRIGGER_NAME4 = "MenubarSubTrigger";
var MenubarSubTrigger = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...subTriggerProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(SubTrigger, {
    "data-radix-menubar-subtrigger": "",
    ...menuScope,
    ...subTriggerProps,
    ref: forwardedRef
  });
});
MenubarSubTrigger.displayName = SUB_TRIGGER_NAME4;
var SUB_CONTENT_NAME4 = "MenubarSubContent";
var MenubarSubContent = React49.forwardRef((props, forwardedRef) => {
  const { __scopeMenubar, ...subContentProps } = props;
  const menuScope = useMenuScope3(__scopeMenubar);
  return /* @__PURE__ */ jsx31(SubContent, {
    ...menuScope,
    "data-radix-menubar-content": "",
    ...subContentProps,
    ref: forwardedRef,
    style: {
      ...props.style,
      ...{
        "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
        "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
        "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
MenubarSubContent.displayName = SUB_CONTENT_NAME4;
function wrapArray3(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root33 = Menubar;
var Menu2 = MenubarMenu;
var Trigger8 = MenubarTrigger;
var Portal25 = MenubarPortal;
var Content27 = MenubarContent;
var Group23 = MenubarGroup;
var Label23 = MenubarLabel;
var Item3 = MenubarItem;
var CheckboxItem23 = MenubarCheckboxItem;
var RadioGroup23 = MenubarRadioGroup;
var RadioItem23 = MenubarRadioItem;
var ItemIndicator23 = MenubarItemIndicator;
var Separator23 = MenubarSeparator;
var Arrow26 = MenubarArrow;
var Sub23 = MenubarSub;
var SubTrigger23 = MenubarSubTrigger;
var SubContent23 = MenubarSubContent;

// ../../node_modules/.bun/@radix-ui+react-navigation-menu@1.2.14+1356086b9384fa43/node_modules/@radix-ui/react-navigation-menu/dist/index.mjs
var exports_dist16 = {};
__export(exports_dist16, {
  createNavigationMenuScope: () => createNavigationMenuScope,
  Viewport: () => Viewport,
  Trigger: () => Trigger9,
  Sub: () => Sub3,
  Root: () => Root28,
  NavigationMenuViewport: () => NavigationMenuViewport,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NavigationMenuSub: () => NavigationMenuSub,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuIndicator: () => NavigationMenuIndicator,
  NavigationMenuContent: () => NavigationMenuContent,
  NavigationMenu: () => NavigationMenu,
  List: () => List,
  Link: () => Link,
  Item: () => Item4,
  Indicator: () => Indicator,
  Content: () => Content6
});
import * as React50 from "react";
import ReactDOM4 from "react-dom";
import { Fragment as Fragment9, jsx as jsx33, jsxs as jsxs4 } from "react/jsx-runtime";
"use client";
var NAVIGATION_MENU_NAME = "NavigationMenu";
var [Collection5, useCollection5, createCollectionScope5] = createCollection(NAVIGATION_MENU_NAME);
var [FocusGroupCollection, useFocusGroupCollection, createFocusGroupCollectionScope] = createCollection(NAVIGATION_MENU_NAME);
var [createNavigationMenuContext, createNavigationMenuScope] = createContextScope(NAVIGATION_MENU_NAME, [createCollectionScope5, createFocusGroupCollectionScope]);
var [NavigationMenuProviderImpl, useNavigationMenuContext] = createNavigationMenuContext(NAVIGATION_MENU_NAME);
var [ViewportContentProvider, useViewportContentContext] = createNavigationMenuContext(NAVIGATION_MENU_NAME);
var NavigationMenu = React50.forwardRef((props, forwardedRef) => {
  const {
    __scopeNavigationMenu,
    value: valueProp,
    onValueChange,
    defaultValue,
    delayDuration = 200,
    skipDelayDuration = 300,
    orientation = "horizontal",
    dir,
    ...NavigationMenuProps
  } = props;
  const [navigationMenu, setNavigationMenu] = React50.useState(null);
  const composedRef = useComposedRefs(forwardedRef, (node) => setNavigationMenu(node));
  const direction = useDirection(dir);
  const openTimerRef = React50.useRef(0);
  const closeTimerRef = React50.useRef(0);
  const skipDelayTimerRef = React50.useRef(0);
  const [isOpenDelayed, setIsOpenDelayed] = React50.useState(true);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: (value2) => {
      const isOpen = value2 !== "";
      const hasSkipDelayDuration = skipDelayDuration > 0;
      if (isOpen) {
        window.clearTimeout(skipDelayTimerRef.current);
        if (hasSkipDelayDuration)
          setIsOpenDelayed(false);
      } else {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(() => setIsOpenDelayed(true), skipDelayDuration);
      }
      onValueChange?.(value2);
    },
    defaultProp: defaultValue ?? "",
    caller: NAVIGATION_MENU_NAME
  });
  const startCloseTimer = React50.useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setValue(""), 150);
  }, [setValue]);
  const handleOpen = React50.useCallback((itemValue) => {
    window.clearTimeout(closeTimerRef.current);
    setValue(itemValue);
  }, [setValue]);
  const handleDelayedOpen = React50.useCallback((itemValue) => {
    const isOpenItem = value === itemValue;
    if (isOpenItem) {
      window.clearTimeout(closeTimerRef.current);
    } else {
      openTimerRef.current = window.setTimeout(() => {
        window.clearTimeout(closeTimerRef.current);
        setValue(itemValue);
      }, delayDuration);
    }
  }, [value, setValue, delayDuration]);
  React50.useEffect(() => {
    return () => {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(skipDelayTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx33(NavigationMenuProvider, {
    scope: __scopeNavigationMenu,
    isRootMenu: true,
    value,
    dir: direction,
    orientation,
    rootNavigationMenu: navigationMenu,
    onTriggerEnter: (itemValue) => {
      window.clearTimeout(openTimerRef.current);
      if (isOpenDelayed)
        handleDelayedOpen(itemValue);
      else
        handleOpen(itemValue);
    },
    onTriggerLeave: () => {
      window.clearTimeout(openTimerRef.current);
      startCloseTimer();
    },
    onContentEnter: () => window.clearTimeout(closeTimerRef.current),
    onContentLeave: startCloseTimer,
    onItemSelect: (itemValue) => {
      setValue((prevValue) => prevValue === itemValue ? "" : itemValue);
    },
    onItemDismiss: () => setValue(""),
    children: /* @__PURE__ */ jsx33(Primitive.nav, {
      "aria-label": "Main",
      "data-orientation": orientation,
      dir: direction,
      ...NavigationMenuProps,
      ref: composedRef
    })
  });
});
NavigationMenu.displayName = NAVIGATION_MENU_NAME;
var SUB_NAME4 = "NavigationMenuSub";
var NavigationMenuSub = React50.forwardRef((props, forwardedRef) => {
  const {
    __scopeNavigationMenu,
    value: valueProp,
    onValueChange,
    defaultValue,
    orientation = "horizontal",
    ...subProps
  } = props;
  const context = useNavigationMenuContext(SUB_NAME4, __scopeNavigationMenu);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
    defaultProp: defaultValue ?? "",
    caller: SUB_NAME4
  });
  return /* @__PURE__ */ jsx33(NavigationMenuProvider, {
    scope: __scopeNavigationMenu,
    isRootMenu: false,
    value,
    dir: context.dir,
    orientation,
    rootNavigationMenu: context.rootNavigationMenu,
    onTriggerEnter: (itemValue) => setValue(itemValue),
    onItemSelect: (itemValue) => setValue(itemValue),
    onItemDismiss: () => setValue(""),
    children: /* @__PURE__ */ jsx33(Primitive.div, { "data-orientation": orientation, ...subProps, ref: forwardedRef })
  });
});
NavigationMenuSub.displayName = SUB_NAME4;
var NavigationMenuProvider = (props) => {
  const {
    scope,
    isRootMenu,
    rootNavigationMenu,
    dir,
    orientation,
    children,
    value,
    onItemSelect,
    onItemDismiss,
    onTriggerEnter,
    onTriggerLeave,
    onContentEnter,
    onContentLeave
  } = props;
  const [viewport, setViewport] = React50.useState(null);
  const [viewportContent, setViewportContent] = React50.useState(/* @__PURE__ */ new Map);
  const [indicatorTrack, setIndicatorTrack] = React50.useState(null);
  return /* @__PURE__ */ jsx33(NavigationMenuProviderImpl, {
    scope,
    isRootMenu,
    rootNavigationMenu,
    value,
    previousValue: usePrevious(value),
    baseId: useId(),
    dir,
    orientation,
    viewport,
    onViewportChange: setViewport,
    indicatorTrack,
    onIndicatorTrackChange: setIndicatorTrack,
    onTriggerEnter: useCallbackRef(onTriggerEnter),
    onTriggerLeave: useCallbackRef(onTriggerLeave),
    onContentEnter: useCallbackRef(onContentEnter),
    onContentLeave: useCallbackRef(onContentLeave),
    onItemSelect: useCallbackRef(onItemSelect),
    onItemDismiss: useCallbackRef(onItemDismiss),
    onViewportContentChange: React50.useCallback((contentValue, contentData) => {
      setViewportContent((prevContent) => {
        prevContent.set(contentValue, contentData);
        return new Map(prevContent);
      });
    }, []),
    onViewportContentRemove: React50.useCallback((contentValue) => {
      setViewportContent((prevContent) => {
        if (!prevContent.has(contentValue))
          return prevContent;
        prevContent.delete(contentValue);
        return new Map(prevContent);
      });
    }, []),
    children: /* @__PURE__ */ jsx33(Collection5.Provider, { scope, children: /* @__PURE__ */ jsx33(ViewportContentProvider, { scope, items: viewportContent, children }) })
  });
};
var LIST_NAME = "NavigationMenuList";
var NavigationMenuList = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, ...listProps } = props;
  const context = useNavigationMenuContext(LIST_NAME, __scopeNavigationMenu);
  const list = /* @__PURE__ */ jsx33(Primitive.ul, { "data-orientation": context.orientation, ...listProps, ref: forwardedRef });
  return /* @__PURE__ */ jsx33(Primitive.div, { style: { position: "relative" }, ref: context.onIndicatorTrackChange, children: /* @__PURE__ */ jsx33(Collection5.Slot, { scope: __scopeNavigationMenu, children: context.isRootMenu ? /* @__PURE__ */ jsx33(FocusGroup, { asChild: true, children: list }) : list }) });
});
NavigationMenuList.displayName = LIST_NAME;
var ITEM_NAME7 = "NavigationMenuItem";
var [NavigationMenuItemContextProvider, useNavigationMenuItemContext] = createNavigationMenuContext(ITEM_NAME7);
var NavigationMenuItem = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, value: valueProp, ...itemProps } = props;
  const autoValue = useId();
  const value = valueProp || autoValue || "LEGACY_REACT_AUTO_VALUE";
  const contentRef = React50.useRef(null);
  const triggerRef = React50.useRef(null);
  const focusProxyRef = React50.useRef(null);
  const restoreContentTabOrderRef = React50.useRef(() => {});
  const wasEscapeCloseRef = React50.useRef(false);
  const handleContentEntry = React50.useCallback((side = "start") => {
    if (contentRef.current) {
      restoreContentTabOrderRef.current();
      const candidates = getTabbableCandidates2(contentRef.current);
      if (candidates.length)
        focusFirst4(side === "start" ? candidates : candidates.reverse());
    }
  }, []);
  const handleContentExit = React50.useCallback(() => {
    if (contentRef.current) {
      const candidates = getTabbableCandidates2(contentRef.current);
      if (candidates.length)
        restoreContentTabOrderRef.current = removeFromTabOrder(candidates);
    }
  }, []);
  return /* @__PURE__ */ jsx33(NavigationMenuItemContextProvider, {
    scope: __scopeNavigationMenu,
    value,
    triggerRef,
    contentRef,
    focusProxyRef,
    wasEscapeCloseRef,
    onEntryKeyDown: handleContentEntry,
    onFocusProxyEnter: handleContentEntry,
    onRootContentClose: handleContentExit,
    onContentFocusOutside: handleContentExit,
    children: /* @__PURE__ */ jsx33(Primitive.li, { ...itemProps, ref: forwardedRef })
  });
});
NavigationMenuItem.displayName = ITEM_NAME7;
var TRIGGER_NAME9 = "NavigationMenuTrigger";
var NavigationMenuTrigger = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, disabled, ...triggerProps } = props;
  const context = useNavigationMenuContext(TRIGGER_NAME9, props.__scopeNavigationMenu);
  const itemContext = useNavigationMenuItemContext(TRIGGER_NAME9, props.__scopeNavigationMenu);
  const ref = React50.useRef(null);
  const composedRefs = useComposedRefs(ref, itemContext.triggerRef, forwardedRef);
  const triggerId = makeTriggerId(context.baseId, itemContext.value);
  const contentId = makeContentId(context.baseId, itemContext.value);
  const hasPointerMoveOpenedRef = React50.useRef(false);
  const wasClickCloseRef = React50.useRef(false);
  const open = itemContext.value === context.value;
  return /* @__PURE__ */ jsxs4(Fragment9, { children: [
    /* @__PURE__ */ jsx33(Collection5.ItemSlot, { scope: __scopeNavigationMenu, value: itemContext.value, children: /* @__PURE__ */ jsx33(FocusGroupItem, { asChild: true, children: /* @__PURE__ */ jsx33(Primitive.button, {
      id: triggerId,
      disabled,
      "data-disabled": disabled ? "" : undefined,
      "data-state": getOpenState2(open),
      "aria-expanded": open,
      "aria-controls": contentId,
      ...triggerProps,
      ref: composedRefs,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => {
        wasClickCloseRef.current = false;
        itemContext.wasEscapeCloseRef.current = false;
      }),
      onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse2(() => {
        if (disabled || wasClickCloseRef.current || itemContext.wasEscapeCloseRef.current || hasPointerMoveOpenedRef.current)
          return;
        context.onTriggerEnter(itemContext.value);
        hasPointerMoveOpenedRef.current = true;
      })),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse2(() => {
        if (disabled)
          return;
        context.onTriggerLeave();
        hasPointerMoveOpenedRef.current = false;
      })),
      onClick: composeEventHandlers(props.onClick, () => {
        context.onItemSelect(itemContext.value);
        wasClickCloseRef.current = open;
      }),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        const verticalEntryKey = context.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
        const entryKey = { horizontal: "ArrowDown", vertical: verticalEntryKey }[context.orientation];
        if (open && event.key === entryKey) {
          itemContext.onEntryKeyDown();
          event.preventDefault();
        }
      })
    }) }) }),
    open && /* @__PURE__ */ jsxs4(Fragment9, { children: [
      /* @__PURE__ */ jsx33(Root2, {
        "aria-hidden": true,
        tabIndex: 0,
        ref: itemContext.focusProxyRef,
        onFocus: (event) => {
          const content = itemContext.contentRef.current;
          const prevFocusedElement = event.relatedTarget;
          const wasTriggerFocused = prevFocusedElement === ref.current;
          const wasFocusFromContent = content?.contains(prevFocusedElement);
          if (wasTriggerFocused || !wasFocusFromContent) {
            itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
          }
        }
      }),
      context.viewport && /* @__PURE__ */ jsx33("span", { "aria-owns": contentId })
    ] })
  ] });
});
NavigationMenuTrigger.displayName = TRIGGER_NAME9;
var LINK_NAME = "NavigationMenuLink";
var LINK_SELECT = "navigationMenu.linkSelect";
var NavigationMenuLink = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, active, onSelect, ...linkProps } = props;
  return /* @__PURE__ */ jsx33(FocusGroupItem, { asChild: true, children: /* @__PURE__ */ jsx33(Primitive.a, {
    "data-active": active ? "" : undefined,
    "aria-current": active ? "page" : undefined,
    ...linkProps,
    ref: forwardedRef,
    onClick: composeEventHandlers(props.onClick, (event) => {
      const target = event.target;
      const linkSelectEvent = new CustomEvent(LINK_SELECT, {
        bubbles: true,
        cancelable: true
      });
      target.addEventListener(LINK_SELECT, (event2) => onSelect?.(event2), { once: true });
      dispatchDiscreteCustomEvent(target, linkSelectEvent);
      if (!linkSelectEvent.defaultPrevented && !event.metaKey) {
        const rootContentDismissEvent = new CustomEvent(ROOT_CONTENT_DISMISS, {
          bubbles: true,
          cancelable: true
        });
        dispatchDiscreteCustomEvent(target, rootContentDismissEvent);
      }
    }, { checkForDefaultPrevented: false })
  }) });
});
NavigationMenuLink.displayName = LINK_NAME;
var INDICATOR_NAME4 = "NavigationMenuIndicator";
var NavigationMenuIndicator = React50.forwardRef((props, forwardedRef) => {
  const { forceMount, ...indicatorProps } = props;
  const context = useNavigationMenuContext(INDICATOR_NAME4, props.__scopeNavigationMenu);
  const isVisible = Boolean(context.value);
  return context.indicatorTrack ? ReactDOM4.createPortal(/* @__PURE__ */ jsx33(Presence, { present: forceMount || isVisible, children: /* @__PURE__ */ jsx33(NavigationMenuIndicatorImpl, { ...indicatorProps, ref: forwardedRef }) }), context.indicatorTrack) : null;
});
NavigationMenuIndicator.displayName = INDICATOR_NAME4;
var NavigationMenuIndicatorImpl = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, ...indicatorProps } = props;
  const context = useNavigationMenuContext(INDICATOR_NAME4, __scopeNavigationMenu);
  const getItems = useCollection5(__scopeNavigationMenu);
  const [activeTrigger, setActiveTrigger] = React50.useState(null);
  const [position, setPosition] = React50.useState(null);
  const isHorizontal = context.orientation === "horizontal";
  const isVisible = Boolean(context.value);
  React50.useEffect(() => {
    const items = getItems();
    const triggerNode = items.find((item) => item.value === context.value)?.ref.current;
    if (triggerNode)
      setActiveTrigger(triggerNode);
  }, [getItems, context.value]);
  const handlePositionChange = () => {
    if (activeTrigger) {
      setPosition({
        size: isHorizontal ? activeTrigger.offsetWidth : activeTrigger.offsetHeight,
        offset: isHorizontal ? activeTrigger.offsetLeft : activeTrigger.offsetTop
      });
    }
  };
  useResizeObserver(activeTrigger, handlePositionChange);
  useResizeObserver(context.indicatorTrack, handlePositionChange);
  return position ? /* @__PURE__ */ jsx33(Primitive.div, {
    "aria-hidden": true,
    "data-state": isVisible ? "visible" : "hidden",
    "data-orientation": context.orientation,
    ...indicatorProps,
    ref: forwardedRef,
    style: {
      position: "absolute",
      ...isHorizontal ? {
        left: 0,
        width: position.size + "px",
        transform: `translateX(${position.offset}px)`
      } : {
        top: 0,
        height: position.size + "px",
        transform: `translateY(${position.offset}px)`
      },
      ...indicatorProps.style
    }
  }) : null;
});
var CONTENT_NAME11 = "NavigationMenuContent";
var NavigationMenuContent = React50.forwardRef((props, forwardedRef) => {
  const { forceMount, ...contentProps } = props;
  const context = useNavigationMenuContext(CONTENT_NAME11, props.__scopeNavigationMenu);
  const itemContext = useNavigationMenuItemContext(CONTENT_NAME11, props.__scopeNavigationMenu);
  const composedRefs = useComposedRefs(itemContext.contentRef, forwardedRef);
  const open = itemContext.value === context.value;
  const commonProps = {
    value: itemContext.value,
    triggerRef: itemContext.triggerRef,
    focusProxyRef: itemContext.focusProxyRef,
    wasEscapeCloseRef: itemContext.wasEscapeCloseRef,
    onContentFocusOutside: itemContext.onContentFocusOutside,
    onRootContentClose: itemContext.onRootContentClose,
    ...contentProps
  };
  return !context.viewport ? /* @__PURE__ */ jsx33(Presence, { present: forceMount || open, children: /* @__PURE__ */ jsx33(NavigationMenuContentImpl, {
    "data-state": getOpenState2(open),
    ...commonProps,
    ref: composedRefs,
    onPointerEnter: composeEventHandlers(props.onPointerEnter, context.onContentEnter),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse2(context.onContentLeave)),
    style: {
      pointerEvents: !open && context.isRootMenu ? "none" : undefined,
      ...commonProps.style
    }
  }) }) : /* @__PURE__ */ jsx33(ViewportContentMounter, { forceMount, ...commonProps, ref: composedRefs });
});
NavigationMenuContent.displayName = CONTENT_NAME11;
var ViewportContentMounter = React50.forwardRef((props, forwardedRef) => {
  const context = useNavigationMenuContext(CONTENT_NAME11, props.__scopeNavigationMenu);
  const { onViewportContentChange, onViewportContentRemove } = context;
  useLayoutEffect2(() => {
    onViewportContentChange(props.value, {
      ref: forwardedRef,
      ...props
    });
  }, [props, forwardedRef, onViewportContentChange]);
  useLayoutEffect2(() => {
    return () => onViewportContentRemove(props.value);
  }, [props.value, onViewportContentRemove]);
  return null;
});
var ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
var NavigationMenuContentImpl = React50.forwardRef((props, forwardedRef) => {
  const {
    __scopeNavigationMenu,
    value,
    triggerRef,
    focusProxyRef,
    wasEscapeCloseRef,
    onRootContentClose,
    onContentFocusOutside,
    ...contentProps
  } = props;
  const context = useNavigationMenuContext(CONTENT_NAME11, __scopeNavigationMenu);
  const ref = React50.useRef(null);
  const composedRefs = useComposedRefs(ref, forwardedRef);
  const triggerId = makeTriggerId(context.baseId, value);
  const contentId = makeContentId(context.baseId, value);
  const getItems = useCollection5(__scopeNavigationMenu);
  const prevMotionAttributeRef = React50.useRef(null);
  const { onItemDismiss } = context;
  React50.useEffect(() => {
    const content = ref.current;
    if (context.isRootMenu && content) {
      const handleClose = () => {
        onItemDismiss();
        onRootContentClose();
        if (content.contains(document.activeElement))
          triggerRef.current?.focus();
      };
      content.addEventListener(ROOT_CONTENT_DISMISS, handleClose);
      return () => content.removeEventListener(ROOT_CONTENT_DISMISS, handleClose);
    }
  }, [context.isRootMenu, props.value, triggerRef, onItemDismiss, onRootContentClose]);
  const motionAttribute = React50.useMemo(() => {
    const items = getItems();
    const values = items.map((item) => item.value);
    if (context.dir === "rtl")
      values.reverse();
    const index2 = values.indexOf(context.value);
    const prevIndex = values.indexOf(context.previousValue);
    const isSelected = value === context.value;
    const wasSelected = prevIndex === values.indexOf(value);
    if (!isSelected && !wasSelected)
      return prevMotionAttributeRef.current;
    const attribute = (() => {
      if (index2 !== prevIndex) {
        if (isSelected && prevIndex !== -1)
          return index2 > prevIndex ? "from-end" : "from-start";
        if (wasSelected && index2 !== -1)
          return index2 > prevIndex ? "to-start" : "to-end";
      }
      return null;
    })();
    prevMotionAttributeRef.current = attribute;
    return attribute;
  }, [context.previousValue, context.value, context.dir, getItems, value]);
  return /* @__PURE__ */ jsx33(FocusGroup, { asChild: true, children: /* @__PURE__ */ jsx33(DismissableLayer, {
    id: contentId,
    "aria-labelledby": triggerId,
    "data-motion": motionAttribute,
    "data-orientation": context.orientation,
    ...contentProps,
    ref: composedRefs,
    disableOutsidePointerEvents: false,
    onDismiss: () => {
      const rootContentDismissEvent = new Event(ROOT_CONTENT_DISMISS, {
        bubbles: true,
        cancelable: true
      });
      ref.current?.dispatchEvent(rootContentDismissEvent);
    },
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
      onContentFocusOutside();
      const target = event.target;
      if (context.rootNavigationMenu?.contains(target))
        event.preventDefault();
    }),
    onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
      const target = event.target;
      const isTrigger = getItems().some((item) => item.ref.current?.contains(target));
      const isRootViewport = context.isRootMenu && context.viewport?.contains(target);
      if (isTrigger || isRootViewport || !context.isRootMenu)
        event.preventDefault();
    }),
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      const isTabKey = event.key === "Tab" && !isMetaKey;
      if (isTabKey) {
        const candidates = getTabbableCandidates2(event.currentTarget);
        const focusedElement = document.activeElement;
        const index2 = candidates.findIndex((candidate) => candidate === focusedElement);
        const isMovingBackwards = event.shiftKey;
        const nextCandidates = isMovingBackwards ? candidates.slice(0, index2).reverse() : candidates.slice(index2 + 1, candidates.length);
        if (focusFirst4(nextCandidates)) {
          event.preventDefault();
        } else {
          focusProxyRef.current?.focus();
        }
      }
    }),
    onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (_event) => {
      wasEscapeCloseRef.current = true;
    })
  }) });
});
var VIEWPORT_NAME = "NavigationMenuViewport";
var NavigationMenuViewport = React50.forwardRef((props, forwardedRef) => {
  const { forceMount, ...viewportProps } = props;
  const context = useNavigationMenuContext(VIEWPORT_NAME, props.__scopeNavigationMenu);
  const open = Boolean(context.value);
  return /* @__PURE__ */ jsx33(Presence, { present: forceMount || open, children: /* @__PURE__ */ jsx33(NavigationMenuViewportImpl, { ...viewportProps, ref: forwardedRef }) });
});
NavigationMenuViewport.displayName = VIEWPORT_NAME;
var NavigationMenuViewportImpl = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, children, ...viewportImplProps } = props;
  const context = useNavigationMenuContext(VIEWPORT_NAME, __scopeNavigationMenu);
  const composedRefs = useComposedRefs(forwardedRef, context.onViewportChange);
  const viewportContentContext = useViewportContentContext(CONTENT_NAME11, props.__scopeNavigationMenu);
  const [size4, setSize] = React50.useState(null);
  const [content, setContent] = React50.useState(null);
  const viewportWidth = size4 ? size4?.width + "px" : undefined;
  const viewportHeight = size4 ? size4?.height + "px" : undefined;
  const open = Boolean(context.value);
  const activeContentValue = open ? context.value : context.previousValue;
  const handleSizeChange = () => {
    if (content)
      setSize({ width: content.offsetWidth, height: content.offsetHeight });
  };
  useResizeObserver(content, handleSizeChange);
  return /* @__PURE__ */ jsx33(Primitive.div, {
    "data-state": getOpenState2(open),
    "data-orientation": context.orientation,
    ...viewportImplProps,
    ref: composedRefs,
    style: {
      pointerEvents: !open && context.isRootMenu ? "none" : undefined,
      ["--radix-navigation-menu-viewport-width"]: viewportWidth,
      ["--radix-navigation-menu-viewport-height"]: viewportHeight,
      ...viewportImplProps.style
    },
    onPointerEnter: composeEventHandlers(props.onPointerEnter, context.onContentEnter),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse2(context.onContentLeave)),
    children: Array.from(viewportContentContext.items).map(([value, { ref, forceMount, ...props2 }]) => {
      const isActive = activeContentValue === value;
      return /* @__PURE__ */ jsx33(Presence, { present: forceMount || isActive, children: /* @__PURE__ */ jsx33(NavigationMenuContentImpl, {
        ...props2,
        ref: composeRefs(ref, (node) => {
          if (isActive && node)
            setContent(node);
        })
      }) }, value);
    })
  });
});
var FOCUS_GROUP_NAME = "FocusGroup";
var FocusGroup = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, ...groupProps } = props;
  const context = useNavigationMenuContext(FOCUS_GROUP_NAME, __scopeNavigationMenu);
  return /* @__PURE__ */ jsx33(FocusGroupCollection.Provider, { scope: __scopeNavigationMenu, children: /* @__PURE__ */ jsx33(FocusGroupCollection.Slot, { scope: __scopeNavigationMenu, children: /* @__PURE__ */ jsx33(Primitive.div, { dir: context.dir, ...groupProps, ref: forwardedRef }) }) });
});
var ARROW_KEYS = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
var FOCUS_GROUP_ITEM_NAME = "FocusGroupItem";
var FocusGroupItem = React50.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, ...groupProps } = props;
  const getItems = useFocusGroupCollection(__scopeNavigationMenu);
  const context = useNavigationMenuContext(FOCUS_GROUP_ITEM_NAME, __scopeNavigationMenu);
  return /* @__PURE__ */ jsx33(FocusGroupCollection.ItemSlot, { scope: __scopeNavigationMenu, children: /* @__PURE__ */ jsx33(Primitive.button, {
    ...groupProps,
    ref: forwardedRef,
    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
      const isFocusNavigationKey = ["Home", "End", ...ARROW_KEYS].includes(event.key);
      if (isFocusNavigationKey) {
        let candidateNodes = getItems().map((item) => item.ref.current);
        const prevItemKey = context.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
        const prevKeys = [prevItemKey, "ArrowUp", "End"];
        if (prevKeys.includes(event.key))
          candidateNodes.reverse();
        if (ARROW_KEYS.includes(event.key)) {
          const currentIndex = candidateNodes.indexOf(event.currentTarget);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(() => focusFirst4(candidateNodes));
        event.preventDefault();
      }
    })
  }) });
});
function getTabbableCandidates2(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function focusFirst4(candidates) {
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement)
      return true;
    candidate.focus();
    return document.activeElement !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
function getOpenState2(open) {
  return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
function whenMouse2(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : undefined;
}
var Root28 = NavigationMenu;
var Sub3 = NavigationMenuSub;
var List = NavigationMenuList;
var Item4 = NavigationMenuItem;
var Trigger9 = NavigationMenuTrigger;
var Link = NavigationMenuLink;
var Indicator = NavigationMenuIndicator;
var Content6 = NavigationMenuContent;
var Viewport = NavigationMenuViewport;

// ../../node_modules/.bun/@radix-ui+react-one-time-password-field@0.1.8+1356086b9384fa43/node_modules/@radix-ui/react-one-time-password-field/dist/index.mjs
var exports_dist18 = {};
__export(exports_dist18, {
  Root: () => OneTimePasswordField,
  OneTimePasswordFieldInput: () => OneTimePasswordFieldInput,
  OneTimePasswordFieldHiddenInput: () => OneTimePasswordFieldHiddenInput,
  OneTimePasswordField: () => OneTimePasswordField,
  Input: () => OneTimePasswordFieldInput,
  HiddenInput: () => OneTimePasswordFieldHiddenInput
});
import * as React51 from "react";
import { flushSync as flushSync3 } from "react-dom";

// ../../node_modules/.bun/@radix-ui+number@1.1.1/node_modules/@radix-ui/number/dist/index.mjs
function clamp2(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}

// ../../node_modules/.bun/@radix-ui+react-one-time-password-field@0.1.8+1356086b9384fa43/node_modules/@radix-ui/react-one-time-password-field/dist/index.mjs
import { jsx as jsx35 } from "react/jsx-runtime";
"use client";
var INPUT_VALIDATION_MAP = {
  numeric: {
    type: "numeric",
    regexp: /[^\d]/g,
    pattern: "\\d{1}",
    inputMode: "numeric"
  },
  alpha: {
    type: "alpha",
    regexp: /[^a-zA-Z]/g,
    pattern: "[a-zA-Z]{1}",
    inputMode: "text"
  },
  alphanumeric: {
    type: "alphanumeric",
    regexp: /[^a-zA-Z0-9]/g,
    pattern: "[a-zA-Z0-9]{1}",
    inputMode: "text"
  },
  none: null
};
var ONE_TIME_PASSWORD_FIELD_NAME = "OneTimePasswordField";
var [Collection6, { useCollection: useCollection6, createCollectionScope: createCollectionScope6, useInitCollection }] = createCollection2(ONE_TIME_PASSWORD_FIELD_NAME);
var [createOneTimePasswordFieldContext] = createContextScope(ONE_TIME_PASSWORD_FIELD_NAME, [
  createCollectionScope6,
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope3 = createRovingFocusGroupScope();
var [OneTimePasswordFieldContext, useOneTimePasswordFieldContext] = createOneTimePasswordFieldContext(ONE_TIME_PASSWORD_FIELD_NAME);
var OneTimePasswordField = React51.forwardRef(function OneTimePasswordFieldImpl({
  __scopeOneTimePasswordField,
  defaultValue,
  value: valueProp,
  onValueChange,
  autoSubmit = false,
  children,
  onPaste,
  onAutoSubmit,
  disabled = false,
  readOnly = false,
  autoComplete = "one-time-code",
  autoFocus = false,
  form,
  name,
  placeholder,
  type = "text",
  orientation = "horizontal",
  dir,
  validationType = "numeric",
  sanitizeValue: sanitizeValueProp,
  ...domProps
}, forwardedRef) {
  const rovingFocusGroupScope = useRovingFocusGroupScope3(__scopeOneTimePasswordField);
  const direction = useDirection(dir);
  const collectionState = useInitCollection();
  const [collection] = collectionState;
  const validation = INPUT_VALIDATION_MAP[validationType] ? INPUT_VALIDATION_MAP[validationType] : null;
  const sanitizeValue = React51.useCallback((value2) => {
    if (Array.isArray(value2)) {
      value2 = value2.map(removeWhitespace).join("");
    } else {
      value2 = removeWhitespace(value2);
    }
    if (validation) {
      const regexp = new RegExp(validation.regexp);
      value2 = value2.replace(regexp, "");
    } else if (sanitizeValueProp) {
      value2 = sanitizeValueProp(value2);
    }
    return value2.split("");
  }, [validation, sanitizeValueProp]);
  const controlledValue = React51.useMemo(() => {
    return valueProp != null ? sanitizeValue(valueProp) : undefined;
  }, [valueProp, sanitizeValue]);
  const [value, setValue] = useControllableState({
    caller: "OneTimePasswordField",
    prop: controlledValue,
    defaultProp: defaultValue != null ? sanitizeValue(defaultValue) : [],
    onChange: React51.useCallback((value2) => onValueChange?.(value2.join("")), [onValueChange])
  });
  const dispatch = useEffectEvent((action) => {
    switch (action.type) {
      case "SET_CHAR": {
        const { index: index2, char } = action;
        const currentTarget = collection.at(index2)?.element;
        if (value[index2] === char) {
          const next = currentTarget && collection.from(currentTarget, 1)?.element;
          focusInput(next);
          return;
        }
        if (char === "") {
          return;
        }
        if (validation) {
          const regexp = new RegExp(validation.regexp);
          const clean = char.replace(regexp, "");
          if (clean !== char) {
            return;
          }
        }
        if (value.length >= collection.size) {
          const newValue2 = [...value];
          newValue2[index2] = char;
          flushSync3(() => setValue(newValue2));
          const next = currentTarget && collection.from(currentTarget, 1)?.element;
          focusInput(next);
          return;
        }
        const newValue = [...value];
        newValue[index2] = char;
        const lastElement = collection.at(-1)?.element;
        flushSync3(() => setValue(newValue));
        if (currentTarget !== lastElement) {
          const next = currentTarget && collection.from(currentTarget, 1)?.element;
          focusInput(next);
        } else {
          currentTarget?.select();
        }
        return;
      }
      case "CLEAR_CHAR": {
        const { index: index2, reason } = action;
        if (!value[index2]) {
          return;
        }
        const newValue = value.filter((_, i) => i !== index2);
        const currentTarget = collection.at(index2)?.element;
        const previous = currentTarget && collection.from(currentTarget, -1)?.element;
        flushSync3(() => setValue(newValue));
        if (reason === "Backspace") {
          focusInput(previous);
        } else if (reason === "Delete" || reason === "Cut") {
          focusInput(currentTarget);
        }
        return;
      }
      case "CLEAR": {
        if (value.length === 0) {
          return;
        }
        if (action.reason === "Backspace" || action.reason === "Delete") {
          flushSync3(() => setValue([]));
          focusInput(collection.at(0)?.element);
        } else {
          setValue([]);
        }
        return;
      }
      case "PASTE": {
        const { value: pastedValue } = action;
        const value2 = sanitizeValue(pastedValue);
        if (!value2) {
          return;
        }
        flushSync3(() => setValue(value2));
        focusInput(collection.at(value2.length - 1)?.element);
        return;
      }
    }
  });
  const validationTypeRef = React51.useRef(validation);
  React51.useEffect(() => {
    if (!validation) {
      return;
    }
    if (validationTypeRef.current?.type !== validation.type) {
      validationTypeRef.current = validation;
      setValue(sanitizeValue(value.join("")));
    }
  }, [sanitizeValue, setValue, validation, value]);
  const hiddenInputRef = React51.useRef(null);
  const userActionRef = React51.useRef(null);
  const rootRef = React51.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, rootRef);
  const firstInput = collection.at(0)?.element;
  const locateForm = React51.useCallback(() => {
    let formElement;
    if (form) {
      const associatedElement = (rootRef.current?.ownerDocument ?? document).getElementById(form);
      if (isFormElement(associatedElement)) {
        formElement = associatedElement;
      }
    } else if (hiddenInputRef.current) {
      formElement = hiddenInputRef.current.form;
    } else if (firstInput) {
      formElement = firstInput.form;
    }
    return formElement ?? null;
  }, [form, firstInput]);
  const attemptSubmit = React51.useCallback(() => {
    const formElement = locateForm();
    formElement?.requestSubmit();
  }, [locateForm]);
  React51.useEffect(() => {
    const form2 = locateForm();
    if (form2) {
      const reset = () => dispatch({ type: "CLEAR", reason: "Reset" });
      form2.addEventListener("reset", reset);
      return () => form2.removeEventListener("reset", reset);
    }
  }, [dispatch, locateForm]);
  const currentValue = value.join("");
  const valueRef = React51.useRef(currentValue);
  const length = collection.size;
  React51.useEffect(() => {
    const previousValue = valueRef.current;
    valueRef.current = currentValue;
    if (previousValue === currentValue) {
      return;
    }
    if (autoSubmit && value.every((char) => char !== "") && value.length === length) {
      onAutoSubmit?.(value.join(""));
      attemptSubmit();
    }
  }, [attemptSubmit, autoSubmit, currentValue, length, onAutoSubmit, value]);
  const isHydrated = useIsHydrated();
  return /* @__PURE__ */ jsx35(OneTimePasswordFieldContext, {
    scope: __scopeOneTimePasswordField,
    value,
    attemptSubmit,
    disabled,
    readOnly,
    autoComplete,
    autoFocus,
    form,
    name,
    placeholder,
    type,
    hiddenInputRef,
    userActionRef,
    dispatch,
    validationType,
    orientation,
    isHydrated,
    sanitizeValue,
    children: /* @__PURE__ */ jsx35(Collection6.Provider, { scope: __scopeOneTimePasswordField, state: collectionState, children: /* @__PURE__ */ jsx35(Collection6.Slot, { scope: __scopeOneTimePasswordField, children: /* @__PURE__ */ jsx35(Root7, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation,
      dir: direction,
      children: /* @__PURE__ */ jsx35(Root.div, {
        ...domProps,
        role: "group",
        ref: composedRefs,
        onPaste: composeEventHandlers(onPaste, (event) => {
          event.preventDefault();
          const pastedValue = event.clipboardData.getData("Text");
          dispatch({ type: "PASTE", value: pastedValue });
        }),
        children
      })
    }) }) })
  });
});
var OneTimePasswordFieldHiddenInput = React51.forwardRef(function OneTimePasswordFieldHiddenInput2({ __scopeOneTimePasswordField, ...props }, forwardedRef) {
  const { value, hiddenInputRef, name } = useOneTimePasswordFieldContext("OneTimePasswordFieldHiddenInput", __scopeOneTimePasswordField);
  const ref = useComposedRefs(hiddenInputRef, forwardedRef);
  return /* @__PURE__ */ jsx35("input", {
    ref,
    name,
    value: value.join("").trim(),
    autoComplete: "off",
    autoFocus: false,
    autoCapitalize: "off",
    autoCorrect: "off",
    autoSave: "off",
    spellCheck: false,
    ...props,
    type: "hidden",
    readOnly: true
  });
});
var OneTimePasswordFieldInput = React51.forwardRef(function OneTimePasswordFieldInput2({
  __scopeOneTimePasswordField,
  onInvalidChange,
  index: indexProp,
  ...props
}, forwardedRef) {
  const {
    value: _value,
    defaultValue: _defaultValue,
    disabled: _disabled,
    readOnly: _readOnly,
    autoComplete: _autoComplete,
    autoFocus: _autoFocus,
    form: _form,
    name: _name,
    placeholder: _placeholder,
    type: _type,
    ...domProps
  } = props;
  const context = useOneTimePasswordFieldContext("OneTimePasswordFieldInput", __scopeOneTimePasswordField);
  const { dispatch, userActionRef, validationType, isHydrated, disabled } = context;
  const collection = useCollection6(__scopeOneTimePasswordField);
  const rovingFocusGroupScope = useRovingFocusGroupScope3(__scopeOneTimePasswordField);
  const inputRef = React51.useRef(null);
  const [element, setElement] = React51.useState(null);
  const index2 = indexProp ?? (element ? collection.indexOf(element) : -1);
  const canSetPlaceholder = indexProp != null || isHydrated;
  let placeholder;
  if (canSetPlaceholder && context.placeholder && context.value.length === 0) {
    placeholder = context.placeholder[index2];
  }
  const composedInputRef = useComposedRefs(forwardedRef, inputRef, setElement);
  const char = context.value[index2] ?? "";
  const keyboardActionTimeoutRef = React51.useRef(null);
  React51.useEffect(() => {
    return () => {
      window.clearTimeout(keyboardActionTimeoutRef.current);
    };
  }, []);
  const totalValue = context.value.join("").trim();
  const lastSelectableIndex = clamp2(totalValue.length, [0, collection.size - 1]);
  const isFocusable = index2 <= lastSelectableIndex;
  const validation = validationType in INPUT_VALIDATION_MAP ? INPUT_VALIDATION_MAP[validationType] : undefined;
  return /* @__PURE__ */ jsx35(Collection6.ItemSlot, { scope: __scopeOneTimePasswordField, children: /* @__PURE__ */ jsx35(Item2, {
    ...rovingFocusGroupScope,
    asChild: true,
    focusable: !context.disabled && isFocusable,
    active: index2 === lastSelectableIndex,
    children: ({ hasTabStop, isCurrentTabStop }) => {
      const supportsAutoComplete = hasTabStop ? isCurrentTabStop : index2 === 0;
      return /* @__PURE__ */ jsx35(Root.input, {
        ref: composedInputRef,
        type: context.type,
        disabled,
        "aria-label": `Character ${index2 + 1} of ${collection.size}`,
        autoComplete: supportsAutoComplete ? context.autoComplete : "off",
        "data-1p-ignore": supportsAutoComplete ? undefined : "true",
        "data-lpignore": supportsAutoComplete ? undefined : "true",
        "data-protonpass-ignore": supportsAutoComplete ? undefined : "true",
        "data-bwignore": supportsAutoComplete ? undefined : "true",
        inputMode: validation?.inputMode,
        maxLength: 1,
        pattern: validation?.pattern,
        readOnly: context.readOnly,
        value: char,
        placeholder,
        "data-radix-otp-input": "",
        "data-radix-index": index2,
        ...domProps,
        onFocus: composeEventHandlers(props.onFocus, (event) => {
          event.currentTarget.select();
        }),
        onCut: composeEventHandlers(props.onCut, (event) => {
          const currentValue = event.currentTarget.value;
          if (currentValue !== "") {
            userActionRef.current = {
              type: "cut"
            };
            keyboardActionTimeoutRef.current = window.setTimeout(() => {
              userActionRef.current = null;
            }, 10);
          }
        }),
        onInput: composeEventHandlers(props.onInput, (event) => {
          const value = event.currentTarget.value;
          if (value.length > 1) {
            event.preventDefault();
            dispatch({ type: "PASTE", value });
          }
        }),
        onChange: composeEventHandlers(props.onChange, (event) => {
          const value = event.target.value;
          event.preventDefault();
          const action = userActionRef.current;
          userActionRef.current = null;
          if (action) {
            switch (action.type) {
              case "cut":
                dispatch({ type: "CLEAR_CHAR", index: index2, reason: "Cut" });
                return;
              case "keydown": {
                if (action.key === "Char") {
                  return;
                }
                const isClearing = action.key === "Backspace" && (action.metaKey || action.ctrlKey);
                if (action.key === "Clear" || isClearing) {
                  dispatch({ type: "CLEAR", reason: "Backspace" });
                } else {
                  dispatch({ type: "CLEAR_CHAR", index: index2, reason: action.key });
                }
                return;
              }
              default:
                return;
            }
          }
          if (event.target.validity.valid) {
            if (value === "") {
              let reason = "Backspace";
              if (isInputEvent(event.nativeEvent)) {
                const inputType = event.nativeEvent.inputType;
                if (inputType === "deleteContentBackward") {
                  reason = "Backspace";
                } else if (inputType === "deleteByCut") {
                  reason = "Cut";
                }
              }
              dispatch({ type: "CLEAR_CHAR", index: index2, reason });
            } else {
              dispatch({ type: "SET_CHAR", char: value, index: index2, event });
            }
          } else {
            const element2 = event.target;
            onInvalidChange?.(element2.value);
            requestAnimationFrame(() => {
              if (element2.ownerDocument.activeElement === element2) {
                element2.select();
              }
            });
          }
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          switch (event.key) {
            case "Clear":
            case "Delete":
            case "Backspace": {
              const currentValue = event.currentTarget.value;
              if (currentValue === "") {
                if (event.key === "Delete")
                  return;
                const isClearing = event.key === "Clear" || event.metaKey || event.ctrlKey;
                if (isClearing) {
                  dispatch({ type: "CLEAR", reason: "Backspace" });
                } else {
                  const element2 = event.currentTarget;
                  requestAnimationFrame(() => {
                    focusInput(collection.from(element2, -1)?.element);
                  });
                }
              } else {
                userActionRef.current = {
                  type: "keydown",
                  key: event.key,
                  metaKey: event.metaKey,
                  ctrlKey: event.ctrlKey
                };
                keyboardActionTimeoutRef.current = window.setTimeout(() => {
                  userActionRef.current = null;
                }, 10);
              }
              return;
            }
            case "Enter": {
              event.preventDefault();
              context.attemptSubmit();
              return;
            }
            case "ArrowDown":
            case "ArrowUp": {
              if (context.orientation === "horizontal") {
                event.preventDefault();
              }
              return;
            }
            default: {
              if (event.currentTarget.value === event.key) {
                const element2 = event.currentTarget;
                event.preventDefault();
                focusInput(collection.from(element2, 1)?.element);
                return;
              } else if (event.currentTarget.value && !(event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd != null && event.currentTarget.selectionEnd > 0)) {
                const attemptedValue = event.key;
                if (event.key.length > 1 || event.key === " ") {
                  return;
                } else {
                  const nextInput = collection.from(event.currentTarget, 1)?.element;
                  const lastInput = collection.at(-1)?.element;
                  if (nextInput !== lastInput && event.currentTarget !== lastInput) {
                    if (event.currentTarget.selectionStart === 0) {
                      dispatch({ type: "SET_CHAR", char: attemptedValue, index: index2, event });
                    } else {
                      dispatch({
                        type: "SET_CHAR",
                        char: attemptedValue,
                        index: index2 + 1,
                        event
                      });
                    }
                    userActionRef.current = {
                      type: "keydown",
                      key: "Char",
                      metaKey: event.metaKey,
                      ctrlKey: event.ctrlKey
                    };
                    keyboardActionTimeoutRef.current = window.setTimeout(() => {
                      userActionRef.current = null;
                    }, 10);
                  }
                }
              }
            }
          }
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          event.preventDefault();
          const indexToFocus = Math.min(index2, lastSelectableIndex);
          const element2 = collection.at(indexToFocus)?.element;
          focusInput(element2);
        })
      });
    }
  }) });
});
function isFormElement(element) {
  return element?.tagName === "FORM";
}
function removeWhitespace(value) {
  return value.replace(/\s/g, "");
}
function focusInput(element) {
  if (!element)
    return;
  if (element.ownerDocument.activeElement === element) {
    window.requestAnimationFrame(() => {
      element.select?.();
    });
  } else {
    element.focus();
  }
}
function isInputEvent(event) {
  return event.type === "input";
}

// ../../node_modules/.bun/@radix-ui+react-popover@1.1.15+1356086b9384fa43/node_modules/@radix-ui/react-popover/dist/index.mjs
var exports_dist20 = {};
__export(exports_dist20, {
  createPopoverScope: () => createPopoverScope,
  Trigger: () => Trigger10,
  Root: () => Root29,
  Portal: () => Portal5,
  PopoverTrigger: () => PopoverTrigger,
  PopoverPortal: () => PopoverPortal,
  PopoverContent: () => PopoverContent,
  PopoverClose: () => PopoverClose,
  PopoverArrow: () => PopoverArrow,
  PopoverAnchor: () => PopoverAnchor,
  Popover: () => Popover,
  Content: () => Content28,
  Close: () => Close2,
  Arrow: () => Arrow27,
  Anchor: () => Anchor22
});
import * as React52 from "react";
import { jsx as jsx36 } from "react/jsx-runtime";
"use client";
var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope3 = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope3(__scopePopover);
  const triggerRef = React52.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React52.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsx36(Root24, { ...popperScope, children: /* @__PURE__ */ jsx36(PopoverProvider, {
    scope: __scopePopover,
    contentId: useId(),
    triggerRef,
    open,
    onOpenChange: setOpen,
    onOpenToggle: React52.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
    hasCustomAnchor,
    onCustomAnchorAdd: React52.useCallback(() => setHasCustomAnchor(true), []),
    onCustomAnchorRemove: React52.useCallback(() => setHasCustomAnchor(false), []),
    modal,
    children
  }) });
};
Popover.displayName = POPOVER_NAME;
var ANCHOR_NAME3 = "PopoverAnchor";
var PopoverAnchor = React52.forwardRef((props, forwardedRef) => {
  const { __scopePopover, ...anchorProps } = props;
  const context = usePopoverContext(ANCHOR_NAME3, __scopePopover);
  const popperScope = usePopperScope3(__scopePopover);
  const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
  React52.useEffect(() => {
    onCustomAnchorAdd();
    return () => onCustomAnchorRemove();
  }, [onCustomAnchorAdd, onCustomAnchorRemove]);
  return /* @__PURE__ */ jsx36(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
});
PopoverAnchor.displayName = ANCHOR_NAME3;
var TRIGGER_NAME10 = "PopoverTrigger";
var PopoverTrigger = React52.forwardRef((props, forwardedRef) => {
  const { __scopePopover, ...triggerProps } = props;
  const context = usePopoverContext(TRIGGER_NAME10, __scopePopover);
  const popperScope = usePopperScope3(__scopePopover);
  const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
  const trigger = /* @__PURE__ */ jsx36(Primitive.button, {
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": context.open,
    "aria-controls": context.contentId,
    "data-state": getState4(context.open),
    ...triggerProps,
    ref: composedTriggerRef,
    onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
  });
  return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsx36(Anchor, { asChild: true, ...popperScope, children: trigger });
});
PopoverTrigger.displayName = TRIGGER_NAME10;
var PORTAL_NAME9 = "PopoverPortal";
var [PortalProvider4, usePortalContext4] = createPopoverContext(PORTAL_NAME9, {
  forceMount: undefined
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME9, __scopePopover);
  return /* @__PURE__ */ jsx36(PortalProvider4, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsx36(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx36(Portal, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME9;
var CONTENT_NAME12 = "PopoverContent";
var PopoverContent = React52.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext4(CONTENT_NAME12, props.__scopePopover);
  const { forceMount = portalContext.forceMount, ...contentProps } = props;
  const context = usePopoverContext(CONTENT_NAME12, props.__scopePopover);
  return /* @__PURE__ */ jsx36(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx36(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx36(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
});
PopoverContent.displayName = CONTENT_NAME12;
var Slot4 = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = React52.forwardRef((props, forwardedRef) => {
  const context = usePopoverContext(CONTENT_NAME12, props.__scopePopover);
  const contentRef = React52.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, contentRef);
  const isRightClickOutsideRef = React52.useRef(false);
  React52.useEffect(() => {
    const content = contentRef.current;
    if (content)
      return hideOthers(content);
  }, []);
  return /* @__PURE__ */ jsx36(Combination_default, { as: Slot4, allowPinchZoom: true, children: /* @__PURE__ */ jsx36(PopoverContentImpl, {
    ...props,
    ref: composedRefs,
    trapFocus: context.open,
    disableOutsidePointerEvents: true,
    onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
      event.preventDefault();
      if (!isRightClickOutsideRef.current)
        context.triggerRef.current?.focus();
    }),
    onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
      const originalEvent = event.detail.originalEvent;
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
      isRightClickOutsideRef.current = isRightClick;
    }, { checkForDefaultPrevented: false }),
    onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false })
  }) });
});
var PopoverContentNonModal = React52.forwardRef((props, forwardedRef) => {
  const context = usePopoverContext(CONTENT_NAME12, props.__scopePopover);
  const hasInteractedOutsideRef = React52.useRef(false);
  const hasPointerDownOutsideRef = React52.useRef(false);
  return /* @__PURE__ */ jsx36(PopoverContentImpl, {
    ...props,
    ref: forwardedRef,
    trapFocus: false,
    disableOutsidePointerEvents: false,
    onCloseAutoFocus: (event) => {
      props.onCloseAutoFocus?.(event);
      if (!event.defaultPrevented) {
        if (!hasInteractedOutsideRef.current)
          context.triggerRef.current?.focus();
        event.preventDefault();
      }
      hasInteractedOutsideRef.current = false;
      hasPointerDownOutsideRef.current = false;
    },
    onInteractOutside: (event) => {
      props.onInteractOutside?.(event);
      if (!event.defaultPrevented) {
        hasInteractedOutsideRef.current = true;
        if (event.detail.originalEvent.type === "pointerdown") {
          hasPointerDownOutsideRef.current = true;
        }
      }
      const target = event.target;
      const targetIsTrigger = context.triggerRef.current?.contains(target);
      if (targetIsTrigger)
        event.preventDefault();
      if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
        event.preventDefault();
      }
    }
  });
});
var PopoverContentImpl = React52.forwardRef((props, forwardedRef) => {
  const {
    __scopePopover,
    trapFocus,
    onOpenAutoFocus,
    onCloseAutoFocus,
    disableOutsidePointerEvents,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    ...contentProps
  } = props;
  const context = usePopoverContext(CONTENT_NAME12, __scopePopover);
  const popperScope = usePopperScope3(__scopePopover);
  useFocusGuards();
  return /* @__PURE__ */ jsx36(FocusScope, {
    asChild: true,
    loop: true,
    trapped: trapFocus,
    onMountAutoFocus: onOpenAutoFocus,
    onUnmountAutoFocus: onCloseAutoFocus,
    children: /* @__PURE__ */ jsx36(DismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents,
      onInteractOutside,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onDismiss: () => context.onOpenChange(false),
      children: /* @__PURE__ */ jsx36(Content5, {
        "data-state": getState4(context.open),
        role: "dialog",
        id: context.contentId,
        ...popperScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...contentProps.style,
          ...{
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      })
    })
  });
});
var CLOSE_NAME2 = "PopoverClose";
var PopoverClose = React52.forwardRef((props, forwardedRef) => {
  const { __scopePopover, ...closeProps } = props;
  const context = usePopoverContext(CLOSE_NAME2, __scopePopover);
  return /* @__PURE__ */ jsx36(Primitive.button, {
    type: "button",
    ...closeProps,
    ref: forwardedRef,
    onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
  });
});
PopoverClose.displayName = CLOSE_NAME2;
var ARROW_NAME7 = "PopoverArrow";
var PopoverArrow = React52.forwardRef((props, forwardedRef) => {
  const { __scopePopover, ...arrowProps } = props;
  const popperScope = usePopperScope3(__scopePopover);
  return /* @__PURE__ */ jsx36(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
});
PopoverArrow.displayName = ARROW_NAME7;
function getState4(open) {
  return open ? "open" : "closed";
}
var Root29 = Popover;
var Anchor22 = PopoverAnchor;
var Trigger10 = PopoverTrigger;
var Portal5 = PopoverPortal;
var Content28 = PopoverContent;
var Close2 = PopoverClose;
var Arrow27 = PopoverArrow;

// ../../node_modules/.bun/@radix-ui+react-radio-group@1.3.8+1356086b9384fa43/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var exports_dist21 = {};
__export(exports_dist21, {
  createRadioGroupScope: () => createRadioGroupScope,
  Root: () => Root210,
  RadioGroupItem: () => RadioGroupItem,
  RadioGroupIndicator: () => RadioGroupIndicator,
  RadioGroup: () => RadioGroup3,
  Item: () => Item25,
  Indicator: () => Indicator2
});
import * as React26 from "react";
import * as React53 from "react";
import { jsx as jsx37, jsxs as jsxs5 } from "react/jsx-runtime";
import { jsx as jsx25 } from "react/jsx-runtime";
"use client";
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = React53.forwardRef((props, forwardedRef) => {
  const {
    __scopeRadio,
    name,
    checked = false,
    required,
    disabled,
    value = "on",
    onCheck,
    form,
    ...radioProps
  } = props;
  const [button, setButton] = React53.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
  const hasConsumerStoppedPropagationRef = React53.useRef(false);
  const isFormControl = button ? form || !!button.closest("form") : true;
  return /* @__PURE__ */ jsxs5(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
    /* @__PURE__ */ jsx37(Primitive.button, {
      type: "button",
      role: "radio",
      "aria-checked": checked,
      "data-state": getState5(checked),
      "data-disabled": disabled ? "" : undefined,
      disabled,
      value,
      ...radioProps,
      ref: composedRefs,
      onClick: composeEventHandlers(props.onClick, (event) => {
        if (!checked)
          onCheck?.();
        if (isFormControl) {
          hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
          if (!hasConsumerStoppedPropagationRef.current)
            event.stopPropagation();
        }
      })
    }),
    isFormControl && /* @__PURE__ */ jsx37(RadioBubbleInput, {
      control: button,
      bubbles: !hasConsumerStoppedPropagationRef.current,
      name,
      value,
      checked,
      required,
      disabled,
      form,
      style: { transform: "translateX(-100%)" }
    })
  ] });
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME5 = "RadioIndicator";
var RadioIndicator = React53.forwardRef((props, forwardedRef) => {
  const { __scopeRadio, forceMount, ...indicatorProps } = props;
  const context = useRadioContext(INDICATOR_NAME5, __scopeRadio);
  return /* @__PURE__ */ jsx37(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsx37(Primitive.span, {
    "data-state": getState5(context.checked),
    "data-disabled": context.disabled ? "" : undefined,
    ...indicatorProps,
    ref: forwardedRef
  }) });
});
RadioIndicator.displayName = INDICATOR_NAME5;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = React53.forwardRef(({
  __scopeRadio,
  control,
  checked,
  bubbles = true,
  ...props
}, forwardedRef) => {
  const ref = React53.useRef(null);
  const composedRefs = useComposedRefs(ref, forwardedRef);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);
  React53.useEffect(() => {
    const input = ref.current;
    if (!input)
      return;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);
  return /* @__PURE__ */ jsx37(Primitive.input, {
    type: "radio",
    "aria-hidden": true,
    defaultChecked: checked,
    ...props,
    tabIndex: -1,
    ref: composedRefs,
    style: {
      ...props.style,
      ...controlSize,
      position: "absolute",
      pointerEvents: "none",
      opacity: 0,
      margin: 0
    }
  });
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState5(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS2 = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME5 = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME5, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope4 = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider2, useRadioGroupContext2] = createRadioGroupContext(RADIO_GROUP_NAME5);
var RadioGroup3 = React26.forwardRef((props, forwardedRef) => {
  const {
    __scopeRadioGroup,
    name,
    defaultValue,
    value: valueProp,
    required = false,
    disabled = false,
    orientation,
    dir,
    loop = true,
    onValueChange,
    ...groupProps
  } = props;
  const rovingFocusGroupScope = useRovingFocusGroupScope4(__scopeRadioGroup);
  const direction = useDirection(dir);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? null,
    onChange: onValueChange,
    caller: RADIO_GROUP_NAME5
  });
  return /* @__PURE__ */ jsx25(RadioGroupProvider2, {
    scope: __scopeRadioGroup,
    name,
    required,
    disabled,
    value,
    onValueChange: setValue,
    children: /* @__PURE__ */ jsx25(Root7, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation,
      dir: direction,
      loop,
      children: /* @__PURE__ */ jsx25(Primitive.div, {
        role: "radiogroup",
        "aria-required": required,
        "aria-orientation": orientation,
        "data-disabled": disabled ? "" : undefined,
        dir: direction,
        ...groupProps,
        ref: forwardedRef
      })
    })
  });
});
RadioGroup3.displayName = RADIO_GROUP_NAME5;
var ITEM_NAME8 = "RadioGroupItem";
var RadioGroupItem = React26.forwardRef((props, forwardedRef) => {
  const { __scopeRadioGroup, disabled, ...itemProps } = props;
  const context = useRadioGroupContext2(ITEM_NAME8, __scopeRadioGroup);
  const isDisabled = context.disabled || disabled;
  const rovingFocusGroupScope = useRovingFocusGroupScope4(__scopeRadioGroup);
  const radioScope = useRadioScope(__scopeRadioGroup);
  const ref = React26.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const checked = context.value === itemProps.value;
  const isArrowKeyPressedRef = React26.useRef(false);
  React26.useEffect(() => {
    const handleKeyDown = (event) => {
      if (ARROW_KEYS2.includes(event.key)) {
        isArrowKeyPressedRef.current = true;
      }
    };
    const handleKeyUp = () => isArrowKeyPressedRef.current = false;
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return /* @__PURE__ */ jsx25(Item2, {
    asChild: true,
    ...rovingFocusGroupScope,
    focusable: !isDisabled,
    active: checked,
    children: /* @__PURE__ */ jsx25(Radio, {
      disabled: isDisabled,
      required: context.required,
      checked,
      ...radioScope,
      ...itemProps,
      name: context.name,
      ref: composedRefs,
      onCheck: () => context.onValueChange(itemProps.value),
      onKeyDown: composeEventHandlers((event) => {
        if (event.key === "Enter")
          event.preventDefault();
      }),
      onFocus: composeEventHandlers(itemProps.onFocus, () => {
        if (isArrowKeyPressedRef.current)
          ref.current?.click();
      })
    })
  });
});
RadioGroupItem.displayName = ITEM_NAME8;
var INDICATOR_NAME22 = "RadioGroupIndicator";
var RadioGroupIndicator = React26.forwardRef((props, forwardedRef) => {
  const { __scopeRadioGroup, ...indicatorProps } = props;
  const radioScope = useRadioScope(__scopeRadioGroup);
  return /* @__PURE__ */ jsx25(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
});
RadioGroupIndicator.displayName = INDICATOR_NAME22;
var Root210 = RadioGroup3;
var Item25 = RadioGroupItem;
var Indicator2 = RadioGroupIndicator;

// ../../node_modules/.bun/@radix-ui+react-scroll-area@1.2.10+1356086b9384fa43/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
var exports_dist22 = {};
__export(exports_dist22, {
  createScrollAreaScope: () => createScrollAreaScope,
  Viewport: () => Viewport2,
  Thumb: () => Thumb,
  Scrollbar: () => Scrollbar,
  ScrollAreaViewport: () => ScrollAreaViewport,
  ScrollAreaThumb: () => ScrollAreaThumb,
  ScrollAreaScrollbar: () => ScrollAreaScrollbar,
  ScrollAreaCorner: () => ScrollAreaCorner,
  ScrollArea: () => ScrollArea,
  Root: () => Root9,
  Corner: () => Corner
});
import * as React210 from "react";
import * as React54 from "react";
import { Fragment as Fragment10, jsx as jsx38, jsxs as jsxs6 } from "react/jsx-runtime";
"use client";
function useStateMachine2(initialState, machine) {
  return React54.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea = React210.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    type = "hover",
    dir,
    scrollHideDelay = 600,
    ...scrollAreaProps
  } = props;
  const [scrollArea, setScrollArea] = React210.useState(null);
  const [viewport, setViewport] = React210.useState(null);
  const [content, setContent] = React210.useState(null);
  const [scrollbarX, setScrollbarX] = React210.useState(null);
  const [scrollbarY, setScrollbarY] = React210.useState(null);
  const [cornerWidth, setCornerWidth] = React210.useState(0);
  const [cornerHeight, setCornerHeight] = React210.useState(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = React210.useState(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = React210.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
  const direction = useDirection(dir);
  return /* @__PURE__ */ jsx38(ScrollAreaProvider, {
    scope: __scopeScrollArea,
    type,
    dir: direction,
    scrollHideDelay,
    scrollArea,
    viewport,
    onViewportChange: setViewport,
    content,
    onContentChange: setContent,
    scrollbarX,
    onScrollbarXChange: setScrollbarX,
    scrollbarXEnabled,
    onScrollbarXEnabledChange: setScrollbarXEnabled,
    scrollbarY,
    onScrollbarYChange: setScrollbarY,
    scrollbarYEnabled,
    onScrollbarYEnabledChange: setScrollbarYEnabled,
    onCornerWidthChange: setCornerWidth,
    onCornerHeightChange: setCornerHeight,
    children: /* @__PURE__ */ jsx38(Primitive.div, {
      dir: direction,
      ...scrollAreaProps,
      ref: composedRefs,
      style: {
        position: "relative",
        ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
        ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
        ...props.style
      }
    })
  });
});
ScrollArea.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME2 = "ScrollAreaViewport";
var ScrollAreaViewport = React210.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
  const context = useScrollAreaContext(VIEWPORT_NAME2, __scopeScrollArea);
  const ref = React210.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
  return /* @__PURE__ */ jsxs6(Fragment10, { children: [
    /* @__PURE__ */ jsx38("style", {
      dangerouslySetInnerHTML: {
        __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
      },
      nonce
    }),
    /* @__PURE__ */ jsx38(Primitive.div, {
      "data-radix-scroll-area-viewport": "",
      ...viewportProps,
      ref: composedRefs,
      style: {
        overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
        overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
        ...props.style
      },
      children: /* @__PURE__ */ jsx38("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
    })
  ] });
});
ScrollAreaViewport.displayName = VIEWPORT_NAME2;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = React210.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
  const isHorizontal = props.orientation === "horizontal";
  React210.useEffect(() => {
    isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
    return () => {
      isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
    };
  }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
  return context.type === "hover" ? /* @__PURE__ */ jsx38(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsx38(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsx38(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsx38(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
});
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = React210.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = React210.useState(false);
  React210.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsx38(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsx38(ScrollAreaScrollbarAuto, {
    "data-state": visible ? "visible" : "hidden",
    ...scrollbarProps,
    ref: forwardedRef
  }) });
});
var ScrollAreaScrollbarScroll = React210.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine2("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  React210.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  React210.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll2 = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsx38(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsx38(ScrollAreaScrollbarVisible, {
    "data-state": state === "hidden" ? "hidden" : "visible",
    ...scrollbarProps,
    ref: forwardedRef,
    onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
  }) });
});
var ScrollAreaScrollbarAuto = React210.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = React210.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver2(context.viewport, handleResize);
  useResizeObserver2(context.content, handleResize);
  return /* @__PURE__ */ jsx38(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsx38(ScrollAreaScrollbarVisible, {
    "data-state": visible ? "visible" : "hidden",
    ...scrollbarProps,
    ref: forwardedRef
  }) });
});
var ScrollAreaScrollbarVisible = React210.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = React210.useRef(null);
  const pointerOffsetRef = React210.useRef(0);
  const [sizes, setSizes] = React210.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsx38(ScrollAreaScrollbarX, {
      ...commonProps,
      ref: forwardedRef,
      onThumbPositionChange: () => {
        if (context.viewport && thumbRef.current) {
          const scrollPos = context.viewport.scrollLeft;
          const offset4 = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
          thumbRef.current.style.transform = `translate3d(${offset4}px, 0, 0)`;
        }
      },
      onWheelScroll: (scrollPos) => {
        if (context.viewport)
          context.viewport.scrollLeft = scrollPos;
      },
      onDragScroll: (pointerPos) => {
        if (context.viewport) {
          context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
        }
      }
    });
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx38(ScrollAreaScrollbarY, {
      ...commonProps,
      ref: forwardedRef,
      onThumbPositionChange: () => {
        if (context.viewport && thumbRef.current) {
          const scrollPos = context.viewport.scrollTop;
          const offset4 = getThumbOffsetFromScroll(scrollPos, sizes);
          thumbRef.current.style.transform = `translate3d(0, ${offset4}px, 0)`;
        }
      },
      onWheelScroll: (scrollPos) => {
        if (context.viewport)
          context.viewport.scrollTop = scrollPos;
      },
      onDragScroll: (pointerPos) => {
        if (context.viewport)
          context.viewport.scrollTop = getScrollPosition(pointerPos);
      }
    });
  }
  return null;
});
var ScrollAreaScrollbarX = React210.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React210.useState();
  const ref = React210.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  React210.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx38(ScrollAreaScrollbarImpl, {
    "data-orientation": "horizontal",
    ...scrollbarProps,
    ref: composeRefs2,
    sizes,
    style: {
      bottom: 0,
      left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
      right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
      ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
      ...props.style
    },
    onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
    onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
    onWheelScroll: (event, maxScrollPos) => {
      if (context.viewport) {
        const scrollPos = context.viewport.scrollLeft + event.deltaX;
        props.onWheelScroll(scrollPos);
        if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
          event.preventDefault();
        }
      }
    },
    onResize: () => {
      if (ref.current && context.viewport && computedStyle) {
        onSizesChange({
          content: context.viewport.scrollWidth,
          viewport: context.viewport.offsetWidth,
          scrollbar: {
            size: ref.current.clientWidth,
            paddingStart: toInt(computedStyle.paddingLeft),
            paddingEnd: toInt(computedStyle.paddingRight)
          }
        });
      }
    }
  });
});
var ScrollAreaScrollbarY = React210.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React210.useState();
  const ref = React210.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  React210.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx38(ScrollAreaScrollbarImpl, {
    "data-orientation": "vertical",
    ...scrollbarProps,
    ref: composeRefs2,
    sizes,
    style: {
      top: 0,
      right: context.dir === "ltr" ? 0 : undefined,
      left: context.dir === "rtl" ? 0 : undefined,
      bottom: "var(--radix-scroll-area-corner-height)",
      ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
      ...props.style
    },
    onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
    onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
    onWheelScroll: (event, maxScrollPos) => {
      if (context.viewport) {
        const scrollPos = context.viewport.scrollTop + event.deltaY;
        props.onWheelScroll(scrollPos);
        if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
          event.preventDefault();
        }
      }
    },
    onResize: () => {
      if (ref.current && context.viewport && computedStyle) {
        onSizesChange({
          content: context.viewport.scrollHeight,
          viewport: context.viewport.offsetHeight,
          scrollbar: {
            size: ref.current.clientHeight,
            paddingStart: toInt(computedStyle.paddingTop),
            paddingEnd: toInt(computedStyle.paddingBottom)
          }
        });
      }
    }
  });
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = React210.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = React210.useState(null);
  const composeRefs2 = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = React210.useRef(null);
  const prevWebkitUserSelectRef = React210.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  React210.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel)
        handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  React210.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver2(scrollbar, handleResize);
  useResizeObserver2(context.content, handleResize);
  return /* @__PURE__ */ jsx38(ScrollbarProvider, {
    scope: __scopeScrollArea,
    scrollbar,
    hasThumb,
    onThumbChange: useCallbackRef(onThumbChange),
    onThumbPointerUp: useCallbackRef(onThumbPointerUp),
    onThumbPositionChange: handleThumbPositionChange,
    onThumbPointerDown: useCallbackRef(onThumbPointerDown),
    children: /* @__PURE__ */ jsx38(Primitive.div, {
      ...scrollbarProps,
      ref: composeRefs2,
      style: { position: "absolute", ...scrollbarProps.style },
      onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
        const mainPointer = 0;
        if (event.button === mainPointer) {
          const element = event.target;
          element.setPointerCapture(event.pointerId);
          rectRef.current = scrollbar.getBoundingClientRect();
          prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
          document.body.style.webkitUserSelect = "none";
          if (context.viewport)
            context.viewport.style.scrollBehavior = "auto";
          handleDragScroll(event);
        }
      }),
      onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
      onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
        const element = event.target;
        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
        document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
        if (context.viewport)
          context.viewport.style.scrollBehavior = "";
        rectRef.current = null;
      })
    })
  });
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = React210.forwardRef((props, forwardedRef) => {
  const { forceMount, ...thumbProps } = props;
  const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
  return /* @__PURE__ */ jsx38(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsx38(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
});
var ScrollAreaThumbImpl = React210.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, style, ...thumbProps } = props;
  const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
  const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useComposedRefs(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = React210.useRef(undefined);
  const debounceScrollEnd = useDebounceCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = undefined;
    }
  }, 100);
  React210.useEffect(() => {
    const viewport = scrollAreaContext.viewport;
    if (viewport) {
      const handleScroll2 = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeUnlinkedScrollListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
  return /* @__PURE__ */ jsx38(Primitive.div, {
    "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
    ...thumbProps,
    ref: composedRef,
    style: {
      width: "var(--radix-scroll-area-thumb-width)",
      height: "var(--radix-scroll-area-thumb-height)",
      ...style
    },
    onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
      const thumb = event.target;
      const thumbRect = thumb.getBoundingClientRect();
      const x = event.clientX - thumbRect.left;
      const y = event.clientY - thumbRect.top;
      scrollbarContext.onThumbPointerDown({ x, y });
    }),
    onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
  });
});
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = React210.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
  const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
  const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
  return hasCorner ? /* @__PURE__ */ jsx38(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
});
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = React210.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = React210.useState(0);
  const [height, setHeight] = React210.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver2(context.scrollbarX, () => {
    const height2 = context.scrollbarX?.offsetHeight || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver2(context.scrollbarY, () => {
    const width2 = context.scrollbarY?.offsetWidth || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsx38(Primitive.div, {
    ...cornerProps,
    ref: forwardedRef,
    style: {
      width,
      height,
      position: "absolute",
      right: context.dir === "ltr" ? 0 : undefined,
      left: context.dir === "rtl" ? 0 : undefined,
      bottom: 0,
      ...props.style
    }
  }) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset4 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset4;
  const minPointerPos = sizes.scrollbar.paddingStart + offset4;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp2(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = React210.useRef(0);
  React210.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return React210.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver2(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root9 = ScrollArea;
var Viewport2 = ScrollAreaViewport;
var Scrollbar = ScrollAreaScrollbar;
var Thumb = ScrollAreaThumb;
var Corner = ScrollAreaCorner;

// ../../node_modules/.bun/@radix-ui+react-select@2.2.6+1356086b9384fa43/node_modules/@radix-ui/react-select/dist/index.mjs
var exports_dist23 = {};
__export(exports_dist23, {
  createSelectScope: () => createSelectScope,
  Viewport: () => Viewport3,
  Value: () => Value,
  Trigger: () => Trigger11,
  Separator: () => Separator3,
  SelectViewport: () => SelectViewport,
  SelectValue: () => SelectValue,
  SelectTrigger: () => SelectTrigger,
  SelectSeparator: () => SelectSeparator,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectPortal: () => SelectPortal,
  SelectLabel: () => SelectLabel,
  SelectItemText: () => SelectItemText,
  SelectItemIndicator: () => SelectItemIndicator,
  SelectItem: () => SelectItem,
  SelectIcon: () => SelectIcon,
  SelectGroup: () => SelectGroup,
  SelectContent: () => SelectContent,
  SelectArrow: () => SelectArrow,
  Select: () => Select,
  ScrollUpButton: () => ScrollUpButton,
  ScrollDownButton: () => ScrollDownButton,
  Root: () => Root211,
  Portal: () => Portal6,
  Label: () => Label5,
  ItemText: () => ItemText,
  ItemIndicator: () => ItemIndicator3,
  Item: () => Item6,
  Icon: () => Icon,
  Group: () => Group3,
  Content: () => Content29,
  Arrow: () => Arrow28
});
import * as React55 from "react";
import * as ReactDOM5 from "react-dom";
import { Fragment as Fragment11, jsx as jsx39, jsxs as jsxs7 } from "react/jsx-runtime";
"use client";
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS2 = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection7, useCollection7, createCollectionScope7] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [
  createCollectionScope7,
  createPopperScope
]);
var usePopperScope4 = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope4(__scopeSelect);
  const [trigger, setTrigger] = React55.useState(null);
  const [valueNode, setValueNode] = React55.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = React55.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = React55.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = React55.useState(/* @__PURE__ */ new Set);
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsx39(Root24, { ...popperScope, children: /* @__PURE__ */ jsxs7(SelectProvider, {
    required,
    scope: __scopeSelect,
    trigger,
    onTriggerChange: setTrigger,
    valueNode,
    onValueNodeChange: setValueNode,
    valueNodeHasChildren,
    onValueNodeHasChildrenChange: setValueNodeHasChildren,
    contentId: useId(),
    value,
    onValueChange: setValue,
    open,
    onOpenChange: setOpen,
    dir: direction,
    triggerPointerDownPosRef,
    disabled,
    children: [
      /* @__PURE__ */ jsx39(Collection7.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsx39(SelectNativeOptionsProvider, {
        scope: props.__scopeSelect,
        onNativeOptionAdd: React55.useCallback((option) => {
          setNativeOptionsSet((prev) => new Set(prev).add(option));
        }, []),
        onNativeOptionRemove: React55.useCallback((option) => {
          setNativeOptionsSet((prev) => {
            const optionsSet = new Set(prev);
            optionsSet.delete(option);
            return optionsSet;
          });
        }, []),
        children
      }) }),
      isFormControl ? /* @__PURE__ */ jsxs7(SelectBubbleInput, {
        "aria-hidden": true,
        required,
        tabIndex: -1,
        name,
        autoComplete,
        value,
        onChange: (event) => setValue(event.target.value),
        disabled,
        form,
        children: [
          value === undefined ? /* @__PURE__ */ jsx39("option", { value: "" }) : null,
          Array.from(nativeOptionsSet)
        ]
      }, nativeSelectKey) : null
    ]
  }) });
};
Select.displayName = SELECT_NAME;
var TRIGGER_NAME11 = "SelectTrigger";
var SelectTrigger = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, disabled = false, ...triggerProps } = props;
  const popperScope = usePopperScope4(__scopeSelect);
  const context = useSelectContext(TRIGGER_NAME11, __scopeSelect);
  const isDisabled = context.disabled || disabled;
  const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
  const getItems = useCollection7(__scopeSelect);
  const pointerTypeRef = React55.useRef("touch");
  const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
    const enabledItems = getItems().filter((item) => !item.disabled);
    const currentItem = enabledItems.find((item) => item.value === context.value);
    const nextItem = findNextItem(enabledItems, search, currentItem);
    if (nextItem !== undefined) {
      context.onValueChange(nextItem.value);
    }
  });
  const handleOpen = (pointerEvent) => {
    if (!isDisabled) {
      context.onOpenChange(true);
      resetTypeahead();
    }
    if (pointerEvent) {
      context.triggerPointerDownPosRef.current = {
        x: Math.round(pointerEvent.pageX),
        y: Math.round(pointerEvent.pageY)
      };
    }
  };
  return /* @__PURE__ */ jsx39(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx39(Primitive.button, {
    type: "button",
    role: "combobox",
    "aria-controls": context.contentId,
    "aria-expanded": context.open,
    "aria-required": context.required,
    "aria-autocomplete": "none",
    dir: context.dir,
    "data-state": context.open ? "open" : "closed",
    disabled: isDisabled,
    "data-disabled": isDisabled ? "" : undefined,
    "data-placeholder": shouldShowPlaceholder(context.value) ? "" : undefined,
    ...triggerProps,
    ref: composedRefs,
    onClick: composeEventHandlers(triggerProps.onClick, (event) => {
      event.currentTarget.focus();
      if (pointerTypeRef.current !== "mouse") {
        handleOpen(event);
      }
    }),
    onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
      pointerTypeRef.current = event.pointerType;
      const target = event.target;
      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }
      if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
        handleOpen(event);
        event.preventDefault();
      }
    }),
    onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
      const isTypingAhead = searchRef.current !== "";
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (!isModifierKey && event.key.length === 1)
        handleTypeaheadSearch(event.key);
      if (isTypingAhead && event.key === " ")
        return;
      if (OPEN_KEYS.includes(event.key)) {
        handleOpen();
        event.preventDefault();
      }
    })
  }) });
});
SelectTrigger.displayName = TRIGGER_NAME11;
var VALUE_NAME = "SelectValue";
var SelectValue = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
  const context = useSelectContext(VALUE_NAME, __scopeSelect);
  const { onValueNodeHasChildrenChange } = context;
  const hasChildren = children !== undefined;
  const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
  useLayoutEffect2(() => {
    onValueNodeHasChildrenChange(hasChildren);
  }, [onValueNodeHasChildrenChange, hasChildren]);
  return /* @__PURE__ */ jsx39(Primitive.span, {
    ...valueProps,
    ref: composedRefs,
    style: { pointerEvents: "none" },
    children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsx39(Fragment11, { children: placeholder }) : children
  });
});
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, children, ...iconProps } = props;
  return /* @__PURE__ */ jsx39(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "▼" });
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME10 = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsx39(Portal, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME10;
var CONTENT_NAME13 = "SelectContent";
var SelectContent = React55.forwardRef((props, forwardedRef) => {
  const context = useSelectContext(CONTENT_NAME13, props.__scopeSelect);
  const [fragment, setFragment] = React55.useState();
  useLayoutEffect2(() => {
    setFragment(new DocumentFragment);
  }, []);
  if (!context.open) {
    const frag = fragment;
    return frag ? ReactDOM5.createPortal(/* @__PURE__ */ jsx39(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsx39(Collection7.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsx39("div", { children: props.children }) }) }), frag) : null;
  }
  return /* @__PURE__ */ jsx39(SelectContentImpl, { ...props, ref: forwardedRef });
});
SelectContent.displayName = CONTENT_NAME13;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME13);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot5 = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = React55.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    position = "item-aligned",
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    avoidCollisions,
    ...contentProps
  } = props;
  const context = useSelectContext(CONTENT_NAME13, __scopeSelect);
  const [content, setContent] = React55.useState(null);
  const [viewport, setViewport] = React55.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const [selectedItem, setSelectedItem] = React55.useState(null);
  const [selectedItemText, setSelectedItemText] = React55.useState(null);
  const getItems = useCollection7(__scopeSelect);
  const [isPositioned, setIsPositioned] = React55.useState(false);
  const firstValidItemFoundRef = React55.useRef(false);
  React55.useEffect(() => {
    if (content)
      return hideOthers(content);
  }, [content]);
  useFocusGuards();
  const focusFirst5 = React55.useCallback((candidates) => {
    const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
    const [lastItem] = restItems.slice(-1);
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
        return;
      candidate?.scrollIntoView({ block: "nearest" });
      if (candidate === firstItem && viewport)
        viewport.scrollTop = 0;
      if (candidate === lastItem && viewport)
        viewport.scrollTop = viewport.scrollHeight;
      candidate?.focus();
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
        return;
    }
  }, [getItems, viewport]);
  const focusSelectedItem = React55.useCallback(() => focusFirst5([selectedItem, content]), [focusFirst5, selectedItem, content]);
  React55.useEffect(() => {
    if (isPositioned) {
      focusSelectedItem();
    }
  }, [isPositioned, focusSelectedItem]);
  const { onOpenChange, triggerPointerDownPosRef } = context;
  React55.useEffect(() => {
    if (content) {
      let pointerMoveDelta = { x: 0, y: 0 };
      const handlePointerMove = (event) => {
        pointerMoveDelta = {
          x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
          y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
        };
      };
      const handlePointerUp = (event) => {
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
          event.preventDefault();
        } else {
          if (!content.contains(event.target)) {
            onOpenChange(false);
          }
        }
        document.removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.current = null;
      };
      if (triggerPointerDownPosRef.current !== null) {
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
      }
      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp, { capture: true });
      };
    }
  }, [content, onOpenChange, triggerPointerDownPosRef]);
  React55.useEffect(() => {
    const close = () => onOpenChange(false);
    window.addEventListener("blur", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("blur", close);
      window.removeEventListener("resize", close);
    };
  }, [onOpenChange]);
  const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
    const enabledItems = getItems().filter((item) => !item.disabled);
    const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
    const nextItem = findNextItem(enabledItems, search, currentItem);
    if (nextItem) {
      setTimeout(() => nextItem.ref.current.focus());
    }
  });
  const itemRefCallback = React55.useCallback((node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
    const isSelectedItem = context.value !== undefined && context.value === value;
    if (isSelectedItem || isFirstValidItem) {
      setSelectedItem(node);
      if (isFirstValidItem)
        firstValidItemFoundRef.current = true;
    }
  }, [context.value]);
  const handleItemLeave = React55.useCallback(() => content?.focus(), [content]);
  const itemTextRefCallback = React55.useCallback((node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
    const isSelectedItem = context.value !== undefined && context.value === value;
    if (isSelectedItem || isFirstValidItem) {
      setSelectedItemText(node);
    }
  }, [context.value]);
  const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
  const popperContentProps = SelectPosition === SelectPopperPosition ? {
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    avoidCollisions
  } : {};
  return /* @__PURE__ */ jsx39(SelectContentProvider, {
    scope: __scopeSelect,
    content,
    viewport,
    onViewportChange: setViewport,
    itemRefCallback,
    selectedItem,
    onItemLeave: handleItemLeave,
    itemTextRefCallback,
    focusSelectedItem,
    selectedItemText,
    position,
    isPositioned,
    searchRef,
    children: /* @__PURE__ */ jsx39(Combination_default, { as: Slot5, allowPinchZoom: true, children: /* @__PURE__ */ jsx39(FocusScope, {
      asChild: true,
      trapped: context.open,
      onMountAutoFocus: (event) => {
        event.preventDefault();
      },
      onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
        context.trigger?.focus({ preventScroll: true });
        event.preventDefault();
      }),
      children: /* @__PURE__ */ jsx39(DismissableLayer, {
        asChild: true,
        disableOutsidePointerEvents: true,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: () => context.onOpenChange(false),
        children: /* @__PURE__ */ jsx39(SelectPosition, {
          role: "listbox",
          id: context.contentId,
          "data-state": context.open ? "open" : "closed",
          dir: context.dir,
          onContextMenu: (event) => event.preventDefault(),
          ...contentProps,
          ...popperContentProps,
          onPlaced: () => setIsPositioned(true),
          ref: composedRefs,
          style: {
            display: "flex",
            flexDirection: "column",
            outline: "none",
            ...contentProps.style
          },
          onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
            if (event.key === "Tab")
              event.preventDefault();
            if (!isModifierKey && event.key.length === 1)
              handleTypeaheadSearch(event.key);
            if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
              const items = getItems().filter((item) => !item.disabled);
              let candidateNodes = items.map((item) => item.ref.current);
              if (["ArrowUp", "End"].includes(event.key)) {
                candidateNodes = candidateNodes.slice().reverse();
              }
              if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                const currentElement = event.target;
                const currentIndex = candidateNodes.indexOf(currentElement);
                candidateNodes = candidateNodes.slice(currentIndex + 1);
              }
              setTimeout(() => focusFirst5(candidateNodes));
              event.preventDefault();
            }
          })
        })
      })
    }) })
  });
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME13, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME13, __scopeSelect);
  const [contentWrapper, setContentWrapper] = React55.useState(null);
  const [content, setContent] = React55.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection7(__scopeSelect);
  const shouldExpandOnScrollRef = React55.useRef(false);
  const shouldRepositionRef = React55.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = React55.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp2(left, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp2(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced?.();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = React55.useState();
  useLayoutEffect2(() => {
    if (content)
      setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = React55.useCallback((node) => {
    if (node && shouldRepositionRef.current === true) {
      position();
      focusSelectedItem?.();
      shouldRepositionRef.current = false;
    }
  }, [position, focusSelectedItem]);
  return /* @__PURE__ */ jsx39(SelectViewportProvider, {
    scope: __scopeSelect,
    contentWrapper,
    shouldExpandOnScrollRef,
    onScrollButtonChange: handleScrollButtonChange,
    children: /* @__PURE__ */ jsx39("div", {
      ref: setContentWrapper,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: contentZIndex
      },
      children: /* @__PURE__ */ jsx39(Primitive.div, {
        ...popperProps,
        ref: composedRefs,
        style: {
          boxSizing: "border-box",
          maxHeight: "100%",
          ...popperProps.style
        }
      })
    })
  });
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = React55.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope4(__scopeSelect);
  return /* @__PURE__ */ jsx39(Content5, {
    ...popperScope,
    ...popperProps,
    ref: forwardedRef,
    align,
    collisionPadding,
    style: {
      boxSizing: "border-box",
      ...popperProps.style,
      ...{
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  });
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME13, {});
var VIEWPORT_NAME3 = "SelectViewport";
var SelectViewport = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, nonce, ...viewportProps } = props;
  const contentContext = useSelectContentContext(VIEWPORT_NAME3, __scopeSelect);
  const viewportContext = useSelectViewportContext(VIEWPORT_NAME3, __scopeSelect);
  const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
  const prevScrollTopRef = React55.useRef(0);
  return /* @__PURE__ */ jsxs7(Fragment11, { children: [
    /* @__PURE__ */ jsx39("style", {
      dangerouslySetInnerHTML: {
        __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
      },
      nonce
    }),
    /* @__PURE__ */ jsx39(Collection7.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsx39(Primitive.div, {
      "data-radix-select-viewport": "",
      role: "presentation",
      ...viewportProps,
      ref: composedRefs,
      style: {
        position: "relative",
        flex: 1,
        overflow: "hidden auto",
        ...viewportProps.style
      },
      onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
        const viewport = event.currentTarget;
        const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
        if (shouldExpandOnScrollRef?.current && contentWrapper) {
          const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
          if (scrolledBy > 0) {
            const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
            const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
            const cssHeight = parseFloat(contentWrapper.style.height);
            const prevHeight = Math.max(cssMinHeight, cssHeight);
            if (prevHeight < availableHeight) {
              const nextHeight = prevHeight + scrolledBy;
              const clampedNextHeight = Math.min(availableHeight, nextHeight);
              const heightDiff = nextHeight - clampedNextHeight;
              contentWrapper.style.height = clampedNextHeight + "px";
              if (contentWrapper.style.bottom === "0px") {
                viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                contentWrapper.style.justifyContent = "flex-end";
              }
            }
          }
        }
        prevScrollTopRef.current = viewport.scrollTop;
      })
    }) })
  ] });
});
SelectViewport.displayName = VIEWPORT_NAME3;
var GROUP_NAME6 = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME6);
var SelectGroup = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, ...groupProps } = props;
  const groupId = useId();
  return /* @__PURE__ */ jsx39(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsx39(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
});
SelectGroup.displayName = GROUP_NAME6;
var LABEL_NAME5 = "SelectLabel";
var SelectLabel = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, ...labelProps } = props;
  const groupContext = useSelectGroupContext(LABEL_NAME5, __scopeSelect);
  return /* @__PURE__ */ jsx39(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
});
SelectLabel.displayName = LABEL_NAME5;
var ITEM_NAME9 = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME9);
var SelectItem = React55.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    value,
    disabled = false,
    textValue: textValueProp,
    ...itemProps
  } = props;
  const context = useSelectContext(ITEM_NAME9, __scopeSelect);
  const contentContext = useSelectContentContext(ITEM_NAME9, __scopeSelect);
  const isSelected = context.value === value;
  const [textValue, setTextValue] = React55.useState(textValueProp ?? "");
  const [isFocused, setIsFocused] = React55.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, (node) => contentContext.itemRefCallback?.(node, value, disabled));
  const textId = useId();
  const pointerTypeRef = React55.useRef("touch");
  const handleSelect = () => {
    if (!disabled) {
      context.onValueChange(value);
      context.onOpenChange(false);
    }
  };
  if (value === "") {
    throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
  }
  return /* @__PURE__ */ jsx39(SelectItemContextProvider, {
    scope: __scopeSelect,
    value,
    disabled,
    textId,
    isSelected,
    onItemTextChange: React55.useCallback((node) => {
      setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
    }, []),
    children: /* @__PURE__ */ jsx39(Collection7.ItemSlot, {
      scope: __scopeSelect,
      value,
      disabled,
      textValue,
      children: /* @__PURE__ */ jsx39(Primitive.div, {
        role: "option",
        "aria-labelledby": textId,
        "data-highlighted": isFocused ? "" : undefined,
        "aria-selected": isSelected && isFocused,
        "data-state": isSelected ? "checked" : "unchecked",
        "aria-disabled": disabled || undefined,
        "data-disabled": disabled ? "" : undefined,
        tabIndex: disabled ? undefined : -1,
        ...itemProps,
        ref: composedRefs,
        onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
        onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
        onClick: composeEventHandlers(itemProps.onClick, () => {
          if (pointerTypeRef.current !== "mouse")
            handleSelect();
        }),
        onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
          if (pointerTypeRef.current === "mouse")
            handleSelect();
        }),
        onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
        }),
        onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
          pointerTypeRef.current = event.pointerType;
          if (disabled) {
            contentContext.onItemLeave?.();
          } else if (pointerTypeRef.current === "mouse") {
            event.currentTarget.focus({ preventScroll: true });
          }
        }),
        onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
          if (event.currentTarget === document.activeElement) {
            contentContext.onItemLeave?.();
          }
        }),
        onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
          const isTypingAhead = contentContext.searchRef?.current !== "";
          if (isTypingAhead && event.key === " ")
            return;
          if (SELECTION_KEYS2.includes(event.key))
            handleSelect();
          if (event.key === " ")
            event.preventDefault();
        })
      })
    })
  });
});
SelectItem.displayName = ITEM_NAME9;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, className, style, ...itemTextProps } = props;
  const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
  const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
  const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
  const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
  const [itemTextNode, setItemTextNode] = React55.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setItemTextNode(node), itemContext.onItemTextChange, (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled));
  const textContent = itemTextNode?.textContent;
  const nativeOption = React55.useMemo(() => /* @__PURE__ */ jsx39("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value), [itemContext.disabled, itemContext.value, textContent]);
  const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
  useLayoutEffect2(() => {
    onNativeOptionAdd(nativeOption);
    return () => onNativeOptionRemove(nativeOption);
  }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
  return /* @__PURE__ */ jsxs7(Fragment11, { children: [
    /* @__PURE__ */ jsx39(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
    itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? ReactDOM5.createPortal(itemTextProps.children, context.valueNode) : null
  ] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME2 = "SelectItemIndicator";
var SelectItemIndicator = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, ...itemIndicatorProps } = props;
  const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME2, __scopeSelect);
  return itemContext.isSelected ? /* @__PURE__ */ jsx39(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME2;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = React55.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = React55.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll22 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      var handleScroll2 = handleScroll22;
      const viewport = contentContext.viewport;
      handleScroll22();
      viewport.addEventListener("scroll", handleScroll22);
      return () => viewport.removeEventListener("scroll", handleScroll22);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsx39(SelectScrollButtonImpl, {
    ...props,
    ref: composedRefs,
    onAutoScroll: () => {
      const { viewport, selectedItem } = contentContext;
      if (viewport && selectedItem) {
        viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
      }
    }
  }) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = React55.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = React55.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll22 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      var handleScroll2 = handleScroll22;
      const viewport = contentContext.viewport;
      handleScroll22();
      viewport.addEventListener("scroll", handleScroll22);
      return () => viewport.removeEventListener("scroll", handleScroll22);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsx39(SelectScrollButtonImpl, {
    ...props,
    ref: composedRefs,
    onAutoScroll: () => {
      const { viewport, selectedItem } = contentContext;
      if (viewport && selectedItem) {
        viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
      }
    }
  }) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = React55.useRef(null);
  const getItems = useCollection7(__scopeSelect);
  const clearAutoScrollTimer = React55.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  React55.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    activeItem?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsx39(Primitive.div, {
    "aria-hidden": true,
    ...scrollIndicatorProps,
    ref: forwardedRef,
    style: { flexShrink: 0, ...scrollIndicatorProps.style },
    onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
      if (autoScrollTimerRef.current === null) {
        autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
      }
    }),
    onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
      contentContext.onItemLeave?.();
      if (autoScrollTimerRef.current === null) {
        autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
      }
    }),
    onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
      clearAutoScrollTimer();
    })
  });
});
var SEPARATOR_NAME5 = "SelectSeparator";
var SelectSeparator = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, ...separatorProps } = props;
  return /* @__PURE__ */ jsx39(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
});
SelectSeparator.displayName = SEPARATOR_NAME5;
var ARROW_NAME8 = "SelectArrow";
var SelectArrow = React55.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, ...arrowProps } = props;
  const popperScope = usePopperScope4(__scopeSelect);
  const context = useSelectContext(ARROW_NAME8, __scopeSelect);
  const contentContext = useSelectContentContext(ARROW_NAME8, __scopeSelect);
  return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsx39(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
});
SelectArrow.displayName = ARROW_NAME8;
var BUBBLE_INPUT_NAME2 = "SelectBubbleInput";
var SelectBubbleInput = React55.forwardRef(({ __scopeSelect, value, ...props }, forwardedRef) => {
  const ref = React55.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const prevValue = usePrevious(value);
  React55.useEffect(() => {
    const select = ref.current;
    if (!select)
      return;
    const selectProto = window.HTMLSelectElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
    const setValue = descriptor.set;
    if (prevValue !== value && setValue) {
      const event = new Event("change", { bubbles: true });
      setValue.call(select, value);
      select.dispatchEvent(event);
    }
  }, [prevValue, value]);
  return /* @__PURE__ */ jsx39(Primitive.select, {
    ...props,
    style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
    ref: composedRefs,
    defaultValue: value
  });
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME2;
function shouldShowPlaceholder(value) {
  return value === "" || value === undefined;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = React55.useRef("");
  const timerRef = React55.useRef(0);
  const handleTypeaheadSearch = React55.useCallback((key) => {
    const search = searchRef.current + key;
    handleSearchChange(search);
    (function updateSearch(value) {
      searchRef.current = value;
      window.clearTimeout(timerRef.current);
      if (value !== "")
        timerRef.current = window.setTimeout(() => updateSearch(""), 1000);
    })(search);
  }, [handleSearchChange]);
  const resetTypeahead = React55.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  React55.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray4(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem)
    wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find((item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextItem !== currentItem ? nextItem : undefined;
}
function wrapArray4(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root211 = Select;
var Trigger11 = SelectTrigger;
var Value = SelectValue;
var Icon = SelectIcon;
var Portal6 = SelectPortal;
var Content29 = SelectContent;
var Viewport3 = SelectViewport;
var Group3 = SelectGroup;
var Label5 = SelectLabel;
var Item6 = SelectItem;
var ItemText = SelectItemText;
var ItemIndicator3 = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton;
var ScrollDownButton = SelectScrollDownButton;
var Separator3 = SelectSeparator;
var Arrow28 = SelectArrow;

// ../../node_modules/.bun/@radix-ui+react-separator@1.1.7+1356086b9384fa43/node_modules/@radix-ui/react-separator/dist/index.mjs
var exports_dist24 = {};
__export(exports_dist24, {
  Separator: () => Separator5,
  Root: () => Root10
});
import * as React56 from "react";
import { jsx as jsx40 } from "react/jsx-runtime";
var NAME4 = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator5 = React56.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : undefined;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsx40(Primitive.div, {
    "data-orientation": orientation,
    ...semanticProps,
    ...domProps,
    ref: forwardedRef
  });
});
Separator5.displayName = NAME4;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root10 = Separator5;

// ../../node_modules/.bun/@radix-ui+react-tabs@1.1.13+1356086b9384fa43/node_modules/@radix-ui/react-tabs/dist/index.mjs
var exports_dist25 = {};
__export(exports_dist25, {
  createTabsScope: () => createTabsScope,
  Trigger: () => Trigger12,
  TabsTrigger: () => TabsTrigger,
  TabsList: () => TabsList,
  TabsContent: () => TabsContent,
  Tabs: () => Tabs,
  Root: () => Root212,
  List: () => List2,
  Content: () => Content7
});
import * as React57 from "react";
import { jsx as jsx41 } from "react/jsx-runtime";
"use client";
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope5 = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = React57.forwardRef((props, forwardedRef) => {
  const {
    __scopeTabs,
    value: valueProp,
    onValueChange,
    defaultValue,
    orientation = "horizontal",
    dir,
    activationMode = "automatic",
    ...tabsProps
  } = props;
  const direction = useDirection(dir);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
    defaultProp: defaultValue ?? "",
    caller: TABS_NAME
  });
  return /* @__PURE__ */ jsx41(TabsProvider, {
    scope: __scopeTabs,
    baseId: useId(),
    value,
    onValueChange: setValue,
    orientation,
    dir: direction,
    activationMode,
    children: /* @__PURE__ */ jsx41(Primitive.div, {
      dir: direction,
      "data-orientation": orientation,
      ...tabsProps,
      ref: forwardedRef
    })
  });
});
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = React57.forwardRef((props, forwardedRef) => {
  const { __scopeTabs, loop = true, ...listProps } = props;
  const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
  const rovingFocusGroupScope = useRovingFocusGroupScope5(__scopeTabs);
  return /* @__PURE__ */ jsx41(Root7, {
    asChild: true,
    ...rovingFocusGroupScope,
    orientation: context.orientation,
    dir: context.dir,
    loop,
    children: /* @__PURE__ */ jsx41(Primitive.div, {
      role: "tablist",
      "aria-orientation": context.orientation,
      ...listProps,
      ref: forwardedRef
    })
  });
});
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME12 = "TabsTrigger";
var TabsTrigger = React57.forwardRef((props, forwardedRef) => {
  const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
  const context = useTabsContext(TRIGGER_NAME12, __scopeTabs);
  const rovingFocusGroupScope = useRovingFocusGroupScope5(__scopeTabs);
  const triggerId = makeTriggerId2(context.baseId, value);
  const contentId = makeContentId2(context.baseId, value);
  const isSelected = value === context.value;
  return /* @__PURE__ */ jsx41(Item2, {
    asChild: true,
    ...rovingFocusGroupScope,
    focusable: !disabled,
    active: isSelected,
    children: /* @__PURE__ */ jsx41(Primitive.button, {
      type: "button",
      role: "tab",
      "aria-selected": isSelected,
      "aria-controls": contentId,
      "data-state": isSelected ? "active" : "inactive",
      "data-disabled": disabled ? "" : undefined,
      disabled,
      id: triggerId,
      ...triggerProps,
      ref: forwardedRef,
      onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
        if (!disabled && event.button === 0 && event.ctrlKey === false) {
          context.onValueChange(value);
        } else {
          event.preventDefault();
        }
      }),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        if ([" ", "Enter"].includes(event.key))
          context.onValueChange(value);
      }),
      onFocus: composeEventHandlers(props.onFocus, () => {
        const isAutomaticActivation = context.activationMode !== "manual";
        if (!isSelected && !disabled && isAutomaticActivation) {
          context.onValueChange(value);
        }
      })
    })
  });
});
TabsTrigger.displayName = TRIGGER_NAME12;
var CONTENT_NAME14 = "TabsContent";
var TabsContent = React57.forwardRef((props, forwardedRef) => {
  const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
  const context = useTabsContext(CONTENT_NAME14, __scopeTabs);
  const triggerId = makeTriggerId2(context.baseId, value);
  const contentId = makeContentId2(context.baseId, value);
  const isSelected = value === context.value;
  const isMountAnimationPreventedRef = React57.useRef(isSelected);
  React57.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  return /* @__PURE__ */ jsx41(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsx41(Primitive.div, {
    "data-state": isSelected ? "active" : "inactive",
    "data-orientation": context.orientation,
    role: "tabpanel",
    "aria-labelledby": triggerId,
    hidden: !present,
    id: contentId,
    tabIndex: 0,
    ...contentProps,
    ref: forwardedRef,
    style: {
      ...props.style,
      animationDuration: isMountAnimationPreventedRef.current ? "0s" : undefined
    },
    children: present && children
  }) });
});
TabsContent.displayName = CONTENT_NAME14;
function makeTriggerId2(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId2(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root212 = Tabs;
var List2 = TabsList;
var Trigger12 = TabsTrigger;
var Content7 = TabsContent;

// ../../node_modules/.bun/@radix-ui+react-toggle@1.1.10+1356086b9384fa43/node_modules/@radix-ui/react-toggle/dist/index.mjs
var exports_dist26 = {};
__export(exports_dist26, {
  Toggle: () => Toggle,
  Root: () => Root11
});
import * as React58 from "react";
import { jsx as jsx43 } from "react/jsx-runtime";
"use client";
var NAME5 = "Toggle";
var Toggle = React58.forwardRef((props, forwardedRef) => {
  const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
  const [pressed, setPressed] = useControllableState({
    prop: pressedProp,
    onChange: onPressedChange,
    defaultProp: defaultPressed ?? false,
    caller: NAME5
  });
  return /* @__PURE__ */ jsx43(Primitive.button, {
    type: "button",
    "aria-pressed": pressed,
    "data-state": pressed ? "on" : "off",
    "data-disabled": props.disabled ? "" : undefined,
    ...buttonProps,
    ref: forwardedRef,
    onClick: composeEventHandlers(props.onClick, () => {
      if (!props.disabled) {
        setPressed(!pressed);
      }
    })
  });
});
Toggle.displayName = NAME5;
var Root11 = Toggle;

// ../../node_modules/.bun/@radix-ui+react-toggle-group@1.1.11+1356086b9384fa43/node_modules/@radix-ui/react-toggle-group/dist/index.mjs
var exports_dist27 = {};
__export(exports_dist27, {
  createToggleGroupScope: () => createToggleGroupScope,
  ToggleGroupItem: () => ToggleGroupItem,
  ToggleGroup: () => ToggleGroup,
  Root: () => Root213,
  Item: () => Item26
});
import React59 from "react";
import { jsx as jsx45 } from "react/jsx-runtime";
"use client";
var TOGGLE_GROUP_NAME = "ToggleGroup";
var [createToggleGroupContext, createToggleGroupScope] = createContextScope(TOGGLE_GROUP_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope6 = createRovingFocusGroupScope();
var ToggleGroup = React59.forwardRef((props, forwardedRef) => {
  const { type, ...toggleGroupProps } = props;
  if (type === "single") {
    const singleProps = toggleGroupProps;
    return /* @__PURE__ */ jsx45(ToggleGroupImplSingle, { ...singleProps, ref: forwardedRef });
  }
  if (type === "multiple") {
    const multipleProps = toggleGroupProps;
    return /* @__PURE__ */ jsx45(ToggleGroupImplMultiple, { ...multipleProps, ref: forwardedRef });
  }
  throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
});
ToggleGroup.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupValueProvider, useToggleGroupValueContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImplSingle = React59.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    ...toggleGroupSingleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? "",
    onChange: onValueChange,
    caller: TOGGLE_GROUP_NAME
  });
  return /* @__PURE__ */ jsx45(ToggleGroupValueProvider, {
    scope: props.__scopeToggleGroup,
    type: "single",
    value: React59.useMemo(() => value ? [value] : [], [value]),
    onItemActivate: setValue,
    onItemDeactivate: React59.useCallback(() => setValue(""), [setValue]),
    children: /* @__PURE__ */ jsx45(ToggleGroupImpl, { ...toggleGroupSingleProps, ref: forwardedRef })
  });
});
var ToggleGroupImplMultiple = React59.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    ...toggleGroupMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: TOGGLE_GROUP_NAME
  });
  const handleButtonActivate = React59.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
  const handleButtonDeactivate = React59.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
  return /* @__PURE__ */ jsx45(ToggleGroupValueProvider, {
    scope: props.__scopeToggleGroup,
    type: "multiple",
    value,
    onItemActivate: handleButtonActivate,
    onItemDeactivate: handleButtonDeactivate,
    children: /* @__PURE__ */ jsx45(ToggleGroupImpl, { ...toggleGroupMultipleProps, ref: forwardedRef })
  });
});
ToggleGroup.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupContext, useToggleGroupContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImpl = React59.forwardRef((props, forwardedRef) => {
  const {
    __scopeToggleGroup,
    disabled = false,
    rovingFocus = true,
    orientation,
    dir,
    loop = true,
    ...toggleGroupProps
  } = props;
  const rovingFocusGroupScope = useRovingFocusGroupScope6(__scopeToggleGroup);
  const direction = useDirection(dir);
  const commonProps = { role: "group", dir: direction, ...toggleGroupProps };
  return /* @__PURE__ */ jsx45(ToggleGroupContext, { scope: __scopeToggleGroup, rovingFocus, disabled, children: rovingFocus ? /* @__PURE__ */ jsx45(Root7, {
    asChild: true,
    ...rovingFocusGroupScope,
    orientation,
    dir: direction,
    loop,
    children: /* @__PURE__ */ jsx45(Primitive.div, { ...commonProps, ref: forwardedRef })
  }) : /* @__PURE__ */ jsx45(Primitive.div, { ...commonProps, ref: forwardedRef }) });
});
var ITEM_NAME10 = "ToggleGroupItem";
var ToggleGroupItem = React59.forwardRef((props, forwardedRef) => {
  const valueContext = useToggleGroupValueContext(ITEM_NAME10, props.__scopeToggleGroup);
  const context = useToggleGroupContext(ITEM_NAME10, props.__scopeToggleGroup);
  const rovingFocusGroupScope = useRovingFocusGroupScope6(props.__scopeToggleGroup);
  const pressed = valueContext.value.includes(props.value);
  const disabled = context.disabled || props.disabled;
  const commonProps = { ...props, pressed, disabled };
  const ref = React59.useRef(null);
  return context.rovingFocus ? /* @__PURE__ */ jsx45(Item2, {
    asChild: true,
    ...rovingFocusGroupScope,
    focusable: !disabled,
    active: pressed,
    ref,
    children: /* @__PURE__ */ jsx45(ToggleGroupItemImpl, { ...commonProps, ref: forwardedRef })
  }) : /* @__PURE__ */ jsx45(ToggleGroupItemImpl, { ...commonProps, ref: forwardedRef });
});
ToggleGroupItem.displayName = ITEM_NAME10;
var ToggleGroupItemImpl = React59.forwardRef((props, forwardedRef) => {
  const { __scopeToggleGroup, value, ...itemProps } = props;
  const valueContext = useToggleGroupValueContext(ITEM_NAME10, __scopeToggleGroup);
  const singleProps = { role: "radio", "aria-checked": props.pressed, "aria-pressed": undefined };
  const typeProps = valueContext.type === "single" ? singleProps : undefined;
  return /* @__PURE__ */ jsx45(Toggle, {
    ...typeProps,
    ...itemProps,
    ref: forwardedRef,
    onPressedChange: (pressed) => {
      if (pressed) {
        valueContext.onItemActivate(value);
      } else {
        valueContext.onItemDeactivate(value);
      }
    }
  });
});
var Root213 = ToggleGroup;
var Item26 = ToggleGroupItem;

// ../../node_modules/.bun/@radix-ui+react-tooltip@1.2.8+1356086b9384fa43/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var exports_dist28 = {};
__export(exports_dist28, {
  createTooltipScope: () => createTooltipScope,
  Trigger: () => Trigger13,
  TooltipTrigger: () => TooltipTrigger,
  TooltipProvider: () => TooltipProvider,
  TooltipPortal: () => TooltipPortal,
  TooltipContent: () => TooltipContent,
  TooltipArrow: () => TooltipArrow,
  Tooltip: () => Tooltip,
  Root: () => Root34,
  Provider: () => Provider,
  Portal: () => Portal7,
  Content: () => Content210,
  Arrow: () => Arrow29
});
import * as React60 from "react";
import { jsx as jsx46, jsxs as jsxs8 } from "react/jsx-runtime";
"use client";
var [createTooltipContext, createTooltipScope] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope5 = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const isOpenDelayedRef = React60.useRef(true);
  const isPointerInTransitRef = React60.useRef(false);
  const skipDelayTimerRef = React60.useRef(0);
  React60.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsx46(TooltipProviderContextProvider, {
    scope: __scopeTooltip,
    isOpenDelayedRef,
    delayDuration,
    onOpen: React60.useCallback(() => {
      window.clearTimeout(skipDelayTimerRef.current);
      isOpenDelayedRef.current = false;
    }, []),
    onClose: React60.useCallback(() => {
      window.clearTimeout(skipDelayTimerRef.current);
      skipDelayTimerRef.current = window.setTimeout(() => isOpenDelayedRef.current = true, skipDelayDuration);
    }, [skipDelayDuration]),
    isPointerInTransitRef,
    onPointerInTransitChange: React60.useCallback((inTransit) => {
      isPointerInTransitRef.current = inTransit;
    }, []),
    disableHoverableContent,
    children
  });
};
TooltipProvider.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope5(__scopeTooltip);
  const [trigger, setTrigger] = React60.useState(null);
  const contentId = useId();
  const openTimerRef = React60.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = React60.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange?.(open2);
    },
    caller: TOOLTIP_NAME
  });
  const stateAttribute = React60.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = React60.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = React60.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = React60.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  React60.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ jsx46(Root24, { ...popperScope, children: /* @__PURE__ */ jsx46(TooltipContextProvider, {
    scope: __scopeTooltip,
    contentId,
    open,
    stateAttribute,
    trigger,
    onTriggerChange: setTrigger,
    onTriggerEnter: React60.useCallback(() => {
      if (providerContext.isOpenDelayedRef.current)
        handleDelayedOpen();
      else
        handleOpen();
    }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
    onTriggerLeave: React60.useCallback(() => {
      if (disableHoverableContent) {
        handleClose();
      } else {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    }, [handleClose, disableHoverableContent]),
    onOpen: handleOpen,
    onClose: handleClose,
    disableHoverableContent,
    children
  }) });
};
Tooltip.displayName = TOOLTIP_NAME;
var TRIGGER_NAME13 = "TooltipTrigger";
var TooltipTrigger = React60.forwardRef((props, forwardedRef) => {
  const { __scopeTooltip, ...triggerProps } = props;
  const context = useTooltipContext(TRIGGER_NAME13, __scopeTooltip);
  const providerContext = useTooltipProviderContext(TRIGGER_NAME13, __scopeTooltip);
  const popperScope = usePopperScope5(__scopeTooltip);
  const ref = React60.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
  const isPointerDownRef = React60.useRef(false);
  const hasPointerMoveOpenedRef = React60.useRef(false);
  const handlePointerUp = React60.useCallback(() => isPointerDownRef.current = false, []);
  React60.useEffect(() => {
    return () => document.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerUp]);
  return /* @__PURE__ */ jsx46(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx46(Primitive.button, {
    "aria-describedby": context.open ? context.contentId : undefined,
    "data-state": context.stateAttribute,
    ...triggerProps,
    ref: composedRefs,
    onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
      if (event.pointerType === "touch")
        return;
      if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
        context.onTriggerEnter();
        hasPointerMoveOpenedRef.current = true;
      }
    }),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
      context.onTriggerLeave();
      hasPointerMoveOpenedRef.current = false;
    }),
    onPointerDown: composeEventHandlers(props.onPointerDown, () => {
      if (context.open) {
        context.onClose();
      }
      isPointerDownRef.current = true;
      document.addEventListener("pointerup", handlePointerUp, { once: true });
    }),
    onFocus: composeEventHandlers(props.onFocus, () => {
      if (!isPointerDownRef.current)
        context.onOpen();
    }),
    onBlur: composeEventHandlers(props.onBlur, context.onClose),
    onClick: composeEventHandlers(props.onClick, context.onClose)
  }) });
});
TooltipTrigger.displayName = TRIGGER_NAME13;
var PORTAL_NAME11 = "TooltipPortal";
var [PortalProvider5, usePortalContext5] = createTooltipContext(PORTAL_NAME11, {
  forceMount: undefined
});
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props;
  const context = useTooltipContext(PORTAL_NAME11, __scopeTooltip);
  return /* @__PURE__ */ jsx46(PortalProvider5, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsx46(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx46(Portal, { asChild: true, container, children }) }) });
};
TooltipPortal.displayName = PORTAL_NAME11;
var CONTENT_NAME15 = "TooltipContent";
var TooltipContent = React60.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext5(CONTENT_NAME15, props.__scopeTooltip);
  const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
  const context = useTooltipContext(CONTENT_NAME15, props.__scopeTooltip);
  return /* @__PURE__ */ jsx46(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsx46(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx46(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
});
var TooltipContentHoverable = React60.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME15, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME15, props.__scopeTooltip);
  const ref = React60.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = React60.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = React60.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = React60.useCallback((event, hoverTarget) => {
    const currentTarget = event.currentTarget;
    const exitPoint = { x: event.clientX, y: event.clientY };
    const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
    const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
    const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
    const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
    setPointerGraceArea(graceArea);
    onPointerInTransitChange(true);
  }, [onPointerInTransitChange]);
  React60.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  React60.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  React60.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
        const isPointerOutsideGraceArea = !isPointInPolygon2(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsx46(TooltipContentImpl, { ...props, ref: composedRefs });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var Slottable3 = createSlottable("TooltipContent");
var TooltipContentImpl = React60.forwardRef((props, forwardedRef) => {
  const {
    __scopeTooltip,
    children,
    "aria-label": ariaLabel,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...contentProps
  } = props;
  const context = useTooltipContext(CONTENT_NAME15, __scopeTooltip);
  const popperScope = usePopperScope5(__scopeTooltip);
  const { onClose } = context;
  React60.useEffect(() => {
    document.addEventListener(TOOLTIP_OPEN, onClose);
    return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
  }, [onClose]);
  React60.useEffect(() => {
    if (context.trigger) {
      const handleScroll2 = (event) => {
        const target = event.target;
        if (target?.contains(context.trigger))
          onClose();
      };
      window.addEventListener("scroll", handleScroll2, { capture: true });
      return () => window.removeEventListener("scroll", handleScroll2, { capture: true });
    }
  }, [context.trigger, onClose]);
  return /* @__PURE__ */ jsx46(DismissableLayer, {
    asChild: true,
    disableOutsidePointerEvents: false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside: (event) => event.preventDefault(),
    onDismiss: onClose,
    children: /* @__PURE__ */ jsxs8(Content5, {
      "data-state": context.stateAttribute,
      ...popperScope,
      ...contentProps,
      ref: forwardedRef,
      style: {
        ...contentProps.style,
        ...{
          "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
          "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
          "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
        }
      },
      children: [
        /* @__PURE__ */ jsx46(Slottable3, { children }),
        /* @__PURE__ */ jsx46(VisuallyHiddenContentContextProvider, { scope: __scopeTooltip, isInside: true, children: /* @__PURE__ */ jsx46(Root2, { id: context.contentId, role: "tooltip", children: ariaLabel || children }) })
      ]
    })
  });
});
TooltipContent.displayName = CONTENT_NAME15;
var ARROW_NAME9 = "TooltipArrow";
var TooltipArrow = React60.forwardRef((props, forwardedRef) => {
  const { __scopeTooltip, ...arrowProps } = props;
  const popperScope = usePopperScope5(__scopeTooltip);
  const visuallyHiddenContentContext = useVisuallyHiddenContentContext(ARROW_NAME9, __scopeTooltip);
  return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ jsx46(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
});
TooltipArrow.displayName = ARROW_NAME9;
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push({ x: exitPoint.x - padding, y: exitPoint.y + padding }, { x: exitPoint.x + padding, y: exitPoint.y + padding });
      break;
    case "bottom":
      paddedExitPoints.push({ x: exitPoint.x - padding, y: exitPoint.y - padding }, { x: exitPoint.x + padding, y: exitPoint.y - padding });
      break;
    case "left":
      paddedExitPoints.push({ x: exitPoint.x + padding, y: exitPoint.y - padding }, { x: exitPoint.x + padding, y: exitPoint.y + padding });
      break;
    case "right":
      paddedExitPoints.push({ x: exitPoint.x - padding, y: exitPoint.y - padding }, { x: exitPoint.x - padding, y: exitPoint.y + padding });
      break;
  }
  return paddedExitPoints;
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon2(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1;i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x)
      return -1;
    else if (a.x > b.x)
      return 1;
    else if (a.y < b.y)
      return -1;
    else if (a.y > b.y)
      return 1;
    else
      return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1)
    return points.slice();
  const upperHull = [];
  for (let i = 0;i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        upperHull.pop();
      else
        break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1;i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        lowerHull.pop();
      else
        break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
var Provider = TooltipProvider;
var Root34 = Tooltip;
var Trigger13 = TooltipTrigger;
var Portal7 = TooltipPortal;
var Content210 = TooltipContent;
var Arrow29 = TooltipArrow;

// ../componentry/dist/impetus/index.js
import { jsx as jsx34 } from "react/jsx-runtime";
import clsx32 from "clsx";
import { jsx as jsx44, jsxs as jsxs22 } from "react/jsx-runtime";
import clsx42 from "clsx";
import { jsx as jsx52, jsxs as jsxs32 } from "react/jsx-runtime";
import React61 from "react";
import { Link as RouterLink } from "react-router";
import { jsx as jsx62 } from "react/jsx-runtime";
import { jsx as jsx72, jsxs as jsxs42, Fragment as Fragment12 } from "react/jsx-runtime";
import clsx6 from "clsx";
import { jsx as jsx82 } from "react/jsx-runtime";
var LoadingBar = memo(({ className }) => /* @__PURE__ */ jsx210("div", {
  className: clsx5("loading-bar", className)
}));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
var SvgIcon3 = createSpriteIcon("lucide");
var Link22 = React61.forwardRef(function Link3(props, ref) {
  return /* @__PURE__ */ jsx62(RouterLink, {
    ...props,
    to: props.href,
    ref
  });
});
var MenubarContext = createContext6(null);

// ../componentry/dist/impetus/theme/index.js
import clsx7 from "clsx";
import { useEffect as useEffect33, useState as useState29 } from "react";

// ../../node_modules/.bun/next-themes@0.4.6+2b5434204782a989/node_modules/next-themes/dist/index.mjs
import * as t from "react";
"use client";
var M = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u)
    p(u);
  else
    try {
      let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
      p(y);
    } catch (n) {}
};
var x = t.createContext(undefined);
var U = { setTheme: (e) => {}, themes: [] };
var z = () => {
  var e;
  return (e = t.useContext(x)) != null ? e : U;
};
var _ = t.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return t.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M.toString()})(${p})` } });
});

// ../componentry/dist/impetus/theme/index.js
import { jsx as jsx48 } from "react/jsx-runtime";
var useTheme = z;
var THEME_OPTIONS = { theme: { light: "light", dark: "dark" } };
var ThemeSwitchButton = ({ themeContext, theme, spriteUrl, className, classTheme }) => {
  const [mounted, setMounted] = useState29(false);
  useEffect33(() => setMounted(true), []);
  const resolvedTheme = themeContext?.resolvedTheme;
  const setTheme = themeContext?.setTheme;
  if (!mounted)
    return null;
  return /* @__PURE__ */ jsx48("button", {
    type: "button",
    className: clsx7("size-5 hover:animate-rotate", classTheme),
    onClick: (e) => {
      if (!setTheme)
        return;
      setTheme(resolvedTheme === theme.theme.dark ? theme.theme.light : theme.theme.dark);
      e.preventDefault();
      e.stopPropagation();
    },
    "aria-label": "theme switch",
    children: resolvedTheme === theme.theme.dark ? /* @__PURE__ */ jsx48(SpriteIcon, {
      spriteUrl,
      iconId: "Moon",
      className: clsx7("size-5", className)
    }) : /* @__PURE__ */ jsx48(SpriteIcon, {
      spriteUrl,
      iconId: "Sun",
      className: clsx7("size-5", className)
    })
  });
};
var ThemeSwitch = ({ theme = THEME_OPTIONS, spriteUrl, className, classTheme, children }) => {
  const nextThemeContext = useTheme();
  const themeContext = nextThemeContext ? { resolvedTheme: nextThemeContext.resolvedTheme, setTheme: nextThemeContext.setTheme } : null;
  if (children) {
    return children({ themeContext, theme, spriteUrl, className, classTheme });
  }
  return /* @__PURE__ */ jsx48(ThemeSwitchButton, {
    themeContext,
    theme,
    spriteUrl,
    className,
    classTheme
  });
};

// ../componentry/dist/vibrant/index.js
import clsx24 from "clsx";
import clsx9 from "clsx";
import { jsx as jsx49 } from "react/jsx-runtime";
import { jsx as jsx212, jsxs as jsxs10 } from "react/jsx-runtime";
import clsx33 from "clsx";
import { jsx as jsx310, jsxs as jsxs23 } from "react/jsx-runtime";
import { jsx as jsx410, jsxs as jsxs33, Fragment as Fragment14 } from "react/jsx-runtime";
import clsx43 from "clsx";
import { jsx as jsx53 } from "react/jsx-runtime";
import React64 from "react";
import { Link as RouterLink2 } from "react-router";
import { jsx as jsx63 } from "react/jsx-runtime";
import { useId as useId2 } from "react";
import { createContext as createContext9, useContext as useContext8 } from "react";
import { jsx as jsx73 } from "react/jsx-runtime";
import { jsx as jsx83 } from "react/jsx-runtime";
import clsx53 from "clsx";
import { useEffect as useEffect35, useState as useState31 } from "react";
import { jsx as jsx92 } from "react/jsx-runtime";
import clsx62 from "clsx";
import { jsx as jsx102, jsxs as jsxs43 } from "react/jsx-runtime";
import clsx72 from "clsx";
import { jsx as jsx112, jsxs as jsxs52 } from "react/jsx-runtime";
import { jsx as jsx122, jsxs as jsxs62 } from "react/jsx-runtime";
import clsx8 from "clsx";
import { jsx as jsx132 } from "react/jsx-runtime";
import { jsx as jsx142, jsxs as jsxs72 } from "react/jsx-runtime";
import { jsx as jsx152, jsxs as jsxs82 } from "react/jsx-runtime";
import clsx92 from "clsx";
import { jsx as jsx162, jsxs as jsxs92 } from "react/jsx-runtime";
import { jsx as jsx172, jsxs as jsxs102 } from "react/jsx-runtime";
import clsx11 from "clsx";
import React212 from "react";
import { Await as Await3 } from "react-router";
import clsx10 from "clsx";
import { jsx as jsx182 } from "react/jsx-runtime";
import { jsx as jsx192 } from "react/jsx-runtime";
import { jsx as jsx202 } from "react/jsx-runtime";
import { jsx as jsx213 } from "react/jsx-runtime";
import clsx12 from "clsx";
import { jsx as jsx222 } from "react/jsx-runtime";
import { jsx as jsx232, jsxs as jsxs11 } from "react/jsx-runtime";
import clsx13 from "clsx";
import { jsx as jsx242 } from "react/jsx-runtime";
import { jsx as jsx252, jsxs as jsxs12 } from "react/jsx-runtime";
import { jsx as jsx262 } from "react/jsx-runtime";
import { jsx as jsx272 } from "react/jsx-runtime";
import { jsx as jsx282 } from "react/jsx-runtime";
import clsx14 from "clsx";
import { jsx as jsx292, jsxs as jsxs13 } from "react/jsx-runtime";
import clsx15 from "clsx";
import { jsx as jsx302, jsxs as jsxs14 } from "react/jsx-runtime";
import { jsx as jsx312, jsxs as jsxs15 } from "react/jsx-runtime";
import { jsx as jsx322, jsxs as jsxs16 } from "react/jsx-runtime";
import { jsx as jsx332, jsxs as jsxs17 } from "react/jsx-runtime";
import { jsx as jsx342, jsxs as jsxs18 } from "react/jsx-runtime";
import { jsx as jsx352, jsxs as jsxs19 } from "react/jsx-runtime";
import { jsx as jsx362 } from "react/jsx-runtime";
import { jsx as jsx372 } from "react/jsx-runtime";
import { jsx as jsx382 } from "react/jsx-runtime";
import { jsx as jsx392 } from "react/jsx-runtime";
import { jsx as jsx402 } from "react/jsx-runtime";
import { jsx as jsx412 } from "react/jsx-runtime";
import { jsx as jsx422, jsxs as jsxs20 } from "react/jsx-runtime";
import { jsx as jsx432 } from "react/jsx-runtime";
import { jsx as jsx442 } from "react/jsx-runtime";
import { jsx as jsx452, jsxs as jsxs21 } from "react/jsx-runtime";
import clsx16 from "clsx";
import { jsx as jsx462 } from "react/jsx-runtime";
import clsx17 from "clsx";
import { jsx as jsx472 } from "react/jsx-runtime";
import clsx18 from "clsx";
import { jsx as jsx482 } from "react/jsx-runtime";
import { jsx as jsx492, jsxs as jsxs222 } from "react/jsx-runtime";
import React310 from "react";
import { jsx as jsx50, jsxs as jsxs232 } from "react/jsx-runtime";
import React410 from "react";
import clsx19 from "clsx";
import { jsx as jsx51 } from "react/jsx-runtime";
import { jsx as jsx522, jsxs as jsxs24 } from "react/jsx-runtime";
import React510 from "react";
import { jsx as jsx532, jsxs as jsxs25 } from "react/jsx-runtime";
import React65 from "react";

// ../../node_modules/.bun/sonner@2.0.7+2b5434204782a989/node_modules/sonner/dist/index.mjs
import React62 from "react";
import ReactDOM6 from "react-dom";
"use client";
function __insertCSS(code) {
  if (!code || typeof document == "undefined")
    return;
  let head = document.head || document.getElementsByTagName("head")[0];
  let style = document.createElement("style");
  style.type = "text/css";
  head.appendChild(style);
  style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
var bars = Array(12).fill(0);
var toastsCounter = 1;

class Observer {
  constructor() {
    this.subscribe = (subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        const index2 = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index2, 1);
      };
    };
    this.publish = (data) => {
      this.subscribers.forEach((subscriber) => subscriber(data));
    };
    this.addToast = (data) => {
      this.publish(data);
      this.toasts = [
        ...this.toasts,
        data
      ];
    };
    this.create = (data) => {
      var _data_id;
      const { message, ...rest } = data;
      const id = typeof (data == null ? undefined : data.id) === "number" || ((_data_id = data.id) == null ? undefined : _data_id.length) > 0 ? data.id : toastsCounter++;
      const alreadyExists = this.toasts.find((toast) => {
        return toast.id === id;
      });
      const dismissible = data.dismissible === undefined ? true : data.dismissible;
      if (this.dismissedToasts.has(id)) {
        this.dismissedToasts.delete(id);
      }
      if (alreadyExists) {
        this.toasts = this.toasts.map((toast) => {
          if (toast.id === id) {
            this.publish({
              ...toast,
              ...data,
              id,
              title: message
            });
            return {
              ...toast,
              ...data,
              id,
              dismissible,
              title: message
            };
          }
          return toast;
        });
      } else {
        this.addToast({
          title: message,
          ...rest,
          dismissible,
          id
        });
      }
      return id;
    };
    this.dismiss = (id) => {
      if (id) {
        this.dismissedToasts.add(id);
        requestAnimationFrame(() => this.subscribers.forEach((subscriber) => subscriber({
          id,
          dismiss: true
        })));
      } else {
        this.toasts.forEach((toast) => {
          this.subscribers.forEach((subscriber) => subscriber({
            id: toast.id,
            dismiss: true
          }));
        });
      }
      return id;
    };
    this.message = (message, data) => {
      return this.create({
        ...data,
        message
      });
    };
    this.error = (message, data) => {
      return this.create({
        ...data,
        message,
        type: "error"
      });
    };
    this.success = (message, data) => {
      return this.create({
        ...data,
        type: "success",
        message
      });
    };
    this.info = (message, data) => {
      return this.create({
        ...data,
        type: "info",
        message
      });
    };
    this.warning = (message, data) => {
      return this.create({
        ...data,
        type: "warning",
        message
      });
    };
    this.loading = (message, data) => {
      return this.create({
        ...data,
        type: "loading",
        message
      });
    };
    this.promise = (promise, data) => {
      if (!data) {
        return;
      }
      let id = undefined;
      if (data.loading !== undefined) {
        id = this.create({
          ...data,
          promise,
          type: "loading",
          message: data.loading,
          description: typeof data.description !== "function" ? data.description : undefined
        });
      }
      const p = Promise.resolve(promise instanceof Function ? promise() : promise);
      let shouldDismiss = id !== undefined;
      let result;
      const originalPromise = p.then(async (response) => {
        result = [
          "resolve",
          response
        ];
        const isReactElementResponse = React62.isValidElement(response);
        if (isReactElementResponse) {
          shouldDismiss = false;
          this.create({
            id,
            type: "default",
            message: response
          });
        } else if (isHttpResponse(response) && !response.ok) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
          const description = typeof data.description === "function" ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React62.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (response instanceof Error) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(response) : data.error;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React62.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (data.success !== undefined) {
          shouldDismiss = false;
          const promiseData = typeof data.success === "function" ? await data.success(response) : data.success;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React62.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "success",
            description,
            ...toastSettings
          });
        }
      }).catch(async (error) => {
        result = [
          "reject",
          error
        ];
        if (data.error !== undefined) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(error) : data.error;
          const description = typeof data.description === "function" ? await data.description(error) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React62.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        }
      }).finally(() => {
        if (shouldDismiss) {
          this.dismiss(id);
          id = undefined;
        }
        data.finally == null || data.finally.call(data);
      });
      const unwrap = () => new Promise((resolve, reject) => originalPromise.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject));
      if (typeof id !== "string" && typeof id !== "number") {
        return {
          unwrap
        };
      } else {
        return Object.assign(id, {
          unwrap
        });
      }
    };
    this.custom = (jsx49, data) => {
      const id = (data == null ? undefined : data.id) || toastsCounter++;
      this.create({
        jsx: jsx49(id),
        id,
        ...data
      });
      return id;
    };
    this.getActiveToasts = () => {
      return this.toasts.filter((toast) => !this.dismissedToasts.has(toast.id));
    };
    this.subscribers = [];
    this.toasts = [];
    this.dismissedToasts = new Set;
  }
}
var ToastState = new Observer;
var toastFunction = (message, data) => {
  const id = (data == null ? undefined : data.id) || toastsCounter++;
  ToastState.addToast({
    title: message,
    ...data,
    id
  });
  return id;
};
var isHttpResponse = (data) => {
  return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
};
var basicToast = toastFunction;
var getHistory = () => ToastState.toasts;
var getToasts = () => ToastState.getActiveToasts();
var toast = Object.assign(basicToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
  custom: ToastState.custom,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading
}, {
  getHistory,
  getToasts
});
__insertCSS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");

// ../componentry/dist/vibrant/index.js
import { jsx as jsx54, jsxs as jsxs26 } from "react/jsx-runtime";
import React72 from "react";
import { jsx as jsx55, jsxs as jsxs27 } from "react/jsx-runtime";
import React82 from "react";
import { jsx as jsx56, jsxs as jsxs28 } from "react/jsx-runtime";
import React92 from "react";
import { jsx as jsx57 } from "react/jsx-runtime";
import { jsx as jsx58, jsxs as jsxs29 } from "react/jsx-runtime";
import clsx232 from "clsx";
import React102 from "react";
import clsx21 from "clsx";

// ../../node_modules/.bun/cmdk@1.1.1+1356086b9384fa43/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var U2 = 1;
var Y = 0.9;
var H = 0.8;
var J2 = 0.17;
var p = 0.1;
var u = 0.999;
var $ = 0.9999;
var k = 0.99;
var m = /[\\\/_+.#"@\[\(\{&]/;
var B = /[\\\/_+.#"@\[\(\{&]/g;
var K = /[\s-]/;
var X = /[\s-]/g;
function G(_2, C, h, P, A, f, O) {
  if (f === C.length)
    return A === _2.length ? U2 : k;
  var T = `${A},${f}`;
  if (O[T] !== undefined)
    return O[T];
  for (var L = P.charAt(f), c = h.indexOf(L, A), S = 0, E, N, R, M2;c >= 0; )
    E = G(_2, C, h, P, c + 1, f + 1, O), E > S && (c === A ? E *= U2 : m.test(_2.charAt(c - 1)) ? (E *= H, R = _2.slice(A, c - 1).match(B), R && A > 0 && (E *= Math.pow(u, R.length))) : K.test(_2.charAt(c - 1)) ? (E *= Y, M2 = _2.slice(A, c - 1).match(X), M2 && A > 0 && (E *= Math.pow(u, M2.length))) : (E *= J2, A > 0 && (E *= Math.pow(u, c - A))), _2.charAt(c) !== C.charAt(f) && (E *= $)), (E < p && h.charAt(c - 1) === P.charAt(f + 1) || P.charAt(f + 1) === P.charAt(f) && h.charAt(c - 1) !== P.charAt(f)) && (N = G(_2, C, h, P, c + 1, f + 2, O), N * p > E && (E = N * p)), E > S && (S = E), c = h.indexOf(L, c + 1);
  return O[T] = S, S;
}
function D(_2) {
  return _2.toLowerCase().replace(X, " ");
}
function W(_2, C, h) {
  return _2 = h && h.length > 0 ? `${_2 + " " + h.join(" ")}` : _2, G(_2, C, D(_2), D(C), 0, 0, {});
}

// ../../node_modules/.bun/cmdk@1.1.1+1356086b9384fa43/node_modules/cmdk/dist/index.mjs
import * as t2 from "react";
"use client";
var N = '[cmdk-group=""]';
var Y2 = '[cmdk-group-items=""]';
var be = '[cmdk-group-heading=""]';
var le = '[cmdk-item=""]';
var ce = `${le}:not([aria-disabled="true"])`;
var Z = "cmdk-item-select";
var T = "data-value";
var Re = (r, o, n) => W(r, o, n);
var ue = t2.createContext(undefined);
var K2 = () => t2.useContext(ue);
var de = t2.createContext(undefined);
var ee = () => t2.useContext(de);
var fe = t2.createContext(undefined);
var me = t2.forwardRef((r, o) => {
  let n = L(() => {
    var e, a;
    return { search: "", value: (a = (e = r.value) != null ? e : r.defaultValue) != null ? a : "", selectedItemId: undefined, filtered: { count: 0, items: new Map, groups: new Set } };
  }), u2 = L(() => new Set), c = L(() => new Map), d = L(() => new Map), f = L(() => new Set), p2 = pe(r), { label: b, children: m2, value: R, onValueChange: x2, filter: C, shouldFilter: S, loop: A, disablePointerSelection: ge = false, vimBindings: j = true, ...O } = r, $2 = useId(), q = useId(), _2 = useId(), I = t2.useRef(null), v = ke();
  k2(() => {
    if (R !== undefined) {
      let e = R.trim();
      n.current.value = e, E.emit();
    }
  }, [R]), k2(() => {
    v(6, ne);
  }, []);
  let E = t2.useMemo(() => ({ subscribe: (e) => (f.current.add(e), () => f.current.delete(e)), snapshot: () => n.current, setState: (e, a, s) => {
    var i, l, g, y;
    if (!Object.is(n.current[e], a)) {
      if (n.current[e] = a, e === "search")
        J3(), z2(), v(1, W2);
      else if (e === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let h = document.getElementById(_2);
          h ? h.focus() : (i = document.getElementById($2)) == null || i.focus();
        }
        if (v(7, () => {
          var h;
          n.current.selectedItemId = (h = M2()) == null ? undefined : h.id, E.emit();
        }), s || v(5, ne), ((l = p2.current) == null ? undefined : l.value) !== undefined) {
          let h = a != null ? a : "";
          (y = (g = p2.current).onValueChange) == null || y.call(g, h);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    f.current.forEach((e) => e());
  } }), []), U3 = t2.useMemo(() => ({ value: (e, a, s) => {
    var i;
    a !== ((i = d.current.get(e)) == null ? undefined : i.value) && (d.current.set(e, { value: a, keywords: s }), n.current.filtered.items.set(e, te(a, s)), v(2, () => {
      z2(), E.emit();
    }));
  }, item: (e, a) => (u2.current.add(e), a && (c.current.has(a) ? c.current.get(a).add(e) : c.current.set(a, new Set([e]))), v(3, () => {
    J3(), z2(), n.current.value || W2(), E.emit();
  }), () => {
    d.current.delete(e), u2.current.delete(e), n.current.filtered.items.delete(e);
    let s = M2();
    v(4, () => {
      J3(), (s == null ? undefined : s.getAttribute("id")) === e && W2(), E.emit();
    });
  }), group: (e) => (c.current.has(e) || c.current.set(e, new Set), () => {
    d.current.delete(e), c.current.delete(e);
  }), filter: () => p2.current.shouldFilter, label: b || r["aria-label"], getDisablePointerSelection: () => p2.current.disablePointerSelection, listId: $2, inputId: _2, labelId: q, listInnerRef: I }), []);
  function te(e, a) {
    var i, l;
    let s = (l = (i = p2.current) == null ? undefined : i.filter) != null ? l : Re;
    return e ? s(e, n.current.search, a) : 0;
  }
  function z2() {
    if (!n.current.search || p2.current.shouldFilter === false)
      return;
    let e = n.current.filtered.items, a = [];
    n.current.filtered.groups.forEach((i) => {
      let l = c.current.get(i), g = 0;
      l.forEach((y) => {
        let h = e.get(y);
        g = Math.max(h, g);
      }), a.push([i, g]);
    });
    let s = I.current;
    V().sort((i, l) => {
      var h, F;
      let g = i.getAttribute("id"), y = l.getAttribute("id");
      return ((h = e.get(y)) != null ? h : 0) - ((F = e.get(g)) != null ? F : 0);
    }).forEach((i) => {
      let l = i.closest(Y2);
      l ? l.appendChild(i.parentElement === l ? i : i.closest(`${Y2} > *`)) : s.appendChild(i.parentElement === s ? i : i.closest(`${Y2} > *`));
    }), a.sort((i, l) => l[1] - i[1]).forEach((i) => {
      var g;
      let l = (g = I.current) == null ? undefined : g.querySelector(`${N}[${T}="${encodeURIComponent(i[0])}"]`);
      l == null || l.parentElement.appendChild(l);
    });
  }
  function W2() {
    let e = V().find((s) => s.getAttribute("aria-disabled") !== "true"), a = e == null ? undefined : e.getAttribute(T);
    E.setState("value", a || undefined);
  }
  function J3() {
    var a, s, i, l;
    if (!n.current.search || p2.current.shouldFilter === false) {
      n.current.filtered.count = u2.current.size;
      return;
    }
    n.current.filtered.groups = new Set;
    let e = 0;
    for (let g of u2.current) {
      let y = (s = (a = d.current.get(g)) == null ? undefined : a.value) != null ? s : "", h = (l = (i = d.current.get(g)) == null ? undefined : i.keywords) != null ? l : [], F = te(y, h);
      n.current.filtered.items.set(g, F), F > 0 && e++;
    }
    for (let [g, y] of c.current)
      for (let h of y)
        if (n.current.filtered.items.get(h) > 0) {
          n.current.filtered.groups.add(g);
          break;
        }
    n.current.filtered.count = e;
  }
  function ne() {
    var a, s, i;
    let e = M2();
    e && (((a = e.parentElement) == null ? undefined : a.firstChild) === e && ((i = (s = e.closest(N)) == null ? undefined : s.querySelector(be)) == null || i.scrollIntoView({ block: "nearest" })), e.scrollIntoView({ block: "nearest" }));
  }
  function M2() {
    var e;
    return (e = I.current) == null ? undefined : e.querySelector(`${le}[aria-selected="true"]`);
  }
  function V() {
    var e;
    return Array.from(((e = I.current) == null ? undefined : e.querySelectorAll(ce)) || []);
  }
  function X2(e) {
    let s = V()[e];
    s && E.setState("value", s.getAttribute(T));
  }
  function Q(e) {
    var g;
    let a = M2(), s = V(), i = s.findIndex((y) => y === a), l = s[i + e];
    (g = p2.current) != null && g.loop && (l = i + e < 0 ? s[s.length - 1] : i + e === s.length ? s[0] : s[i + e]), l && E.setState("value", l.getAttribute(T));
  }
  function re(e) {
    let a = M2(), s = a == null ? undefined : a.closest(N), i;
    for (;s && !i; )
      s = e > 0 ? we(s, N) : De(s, N), i = s == null ? undefined : s.querySelector(ce);
    i ? E.setState("value", i.getAttribute(T)) : Q(e);
  }
  let oe = () => X2(V().length - 1), ie = (e) => {
    e.preventDefault(), e.metaKey ? oe() : e.altKey ? re(1) : Q(1);
  }, se = (e) => {
    e.preventDefault(), e.metaKey ? X2(0) : e.altKey ? re(-1) : Q(-1);
  };
  return t2.createElement(Primitive.div, { ref: o, tabIndex: -1, ...O, "cmdk-root": "", onKeyDown: (e) => {
    var s;
    (s = O.onKeyDown) == null || s.call(O, e);
    let a = e.nativeEvent.isComposing || e.keyCode === 229;
    if (!(e.defaultPrevented || a))
      switch (e.key) {
        case "n":
        case "j": {
          j && e.ctrlKey && ie(e);
          break;
        }
        case "ArrowDown": {
          ie(e);
          break;
        }
        case "p":
        case "k": {
          j && e.ctrlKey && se(e);
          break;
        }
        case "ArrowUp": {
          se(e);
          break;
        }
        case "Home": {
          e.preventDefault(), X2(0);
          break;
        }
        case "End": {
          e.preventDefault(), oe();
          break;
        }
        case "Enter": {
          e.preventDefault();
          let i = M2();
          if (i) {
            let l = new Event(Z);
            i.dispatchEvent(l);
          }
        }
      }
  } }, t2.createElement("label", { "cmdk-label": "", htmlFor: U3.inputId, id: U3.labelId, style: Te }, b), B2(r, (e) => t2.createElement(de.Provider, { value: E }, t2.createElement(ue.Provider, { value: U3 }, e))));
});
var he = t2.forwardRef((r, o) => {
  var _2, I;
  let n = useId(), u2 = t2.useRef(null), c = t2.useContext(fe), d = K2(), f = pe(r), p2 = (I = (_2 = f.current) == null ? undefined : _2.forceMount) != null ? I : c == null ? undefined : c.forceMount;
  k2(() => {
    if (!p2)
      return d.item(n, c == null ? undefined : c.id);
  }, [p2]);
  let b = ve(n, u2, [r.value, r.children, u2], r.keywords), m2 = ee(), R = P((v) => v.value && v.value === b.current), x2 = P((v) => p2 || d.filter() === false ? true : v.search ? v.filtered.items.get(n) > 0 : true);
  t2.useEffect(() => {
    let v = u2.current;
    if (!(!v || r.disabled))
      return v.addEventListener(Z, C), () => v.removeEventListener(Z, C);
  }, [x2, r.onSelect, r.disabled]);
  function C() {
    var v, E;
    S(), (E = (v = f.current).onSelect) == null || E.call(v, b.current);
  }
  function S() {
    m2.setState("value", b.current, true);
  }
  if (!x2)
    return null;
  let { disabled: A, value: ge, onSelect: j, forceMount: O, keywords: $2, ...q } = r;
  return t2.createElement(Primitive.div, { ref: composeRefs(u2, o), ...q, id: n, "cmdk-item": "", role: "option", "aria-disabled": !!A, "aria-selected": !!R, "data-disabled": !!A, "data-selected": !!R, onPointerMove: A || d.getDisablePointerSelection() ? undefined : S, onClick: A ? undefined : C }, r.children);
});
var Ee = t2.forwardRef((r, o) => {
  let { heading: n, children: u2, forceMount: c, ...d } = r, f = useId(), p2 = t2.useRef(null), b = t2.useRef(null), m2 = useId(), R = K2(), x2 = P((S) => c || R.filter() === false ? true : S.search ? S.filtered.groups.has(f) : true);
  k2(() => R.group(f), []), ve(f, p2, [r.value, r.heading, b]);
  let C = t2.useMemo(() => ({ id: f, forceMount: c }), [c]);
  return t2.createElement(Primitive.div, { ref: composeRefs(p2, o), ...d, "cmdk-group": "", role: "presentation", hidden: x2 ? undefined : true }, n && t2.createElement("div", { ref: b, "cmdk-group-heading": "", "aria-hidden": true, id: m2 }, n), B2(r, (S) => t2.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? m2 : undefined }, t2.createElement(fe.Provider, { value: C }, S))));
});
var ye = t2.forwardRef((r, o) => {
  let { alwaysRender: n, ...u2 } = r, c = t2.useRef(null), d = P((f) => !f.search);
  return !n && !d ? null : t2.createElement(Primitive.div, { ref: composeRefs(c, o), ...u2, "cmdk-separator": "", role: "separator" });
});
var Se = t2.forwardRef((r, o) => {
  let { onValueChange: n, ...u2 } = r, c = r.value != null, d = ee(), f = P((m2) => m2.search), p2 = P((m2) => m2.selectedItemId), b = K2();
  return t2.useEffect(() => {
    r.value != null && d.setState("search", r.value);
  }, [r.value]), t2.createElement(Primitive.input, { ref: o, ...u2, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: false, "aria-autocomplete": "list", role: "combobox", "aria-expanded": true, "aria-controls": b.listId, "aria-labelledby": b.labelId, "aria-activedescendant": p2, id: b.inputId, type: "text", value: c ? r.value : f, onChange: (m2) => {
    c || d.setState("search", m2.target.value), n == null || n(m2.target.value);
  } });
});
var Ce = t2.forwardRef((r, o) => {
  let { children: n, label: u2 = "Suggestions", ...c } = r, d = t2.useRef(null), f = t2.useRef(null), p2 = P((m2) => m2.selectedItemId), b = K2();
  return t2.useEffect(() => {
    if (f.current && d.current) {
      let m2 = f.current, R = d.current, x2, C = new ResizeObserver(() => {
        x2 = requestAnimationFrame(() => {
          let S = m2.offsetHeight;
          R.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
        });
      });
      return C.observe(m2), () => {
        cancelAnimationFrame(x2), C.unobserve(m2);
      };
    }
  }, []), t2.createElement(Primitive.div, { ref: composeRefs(d, o), ...c, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": p2, "aria-label": u2, id: b.listId }, B2(r, (m2) => t2.createElement("div", { ref: composeRefs(f, b.listInnerRef), "cmdk-list-sizer": "" }, m2)));
});
var xe = t2.forwardRef((r, o) => {
  let { open: n, onOpenChange: u2, overlayClassName: c, contentClassName: d, container: f, ...p2 } = r;
  return t2.createElement(Root4, { open: n, onOpenChange: u2 }, t2.createElement(Portal2, { container: f }, t2.createElement(Overlay, { "cmdk-overlay": "", className: c }), t2.createElement(Content3, { "aria-label": r.label, "cmdk-dialog": "", className: d }, t2.createElement(me, { ref: o, ...p2 }))));
});
var Ie = t2.forwardRef((r, o) => P((u2) => u2.filtered.count === 0) ? t2.createElement(Primitive.div, { ref: o, ...r, "cmdk-empty": "", role: "presentation" }) : null);
var Pe = t2.forwardRef((r, o) => {
  let { progress: n, children: u2, label: c = "Loading...", ...d } = r;
  return t2.createElement(Primitive.div, { ref: o, ...d, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": c }, B2(r, (f) => t2.createElement("div", { "aria-hidden": true }, f)));
});
var _e = Object.assign(me, { List: Ce, Item: he, Input: Se, Group: Ee, Separator: ye, Dialog: xe, Empty: Ie, Loading: Pe });
function we(r, o) {
  let n = r.nextElementSibling;
  for (;n; ) {
    if (n.matches(o))
      return n;
    n = n.nextElementSibling;
  }
}
function De(r, o) {
  let n = r.previousElementSibling;
  for (;n; ) {
    if (n.matches(o))
      return n;
    n = n.previousElementSibling;
  }
}
function pe(r) {
  let o = t2.useRef(r);
  return k2(() => {
    o.current = r;
  }), o;
}
var k2 = typeof window == "undefined" ? t2.useEffect : t2.useLayoutEffect;
function L(r) {
  let o = t2.useRef();
  return o.current === undefined && (o.current = r()), o;
}
function P(r) {
  let o = ee(), n = () => r(o.snapshot());
  return t2.useSyncExternalStore(o.subscribe, n, n);
}
function ve(r, o, n, u2 = []) {
  let c = t2.useRef(), d = K2();
  return k2(() => {
    var b;
    let f = (() => {
      var m2;
      for (let R of n) {
        if (typeof R == "string")
          return R.trim();
        if (typeof R == "object" && "current" in R)
          return R.current ? (m2 = R.current.textContent) == null ? undefined : m2.trim() : c.current;
      }
    })(), p2 = u2.map((m2) => m2.trim());
    d.value(r, f, p2), (b = o.current) == null || b.setAttribute(T, f), c.current = f;
  }), c;
}
var ke = () => {
  let [r, o] = t2.useState(), n = L(() => new Map);
  return k2(() => {
    n.current.forEach((u2) => u2()), n.current = new Map;
  }, [r]), (u2, c) => {
    n.current.set(u2, c), o({});
  };
};
function Me(r) {
  let o = r.type;
  return typeof o == "function" ? o(r.props) : ("render" in o) ? o.render(r.props) : r;
}
function B2({ asChild: r, children: o }, n) {
  return r && t2.isValidElement(o) ? t2.cloneElement(Me(o), { ref: o.ref }, n(o.props.children)) : n(o);
}
var Te = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };

// ../componentry/dist/vibrant/index.js
import clsx20 from "clsx";
import { jsx as jsx59, jsxs as jsxs30 } from "react/jsx-runtime";
import { jsx as jsx60, jsxs as jsxs31 } from "react/jsx-runtime";
import clsx222 from "clsx";
import { jsx as jsx61 } from "react/jsx-runtime";
import { jsx as jsx622, jsxs as jsxs322 } from "react/jsx-runtime";
import React112 from "react";
import { jsx as jsx632, jsxs as jsxs332 } from "react/jsx-runtime";
import clsx242 from "clsx";
import React122 from "react";
import { jsx as jsx64, jsxs as jsxs34 } from "react/jsx-runtime";
import React132 from "react";
import { jsx as jsx65, jsxs as jsxs35 } from "react/jsx-runtime";
import clsx25 from "clsx";
import { jsx as jsx66, jsxs as jsxs36 } from "react/jsx-runtime";
import { jsx as jsx67, jsxs as jsxs37 } from "react/jsx-runtime";
import React142 from "react";
import { jsx as jsx68, jsxs as jsxs38 } from "react/jsx-runtime";
import React152 from "react";
import { jsx as jsx69, jsxs as jsxs39 } from "react/jsx-runtime";
import React162 from "react";
import { jsx as jsx70, jsxs as jsxs40 } from "react/jsx-runtime";
import { jsx as jsx71, jsxs as jsxs41 } from "react/jsx-runtime";
import React172 from "react";
import { jsx as jsx722, jsxs as jsxs422 } from "react/jsx-runtime";
import clsx26 from "clsx";
import { jsx as jsx732 } from "react/jsx-runtime";
import { jsx as jsx74, jsxs as jsxs432 } from "react/jsx-runtime";
import { jsx as jsx75 } from "react/jsx-runtime";
import { jsx as jsx76 } from "react/jsx-runtime";
import React182 from "react";
import { jsx as jsx77, jsxs as jsxs44 } from "react/jsx-runtime";
import { jsx as jsx78, jsxs as jsxs45 } from "react/jsx-runtime";
import { jsx as jsx79, jsxs as jsxs46 } from "react/jsx-runtime";
import React192 from "react";
import { jsx as jsx80, jsxs as jsxs47 } from "react/jsx-runtime";
import React202 from "react";
import { jsx as jsx81, jsxs as jsxs48 } from "react/jsx-runtime";
import React213 from "react";
import { jsx as jsx822, jsxs as jsxs49 } from "react/jsx-runtime";
import clsx27 from "clsx";
import { jsx as jsx832, jsxs as jsxs50 } from "react/jsx-runtime";
import { jsx as jsx84, jsxs as jsxs51 } from "react/jsx-runtime";
import { jsx as jsx85, jsxs as jsxs522 } from "react/jsx-runtime";
import clsx28 from "clsx";
import { jsx as jsx86, jsxs as jsxs53 } from "react/jsx-runtime";
import { jsx as jsx87, jsxs as jsxs54 } from "react/jsx-runtime";
import { jsx as jsx88, jsxs as jsxs55 } from "react/jsx-runtime";
import React222 from "react";
import { jsx as jsx89, jsxs as jsxs56 } from "react/jsx-runtime";
import React232 from "react";
import clsx29 from "clsx";
import { jsx as jsx90 } from "react/jsx-runtime";
import { jsx as jsx91 } from "react/jsx-runtime";
import React242 from "react";
import clsx30 from "clsx";
import { jsx as jsx922 } from "react/jsx-runtime";
import { jsx as jsx93, jsxs as jsxs57 } from "react/jsx-runtime";
import { jsx as jsx94, jsxs as jsxs58 } from "react/jsx-runtime";
import React252 from "react";
import clsx31 from "clsx";
import { jsx as jsx95, jsxs as jsxs59 } from "react/jsx-runtime";
import clsx322 from "clsx";
import { jsx as jsx96 } from "react/jsx-runtime";
import { jsx as jsx97, jsxs as jsxs60 } from "react/jsx-runtime";
import { jsx as jsx98, jsxs as jsxs61 } from "react/jsx-runtime";
import { jsx as jsx99, jsxs as jsxs622 } from "react/jsx-runtime";
import { jsx as jsx100, jsxs as jsxs63 } from "react/jsx-runtime";
import { jsx as jsx101, jsxs as jsxs64 } from "react/jsx-runtime";
import { jsx as jsx1022, jsxs as jsxs65 } from "react/jsx-runtime";
import React262 from "react";
import clsx332 from "clsx";
import { jsx as jsx103, jsxs as jsxs66 } from "react/jsx-runtime";
import { jsx as jsx104, jsxs as jsxs67 } from "react/jsx-runtime";
import React272 from "react";
import { jsx as jsx105, jsxs as jsxs68 } from "react/jsx-runtime";
import clsx34 from "clsx";
import { jsx as jsx106 } from "react/jsx-runtime";
import { jsx as jsx107, jsxs as jsxs69 } from "react/jsx-runtime";
import { jsx as jsx108, jsxs as jsxs70 } from "react/jsx-runtime";
import { clsx as clsx36 } from "clsx";
import clsx35 from "clsx";
import React282 from "react";
import { jsx as jsx109, jsxs as jsxs71 } from "react/jsx-runtime";
import { jsx as jsx110 } from "react/jsx-runtime";
import { jsx as jsx111 } from "react/jsx-runtime";
import React292 from "react";
import clsx37 from "clsx";
import { jsx as jsx1122 } from "react/jsx-runtime";
import { jsx as jsx113, jsxs as jsxs722 } from "react/jsx-runtime";
import React302 from "react";
import { jsx as jsx114, jsxs as jsxs73 } from "react/jsx-runtime";
import clsx38 from "clsx";
import { jsx as jsx115 } from "react/jsx-runtime";
import { jsx as jsx116, jsxs as jsxs74 } from "react/jsx-runtime";
import React312 from "react";
import clsx39 from "clsx";
import { jsx as jsx117 } from "react/jsx-runtime";
import { jsx as jsx118, jsxs as jsxs75 } from "react/jsx-runtime";
import clsx40 from "clsx";
import { jsx as jsx119 } from "react/jsx-runtime";
import { jsx as jsx120 } from "react/jsx-runtime";
import { jsx as jsx121 } from "react/jsx-runtime";
import { jsx as jsx1222, jsxs as jsxs76 } from "react/jsx-runtime";
import { jsx as jsx123, jsxs as jsxs77 } from "react/jsx-runtime";
import React322 from "react";
import { jsx as jsx124, jsxs as jsxs78 } from "react/jsx-runtime";
import React332 from "react";
import { jsx as jsx125, jsxs as jsxs79 } from "react/jsx-runtime";
import clsx41 from "clsx";
import { jsx as jsx126 } from "react/jsx-runtime";
import { jsx as jsx127 } from "react/jsx-runtime";
import { jsx as jsx128 } from "react/jsx-runtime";
import clsx422 from "clsx";
import React342 from "react";
import { jsx as jsx129 } from "react/jsx-runtime";
import { jsx as jsx130, jsxs as jsxs80 } from "react/jsx-runtime";
import { jsx as jsx131, jsxs as jsxs81 } from "react/jsx-runtime";
import { jsx as jsx1322, jsxs as jsxs822 } from "react/jsx-runtime";
import { jsx as jsx133, jsxs as jsxs83 } from "react/jsx-runtime";
import { jsx as jsx134, jsxs as jsxs84 } from "react/jsx-runtime";
import { jsx as jsx135, jsxs as jsxs85 } from "react/jsx-runtime";
import { jsx as jsx136 } from "react/jsx-runtime";
import { jsx as jsx137 } from "react/jsx-runtime";
import { jsx as jsx138 } from "react/jsx-runtime";
import { jsx as jsx139, jsxs as jsxs86 } from "react/jsx-runtime";
import { jsx as jsx140, jsxs as jsxs87 } from "react/jsx-runtime";
import { jsx as jsx141 } from "react/jsx-runtime";
import { jsx as jsx1422, jsxs as jsxs88 } from "react/jsx-runtime";
import { jsx as jsx143 } from "react/jsx-runtime";
import { jsx as jsx144 } from "react/jsx-runtime";
import { jsx as jsx145 } from "react/jsx-runtime";
import { jsx as jsx146 } from "react/jsx-runtime";
import { jsx as jsx147 } from "react/jsx-runtime";
import { jsx as jsx148 } from "react/jsx-runtime";
import { jsx as jsx149 } from "react/jsx-runtime";
import { jsx as jsx150, jsxs as jsxs89 } from "react/jsx-runtime";
import { jsx as jsx151 } from "react/jsx-runtime";
import { jsx as jsx1522 } from "react/jsx-runtime";
import { jsx as jsx153 } from "react/jsx-runtime";
import { jsx as jsx154, jsxs as jsxs90 } from "react/jsx-runtime";
import { jsx as jsx155, jsxs as jsxs91 } from "react/jsx-runtime";
import clsx432 from "clsx";
import { jsx as jsx156 } from "react/jsx-runtime";
import clsx44 from "clsx";
import { jsx as jsx157 } from "react/jsx-runtime";
import clsx45 from "clsx";
import { useMemo as useMemo14 } from "react";
import { jsx as jsx158, jsxs as jsxs922 } from "react/jsx-runtime";
import clsx46 from "clsx";
import React362 from "react";

// ../../node_modules/.bun/react-hook-form@7.65.0+2f44e903108183df/node_modules/react-hook-form/dist/index.esm.mjs
import React63 from "react";
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
var isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  let copy;
  const isArray = Array.isArray(data);
  const isFileListInstance = typeof FileList !== "undefined" ? data instanceof FileList : false;
  if (data instanceof Date) {
    copy = new Date(data);
  } else if (!(isWeb && (data instanceof Blob || isFileListInstance)) && (isArray || isObject(data))) {
    copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
    if (!isArray && !isPlainObject(data)) {
      copy = data;
    } else {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = cloneObject(data[key]);
        }
      }
    }
  } else {
    return data;
  }
  return copy;
}
var isKey = (value) => /^\w*$/.test(value);
var isUndefined = (val) => val === undefined;
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const result = (isKey(path) ? [path] : stringToPath(path)).reduce((result2, key) => isNullOrUndefined(result2) ? result2 : result2[key], object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var set = (object, path, value) => {
  let index2 = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index2 < length) {
    const key = tempPath[index2];
    let newValue = value;
    if (index2 !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index2 + 1]) ? [] : {};
    }
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
var EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
};
var VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
var HookFormContext = React63.createContext(null);
HookFormContext.displayName = "HookFormContext";
var useFormContext = () => React63.useContext(HookFormContext);
var FormProvider = (props) => {
  const { children, ...data } = props;
  return React63.createElement(HookFormContext.Provider, { value: data }, children);
};
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {
    defaultValues: control._defaultValues
  };
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        localProxyFormState && (localProxyFormState[_key] = true);
        return formState[_key];
      }
    });
  }
  return result;
};
var useIsomorphicLayoutEffect2 = typeof window !== "undefined" ? React63.useLayoutEffect : React63.useEffect;
function useFormState(props) {
  const methods = useFormContext();
  const { control = methods.control, disabled, name, exact } = props || {};
  const [formState, updateFormState] = React63.useState(control._formState);
  const _localProxyFormState = React63.useRef({
    isDirty: false,
    isLoading: false,
    dirtyFields: false,
    touchedFields: false,
    validatingFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  });
  useIsomorphicLayoutEffect2(() => control._subscribe({
    name,
    formState: _localProxyFormState.current,
    exact,
    callback: (formState2) => {
      !disabled && updateFormState({
        ...control._formState,
        ...formState2
      });
    }
  }), [name, disabled, exact]);
  React63.useEffect(() => {
    _localProxyFormState.current.isValid && control._setValid(true);
  }, [control]);
  return React63.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual2(object1, object2, _internal_visited = new WeakSet) {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return object1 === object2;
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return object1.getTime() === object2.getTime();
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  if (_internal_visited.has(object1) || _internal_visited.has(object2)) {
    return true;
  }
  _internal_visited.add(object1);
  _internal_visited.add(object2);
  for (const key of keys1) {
    const val1 = object1[key];
    if (!keys2.includes(key)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual2(val1, val2, _internal_visited) : val1 !== val2) {
        return false;
      }
    }
  }
  return true;
}
function useWatch(props) {
  const methods = useFormContext();
  const { control = methods.control, name, defaultValue, disabled, exact, compute } = props || {};
  const _defaultValue = React63.useRef(defaultValue);
  const _compute = React63.useRef(compute);
  const _computeFormValues = React63.useRef(undefined);
  _compute.current = compute;
  const defaultValueMemo = React63.useMemo(() => control._getWatch(name, _defaultValue.current), [control, name]);
  const [value, updateValue] = React63.useState(_compute.current ? _compute.current(defaultValueMemo) : defaultValueMemo);
  useIsomorphicLayoutEffect2(() => control._subscribe({
    name,
    formState: {
      values: true
    },
    exact,
    callback: (formState) => {
      if (!disabled) {
        const formValues = generateWatchOutput(name, control._names, formState.values || control._formValues, false, _defaultValue.current);
        if (_compute.current) {
          const computedFormValues = _compute.current(formValues);
          if (!deepEqual2(computedFormValues, _computeFormValues.current)) {
            updateValue(computedFormValues);
            _computeFormValues.current = computedFormValues;
          }
        } else {
          updateValue(formValues);
        }
      }
    }
  }), [control, disabled, name, exact]);
  React63.useEffect(() => control._removeUnmounted());
  return value;
}
function useController(props) {
  const methods = useFormContext();
  const { name, disabled, control = methods.control, shouldUnregister, defaultValue } = props;
  const isArrayField = isNameInFieldArray(control._names.array, name);
  const defaultValueMemo = React63.useMemo(() => get(control._formValues, name, get(control._defaultValues, name, defaultValue)), [control, name, defaultValue]);
  const value = useWatch({
    control,
    name,
    defaultValue: defaultValueMemo,
    exact: true
  });
  const formState = useFormState({
    control,
    name,
    exact: true
  });
  const _props = React63.useRef(props);
  const _previousNameRef = React63.useRef(undefined);
  const _registerProps = React63.useRef(control.register(name, {
    ...props.rules,
    value,
    ...isBoolean(props.disabled) ? { disabled: props.disabled } : {}
  }));
  _props.current = props;
  const fieldState = React63.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: true,
      get: () => !!get(formState.errors, name)
    },
    isDirty: {
      enumerable: true,
      get: () => !!get(formState.dirtyFields, name)
    },
    isTouched: {
      enumerable: true,
      get: () => !!get(formState.touchedFields, name)
    },
    isValidating: {
      enumerable: true,
      get: () => !!get(formState.validatingFields, name)
    },
    error: {
      enumerable: true,
      get: () => get(formState.errors, name)
    }
  }), [formState, name]);
  const onChange = React63.useCallback((event) => _registerProps.current.onChange({
    target: {
      value: getEventValue(event),
      name
    },
    type: EVENTS.CHANGE
  }), [name]);
  const onBlur = React63.useCallback(() => _registerProps.current.onBlur({
    target: {
      value: get(control._formValues, name),
      name
    },
    type: EVENTS.BLUR
  }), [name, control._formValues]);
  const ref = React63.useCallback((elm) => {
    const field2 = get(control._fields, name);
    if (field2 && elm) {
      field2._f.ref = {
        focus: () => elm.focus && elm.focus(),
        select: () => elm.select && elm.select(),
        setCustomValidity: (message) => elm.setCustomValidity(message),
        reportValidity: () => elm.reportValidity()
      };
    }
  }, [control._fields, name]);
  const field = React63.useMemo(() => ({
    name,
    value,
    ...isBoolean(disabled) || formState.disabled ? { disabled: formState.disabled || disabled } : {},
    onChange,
    onBlur,
    ref
  }), [name, disabled, formState.disabled, onChange, onBlur, ref, value]);
  React63.useEffect(() => {
    const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
    const previousName = _previousNameRef.current;
    if (previousName && previousName !== name && !isArrayField) {
      control.unregister(previousName);
    }
    control.register(name, {
      ..._props.current.rules,
      ...isBoolean(_props.current.disabled) ? { disabled: _props.current.disabled } : {}
    });
    const updateMounted = (name2, value2) => {
      const field2 = get(control._fields, name2);
      if (field2 && field2._f) {
        field2._f.mount = value2;
      }
    };
    updateMounted(name, true);
    if (_shouldUnregisterField) {
      const value2 = cloneObject(get(control._options.defaultValues, name, _props.current.defaultValue));
      set(control._defaultValues, name, value2);
      if (isUndefined(get(control._formValues, name))) {
        set(control._formValues, name, value2);
      }
    }
    !isArrayField && control.register(name);
    _previousNameRef.current = name;
    return () => {
      (isArrayField ? _shouldUnregisterField && !control._state.action : _shouldUnregisterField) ? control.unregister(name) : updateMounted(name, false);
    };
  }, [name, control, isArrayField, shouldUnregister]);
  React63.useEffect(() => {
    control._setDisabledField({
      disabled,
      name
    });
  }, [disabled, name, control]);
  return React63.useMemo(() => ({
    field,
    formState,
    fieldState
  }), [field, formState, fieldState]);
}
var Controller = (props) => props.render(useController(props));
var defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};

// ../componentry/dist/vibrant/index.js
import { jsx as jsx159 } from "react/jsx-runtime";
import clsx47 from "clsx";
import { jsx as jsx160 } from "react/jsx-runtime";
import clsx48 from "clsx";
import { jsx as jsx161 } from "react/jsx-runtime";
import clsx49 from "clsx";
import { jsx as jsx1622 } from "react/jsx-runtime";
import clsx50 from "clsx";
import { jsx as jsx163, jsxs as jsxs93 } from "react/jsx-runtime";
import clsx51 from "clsx";
import React382 from "react";
import React372 from "react";
import { jsx as jsx164, jsxs as jsxs94 } from "react/jsx-runtime";
import { jsx as jsx165 } from "react/jsx-runtime";
var SvgIcon4 = createSpriteIcon("lucide");
var buttonVariants2 = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button({
  className,
  variant,
  size: size4,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "button";
  return /* @__PURE__ */ jsx49(Comp, {
    "data-slot": "button",
    className: clsx9(buttonVariants2({ variant, size: size4, className })),
    ...props
  });
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx212("nav", {
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    className: clsx24("mx-auto flex w-full justify-center", className),
    ...props
  });
}
function PaginationContent({ className, ...props }) {
  return /* @__PURE__ */ jsx212("ul", {
    "data-slot": "pagination-content",
    className: clsx24("flex flex-row items-center gap-1", className),
    ...props
  });
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx212("li", {
    "data-slot": "pagination-item",
    ...props
  });
}
function PaginationLink({ className, isActive, size: size4 = "icon", ...props }) {
  return /* @__PURE__ */ jsx212("a", {
    "aria-current": isActive ? "page" : undefined,
    "data-slot": "pagination-link",
    "data-active": isActive,
    className: clsx24(buttonVariants2({
      variant: isActive ? "outline" : "ghost",
      size: size4
    }), className),
    ...props
  });
}
function PaginationPrevious({ className, ...props }) {
  return /* @__PURE__ */ jsxs10(PaginationLink, {
    "aria-label": "Go to previous page",
    size: "default",
    className: clsx24("gap-1 px-2.5 sm:pl-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx212(SvgIcon4, {
        iconId: "ChevronLeft"
      }),
      /* @__PURE__ */ jsx212("span", {
        className: "hidden sm:block",
        children: "Previous"
      })
    ]
  });
}
function PaginationNext({ className, ...props }) {
  return /* @__PURE__ */ jsxs10(PaginationLink, {
    "aria-label": "Go to next page",
    size: "default",
    className: clsx24("gap-1 px-2.5 sm:pr-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx212("span", {
        className: "hidden sm:block",
        children: "Next"
      }),
      /* @__PURE__ */ jsx212(SvgIcon4, {
        iconId: "ChevronRight"
      })
    ]
  });
}
function PaginationEllipsis({ className, ...props }) {
  return /* @__PURE__ */ jsxs10("span", {
    "aria-hidden": true,
    "data-slot": "pagination-ellipsis",
    className: clsx24("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx212(SvgIcon4, {
        iconId: "Ellipsis",
        className: "size-4"
      }),
      /* @__PURE__ */ jsx212("span", {
        className: "sr-only",
        children: "More pages"
      })
    ]
  });
}
function Select2({ ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Root, {
    "data-slot": "select",
    ...props
  });
}
function SelectGroup2({ ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Group, {
    "data-slot": "select-group",
    ...props
  });
}
function SelectValue2({ ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Value, {
    "data-slot": "select-value",
    ...props
  });
}
function SelectTrigger2({
  className,
  size: size4 = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs23(exports_dist23.Trigger, {
    "data-slot": "select-trigger",
    "data-size": size4,
    className: clsx33("flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=sm]:h-8 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx310(exports_dist23.Icon, {
        asChild: true,
        children: /* @__PURE__ */ jsx310(SvgIcon4, {
          iconId: "ChevronDown",
          className: "size-4 opacity-50"
        })
      })
    ]
  });
}
function SelectContent2({ className, children, position = "popper", align = "center", ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Portal, {
    children: /* @__PURE__ */ jsxs23(exports_dist23.Content, {
      "data-slot": "select-content",
      className: clsx33("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", position === "popper" && "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1", className),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx310(SelectScrollUpButton2, {}),
        /* @__PURE__ */ jsx310(exports_dist23.Viewport, {
          className: clsx33("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
          children
        }),
        /* @__PURE__ */ jsx310(SelectScrollDownButton2, {})
      ]
    })
  });
}
function SelectLabel2({ className, ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Label, {
    "data-slot": "select-label",
    className: clsx33("px-2 py-1.5 text-muted-foreground text-xs", className),
    ...props
  });
}
function SelectItem2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs23(exports_dist23.Item, {
    "data-slot": "select-item",
    className: clsx33("relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx310("span", {
        className: "absolute right-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx310(exports_dist23.ItemIndicator, {
          children: /* @__PURE__ */ jsx310(SvgIcon4, {
            iconId: "Check",
            className: "size-4"
          })
        })
      }),
      /* @__PURE__ */ jsx310(exports_dist23.ItemText, {
        children
      })
    ]
  });
}
function SelectSeparator2({ className, ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.Separator, {
    "data-slot": "select-separator",
    className: clsx33("-mx-1 pointer-events-none my-1 h-px bg-border", className),
    ...props
  });
}
function SelectScrollUpButton2({ className, ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.ScrollUpButton, {
    "data-slot": "select-scroll-up-button",
    className: clsx33("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx310(SvgIcon4, {
      iconId: "ChevronUp",
      className: "size-4"
    })
  });
}
function SelectScrollDownButton2({ className, ...props }) {
  return /* @__PURE__ */ jsx310(exports_dist23.ScrollDownButton, {
    "data-slot": "select-scroll-down-button",
    className: clsx33("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx310(SvgIcon4, {
      iconId: "ChevronDown",
      className: "size-4"
    })
  });
}
function DataPagination({ currentRecords, pagination, totalRecords, baseRoute, routeParams = {}, perPageOptions = [25, 50, 100, 200], fetcher, isLoading = false, loadingIcon = true }) {
  const buildUrl = (params) => {
    const urlParams = new URLSearchParams;
    Object.entries(routeParams).forEach(([key, value]) => {
      if (value)
        urlParams.set(key, value);
    });
    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    const baseUrl = baseRoute;
    return `${baseUrl}?${urlParams.toString()}`;
  };
  const navigateToUrl = (url) => {
    try {
      fetcher.load(url);
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  const handleLimitChange = (newLimit) => {
    const url = buildUrl({
      limit: newLimit.toString(),
      page: "1"
    });
    navigateToUrl(url);
  };
  const handlePageChange = (newPage) => {
    const url = buildUrl({
      page: newPage.toString(),
      limit: pagination.limit.toString()
    });
    navigateToUrl(url);
  };
  return /* @__PURE__ */ jsx410("div", {
    className: "border-b p-4",
    children: /* @__PURE__ */ jsxs33("div", {
      className: "flex items-center justify-between",
      children: [
        /* @__PURE__ */ jsxs33("div", {
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx410(PaginationControls, {
              currentPage: pagination.page,
              hasNextPage: pagination.hasNextPage,
              hasPreviousPage: pagination.hasPreviousPage,
              onPageChange: handlePageChange,
              disabled: isLoading
            }),
            isLoading && loadingIcon && /* @__PURE__ */ jsx410(SvgIcon4, {
              iconId: "LoaderCircle",
              className: "h-4 w-4 animate-spin text-muted-foreground"
            })
          ]
        }),
        /* @__PURE__ */ jsxs33("div", {
          className: "flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsx410(RowsPerPageSelector, {
              currentLimit: pagination.limit,
              options: perPageOptions,
              onLimitChange: handleLimitChange,
              disabled: isLoading
            }),
            /* @__PURE__ */ jsx410(RecordCountDisplay, {
              currentPage: pagination.page,
              currentRecords,
              hasNextPage: pagination.hasNextPage,
              totalRecords
            })
          ]
        })
      ]
    })
  });
}
function RowsPerPageSelector({ currentLimit, options: options2, onLimitChange, disabled = false }) {
  return /* @__PURE__ */ jsxs33("div", {
    className: "flex items-center gap-2",
    children: [
      /* @__PURE__ */ jsx410("label", {
        htmlFor: "rows-per-page",
        className: "font-medium text-sm",
        children: "Rows per page:"
      }),
      /* @__PURE__ */ jsxs33(Select2, {
        value: currentLimit.toString(),
        onValueChange: (value) => {
          onLimitChange(Number.parseInt(value, 10));
        },
        disabled,
        children: [
          /* @__PURE__ */ jsx410(SelectTrigger2, {
            className: "w-20",
            children: /* @__PURE__ */ jsx410(SelectValue2, {})
          }),
          /* @__PURE__ */ jsx410(SelectContent2, {
            children: options2.map((option) => /* @__PURE__ */ jsx410(SelectItem2, {
              value: option.toString(),
              children: option
            }, option))
          })
        ]
      })
    ]
  });
}
function RecordCountDisplay({ currentPage, currentRecords, hasNextPage, totalRecords }) {
  if (currentRecords === 0) {
    return null;
  }
  if (totalRecords !== undefined) {
    const currentLimit = currentRecords;
    const start = (currentPage - 1) * currentLimit + 1;
    const end = Math.min(currentPage * currentLimit, totalRecords);
    return /* @__PURE__ */ jsxs33("p", {
      className: "text-muted-foreground text-sm",
      children: [
        "Showing ",
        start,
        "-",
        end,
        " of ",
        totalRecords.toLocaleString(),
        " records"
      ]
    });
  }
  return /* @__PURE__ */ jsxs33("p", {
    className: "text-muted-foreground text-sm",
    children: [
      "Page ",
      currentPage,
      " • ",
      currentRecords,
      " records ",
      hasNextPage ? "(more available)" : ""
    ]
  });
}
function PaginationControls({ currentPage, hasNextPage, hasPreviousPage, onPageChange, disabled = false }) {
  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }
  const handlePageClick = (page, e) => {
    e.preventDefault();
    if (!disabled && page !== currentPage) {
      onPageChange(page);
    }
  };
  const handleNavigationClick = (page, e) => {
    e.preventDefault();
    if (!disabled) {
      onPageChange(page);
    }
  };
  return /* @__PURE__ */ jsx410("div", {
    className: "",
    children: /* @__PURE__ */ jsx410(Pagination, {
      children: /* @__PURE__ */ jsxs33(PaginationContent, {
        children: [
          /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationPrevious, {
              href: "#",
              className: hasPreviousPage ? "" : "pointer-events-none opacity-50",
              onClick: (e) => handleNavigationClick(currentPage - 1, e)
            })
          }),
          currentPage > 2 && /* @__PURE__ */ jsxs33(Fragment14, {
            children: [
              /* @__PURE__ */ jsx410(PaginationItem, {
                children: /* @__PURE__ */ jsx410(PaginationLink, {
                  href: "#",
                  onClick: (e) => handlePageClick(1, e),
                  children: "1"
                })
              }),
              currentPage > 3 && /* @__PURE__ */ jsx410(PaginationItem, {
                children: /* @__PURE__ */ jsx410(PaginationEllipsis, {})
              })
            ]
          }),
          hasPreviousPage && /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationLink, {
              href: "#",
              onClick: (e) => handlePageClick(currentPage - 1, e),
              children: currentPage - 1
            })
          }),
          /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationLink, {
              href: "#",
              isActive: true,
              children: currentPage
            })
          }),
          hasNextPage && /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationLink, {
              href: "#",
              onClick: (e) => handlePageClick(currentPage + 1, e),
              children: currentPage + 1
            })
          }),
          hasNextPage && /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationEllipsis, {})
          }),
          /* @__PURE__ */ jsx410(PaginationItem, {
            children: /* @__PURE__ */ jsx410(PaginationNext, {
              href: "#",
              className: hasNextPage ? "" : "pointer-events-none opacity-50",
              onClick: (e) => handleNavigationClick(currentPage + 1, e)
            })
          })
        ]
      })
    })
  });
}
function InputOtp({ value, onValueChange, containerClassName, children, ...props }) {
  return /* @__PURE__ */ jsx53(exports_dist18.Root, {
    "data-slot": "input-otp",
    className: containerClassName,
    value,
    onValueChange,
    ...props,
    children
  });
}
function InputOtpGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx53("div", {
    "data-slot": "input-otp-group",
    className: clsx43("flex items-center gap-2", className),
    ...props
  });
}
function InputOtpSlot({ className, index: index2, ...props }) {
  return /* @__PURE__ */ jsx53(exports_dist18.Input, {
    "data-slot": "input-otp-slot",
    "data-index": index2,
    className: clsx43("relative flex h-10 w-10 items-center justify-center border-2 border-input bg-background text-sm transition-all dark:border", "rounded-md", "caret-transparent selection:bg-transparent selection:text-foreground", "focus-visible:z-10 focus-visible:border-ring focus-visible:outline-none", "disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:border-destructive", "text-center font-medium", className),
    ...props
  });
}
function InputOtpHiddenInput(props) {
  return /* @__PURE__ */ jsx53(exports_dist18.HiddenInput, {
    "data-slot": "input-otp-hidden",
    ...props
  });
}
var Link4 = React64.forwardRef(function Link23(props, ref) {
  return /* @__PURE__ */ jsx63(RouterLink2, {
    ...props,
    to: props.href,
    ref
  });
});
var SpriteIconContext3 = createContext9(null);
function TooltipProvider2({ delayDuration = 0, ...props }) {
  return /* @__PURE__ */ jsx102(exports_dist28.Provider, {
    "data-slot": "tooltip-provider",
    delayDuration,
    ...props
  });
}
function Tooltip2({ ...props }) {
  return /* @__PURE__ */ jsx102(TooltipProvider2, {
    children: /* @__PURE__ */ jsx102(exports_dist28.Root, {
      "data-slot": "tooltip",
      ...props
    })
  });
}
function TooltipTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx102(exports_dist28.Trigger, {
    "data-slot": "tooltip-trigger",
    ...props
  });
}
function TooltipContent2({ className, sideOffset = 0, children, ...props }) {
  return /* @__PURE__ */ jsx102(exports_dist28.Portal, {
    children: /* @__PURE__ */ jsxs43(exports_dist28.Content, {
      "data-slot": "tooltip-content",
      sideOffset,
      className: clsx62("fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx102(exports_dist28.Arrow, {
          className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground"
        })
      ]
    })
  });
}
function Accordion2({ ...props }) {
  return /* @__PURE__ */ jsx112(exports_dist3.Root, {
    "data-slot": "accordion",
    ...props
  });
}
function AccordionItem2({ className, ...props }) {
  return /* @__PURE__ */ jsx112(exports_dist3.Item, {
    "data-slot": "accordion-item",
    className: clsx72("border-b last:border-b-0", className),
    ...props
  });
}
function AccordionTrigger2({ className, children, ...props }) {
  return /* @__PURE__ */ jsx112(exports_dist3.Header, {
    className: "flex",
    children: /* @__PURE__ */ jsxs52(exports_dist3.Trigger, {
      "data-slot": "accordion-trigger",
      className: clsx72("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx112(SvgIcon4, {
          iconId: "ChevronDown",
          className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
        })
      ]
    })
  });
}
function AccordionContent2({ className, children, ...props }) {
  return /* @__PURE__ */ jsx112(exports_dist3.Content, {
    "data-slot": "accordion-content",
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx112("div", {
      className: clsx72("pt-0 pb-4", className),
      children
    })
  });
}
var alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Alert({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx132("div", {
    "data-slot": "alert",
    role: "alert",
    className: clsx8(alertVariants({ variant }), className),
    ...props
  });
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx132("div", {
    "data-slot": "alert-title",
    className: clsx8("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className),
    ...props
  });
}
function AlertDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx132("div", {
    "data-slot": "alert-description",
    className: clsx8("col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed", className),
    ...props
  });
}
function AlertDialog2({ ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Root, {
    "data-slot": "alert-dialog",
    ...props
  });
}
function AlertDialogTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Trigger, {
    "data-slot": "alert-dialog-trigger",
    ...props
  });
}
function AlertDialogPortal2({ ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Portal, {
    "data-slot": "alert-dialog-portal",
    ...props
  });
}
function AlertDialogOverlay2({ className, ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Overlay, {
    "data-slot": "alert-dialog-overlay",
    className: clsx92("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function AlertDialogContent2({ className, ...props }) {
  return /* @__PURE__ */ jsxs92(AlertDialogPortal2, {
    children: [
      /* @__PURE__ */ jsx162(AlertDialogOverlay2, {}),
      /* @__PURE__ */ jsx162(exports_dist5.Content, {
        "data-slot": "alert-dialog-content",
        className: clsx92("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg", className),
        ...props
      })
    ]
  });
}
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx162("div", {
    "data-slot": "alert-dialog-header",
    className: clsx92("flex flex-col gap-2 text-center sm:text-left", className),
    ...props
  });
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx162("div", {
    "data-slot": "alert-dialog-footer",
    className: clsx92("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
    ...props
  });
}
function AlertDialogTitle2({ className, ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Title, {
    "data-slot": "alert-dialog-title",
    className: clsx92("font-semibold text-lg", className),
    ...props
  });
}
function AlertDialogDescription2({ className, ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Description, {
    "data-slot": "alert-dialog-description",
    className: clsx92("text-muted-foreground text-sm", className),
    ...props
  });
}
function AlertDialogAction2({ className, ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Action, {
    className: clsx92(buttonVariants2(), className),
    ...props
  });
}
function AlertDialogCancel2({ className, ...props }) {
  return /* @__PURE__ */ jsx162(exports_dist5.Cancel, {
    className: clsx92(buttonVariants2({ variant: "outline" }), className),
    ...props
  });
}
function Avatar2({ className, ...props }) {
  return /* @__PURE__ */ jsx222(exports_dist6.Root, {
    "data-slot": "avatar",
    className: clsx12("relative flex size-8 shrink-0 overflow-hidden rounded-full", className),
    ...props
  });
}
function AvatarImage2({ className, ...props }) {
  return /* @__PURE__ */ jsx222(exports_dist6.Image, {
    "data-slot": "avatar-image",
    className: clsx12("aspect-square size-full", className),
    ...props
  });
}
function AvatarFallback2({ className, ...props }) {
  return /* @__PURE__ */ jsx222(exports_dist6.Fallback, {
    "data-slot": "avatar-fallback",
    className: clsx12("flex size-full items-center justify-center rounded-full bg-muted", className),
    ...props
  });
}
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? exports_dist.Slot : "span";
  return /* @__PURE__ */ jsx242(Comp, {
    "data-slot": "badge",
    className: clsx13(badgeVariants({ variant }), className),
    ...props
  });
}
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx292("nav", {
    "aria-label": "breadcrumb",
    "data-slot": "breadcrumb",
    ...props
  });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx292("ol", {
    "data-slot": "breadcrumb-list",
    className: clsx14("flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5", className),
    ...props
  });
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx292("li", {
    "data-slot": "breadcrumb-item",
    className: clsx14("inline-flex items-center gap-1.5", className),
    ...props
  });
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "a";
  return /* @__PURE__ */ jsx292(Comp, {
    "data-slot": "breadcrumb-link",
    className: clsx14("transition-colors hover:text-foreground", className),
    ...props
  });
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx292("span", {
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: clsx14("font-normal text-foreground", className),
    ...props
  });
}
function BreadcrumbSeparator({ children, className, ...props }) {
  return /* @__PURE__ */ jsx292("li", {
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    className: clsx14("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx292(SvgIcon4, {
      iconId: "ChevronRight"
    })
  });
}
function BreadcrumbEllipsis({ className, ...props }) {
  return /* @__PURE__ */ jsxs13("span", {
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "aria-hidden": "true",
    className: clsx14("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx292(SvgIcon4, {
        iconId: "Ellipsis",
        className: "size-4"
      }),
      /* @__PURE__ */ jsx292("span", {
        className: "sr-only",
        children: "More"
      })
    ]
  });
}
function DropdownMenu2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Root, {
    "data-slot": "dropdown-menu",
    ...props
  });
}
function DropdownMenuPortal2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Portal, {
    "data-slot": "dropdown-menu-portal",
    ...props
  });
}
function DropdownMenuTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Trigger, {
    "data-slot": "dropdown-menu-trigger",
    ...props
  });
}
function DropdownMenuContent2({ className, sideOffset = 4, ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Portal, {
    children: /* @__PURE__ */ jsx302(exports_dist12.Content, {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: clsx15("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", className),
      ...props
    })
  });
}
function DropdownMenuGroup2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Group, {
    "data-slot": "dropdown-menu-group",
    ...props
  });
}
function DropdownMenuItem2({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx302(exports_dist12.Item, {
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: clsx15("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props
  });
}
function DropdownMenuCheckboxItem2({ className, children, checked, ...props }) {
  return /* @__PURE__ */ jsxs14(exports_dist12.CheckboxItem, {
    "data-slot": "dropdown-menu-checkbox-item",
    className: clsx15("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx302("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx302(exports_dist12.ItemIndicator, {
          children: /* @__PURE__ */ jsx302(SvgIcon4, {
            iconId: "Check",
            className: "size-4"
          })
        })
      }),
      children
    ]
  });
}
function DropdownMenuRadioGroup2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.RadioGroup, {
    "data-slot": "dropdown-menu-radio-group",
    ...props
  });
}
function DropdownMenuRadioItem2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs14(exports_dist12.RadioItem, {
    "data-slot": "dropdown-menu-radio-item",
    className: clsx15("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx302("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx302(exports_dist12.ItemIndicator, {
          children: /* @__PURE__ */ jsx302(SvgIcon4, {
            iconId: "Circle",
            className: "size-2 fill-current"
          })
        })
      }),
      children
    ]
  });
}
function DropdownMenuLabel2({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx302(exports_dist12.Label, {
    "data-slot": "dropdown-menu-label",
    "data-inset": inset,
    className: clsx15("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className),
    ...props
  });
}
function DropdownMenuSeparator2({ className, ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Separator, {
    "data-slot": "dropdown-menu-separator",
    className: clsx15("-mx-1 my-1 h-px bg-border", className),
    ...props
  });
}
function DropdownMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx302("span", {
    "data-slot": "dropdown-menu-shortcut",
    className: clsx15("ml-auto text-muted-foreground text-xs tracking-widest", className),
    ...props
  });
}
function DropdownMenuSub2({ ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.Sub, {
    "data-slot": "dropdown-menu-sub",
    ...props
  });
}
function DropdownMenuSubTrigger2({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs14(exports_dist12.SubTrigger, {
    "data-slot": "dropdown-menu-sub-trigger",
    "data-inset": inset,
    className: clsx15("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx302(SvgIcon4, {
        iconId: "ChevronRight",
        className: "ml-auto size-4"
      })
    ]
  });
}
function DropdownMenuSubContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx302(exports_dist12.SubContent, {
    "data-slot": "dropdown-menu-sub-content",
    className: clsx15("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card",
    className: clsx16("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", className),
    ...props
  });
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-header",
    className: clsx16("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
    ...props
  });
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-title",
    className: clsx16("font-semibold leading-none", className),
    ...props
  });
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-description",
    className: clsx16("text-muted-foreground text-sm", className),
    ...props
  });
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-action",
    className: clsx16("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
    ...props
  });
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-content",
    className: clsx16("px-6", className),
    ...props
  });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx462("div", {
    "data-slot": "card-footer",
    className: clsx16("flex items-center px-6 [.border-t]:pt-6", className),
    ...props
  });
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx472("input", {
    type,
    "data-slot": "input",
    className: clsx17("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
    ...props
  });
}
function Label6({ className, ...props }) {
  return /* @__PURE__ */ jsx482(exports_dist13.Root, {
    "data-slot": "label",
    className: clsx18("flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className),
    ...props
  });
}
function Collapsible2({ ...props }) {
  return /* @__PURE__ */ jsx57(exports_dist2.Root, {
    "data-slot": "collapsible",
    ...props
  });
}
function CollapsibleTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx57(exports_dist2.CollapsibleTrigger, {
    "data-slot": "collapsible-trigger",
    ...props
  });
}
function CollapsibleContent2({ ...props }) {
  return /* @__PURE__ */ jsx57(exports_dist2.CollapsibleContent, {
    "data-slot": "collapsible-content",
    ...props
  });
}
function Dialog2({ ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Root, {
    "data-slot": "dialog",
    ...props
  });
}
function DialogTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Trigger, {
    "data-slot": "dialog-trigger",
    ...props
  });
}
function DialogPortal2({ ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Portal, {
    "data-slot": "dialog-portal",
    ...props
  });
}
function DialogClose2({ ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Close, {
    "data-slot": "dialog-close",
    ...props
  });
}
function DialogOverlay2({ className, ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Overlay, {
    "data-slot": "dialog-overlay",
    className: clsx20("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function DialogContent2({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs30(DialogPortal2, {
    "data-slot": "dialog-portal",
    children: [
      /* @__PURE__ */ jsx59(DialogOverlay2, {}),
      /* @__PURE__ */ jsxs30(exports_dist4.Content, {
        "data-slot": "dialog-content",
        className: clsx20("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg", className),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs30(exports_dist4.Close, {
            "data-slot": "dialog-close",
            className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            children: [
              /* @__PURE__ */ jsx59(SvgIcon4, {
                iconId: "X"
              }),
              /* @__PURE__ */ jsx59("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx59("div", {
    "data-slot": "dialog-header",
    className: clsx20("flex flex-col gap-2 text-center sm:text-left", className),
    ...props
  });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx59("div", {
    "data-slot": "dialog-footer",
    className: clsx20("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
    ...props
  });
}
function DialogTitle2({ className, ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Title, {
    "data-slot": "dialog-title",
    className: clsx20("font-semibold text-lg leading-none", className),
    ...props
  });
}
function DialogDescription2({ className, ...props }) {
  return /* @__PURE__ */ jsx59(exports_dist4.Description, {
    "data-slot": "dialog-description",
    className: clsx20("text-muted-foreground text-sm", className),
    ...props
  });
}
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx60(_e, {
    "data-slot": "command",
    className: clsx21("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
    ...props
  });
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs31(Dialog2, {
    ...props,
    children: [
      /* @__PURE__ */ jsxs31(DialogHeader, {
        className: "sr-only",
        children: [
          /* @__PURE__ */ jsx60(DialogTitle2, {
            children: title
          }),
          /* @__PURE__ */ jsx60(DialogDescription2, {
            children: description
          })
        ]
      }),
      /* @__PURE__ */ jsx60(DialogContent2, {
        className: clsx21("overflow-hidden p-0", className),
        showCloseButton,
        children: /* @__PURE__ */ jsx60(Command, {
          className: "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
          children
        })
      })
    ]
  });
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsxs31("div", {
    "data-slot": "command-input-wrapper",
    className: "flex h-9 items-center gap-2 border-b px-3",
    children: [
      /* @__PURE__ */ jsx60(SvgIcon4, {
        iconId: "Search",
        className: "size-4 shrink-0 opacity-50"
      }),
      /* @__PURE__ */ jsx60(_e.Input, {
        "data-slot": "command-input",
        className: clsx21("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props
      })
    ]
  });
}
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx60(_e.List, {
    "data-slot": "command-list",
    className: clsx21("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className),
    ...props
  });
}
function CommandEmpty({ ...props }) {
  return /* @__PURE__ */ jsx60(_e.Empty, {
    "data-slot": "command-empty",
    className: "py-6 text-center text-sm",
    ...props
  });
}
function CommandGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx60(_e.Group, {
    "data-slot": "command-group",
    className: clsx21("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs", className),
    ...props
  });
}
function CommandSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx60(_e.Separator, {
    "data-slot": "command-separator",
    className: clsx21("-mx-1 h-px bg-border", className),
    ...props
  });
}
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsx60(_e.Item, {
    "data-slot": "command-item",
    className: clsx21("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props
  });
}
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx60("span", {
    "data-slot": "command-shortcut",
    className: clsx21("ml-auto text-muted-foreground text-xs tracking-widest", className),
    ...props
  });
}
function Popover2({ ...props }) {
  return /* @__PURE__ */ jsx61(exports_dist20.Root, {
    "data-slot": "popover",
    ...props
  });
}
function PopoverTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx61(exports_dist20.Trigger, {
    "data-slot": "popover-trigger",
    ...props
  });
}
function PopoverContent2({ className, align = "center", sideOffset = 4, ...props }) {
  return /* @__PURE__ */ jsx61(exports_dist20.Portal, {
    children: /* @__PURE__ */ jsx61(exports_dist20.Content, {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: clsx222("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in", className),
      ...props
    })
  });
}
function PopoverAnchor2({ ...props }) {
  return /* @__PURE__ */ jsx61(exports_dist20.Anchor, {
    "data-slot": "popover-anchor",
    ...props
  });
}
function ContextMenu2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Root, {
    "data-slot": "context-menu",
    ...props
  });
}
function ContextMenuTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Trigger, {
    "data-slot": "context-menu-trigger",
    ...props
  });
}
function ContextMenuGroup2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Group, {
    "data-slot": "context-menu-group",
    ...props
  });
}
function ContextMenuPortal2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Portal, {
    "data-slot": "context-menu-portal",
    ...props
  });
}
function ContextMenuSub2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Sub, {
    "data-slot": "context-menu-sub",
    ...props
  });
}
function ContextMenuRadioGroup2({ ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.RadioGroup, {
    "data-slot": "context-menu-radio-group",
    ...props
  });
}
function ContextMenuSubTrigger2({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs36(exports_dist10.SubTrigger, {
    "data-slot": "context-menu-sub-trigger",
    "data-inset": inset,
    className: clsx25("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx66(SvgIcon4, {
        iconId: "ChevronRight",
        className: "ml-auto"
      })
    ]
  });
}
function ContextMenuSubContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.SubContent, {
    "data-slot": "context-menu-sub-content",
    className: clsx25("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function ContextMenuContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Portal, {
    children: /* @__PURE__ */ jsx66(exports_dist10.Content, {
      "data-slot": "context-menu-content",
      className: clsx25("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", className),
      ...props
    })
  });
}
function ContextMenuItem2({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx66(exports_dist10.Item, {
    "data-slot": "context-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: clsx25("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props
  });
}
function ContextMenuCheckboxItem2({ className, children, checked, ...props }) {
  return /* @__PURE__ */ jsxs36(exports_dist10.CheckboxItem, {
    "data-slot": "context-menu-checkbox-item",
    className: clsx25("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx66("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx66(exports_dist10.ItemIndicator, {
          children: /* @__PURE__ */ jsx66(SvgIcon4, {
            iconId: "Check",
            className: "size-4"
          })
        })
      }),
      children
    ]
  });
}
function ContextMenuRadioItem2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs36(exports_dist10.RadioItem, {
    "data-slot": "context-menu-radio-item",
    className: clsx25("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx66("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx66(exports_dist10.ItemIndicator, {
          children: /* @__PURE__ */ jsx66(SvgIcon4, {
            iconId: "Circle",
            className: "size-2 fill-current"
          })
        })
      }),
      children
    ]
  });
}
function ContextMenuLabel2({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx66(exports_dist10.Label, {
    "data-slot": "context-menu-label",
    "data-inset": inset,
    className: clsx25("px-2 py-1.5 font-medium text-foreground text-sm data-[inset]:pl-8", className),
    ...props
  });
}
function ContextMenuSeparator2({ className, ...props }) {
  return /* @__PURE__ */ jsx66(exports_dist10.Separator, {
    "data-slot": "context-menu-separator",
    className: clsx25("-mx-1 my-1 h-px bg-border", className),
    ...props
  });
}
function ContextMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx66("span", {
    "data-slot": "context-menu-shortcut",
    className: clsx25("ml-auto text-muted-foreground text-xs tracking-widest", className),
    ...props
  });
}
function HoverCard2({ ...props }) {
  return /* @__PURE__ */ jsx732(exports_dist14.Root, {
    "data-slot": "hover-card",
    ...props
  });
}
function HoverCardTrigger2({ ...props }) {
  return /* @__PURE__ */ jsx732(exports_dist14.Trigger, {
    "data-slot": "hover-card-trigger",
    ...props
  });
}
function HoverCardContent2({ className, align = "center", sideOffset = 4, ...props }) {
  return /* @__PURE__ */ jsx732(exports_dist14.Portal, {
    "data-slot": "hover-card-portal",
    children: /* @__PURE__ */ jsx732(exports_dist14.Content, {
      "data-slot": "hover-card-content",
      align,
      sideOffset,
      className: clsx26("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in", className),
      ...props
    })
  });
}
function Menubar2({ className, ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Root, {
    "data-slot": "menubar",
    className: clsx27("flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs", className),
    ...props
  });
}
function MenubarMenu2({ ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Menu, {
    "data-slot": "menubar-menu",
    ...props
  });
}
function MenubarGroup2({ ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Group, {
    "data-slot": "menubar-group",
    ...props
  });
}
function MenubarPortal2({ ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Portal, {
    "data-slot": "menubar-portal",
    ...props
  });
}
function MenubarRadioGroup2({ ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.RadioGroup, {
    "data-slot": "menubar-radio-group",
    ...props
  });
}
function MenubarTrigger2({ className, ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Trigger, {
    "data-slot": "menubar-trigger",
    className: clsx27("flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className),
    ...props
  });
}
function MenubarContent2({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
  return /* @__PURE__ */ jsx832(MenubarPortal2, {
    children: /* @__PURE__ */ jsx832(exports_dist15.Content, {
      "data-slot": "menubar-content",
      align,
      alignOffset,
      sideOffset,
      className: clsx27("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in", className),
      ...props
    })
  });
}
function MenubarItem2({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx832(exports_dist15.Item, {
    "data-slot": "menubar-item",
    "data-inset": inset,
    "data-variant": variant,
    className: clsx27("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props
  });
}
function MenubarCheckboxItem2({ className, children, checked, ...props }) {
  return /* @__PURE__ */ jsxs50(exports_dist15.CheckboxItem, {
    "data-slot": "menubar-checkbox-item",
    className: clsx27("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx832("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx832(exports_dist15.ItemIndicator, {
          children: /* @__PURE__ */ jsx832(SvgIcon4, {
            iconId: "Check",
            className: "size-4"
          })
        })
      }),
      children
    ]
  });
}
function MenubarRadioItem2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs50(exports_dist15.RadioItem, {
    "data-slot": "menubar-radio-item",
    className: clsx27("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx832("span", {
        className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
        children: /* @__PURE__ */ jsx832(exports_dist15.ItemIndicator, {
          children: /* @__PURE__ */ jsx832(SvgIcon4, {
            iconId: "Circle",
            className: "size-2 fill-current"
          })
        })
      }),
      children
    ]
  });
}
function MenubarLabel2({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx832(exports_dist15.Label, {
    "data-slot": "menubar-label",
    "data-inset": inset,
    className: clsx27("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className),
    ...props
  });
}
function MenubarSeparator2({ className, ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Separator, {
    "data-slot": "menubar-separator",
    className: clsx27("-mx-1 my-1 h-px bg-border", className),
    ...props
  });
}
function MenubarShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx832("span", {
    "data-slot": "menubar-shortcut",
    className: clsx27("ml-auto text-muted-foreground text-xs tracking-widest", className),
    ...props
  });
}
function MenubarSub2({ ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.Sub, {
    "data-slot": "menubar-sub",
    ...props
  });
}
function MenubarSubTrigger2({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs50(exports_dist15.SubTrigger, {
    "data-slot": "menubar-sub-trigger",
    "data-inset": inset,
    className: clsx27("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground", className),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx832(SvgIcon4, {
        iconId: "ChevronRight",
        className: "ml-auto h-4 w-4"
      })
    ]
  });
}
function MenubarSubContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx832(exports_dist15.SubContent, {
    "data-slot": "menubar-sub-content",
    className: clsx27("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function NavigationMenu2({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs53(exports_dist16.Root, {
    "data-slot": "navigation-menu",
    "data-viewport": viewport,
    className: clsx28("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
    ...props,
    children: [
      children,
      viewport && /* @__PURE__ */ jsx86(NavigationMenuViewport2, {})
    ]
  });
}
function NavigationMenuList2({ className, ...props }) {
  return /* @__PURE__ */ jsx86(exports_dist16.List, {
    "data-slot": "navigation-menu-list",
    className: clsx28("group flex flex-1 list-none items-center justify-center gap-1", className),
    ...props
  });
}
function NavigationMenuItem2({ className, ...props }) {
  return /* @__PURE__ */ jsx86(exports_dist16.Item, {
    "data-slot": "navigation-menu-item",
    className: clsx28("relative", className),
    ...props
  });
}
var navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1");
function NavigationMenuTrigger2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs53(exports_dist16.Trigger, {
    "data-slot": "navigation-menu-trigger",
    className: clsx28(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      " ",
      /* @__PURE__ */ jsx86(SvgIcon4, {
        iconId: "ChevronDown",
        className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
        "aria-hidden": "true"
      })
    ]
  });
}
function NavigationMenuContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx86(exports_dist16.Content, {
    "data-slot": "navigation-menu-content",
    className: clsx28("data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in", className),
    ...props
  });
}
function NavigationMenuViewport2({ className, ...props }) {
  return /* @__PURE__ */ jsx86("div", {
    className: clsx28("absolute top-full left-0 isolate z-50 flex justify-center"),
    children: /* @__PURE__ */ jsx86(exports_dist16.Viewport, {
      "data-slot": "navigation-menu-viewport",
      className: clsx28("data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]", className),
      ...props
    })
  });
}
function NavigationMenuLink2({ className, ...props }) {
  return /* @__PURE__ */ jsx86(exports_dist16.Link, {
    "data-slot": "navigation-menu-link",
    className: clsx28("flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
    ...props
  });
}
function NavigationMenuIndicator2({ className, ...props }) {
  return /* @__PURE__ */ jsx86(exports_dist16.Indicator, {
    "data-slot": "navigation-menu-indicator",
    className: clsx28("data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in", className),
    ...props,
    children: /* @__PURE__ */ jsx86("div", {
      className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"
    })
  });
}
function RadioGroup5({ className, ...props }) {
  return /* @__PURE__ */ jsx922(exports_dist21.Root, {
    "data-slot": "radio-group",
    className: clsx30("grid gap-3", className),
    ...props
  });
}
function RadioGroupItem2({ className, ...props }) {
  return /* @__PURE__ */ jsx922(exports_dist21.Item, {
    "data-slot": "radio-group-item",
    className: clsx30("aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40", className),
    ...props,
    children: /* @__PURE__ */ jsx922(exports_dist21.Indicator, {
      "data-slot": "radio-group-indicator",
      className: "relative flex items-center justify-center",
      children: /* @__PURE__ */ jsx922(SvgIcon4, {
        iconId: "Circle",
        className: "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-primary"
      })
    })
  });
}
function ScrollArea2({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs59(exports_dist22.Root, {
    "data-slot": "scroll-area",
    className: clsx31("relative", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx95(exports_dist22.Viewport, {
        "data-slot": "scroll-area-viewport",
        className: "size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50",
        children
      }),
      /* @__PURE__ */ jsx95(ScrollBar, {}),
      /* @__PURE__ */ jsx95(exports_dist22.Corner, {})
    ]
  });
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx95(exports_dist22.ScrollAreaScrollbar, {
    "data-slot": "scroll-area-scrollbar",
    orientation,
    className: clsx31("flex touch-none select-none p-px transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
    ...props,
    children: /* @__PURE__ */ jsx95(exports_dist22.ScrollAreaThumb, {
      "data-slot": "scroll-area-thumb",
      className: "relative flex-1 rounded-full bg-border"
    })
  });
}
function Separator6({ className, orientation = "horizontal", decorative = true, ...props }) {
  return /* @__PURE__ */ jsx96(exports_dist24.Root, {
    "data-slot": "separator",
    decorative,
    orientation,
    className: clsx322("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px", className),
    ...props
  });
}
var tags = Array.from({ length: 50 }).map((_2, i, a) => `v1.2.0-beta.${a.length - i}`);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Root, {
    "data-slot": "sheet",
    ...props
  });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Trigger, {
    "data-slot": "sheet-trigger",
    ...props
  });
}
function SheetClose({ ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Close, {
    "data-slot": "sheet-close",
    ...props
  });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Portal, {
    "data-slot": "sheet-portal",
    ...props
  });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Overlay, {
    "data-slot": "sheet-overlay",
    className: clsx332("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in", className),
    ...props
  });
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs66(SheetPortal, {
    children: [
      /* @__PURE__ */ jsx103(SheetOverlay, {}),
      /* @__PURE__ */ jsxs66(exports_dist4.Content, {
        "data-slot": "sheet-content",
        className: clsx332("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs66(exports_dist4.Close, {
            className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
            children: [
              /* @__PURE__ */ jsx103(SvgIcon4, {
                iconId: "X",
                className: "size-4"
              }),
              /* @__PURE__ */ jsx103("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx103("div", {
    "data-slot": "sheet-header",
    className: clsx332("flex flex-col gap-1.5 p-4", className),
    ...props
  });
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx103("div", {
    "data-slot": "sheet-footer",
    className: clsx332("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  });
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Title, {
    "data-slot": "sheet-title",
    className: clsx332("font-semibold text-foreground", className),
    ...props
  });
}
function SheetDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx103(exports_dist4.Description, {
    "data-slot": "sheet-description",
    className: clsx332("text-muted-foreground text-sm", className),
    ...props
  });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx106("div", {
    "data-slot": "skeleton",
    className: clsx34("animate-pulse rounded-md bg-accent", className),
    ...props
  });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx115("div", {
    "data-slot": "table-container",
    className: "relative w-full overflow-x-auto",
    children: /* @__PURE__ */ jsx115("table", {
      "data-slot": "table",
      className: clsx38("w-full caption-bottom text-sm", className),
      ...props
    })
  });
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx115("thead", {
    "data-slot": "table-header",
    className: clsx38("[&_tr]:border-b", className),
    ...props
  });
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx115("tbody", {
    "data-slot": "table-body",
    className: clsx38("[&_tr:last-child]:border-0", className),
    ...props
  });
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx115("tfoot", {
    "data-slot": "table-footer",
    className: clsx38("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  });
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx115("tr", {
    "data-slot": "table-row",
    className: clsx38("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
    ...props
  });
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx115("th", {
    "data-slot": "table-head",
    className: clsx38("h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
    ...props
  });
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx115("td", {
    "data-slot": "table-cell",
    className: clsx38("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
    ...props
  });
}
function TableCaption({ className, ...props }) {
  return /* @__PURE__ */ jsx115("caption", {
    "data-slot": "table-caption",
    className: clsx38("mt-4 text-muted-foreground text-sm", className),
    ...props
  });
}
function Tabs2({ className, ...props }) {
  return /* @__PURE__ */ jsx117(exports_dist25.Root, {
    "data-slot": "tabs",
    className: clsx39("flex flex-col gap-2", className),
    ...props
  });
}
function TabsList2({ className, ...props }) {
  return /* @__PURE__ */ jsx117(exports_dist25.List, {
    "data-slot": "tabs-list",
    className: clsx39("inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground", className),
    ...props
  });
}
function TabsTrigger2({ className, ...props }) {
  return /* @__PURE__ */ jsx117(exports_dist25.Trigger, {
    "data-slot": "tabs-trigger",
    className: clsx39("inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
    ...props
  });
}
function TabsContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx117(exports_dist25.Content, {
    "data-slot": "tabs-content",
    className: clsx39("flex-1 outline-none", className),
    ...props
  });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx119("textarea", {
    "data-slot": "textarea",
    className: clsx40("field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40", className),
    ...props
  });
}
var toggleVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Toggle2({ className, variant, size: size4, ...props }) {
  return /* @__PURE__ */ jsx126(exports_dist26.Root, {
    "data-slot": "toggle",
    className: clsx41(toggleVariants({ variant, size: size4, className })),
    ...props
  });
}
var ToggleGroupContext2 = React342.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function ToggleGroup2({
  className,
  variant,
  size: size4,
  spacing = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx129(exports_dist27.Root, {
    "data-slot": "toggle-group",
    "data-variant": variant,
    "data-size": size4,
    "data-spacing": spacing,
    style: { "--gap": spacing },
    className: clsx422("group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs", className),
    ...props,
    children: /* @__PURE__ */ jsx129(ToggleGroupContext2.Provider, {
      value: { variant, size: size4, spacing },
      children
    })
  });
}
function ToggleGroupItem2({ className, children, variant, size: size4, ...props }) {
  const context = React342.useContext(ToggleGroupContext2);
  return /* @__PURE__ */ jsx129(exports_dist27.Item, {
    "data-slot": "toggle-group-item",
    "data-variant": context.variant || variant,
    "data-size": context.size || size4,
    "data-spacing": context.spacing,
    className: clsx422(toggleVariants({
      variant: context.variant || variant,
      size: context.size || size4
    }), "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10", "data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:first:rounded-l-md", className),
    ...props,
    children
  });
}
var buttonGroupVariants = cva("flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2", {
  variants: {
    orientation: {
      horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
      vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
function ButtonGroup({ className, orientation, ...props }) {
  return /* @__PURE__ */ jsx156("div", {
    role: "group",
    "data-slot": "button-group",
    "data-orientation": orientation,
    className: clsx432(buttonGroupVariants({ orientation }), className),
    ...props
  });
}
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "div";
  return /* @__PURE__ */ jsx156(Comp, {
    className: clsx432("flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className),
    ...props
  });
}
function ButtonGroupSeparator({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx156(Separator6, {
    "data-slot": "button-group-separator",
    orientation,
    className: clsx432("!m-0 relative self-stretch bg-input data-[orientation=vertical]:h-auto", className),
    ...props
  });
}
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty",
    className: clsx44("flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12", className),
    ...props
  });
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty-header",
    className: clsx44("flex max-w-sm flex-col items-center gap-2 text-center", className),
    ...props
  });
}
var emptyMediaVariants = cva("flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function EmptyMedia({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty-icon",
    "data-variant": variant,
    className: clsx44(emptyMediaVariants({ variant, className })),
    ...props
  });
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty-title",
    className: clsx44("font-medium text-lg tracking-tight", className),
    ...props
  });
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty-description",
    className: clsx44("text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className),
    ...props
  });
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsx157("div", {
    "data-slot": "empty-content",
    className: clsx44("flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm", className),
    ...props
  });
}
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ jsx158("fieldset", {
    "data-slot": "field-set",
    className: clsx45("flex flex-col gap-6", "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", className),
    ...props
  });
}
function FieldLegend({ className, variant = "legend", ...props }) {
  return /* @__PURE__ */ jsx158("legend", {
    "data-slot": "field-legend",
    "data-variant": variant,
    className: clsx45("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", className),
    ...props
  });
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx158("div", {
    "data-slot": "field-group",
    className: clsx45("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", className),
    ...props
  });
}
var fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: ["flex-row items-center", "[&>[data-slot=field-label]]:flex-auto", "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"],
      responsive: [
        "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      ]
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
function Field({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx158("div", {
    role: "group",
    "data-slot": "field",
    "data-orientation": orientation,
    className: clsx45(fieldVariants({ orientation }), className),
    ...props
  });
}
function FieldContent({ className, ...props }) {
  return /* @__PURE__ */ jsx158("div", {
    "data-slot": "field-content",
    className: clsx45("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className),
    ...props
  });
}
function FieldLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx158(Label6, {
    "data-slot": "field-label",
    className: clsx45("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10", className),
    ...props
  });
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx158("div", {
    "data-slot": "field-label",
    className: clsx45("flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50", className),
    ...props
  });
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx158("p", {
    "data-slot": "field-description",
    className: clsx45("font-normal text-muted-foreground text-sm leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance", "nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 last:mt-0", "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className),
    ...props
  });
}
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs922("div", {
    "data-slot": "field-separator",
    "data-content": !!children,
    className: clsx45("-my-2 group-data-[variant=outline]/field-group:-mb-2 relative h-5 text-sm", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx158(Separator6, {
        className: "absolute inset-0 top-1/2"
      }),
      children && /* @__PURE__ */ jsx158("span", {
        className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
        "data-slot": "field-separator-content",
        children
      })
    ]
  });
}
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo14(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }
    return /* @__PURE__ */ jsx158("ul", {
      className: "ml-4 flex list-disc flex-col gap-1",
      children: uniqueErrors.map((error, index2) => error?.message && /* @__PURE__ */ jsx158("li", {
        children: error.message
      }, index2))
    });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx158("div", {
    role: "alert",
    "data-slot": "field-error",
    className: clsx45("font-normal text-destructive text-sm", className),
    ...props,
    children: content
  });
}
var Form = FormProvider;
var FormFieldContext = React362.createContext({});
var FormField = ({ ...props }) => {
  return /* @__PURE__ */ jsx159(FormFieldContext.Provider, {
    value: { name: props.name },
    children: /* @__PURE__ */ jsx159(Controller, {
      ...props
    })
  });
};
var useFormField = () => {
  const fieldContext = React362.useContext(FormFieldContext);
  const itemContext = React362.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var FormItemContext = React362.createContext({});
function FormItem({ className, ...props }) {
  const id = React362.useId();
  return /* @__PURE__ */ jsx159(FormItemContext.Provider, {
    value: { id },
    children: /* @__PURE__ */ jsx159("div", {
      "data-slot": "form-item",
      className: clsx46("grid gap-2", className),
      ...props
    })
  });
}
function FormLabel({ className, ...props }) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx159(Label6, {
    "data-slot": "form-label",
    "data-error": !!error,
    className: clsx46("data-[error=true]:text-destructive", className),
    htmlFor: formItemId,
    ...props
  });
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx159(exports_dist.Slot, {
    "data-slot": "form-control",
    id: formItemId,
    "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": !!error,
    ...props
  });
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx159("p", {
    "data-slot": "form-description",
    id: formDescriptionId,
    className: clsx46("text-muted-foreground text-sm", className),
    ...props
  });
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx159("p", {
    "data-slot": "form-message",
    id: formMessageId,
    className: clsx46("text-destructive text-sm", className),
    ...props,
    children: body
  });
}
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx160("div", {
    "data-slot": "input-group",
    role: "group",
    className: clsx47("group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30", "h-9 min-w-0 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50", "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
    ...props
  });
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50", {
  variants: {
    align: {
      "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
      "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
      "block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5"
    }
  },
  defaultVariants: {
    align: "inline-start"
  }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return /* @__PURE__ */ jsx160("div", {
    role: "group",
    "data-slot": "input-group-addon",
    "data-align": align,
    className: clsx47(inputGroupAddonVariants({ align }), className),
    onClick: (e) => {
      if (e.target.closest("button")) {
        return;
      }
      e.currentTarget.parentElement?.querySelector("input")?.focus();
    },
    ...props
  });
}
var inputGroupButtonVariants = cva("text-sm shadow-none flex gap-2 items-center", {
  variants: {
    size: {
      xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
      sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size: size4 = "xs", ...props }) {
  return /* @__PURE__ */ jsx160(Button, {
    type,
    "data-size": size4,
    variant,
    className: clsx47(inputGroupButtonVariants({ size: size4 }), className),
    ...props
  });
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsx160("span", {
    className: clsx47("flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className),
    ...props
  });
}
function InputGroupInput({ className, ...props }) {
  return /* @__PURE__ */ jsx160(Input, {
    "data-slot": "input-group-control",
    className: clsx47("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent", className),
    ...props
  });
}
function InputGroupTextarea({ className, ...props }) {
  return /* @__PURE__ */ jsx160(Textarea, {
    "data-slot": "input-group-control",
    className: clsx47("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", className),
    ...props
  });
}
function ItemGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    role: "list",
    "data-slot": "item-group",
    className: clsx48("group/item-group flex flex-col", className),
    ...props
  });
}
function ItemSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx161(Separator6, {
    "data-slot": "item-separator",
    orientation: "horizontal",
    className: clsx48("my-0", className),
    ...props
  });
}
var itemVariants = cva("group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border-border",
      muted: "bg-muted/50"
    },
    size: {
      default: "p-4 gap-4 ",
      sm: "py-3 px-4 gap-2.5"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Item7({ className, variant = "default", size: size4 = "default", asChild = false, ...props }) {
  const Comp = asChild ? exports_dist.Slot : "div";
  return /* @__PURE__ */ jsx161(Comp, {
    "data-slot": "item",
    "data-variant": variant,
    "data-size": size4,
    className: clsx48(itemVariants({ variant, size: size4, className })),
    ...props
  });
}
var itemMediaVariants = cva("flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5", {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
      image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function ItemMedia({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-media",
    "data-variant": variant,
    className: clsx48(itemMediaVariants({ variant, className })),
    ...props
  });
}
function ItemContent({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-content",
    className: clsx48("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className),
    ...props
  });
}
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-title",
    className: clsx48("flex w-fit items-center gap-2 font-medium text-sm leading-snug", className),
    ...props
  });
}
function ItemDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx161("p", {
    "data-slot": "item-description",
    className: clsx48("line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal", "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className),
    ...props
  });
}
function ItemActions({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-actions",
    className: clsx48("flex items-center gap-2", className),
    ...props
  });
}
function ItemHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-header",
    className: clsx48("flex basis-full items-center justify-between gap-2", className),
    ...props
  });
}
function ItemFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx161("div", {
    "data-slot": "item-footer",
    className: clsx48("flex basis-full items-center justify-between gap-2", className),
    ...props
  });
}
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsx1622("kbd", {
    "data-slot": "kbd",
    className: clsx49("pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-muted-foreground text-xs", "[&_svg:not([class*='size-'])]:size-3", "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10", className),
    ...props
  });
}
function KbdGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx1622("kbd", {
    "data-slot": "kbd-group",
    className: clsx49("inline-flex items-center gap-1", className),
    ...props
  });
}
function NativeSelect({ className, ...props }) {
  return /* @__PURE__ */ jsxs93("div", {
    className: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
    "data-slot": "native-select-wrapper",
    children: [
      /* @__PURE__ */ jsx163("select", {
        "data-slot": "native-select",
        className: clsx50("h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30 dark:hover:bg-input/50", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
        ...props
      }),
      /* @__PURE__ */ jsx163(SvgIcon4, {
        iconId: "ChevronDown",
        className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 size-4 select-none text-muted-foreground opacity-50",
        "aria-hidden": "true",
        "data-slot": "native-select-icon"
      })
    ]
  });
}
function NativeSelectOption({ ...props }) {
  return /* @__PURE__ */ jsx163("option", {
    "data-slot": "native-select-option",
    ...props
  });
}
function NativeSelectOptGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx163("optgroup", {
    "data-slot": "native-select-optgroup",
    className: clsx50(className),
    ...props
  });
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React372.useState(undefined);
  React372.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React382.createContext(null);
function useSidebar() {
  const context = React382.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React382.useState(false);
  const [_open, _setOpen] = React382.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React382.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);
  const toggleSidebar = React382.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React382.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React382.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
  return /* @__PURE__ */ jsx164(SidebarContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx164(TooltipProvider2, {
      delayDuration: 0,
      children: /* @__PURE__ */ jsx164("div", {
        "data-slot": "sidebar-wrapper",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: clsx51("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
        ...props,
        children
      })
    })
  });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx164("div", {
      "data-slot": "sidebar",
      className: clsx51("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
      ...props,
      children
    });
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx164(Sheet, {
      open: openMobile,
      onOpenChange: setOpenMobile,
      ...props,
      children: /* @__PURE__ */ jsxs94(SheetContent, {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs94(SheetHeader, {
            className: "sr-only",
            children: [
              /* @__PURE__ */ jsx164(SheetTitle, {
                children: "Sidebar"
              }),
              /* @__PURE__ */ jsx164(SheetDescription, {
                children: "Displays the mobile sidebar."
              })
            ]
          }),
          /* @__PURE__ */ jsx164("div", {
            className: "flex h-full w-full flex-col",
            children
          })
        ]
      })
    });
  }
  return /* @__PURE__ */ jsxs94("div", {
    className: "group peer hidden text-sidebar-foreground md:block",
    "data-state": state,
    "data-collapsible": state === "collapsed" ? collapsible : "",
    "data-variant": variant,
    "data-side": side,
    "data-slot": "sidebar",
    children: [
      /* @__PURE__ */ jsx164("div", {
        "data-slot": "sidebar-gap",
        className: clsx51("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
      }),
      /* @__PURE__ */ jsx164("div", {
        "data-slot": "sidebar-container",
        className: clsx51("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
        ...props,
        children: /* @__PURE__ */ jsx164("div", {
          "data-sidebar": "sidebar",
          "data-slot": "sidebar-inner",
          className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
          children
        })
      })
    ]
  });
}
function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs94(Button, {
    "data-sidebar": "trigger",
    "data-slot": "sidebar-trigger",
    variant: "ghost",
    size: "icon",
    className: clsx51("size-7", className),
    onClick: (event) => {
      onClick?.(event);
      toggleSidebar();
    },
    ...props,
    children: [
      /* @__PURE__ */ jsx164(SvgIcon4, {
        iconId: "PanelLeft"
      }),
      /* @__PURE__ */ jsx164("span", {
        className: "sr-only",
        children: "Toggle Sidebar"
      })
    ]
  });
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx164("button", {
    "data-sidebar": "rail",
    "data-slot": "sidebar-rail",
    "aria-label": "Toggle Sidebar",
    tabIndex: -1,
    onClick: toggleSidebar,
    title: "Toggle Sidebar",
    className: clsx51("-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
    ...props
  });
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx164("main", {
    "data-slot": "sidebar-inset",
    className: clsx51("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm", className),
    ...props
  });
}
function SidebarInput({ className, ...props }) {
  return /* @__PURE__ */ jsx164(Input, {
    "data-slot": "sidebar-input",
    "data-sidebar": "input",
    className: clsx51("h-8 w-full bg-background shadow-none", className),
    ...props
  });
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-header",
    "data-sidebar": "header",
    className: clsx51("flex flex-col gap-2 p-2", className),
    ...props
  });
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-footer",
    "data-sidebar": "footer",
    className: clsx51("flex flex-col gap-2 p-2", className),
    ...props
  });
}
function SidebarSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx164(Separator6, {
    "data-slot": "sidebar-separator",
    "data-sidebar": "separator",
    className: clsx51("mx-2 w-auto bg-sidebar-border", className),
    ...props
  });
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-content",
    "data-sidebar": "content",
    className: clsx51("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
    ...props
  });
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-group",
    "data-sidebar": "group",
    className: clsx51("relative flex w-full min-w-0 flex-col p-2", className),
    ...props
  });
}
function SidebarGroupLabel({ className, asChild = false, ...props }) {
  const Comp = asChild ? exports_dist.Slot : "div";
  return /* @__PURE__ */ jsx164(Comp, {
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    className: clsx51("flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
    ...props
  });
}
function SidebarGroupAction({ className, asChild = false, ...props }) {
  const Comp = asChild ? exports_dist.Slot : "button";
  return /* @__PURE__ */ jsx164(Comp, {
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
    className: clsx51("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:-inset-2 after:absolute md:after:hidden", "group-data-[collapsible=icon]:hidden", className),
    ...props
  });
}
function SidebarGroupContent({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-group-content",
    "data-sidebar": "group-content",
    className: clsx51("w-full text-sm", className),
    ...props
  });
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx164("ul", {
    "data-slot": "sidebar-menu",
    "data-sidebar": "menu",
    className: clsx51("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  });
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx164("li", {
    "data-slot": "sidebar-menu-item",
    "data-sidebar": "menu-item",
    className: clsx51("group/menu-item relative", className),
    ...props
  });
}
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size: size4 = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx164(Comp, {
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-size": size4,
    "data-active": isActive,
    className: clsx51(sidebarMenuButtonVariants({ variant, size: size4 }), className),
    ...props
  });
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs94(Tooltip2, {
    children: [
      /* @__PURE__ */ jsx164(TooltipTrigger2, {
        asChild: true,
        children: button
      }),
      /* @__PURE__ */ jsx164(TooltipContent2, {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      })
    ]
  });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "button";
  return /* @__PURE__ */ jsx164(Comp, {
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
    className: clsx51("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:-inset-2 after:absolute md:after:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
    ...props
  });
}
function SidebarMenuBadge({ className, ...props }) {
  return /* @__PURE__ */ jsx164("div", {
    "data-slot": "sidebar-menu-badge",
    "data-sidebar": "menu-badge",
    className: clsx51("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
    ...props
  });
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const width = React382.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs94("div", {
    "data-slot": "sidebar-menu-skeleton",
    "data-sidebar": "menu-skeleton",
    className: clsx51("flex h-8 items-center gap-2 rounded-md px-2", className),
    ...props,
    children: [
      showIcon && /* @__PURE__ */ jsx164(Skeleton, {
        className: "size-4 rounded-md",
        "data-sidebar": "menu-skeleton-icon"
      }),
      /* @__PURE__ */ jsx164(Skeleton, {
        className: "h-4 max-w-(--skeleton-width) flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: {
          "--skeleton-width": width
        }
      })
    ]
  });
}
function SidebarMenuSub({ className, ...props }) {
  return /* @__PURE__ */ jsx164("ul", {
    "data-slot": "sidebar-menu-sub",
    "data-sidebar": "menu-sub",
    className: clsx51("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
    ...props
  });
}
function SidebarMenuSubItem({ className, ...props }) {
  return /* @__PURE__ */ jsx164("li", {
    "data-slot": "sidebar-menu-sub-item",
    "data-sidebar": "menu-sub-item",
    className: clsx51("group/menu-sub-item relative", className),
    ...props
  });
}
function SidebarMenuSubButton({
  asChild = false,
  size: size4 = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? exports_dist.Slot : "a";
  return /* @__PURE__ */ jsx164(Comp, {
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-size": size4,
    "data-active": isActive,
    className: clsx51("-translate-x-px flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size4 === "sm" && "text-xs", size4 === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
    ...props
  });
}
var DataPagination2 = Object.assign(DataPagination, {
  RecordCountDisplay,
  PaginationControls,
  RowsPerPageSelector
});
var InputOtp2 = Object.assign(InputOtp, {
  Group: InputOtpGroup,
  Slot: InputOtpSlot,
  HiddenInput: InputOtpHiddenInput
});
var Accordion22 = Object.assign(Accordion2, {
  Item: AccordionItem2,
  Trigger: AccordionTrigger2,
  Content: AccordionContent2
});
var AlertDialog22 = Object.assign(AlertDialog2, {
  Portal: AlertDialogPortal2,
  Overlay: AlertDialogOverlay2,
  Trigger: AlertDialogTrigger2,
  Content: AlertDialogContent2,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle2,
  Description: AlertDialogDescription2,
  Action: AlertDialogAction2,
  Cancel: AlertDialogCancel2
});
var Alert2 = Object.assign(Alert, {
  Title: AlertTitle,
  Description: AlertDescription
});
var Avatar22 = Object.assign(Avatar2, {
  Image: AvatarImage2,
  Fallback: AvatarFallback2
});
var Badge2 = Object.assign(Badge, {
  Variants: badgeVariants
});
var Breadcrumb2 = Object.assign(Breadcrumb, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis
});
var ButtonGroup2 = Object.assign(ButtonGroup, {
  Separator: ButtonGroupSeparator,
  Text: ButtonGroupText,
  ButtonGroupVariants: buttonGroupVariants
});
var Button2 = Object.assign(Button, {
  Variants: buttonVariants2
});
var Card2 = Object.assign(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Action: CardAction,
  Description: CardDescription,
  Content: CardContent
});
var Collapsible22 = Object.assign(Collapsible2, {
  Trigger: CollapsibleTrigger2,
  Content: CollapsibleContent2
});
var Command2 = Object.assign(Command, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator
});
var ContextMenu22 = Object.assign(ContextMenu2, {
  Trigger: ContextMenuTrigger2,
  Content: ContextMenuContent2,
  Item: ContextMenuItem2,
  CheckboxItem: ContextMenuCheckboxItem2,
  RadioItem: ContextMenuRadioItem2,
  Label: ContextMenuLabel2,
  Separator: ContextMenuSeparator2,
  Shortcut: ContextMenuShortcut,
  Group: ContextMenuGroup2,
  Portal: ContextMenuPortal2,
  Sub: ContextMenuSub2,
  SubContent: ContextMenuSubContent2,
  SubTrigger: ContextMenuSubTrigger2,
  RadioGroup: ContextMenuRadioGroup2
});
var Dialog22 = Object.assign(Dialog2, {
  Close: DialogClose2,
  Content: DialogContent2,
  Description: DialogDescription2,
  Footer: DialogFooter,
  Header: DialogHeader,
  Overlay: DialogOverlay2,
  Portal: DialogPortal2,
  Title: DialogTitle2,
  Trigger: DialogTrigger2
});
var DropdownMenu22 = Object.assign(DropdownMenu2, {
  Portal: DropdownMenuPortal2,
  Trigger: DropdownMenuTrigger2,
  Content: DropdownMenuContent2,
  Group: DropdownMenuGroup2,
  Label: DropdownMenuLabel2,
  Item: DropdownMenuItem2,
  CheckboxItem: DropdownMenuCheckboxItem2,
  RadioGroup: DropdownMenuRadioGroup2,
  RadioItem: DropdownMenuRadioItem2,
  Separator: DropdownMenuSeparator2,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub2,
  SubTrigger: DropdownMenuSubTrigger2,
  SubContent: DropdownMenuSubContent2
});
var Empty2 = Object.assign(Empty, {
  Header: EmptyHeader,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Content: EmptyContent,
  Media: EmptyMedia
});
var Field2 = Object.assign(Field, {
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  Group: FieldGroup,
  Legend: FieldLegend,
  Separator: FieldSeparator,
  Set: FieldSet,
  Content: FieldContent,
  Title: FieldTitle
});
var Form2 = Object.assign(Form, {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField
});
var HoverCard22 = Object.assign(HoverCard2, {
  Trigger: HoverCardTrigger2,
  Content: HoverCardContent2
});
var InputGroup2 = Object.assign(InputGroup, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Text: InputGroupText,
  Input: InputGroupInput,
  Textarea: InputGroupTextarea
});
var Item27 = Object.assign(Item7, {
  Media: ItemMedia,
  Content: ItemContent,
  Actions: ItemActions,
  Group: ItemGroup,
  Separator: ItemSeparator,
  Title: ItemTitle,
  Description: ItemDescription,
  Header: ItemHeader,
  Footer: ItemFooter
});
var Kbd2 = Object.assign(Kbd, {
  Group: KbdGroup
});
var Menubar22 = Object.assign(Menubar2, {
  Portal: MenubarPortal2,
  Menu: MenubarMenu2,
  Trigger: MenubarTrigger2,
  Content: MenubarContent2,
  Group: MenubarGroup2,
  Separator: MenubarSeparator2,
  Label: MenubarLabel2,
  Item: MenubarItem2,
  Shortcut: MenubarShortcut,
  CheckboxItem: MenubarCheckboxItem2,
  RadioGroup: MenubarRadioGroup2,
  RadioItem: MenubarRadioItem2,
  Sub: MenubarSub2,
  SubTrigger: MenubarSubTrigger2,
  SubContent: MenubarSubContent2
});
var NativeSelect2 = Object.assign(NativeSelect, {
  OptGroup: NativeSelectOptGroup,
  Option: NativeSelectOption
});
var NavigationMenu22 = Object.assign(NavigationMenu2, {
  List: NavigationMenuList2,
  Item: NavigationMenuItem2,
  Content: NavigationMenuContent2,
  Trigger: NavigationMenuTrigger2,
  Link: NavigationMenuLink2,
  Indicator: NavigationMenuIndicator2,
  Viewport: NavigationMenuViewport2,
  NavigationMenuTriggerStyle: navigationMenuTriggerStyle
});
var Pagination2 = Object.assign(Pagination, {
  Content: PaginationContent,
  Link: PaginationLink,
  Item: PaginationItem,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis
});
var Popover22 = Object.assign(Popover2, {
  Trigger: PopoverTrigger2,
  Content: PopoverContent2,
  Anchor: PopoverAnchor2
});
var RadioGroup24 = Object.assign(RadioGroup5, {
  Item: RadioGroupItem2
});
var ScrollArea22 = Object.assign(ScrollArea2, {
  ScrollBar
});
var Select22 = Object.assign(Select2, {
  Content: SelectContent2,
  Group: SelectGroup2,
  Item: SelectItem2,
  Label: SelectLabel2,
  ScrollDownButton: SelectScrollDownButton2,
  ScrollUpButton: SelectScrollUpButton2,
  Separator: SelectSeparator2,
  Trigger: SelectTrigger2,
  Value: SelectValue2
});
var Sheet2 = Object.assign(Sheet, {
  Trigger: SheetTrigger,
  Close: SheetClose,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription
});
var Sidebar2 = Object.assign(Sidebar, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Input: SidebarInput,
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuItem: SidebarMenuItem,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubButton: SidebarMenuSubButton,
  MenuSubItem: SidebarMenuSubItem,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger
});
var Table2 = Object.assign(Table, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption
});
var Tabs22 = Object.assign(Tabs2, {
  List: TabsList2,
  Trigger: TabsTrigger2,
  Content: TabsContent2
});
var ToggleGroup22 = Object.assign(ToggleGroup2, {
  Item: ToggleGroupItem2
});
var Toggle22 = Object.assign(Toggle2, {
  Variants: toggleVariants
});
var Tooltip22 = Object.assign(Tooltip2, {
  Trigger: TooltipTrigger2,
  Content: TooltipContent2,
  Provider: TooltipProvider2
});

// src/markdown/components.tsx
import clsx54 from "clsx";
import { memo as memo3, useCallback as useCallback22, useEffect as useEffect36, useState as useState32 } from "react";
import { useFetcher, useLocation as useLocation2, useNavigate } from "react-router";

// src/markdown/markdown-config.ts
var MARKDOWN_CONFIG = {
  EXTENSION: ".md",
  CHUNK_BY_FOLDER: true,
  INCREMENTAL_BY_FOLDER: false,
  PREFIX: "markdown",
  PURIFY_HTML: true,
  UPDATE_DATE: true,
  COMPRESS: true,
  CONCURRENCY: {
    FOLDERS: 5,
    FILES: 10
  },
  CACHE: {
    MAX_AGE: 3600
  }
};
var ASSET_PREFIX = {
  build: "/assets/docs",
  fetch: "/assets/docs"
};
var ASSET_ROUTES = {
  docs: (slug) => `/forge/docs/${slug}`,
  docsApi: (slug) => `/forge/docs/${slug}?api`
};
var DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "del",
    "a",
    "img",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "hr",
    "div",
    "span"
  ],
  ALLOWED_ATTR: ["href", "title", "alt", "src", "class", "id", "start", "type", "colspan", "rowspan", "datetime", "scope", "data-*"],
  FORBID_TAGS: ["script", "object", "embed", "form", "input", "button", "iframe", "frame", "frameset", "noframes"],
  FORBID_ATTR: ["style", "on*"],
  KEEP_CONTENT: true,
  ALLOW_DATA_ATTR: false
};
var HIGHLIGHTER_CONFIG = {
  LANGS: ["bash", "css", "html", "javascript", "json", "markdown", "sql", "text", "ts", "tsx", "typescript", "xml", "yaml"],
  THEMES: ["night-owl"]
};

// src/markdown/components.tsx
import { jsx as jsx166, jsxs as jsxs95 } from "react/jsx-runtime";
function MarkdownRenderer({ children, className = "" }) {
  if (!children || typeof children !== "string") {
    return /* @__PURE__ */ jsx166("div", {
      className
    });
  }
  return /* @__PURE__ */ jsx166("div", {
    className,
    dangerouslySetInnerHTML: { __html: children }
  });
}
var isDocContent = (data) => {
  return typeof data === "object" && data !== null && "content" in data && "frontmatter" in data && "slug" in data;
};
var isMarkdownPageData = (data) => {
  return typeof data === "object" && data !== null && "manifest" in data;
};
function MarkdownPage({ loaderData, spriteUrl }) {
  const pageData = isMarkdownPageData(loaderData) ? loaderData : { manifest: loaderData, selectedDoc: undefined, document: undefined };
  const { manifest: docs, selectedDoc: preloadedDoc, document: preloadedDocument, loading: serverLoading } = pageData;
  const location = useLocation2();
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState32(preloadedDoc || null);
  const [error, setError] = useState32(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState32(false);
  const fetcher = useFetcher();
  const handleDocSelect = useCallback22((slug) => {
    if (selectedDoc === slug)
      return;
    navigate(ASSET_ROUTES.docs(slug));
  }, [selectedDoc, navigate]);
  useEffect36(() => {
    if (preloadedDoc && preloadedDoc !== selectedDoc) {
      setSelectedDoc(preloadedDoc);
      setError(null);
    } else {
      const pathParts = location.pathname.split("/");
      const docsIndex = pathParts.indexOf("docs");
      if (docsIndex !== -1 && docsIndex < pathParts.length - 1) {
        const slug = pathParts.slice(docsIndex + 1).join("/");
        if (slug && docs.find((doc) => doc.slug === slug) && selectedDoc !== slug) {
          setSelectedDoc(slug);
          if (!preloadedDocument || preloadedDoc !== slug) {
            fetcher.load(ASSET_ROUTES.docsApi(slug));
          }
        }
      } else if (selectedDoc && !preloadedDoc) {
        setSelectedDoc(null);
        setError(null);
      }
    }
  }, [docs, fetcher.load, selectedDoc, location.pathname, preloadedDoc, preloadedDocument]);
  useEffect36(() => {
    if (fetcher.state === "idle" && fetcher.data && !isDocContent(fetcher.data)) {
      setError("Failed to load document");
    }
  }, [fetcher.state, fetcher.data]);
  const currentDoc = preloadedDocument && preloadedDoc === selectedDoc ? { content: preloadedDocument.content, frontmatter: preloadedDocument.frontmatter, slug: selectedDoc } : isDocContent(fetcher.data) ? fetcher.data : undefined;
  return /* @__PURE__ */ jsx166("div", {
    className: "min-h-screen bg-white transition-colors dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs95("div", {
      className: "flex",
      children: [
        /* @__PURE__ */ jsxs95("aside", {
          className: `fixed inset-y-0 top-0 left-0 z-20 flex w-80 flex-col border-gray-200 border-r bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}`,
          children: [
            /* @__PURE__ */ jsxs95("div", {
              className: "flex-1 overflow-y-auto p-6 pb-20",
              children: [
                /* @__PURE__ */ jsxs95("div", {
                  className: "mb-6 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx166("h2", {
                      className: "font-semibold text-gray-900 text-lg dark:text-white",
                      children: "Documentation"
                    }),
                    /* @__PURE__ */ jsx166("div", {
                      children: /* @__PURE__ */ jsx166("button", {
                        type: "button",
                        onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                        className: "rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                        children: /* @__PURE__ */ jsx166(SpriteIcon2, {
                          spriteUrl,
                          iconId: "ChevronLeft",
                          className: "h-5 w-5"
                        })
                      })
                    })
                  ]
                }),
                /* @__PURE__ */ jsx166("nav", {
                  className: "space-y-1",
                  "aria-label": "Documentation navigation",
                  children: docs.length === 0 ? /* @__PURE__ */ jsx166(DocListEmpty, {}) : /* @__PURE__ */ jsx166(DocList, {
                    docs,
                    selectedDoc,
                    onDocSelect: handleDocSelect,
                    spriteUrl
                  })
                })
              ]
            }),
            /* @__PURE__ */ jsx166("div", {
              className: "border-gray-200/50 border-t p-4 backdrop-blur-sm dark:border-gray-800/50",
              children: /* @__PURE__ */ jsxs95("div", {
                className: "flex items-center justify-end gap-x-3",
                children: [
                  /* @__PURE__ */ jsx166(Link4, {
                    href: "/",
                    children: /* @__PURE__ */ jsx166(SpriteIcon2, {
                      spriteUrl,
                      iconId: "House",
                      className: "size-5 text-accent-foreground transition-colors hover:text-accent-foreground/80",
                      viewBox: "0 0 24 24"
                    })
                  }),
                  /* @__PURE__ */ jsx166(ThemeSwitch, {
                    spriteUrl
                  })
                ]
              })
            })
          ]
        }),
        /* @__PURE__ */ jsx166("button", {
          type: "button",
          onClick: () => setSidebarCollapsed(false),
          className: `fixed top-4 left-4 z-30 rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-opacity duration-300 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${sidebarCollapsed ? "opacity-100" : "pointer-events-none opacity-0"}`,
          children: /* @__PURE__ */ jsx166(SpriteIcon2, {
            spriteUrl,
            iconId: "EllipsisVertical",
            className: "h-5 w-5"
          })
        }),
        /* @__PURE__ */ jsx166("main", {
          className: `flex-1 transition-all duration-300 ${sidebarCollapsed ? "pl-0" : "pl-64"} min-w-0`,
          children: /* @__PURE__ */ jsx166("div", {
            className: "mx-auto min-w-0 max-w-4xl px-4 md:px-8",
            children: !selectedDoc ? /* @__PURE__ */ jsx166("div", {
              className: "flex h-96 items-center justify-center",
              children: /* @__PURE__ */ jsxs95("div", {
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx166("div", {
                    className: "mb-4 text-gray-400 dark:text-gray-500",
                    children: /* @__PURE__ */ jsx166(SpriteIcon2, {
                      spriteUrl,
                      iconId: "CircleAlert",
                      className: "h-8 w-8"
                    })
                  }),
                  /* @__PURE__ */ jsx166("h3", {
                    className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
                    children: "Select a document"
                  }),
                  /* @__PURE__ */ jsx166("p", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "Choose a document from the sidebar to view its content."
                  })
                ]
              })
            }) : fetcher.state === "loading" || serverLoading || selectedDoc && !currentDoc && !error ? /* @__PURE__ */ jsx166(LoadingBar, {}) : error ? /* @__PURE__ */ jsx166(DocumentNotFound, {
              spriteUrl
            }) : currentDoc ? /* @__PURE__ */ jsxs95("article", {
              className: "markdown-content min-w-0 py-8 md:py-12",
              children: [
                /* @__PURE__ */ jsx166(DocumentHeader, {
                  frontmatter: currentDoc.frontmatter
                }),
                /* @__PURE__ */ jsx166(MarkdownRenderer, {
                  className: "min-w-0 max-w-none",
                  children: currentDoc.content
                })
              ]
            }) : /* @__PURE__ */ jsx166(DocumentNotFound, {
              spriteUrl
            })
          })
        })
      ]
    })
  });
}
var DocListEmpty = () => {
  return /* @__PURE__ */ jsx166("p", {
    className: "text-gray-500 text-sm dark:text-gray-400",
    children: "No documentation found."
  });
};
var DocumentNotFound = memo3(({ spriteUrl }) => /* @__PURE__ */ jsx166("div", {
  className: "flex h-96 items-center justify-center",
  children: /* @__PURE__ */ jsxs95("div", {
    className: "text-center",
    children: [
      /* @__PURE__ */ jsx166("div", {
        className: "mb-4 text-red-400 dark:text-red-500",
        children: /* @__PURE__ */ jsx166(SpriteIcon2, {
          spriteUrl,
          iconId: "CircleAlert",
          className: "mx-auto h-8 w-8"
        })
      }),
      /* @__PURE__ */ jsx166("h3", {
        className: "mb-2 font-medium text-gray-900 text-lg dark:text-white",
        children: "Document not found"
      }),
      /* @__PURE__ */ jsx166("p", {
        className: "text-gray-500 dark:text-gray-400",
        children: "The selected document could not be loaded."
      })
    ]
  })
}));
var DocumentHeader = memo3(({ frontmatter }) => /* @__PURE__ */ jsxs95("header", {
  className: "mb-8",
  children: [
    frontmatter.title && /* @__PURE__ */ jsx166("h1", {
      className: "mb-4 font-bold font-serif text-3xl text-gray-900 dark:text-white",
      children: frontmatter.title
    }),
    frontmatter.description && /* @__PURE__ */ jsx166("p", {
      className: "mb-4 font-serif text-gray-600 text-lg dark:text-gray-300",
      children: frontmatter.description
    }),
    (frontmatter.formattedDate || frontmatter.version) && /* @__PURE__ */ jsxs95("div", {
      className: "flex items-center justify-between text-gray-500 text-sm dark:text-gray-400",
      children: [
        frontmatter.formattedDate && /* @__PURE__ */ jsx166("time", {
          className: "font-sans",
          dateTime: frontmatter.date,
          children: frontmatter.formattedDate
        }),
        frontmatter.version && /* @__PURE__ */ jsx166("span", {
          className: "px-2 py-1 font-mono text-gray-300 text-xs italic dark:text-gray-600",
          children: frontmatter.version
        })
      ]
    })
  ]
}));
var DocList = memo3(({ docs, selectedDoc, onDocSelect, spriteUrl }) => {
  const groupedDocs = useCallback22(() => {
    const groups2 = {};
    for (const doc of docs) {
      const folder = doc.folder || "";
      if (!groups2[folder]) {
        groups2[folder] = [];
      }
      groups2[folder].push(doc);
    }
    return groups2;
  }, [docs]);
  const groups = groupedDocs();
  return /* @__PURE__ */ jsx166("div", {
    className: "space-y-1",
    children: Object.entries(groups).map(([folder, folderDocs]) => {
      const isRootLevel = folder === "";
      const folderId = `folder-${folder.replace(/[^a-zA-Z0-9]/g, "-")}`;
      return /* @__PURE__ */ jsxs95("div", {
        children: [
          !isRootLevel && /* @__PURE__ */ jsxs95("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ jsx166("input", {
                type: "checkbox",
                id: folderId,
                className: "peer hidden",
                defaultChecked: true
              }),
              /* @__PURE__ */ jsxs95("label", {
                htmlFor: folderId,
                className: "flex w-full cursor-pointer items-center px-3 py-2 text-left text-gray-600 text-sm transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50",
                children: [
                  /* @__PURE__ */ jsx166(SpriteIcon2, {
                    spriteUrl,
                    iconId: "ChevronRight",
                    className: "mr-2 h-3 w-3 transition-transform duration-200 peer-checked:rotate-90"
                  }),
                  /* @__PURE__ */ jsx166("span", {
                    className: "font-medium capitalize",
                    children: folder
                  })
                ]
              }),
              /* @__PURE__ */ jsx166("div", {
                className: "ml-6 max-h-0 space-y-0.5 overflow-hidden transition-all duration-300 peer-checked:max-h-96",
                children: folderDocs.map((doc) => /* @__PURE__ */ jsx166("button", {
                  type: "button",
                  onClick: () => onDocSelect(doc.slug),
                  className: clsx54("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
                  children: /* @__PURE__ */ jsx166("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsx166("div", {
                      className: "flex-1",
                      children: /* @__PURE__ */ jsx166("div", {
                        className: "font-medium",
                        children: doc.title || doc.slug
                      })
                    })
                  })
                }, doc.slug))
              })
            ]
          }),
          isRootLevel && /* @__PURE__ */ jsx166("div", {
            className: "space-y-0.5",
            children: folderDocs.map((doc) => /* @__PURE__ */ jsx166("button", {
              type: "button",
              onClick: () => onDocSelect(doc.slug),
              className: clsx54("w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none", selectedDoc === doc.slug ? "border-blue-500 border-r-2 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-100" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"),
              children: /* @__PURE__ */ jsx166("div", {
                className: "font-medium",
                children: doc.title || doc.slug
              })
            }, doc.slug))
          })
        ]
      }, folder || "root");
    })
  });
});
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
var ValiError = class extends Error {
  constructor(issues) {
    super(issues[0].message);
    this.name = "ValiError";
    this.issues = issues;
  }
};
function check(requirement, message2) {
  return {
    kind: "validation",
    type: "check",
    reference: check,
    async: false,
    expects: null,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "input", dataset, config2);
      }
      return dataset;
    }
  };
}
function minLength(requirement, message2) {
  return {
    kind: "validation",
    type: "min_length",
    reference: minLength,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && dataset.value.length < this.requirement) {
        _addIssue(this, "length", dataset, config2, {
          received: `${dataset.value.length}`
        });
      }
      return dataset;
    }
  };
}
function regex(requirement, message2) {
  return {
    kind: "validation",
    type: "regex",
    reference: regex,
    async: false,
    expects: `${requirement}`,
    requirement,
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, "format", dataset, config2);
      }
      return dataset;
    }
  };
}
function trim() {
  return {
    kind: "transformation",
    type: "trim",
    reference: trim,
    async: false,
    "~run"(dataset) {
      dataset.value = dataset.value.trim();
      return dataset;
    }
  };
}
function string(message2) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: false,
    message: message2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      if (typeof dataset.value === "string") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
function parse2(schema, input, config2) {
  const dataset = schema["~run"]({ value: input }, getGlobalConfig(config2));
  if (dataset.issues) {
    throw new ValiError(dataset.issues);
  }
  return dataset.value;
}
function pipe(...pipe2) {
  return {
    ...pipe2[0],
    pipe: pipe2,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      for (const item of pipe2) {
        if (item.kind !== "metadata") {
          if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
            dataset.typed = false;
            break;
          }
          if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
            dataset = item["~run"](dataset, config2);
          }
        }
      }
      return dataset;
    }
  };
}

// src/markdown/markdown-utils.ts
var documentSlugSchema = pipe(string(), trim(), minLength(1, "Slug cannot be empty"), regex(/^[a-zA-Z0-9-_/]+$/, "Slug can only contain letters, numbers, hyphens, underscores, and forward slashes"), check((slug) => !slug.includes(".."), "Directory traversal not allowed"), check((slug) => !slug.startsWith("/"), "Slug cannot start with forward slash"), check((slug) => !slug.endsWith("/"), "Slug cannot end with forward slash"));
function validateDocumentSlug(slug) {
  try {
    return parse2(documentSlugSchema, slug);
  } catch (error) {
    if (error instanceof ValiError) {
      const message = error.issues[0]?.message || "Invalid document url";
      throw new Response(message, { status: 400 });
    }
    throw new Response("Invalid document slug", { status: 400 });
  }
}
function formatAssetUrl(filename, request, prefix) {
  const fetchPrefix = prefix || ASSET_PREFIX.fetch;
  const normalizedPrefix = fetchPrefix.endsWith("/") ? fetchPrefix.slice(0, -1) : fetchPrefix;
  const url = `${normalizedPrefix}/${filename}`;
  return request ? new URL(url, request.url).href : url;
}

// src/markdown/markdown-data.ts
var manifestCache = null;
var globalManifestCache = null;
var contentCache = null;
var folderContentCache = new Map;
async function fetchContent(url, assets) {
  const fetchFn = (input, init) => assets.fetch(input, init);
  const baseUrl = url.endsWith(".gz") ? url.replace(".gz", "") : url;
  const gzUrl = `${baseUrl}.gz`;
  try {
    const gzResponse = await fetchFn(gzUrl);
    if (gzResponse.ok) {
      const compressedData = await gzResponse.arrayBuffer();
      const decompressedStream = new DecompressionStream("gzip");
      const decompressedResponse = new Response(new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(compressedData));
          controller.close();
        }
      }).pipeThrough(decompressedStream));
      const decompressedText = await decompressedResponse.text();
      const parsed = JSON.parse(decompressedText);
      return parsed;
    }
  } catch (_compressionError) {}
  try {
    const response = await fetchFn(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const parsed = await response.json();
    return parsed;
  } catch (uncompressedError) {
    const errorMsg = `Failed to fetch both compressed (${gzUrl}) and uncompressed (${baseUrl}) versions: ${uncompressedError instanceof Error ? uncompressedError.message : "Unknown error"}`;
    throw new Error(errorMsg);
  }
}
async function getGlobalManifest(assets, request, prefix) {
  if (globalManifestCache) {
    return globalManifestCache;
  }
  try {
    const manifestUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-manifest.json`, request);
    const globalManifest = await fetchContent(manifestUrl, assets);
    globalManifestCache = globalManifest;
    return globalManifest;
  } catch (_error) {
    return { documents: [], _buildMode: "single" };
  }
}
async function getMarkdownManifest(assets, request, prefix) {
  if (manifestCache) {
    return manifestCache;
  }
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  const cleanManifest = globalManifest.documents.map(({ _mtime, _size, ...item }) => item);
  manifestCache = cleanManifest;
  return cleanManifest;
}
async function getMarkdownContent(assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    return {};
  }
  if (contentCache) {
    return contentCache;
  }
  try {
    const contentUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-content.json`, request);
    const content = await fetchContent(contentUrl, assets);
    contentCache = content;
    return content;
  } catch (_error) {
    return {};
  }
}
async function loadFolderContent(folder, assets, request, prefix) {
  if (folderContentCache.has(folder)) {
    const cachedContent = folderContentCache.get(folder);
    if (cachedContent) {
      return cachedContent;
    }
  }
  try {
    const folderKey = folder.replace(/[/\\]/g, "-");
    const contentUrl = formatAssetUrl(`${prefix || MARKDOWN_CONFIG.PREFIX}-content-${folderKey}.json`, request);
    const content = await fetchContent(contentUrl, assets);
    folderContentCache.set(folder, content);
    return content;
  } catch (_error) {
    return {};
  }
}
async function getMarkdownDocument(slug, assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request, prefix);
    const docMeta = manifest.find((doc) => doc.slug === slug);
    if (!docMeta) {
      return null;
    }
    const folder = docMeta.folder || "root";
    const folderContent = await loadFolderContent(folder, assets, request, prefix);
    return folderContent[slug] || null;
  }
  const content = await getMarkdownContent(assets, request, prefix);
  return content[slug] || null;
}
function clearMarkdownCache() {
  manifestCache = null;
  globalManifestCache = null;
  contentCache = null;
  folderContentCache.clear();
}
async function hasMarkdownDocument(slug, assets, request, prefix) {
  const globalManifest = await getGlobalManifest(assets, request, prefix);
  if (globalManifest._buildMode === "chunked") {
    const manifest = await getMarkdownManifest(assets, request, prefix);
    return manifest.some((doc) => doc.slug === slug);
  }
  const content = await getMarkdownContent(assets, request, prefix);
  return slug in content;
}
export {
  validateDocumentSlug,
  hasMarkdownDocument,
  getMarkdownManifest,
  getMarkdownDocument,
  getMarkdownContent,
  formatAssetUrl,
  clearMarkdownCache,
  MarkdownRenderer,
  MarkdownPage,
  MARKDOWN_CONFIG,
  HIGHLIGHTER_CONFIG,
  DOMPURIFY_CONFIG,
  ASSET_ROUTES,
  ASSET_PREFIX
};

//# debugId=314EAF450CA665FA64756E2164756E21
