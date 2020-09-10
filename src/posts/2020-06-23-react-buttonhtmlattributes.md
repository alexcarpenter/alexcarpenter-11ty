---
title: TypeScript extend React Button HTML Attributes
tags:
  - TIL
  - TypeScript
---
{% import "components/macros.njk" as components %}
When I got started learning TypeScript, I found myself defining all of the prop types I expected the component to need instead of extending some of the types React provides by default.

For example, when I created my `<Button />` component, I was defining the `type`, `disabled`, `onClick`, etc. attributes and props types.

Instead of having to define each of the attributes/props available on button elements, we can extend `React.ButtonHTMLAttributes<HTMLButtonElement>` on buttons.

```js/2/3-5
// Button.tsx
const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
  type: 'submit' | 'button' | 'reset',
  disabled: boolean,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
```

Now when we make use of the `<Button />` component, we get intelliSense support for button attributes/props without having to define each of them within our component.

{{ components.video({
  url: '/assets/videos/react-html-button.mp4',
  ratio: '846/708',
  caption: 'Button intelliSense example in Visual Studio Code'
}) }}

This method applies to other interactive elements like inputs as well.

```js/2
// Input.tsx
const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({
  ...props
}) => (
  <input {...props} />
);
```

[Here is a Codesandbox](https://codesandbox.io/s/agitated-fog-tx47f?file=/src/Input.tsx:33-143) with the examples listed above to experiment with.


