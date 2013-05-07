# stepper.js

JQuery-based setup stepper

## Description

This simple JavaScript library allows to divide form into multiple steps. Each step can have specific event attached that executes before or after transition to it.

## Basic HTML structure

```html
<div class="stepper-steps">
    <div class="stepper-step step-1">
	    <!-- step1 content -->
    </div>
    <div class="stepper-step step-2">
	    <!-- step2 content -->
    </div>
    <div class="stepper-step step-3">
	    <!-- step3 content -->
    </div>
</div>
```

## Menu (optional)

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