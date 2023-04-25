[![Codacy Badge](https://app.codacy.com/project/badge/Grade/617f5b5fa37c4da294d0a9842c85344a)](https://app.codacy.com/gh/gitaumoses4/chalk-mate/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/617f5b5fa37c4da294d0a9842c85344a)](https://app.codacy.com/gh/gitaumoses4/chalk-mate/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)

# chalk-mate

![illustration](screenshots/illustration.png)

A library that extends the [chalk.js](https://github.com/chalk/chalk) library by allowing you to apply color and style to HTML-like templates.

## Installation

```bash
npm install chalk-mate
```

## Usage

```javascript
import chalkMate from 'chalk-mate'

const styled = chalkMate(`<red>Hello</red> <green>World</green>`)

console.log(styled)
```

#### Output

![output](screenshots/hello-world.png)

## Foreground Color

The foreground color can be applied:
1. By using the color name as the tag name.
2. By using the `color` attribute.

### Color Names
CSS color names are supported. See [CSS Color Names](https://www.w3schools.com/colors/colors_names.asp) for a list of supported color names.

```html
<red>Hello World</red>
```

### Hexadecimal Color Codes

```html
<bold color="#ff0000">Hello World</bold>
```

### RGB Color Codes

```html
<rgb color="255, 0, 0">Hello World</rgb>
```

## Background Color

The background color can be applied:
1. By using the `bg-` prefix before the color name as the tag name.
2. By using the `bg` attribute.

### Color Names
CSS color names are supported. See [CSS Color Names](https://www.w3schools.com/colors/colors_names.asp) for a list of supported color names.

```html
<bg-red>Hello World</bg-red>
<text bg="red">Hello World</text>
```

### Hexadecimal Color Codes

```html
<white bg="#ff0000">Hello World</white>
```

### RGB Color Codes

```html
<white color="255, 0, 0">Hello World</white>
```

## Text Styles

The following text styles are supported:
1. Bold
2. Dim
3. Italic
4. Underline
5. Inverse
6. Hidden
7. Strikethrough
8. Visible

> See modifiers in [chalk.js](https://github.com/chalk/chalk#modifiers) for more information.

They can be applied:
1. By using the style name as the tag name.
2. By using the name of the style as the attribute.

```html
<bold>Hello World</bold>
or

<text bold>Hello World</text>
```
