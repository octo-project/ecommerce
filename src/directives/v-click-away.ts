import {DirectiveBinding} from 'vue'

interface ClickAwayElement extends HTMLElement {
    __clickAwayHandler__?: (event: Event) => void;
}

const vClickAway = {
    beforeMount(el: ClickAwayElement, binding: DirectiveBinding) {
        el.__clickAwayHandler__ = (event: Event) => {
            const toggleButton = document.getElementById("toggle-cart-button");

            if(toggleButton && toggleButton.contains(event.target as Node))
                return;

            if(!el.contains(event.target as Node)){
                binding.value(event);
            }
        };
        document.addEventListener("click", el.__clickAwayHandler__);
    },
    unmounted(el: ClickAwayElement) {
        document.removeEventListener("click", el.__clickAwayHandler__);
    },
}

export default vClickAway;