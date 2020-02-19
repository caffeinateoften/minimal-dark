# dont ever do this on production projects, im just messin

# tool-chain
## Current Behavior:
- Every block and element and --modifier level item defined in our modules.css stylesheet is expected to be registered as a custom element.
(Note: Something with block--modifier automatically is given class="block block-modifier", and same goes for element level items)
- At runtime (todo: move to build-time) an error is logged if no connectedCallback() function was provided for the block or element

## Goals:
- CSS Should drive the existance of our Modules/Components. The tool-chain can get smarter and stricter for SMACSS + BEM convention.

## Stretch Goals:
- I shouldn't require custom element registration for unused CSS.
- I should be able to detect at build time if I have a node/tag name that doesn't match a registered custom element.
- Intellisense for something that calls this.getAttribute(VALUE) where VALUE shows up if typing on that custom element in HTML.

# Architecture Rules
- A custom HTML Element's logic must only worry about manipulating it's own classes (and not the classes of another HTML element)
- A custom HTML Element's state should be represented by a BEM --state-modifier CSS class
- A custom HTML Element may attach EventListeners to anything, but again, the logic that executes may only manipulate classes of the HTML element that defined said EventListener
- A custom HTML Element that depends on the state of another custom HTML Element should observe changes to the classes on that other element (and not wire up an EventListener just to repeat the action that imperatively caused that other element to get into that state) (e.g. Observe attribute changes with MutationObserver). This loosens the coupling between the two HTML elements, in case another mechanism can cause target element to move into the target state.
- JS Logic that depends on an ID of another custom HTML element should be very obvious in the .html file.
- JS Logic that depends on a CSS class value should be very obvious in the .html file.
(RE: The last two points --> a custom HTML element changes it's class or it's IDs, that blast radius is at least scoped to the HTML files and isolated from the JS files)