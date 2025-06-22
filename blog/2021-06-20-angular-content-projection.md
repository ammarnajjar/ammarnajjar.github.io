---
slug: angular-content-projection
title: "Angular - Content Projection"
authors: ammarnajjar
date: 2021-06-20 11:05:50 +0200
tags: [angular]
---

Content projection is a feature in angular that supports inserting a component in another component. This changes the way an angular developer designs his application/library by implementing flexable and reusable components.

This post explains the different types of content projection, where to use each of them, with an example project. All the code can be found on github.(LINK)

<!-- truncate -->

Types of Content projection:

## Single-slot Content Projection
In this type, only one slot is avaiable for a component to be inserted in the container component.

For example, let's assume that you have a footer component, which has to include some sort of content (child) component. There are many scenarios where using content projection here right from the start:
- The content component is not yet defined. It could be a button, a text label, a select, a link, an icon or an image.
- You work in a team, where you split the job, and you implement the footer component, meanwhile another developer will implement the content component.
- The content component is defined, and you work on the footer alone, but you want to make sure that these two components are not tightly coupled, so it is possible to switch either one of them without the need to re-implement or modify any of them.

The footer component is given a slot where a content component can be inserted using `ng-content`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer">
    <ng-content></ng-content>   // content slot
  </div>
`
})
export class FooterComponent {}
```

The content component can be any thing, and for the sake of keeping the focus on the content projectoin theme here, let's assume that it is just an "about" button:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button>about</button>
  `
})
export class ButtonComponent {}
```

The footer component can be used now inside the app component, and the button component can be inserted/projected in place:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-footer>
      <app-button></app-button>
    </app-footer>
  `
})
export class AppComponent {}
```

That's it.

If the requirements changes, and the footer is needed to have a link text instead of the button, all what needs to be done is to implement the new content component, then project it in place in the footer component instead of the button component.

[Go to Top](#Top)

## Multi-slot content projection:

This type of projection allows the insertion of multiple content components in the container component. That means that there are more than one `ng-content` slot.

Let's continue with the previous footer example, and assume that the requirements changed again, and the footer is required to have both a button on the left and a text link on the right at the same time. Footer component, a button coponent and a link text component are already there.

In order to project multiple contents, the footer component needs to be updated, and let it accept two slots in this case, and each slot takes a `selelct` attribute which determine which content to be rendered in which slot:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  style: `
    .footer {
      display: flex;
      justify-content: space-between;
    }
  `,
  template: `
  <div class="footer">
    <ng-content select=[left]></ng-content>
    <ng-content select=[right]></ng-content>
  </div>
`
})
export class FooterComponent {}
```

These attributes (`left`, `right`) define which content where to render, so to meet the requirement, the button should be given the `left` attribute, and the link component should be given the `right` attribute.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button>about</button>
  `
})
export class ButtonComponent {}

@Component({
  selector: 'app-link',
  template: `
    <a href="#">about</a>
  `
})
export class LinkComponent {}

@Component({
  selector: 'app-root',
  template: `
    <app-footer>
      <app-button left></app-button>
      <app-link right></app-link>
    </app-footer>
  `
})
export class AppComponent {}
```

This implementation gives a huge felxibility and decoupling of components. For example it is very easy to switch the content components places, or even replace any of the content components without the need to re-implement the whole structure.

[Go to Top](#Top)

## Conditional content projection:

In this type of projection, a condition coverns which content to be rendered in the container component slot. This condition can be made using an `ngIf` statement.

In order to use conditional content projection, `ng-container` and `ng-template` must be used.

By using `ng-content`, angular will **always** initialize the content component even if it was inside an `ngIf` statement.

By using `ng-container` or `ng-template`, angular will only render the content component only if it is explicitly asked to render.

Let's go again to the footer compoennt example, and modify the requirement this time so that only one content must be show at a time, depending on some condition.

To apply these requirements, the change needs to happens

```typescript
@HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}
```

[Go to Top](#Top)