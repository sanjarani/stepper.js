# stepper.js

JQuery-based setup stepper

## Description

This simple JavaScript library allows to divide form into multiple steps. Each step can have specific event attached that executes before or after transition to it.
Step events can be used for validation handling of particular steps. There are also global events (before and after transition) that can be used for initialising and effects.

## Basic HTML structure

Stepper works with both a and button HTML elements for control of the flow.

### Steps

```html
<div class="stepper-steps">
    <div class="stepper-step step-1">
	    <!-- step1 content -->
	    <button type="submit" class="switch-step" data-step="2">Go to next step</button>
    </div>
    <div class="stepper-step step-2">
	    <!-- step2 content -->
	    <button type="submit" class="switch-step" data-step="3">Go to next step</button>
    </div>
    <div class="stepper-step step-3">
	    <!-- step3 content -->
    </div>
</div>
```

### Menu (optional)

```html
<ul>
    <li><button class="stepper-menu switch-step" data-step="prev">&lt;</button></li>
    <li><button class="stepper-menu switch-step" data-step="1">Step 1</button></li>
    <li><button class="stepper-menu switch-step" data-step="2">Step 2</button></li>
    <li><button class="stepper-menu switch-step" data-step="3">Step 3</button></li>
    <li><button class="stepper-menu switch-step" data-step="next">&gt;</button></li>
</ul>
```

Menu items are automatically highlighted depending on the active step.

## Configuration

### Initialisation

```js
var stepper = stepper();

$(function(){
    stepper.init({ maxSteps: 3 });
})
```

### Additional options
 * startStep: which step should be shown first
 * itemActiveClass: CSS class for highlighting of the menu item (if menu present), default: "active"

```js
stepper.init({ maxSteps: 3, startStep: 1, itemActiveClass: "active-item" });
```

### Adding callbacks

```js
stepper.addCallback(1, function(){
    //some code here...
}, "after");

stepper.addGlobalCallback(function(_step, nextStep){
    //some code here...
}, "after");
```