---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installation

Run the following with yarn:

`yarn add redux-freeform`

or with npm:

`npm install redux-freeform`

## Create A Form

Create a form config object:

```jsx
import { createFormState } from "redux-freeform";

const formConfig = {
  field1: {},
  field2: {}
};

const { reducer, mapStateToProps, mapDispatchToProps } = createFormState(
  formConfig
);
```

Now you can use `reducer, mapStateToProps, mapDispatchToProps` as you would in any
other Redux app.

mapStateToProps is an identity function provided for verisimilitude with react-redux and
for backwards compatibility as we add features. It is recommended you pass your state through
this function before using it in your view.

mapDispatchToProps takes a dispatch function and returns an object like so:

```jsx
{
  field1: { set: String -> () },
  field2: { set: String -> () }
}
```

Note that even if fields represent numbers the set functions take strings and the coercion is handled
in the state by [validators](validators.md) and [constraints](constraints.md).

Example usage:

```jsx
const actions = mapDispatchToProps(dispatch);
actions.field1.set("foo");
```

## Putting It Together With React

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { createFormState, required } from "redux-freeform";

const myFormConfig = {
  field1: {
    validators: [required()]
  }
};
const { reducer, mapStateToProps, mapDispatchToProps } = createFormState(
  myFormConfig
);

const MyForm = ({ actions, fields }) => (
  <div>
    {fields.field1.hasErrors && fields.field1.errors.includes(required.error)
      ? "Field 1 is required"
      : "Field 1"}
    <input
      value={fields.field1.rawValue}
      onChange={evt => actions.field1.set(evt.target.value)}
      type="text"
    />
  </div>
);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const rootEl = document.getElementById("root");
const render = () =>
  ReactDOM.render(
    <MyForm
      fields={mapStateToProps(store.getState())}
      actions={mapDispatchToProps(store.dispatch)}
    />,
    rootEl
  );

render();
store.subscribe(render);
```