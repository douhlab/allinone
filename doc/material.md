## Material

> All documentation for material components are available on [the official website](https://material.angular.io/components/categories).

WMS2 uses Fuse, a theme developed with Angular Material. All its components can therefore be used in the templates.

### Examples of material components

#### Buttons

> https://material.angular.io/components/button/overview

Material buttons provide a visually appealing way to trigger actions or perform operations. They come in different variations, such as raised, flat, outlined, icon-only, and floating action buttons (FABs). You can customize their appearance by applying different styles and adding icons.

To use a button, you can add the `mat-button` directive to a `<button>` element. For example:

```html
<button mat-button>Click me!</button>
```

You can further customize buttons by using different variations like `mat-raised-button`, `mat-icon-button`, or `mat-fab`. Each variation provides a distinct visual style.

Please note that you should not use buttons when going to specific page, in this case you can use link with the same `mat-button` directive

```html
<a mat-button [routerLink]="['goto','this-page']">Click me!</a>
```

Also, when no url is behind an action, don't use links, always buttons.

#### Form Fields

> https://material.angular.io/components/form-field/overview

Form fields in Material Components are used for capturing user input. They come with built-in validation, error handling, and visual cues for indicating the state of the input field. Material form fields include text fields, selects, checkboxes, radio buttons, and more.

To use a form field, you typically wrap an input element with the `<mat-form-field>` component. For example:

```html
<mat-form-field appearance="outline">
	<mat-label>What to select</mat-label>
	<select matNativeControl>
		<option value="item_1" selected>Item 1</option>
		<option value="item_2">Item 2</option>
	</select>
</mat-form-field>
```

You can also add additional features like hints, error messages, and prefix/suffix icons to enhance the user experience.
