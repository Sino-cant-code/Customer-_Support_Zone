A React-based Customer Support ticketing system for tracking, managing, and resolving customer issues in real-time.

Live link:https://customer-support-zone-swart.vercel.app/
---------------------------------------------------------
1. What is JSX, and why is it used?

JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JavaScript code. Instead of calling `React.createElement()` manually, JSX lets you write intuitive, declarative UI:
```jsx

JSX is used because it makes component structure readable and maintainable. Babel compiles JSX to regular JavaScript before the browser executes it. It also enables seamless mixing of logic and UI using `{}`
-----------------------------------------------------------
2. What is the difference between State and Props?

State:
State is data that belongs to a component and can change over time. When state changes, the component re-renders automatically.

Props (Properties):
Props are data passed from a parent component to a child component. They are read-only and cannot be modified by the child.
-----------------------------------------------------------
3. What is the useState hook, and how does it work?

`useState` is a React Hook that lets functional components hold and update local state.
It returns two things:

    =>The current state value

    =>A function to update the state
When setCount() is called, React updates the state and re-renders the component.
-----------------------------------------------------------
4. How can you share state between components in React?

by lifting the state up to their common parent component

The parent component stores the state, then passes it to child components using props.

`For Example`

* Parent component has the state.
* Child components receive the state or update function through **props**.
-----------------------------------------------------------
5. How is event handling done in React?

Event handling in React is done by adding event handlers to elements using camelCase syntax and passing a function.
