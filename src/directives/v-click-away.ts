import Login from '@/views/Login.vue';
import { DirectiveBinding } from 'vue';

interface ClickAwayElement extends HTMLElement {
  __clickAwayHandler__?: (event: Event) => void;
}

const vClickAway = {
  beforeMount(el: ClickAwayElement, binding: DirectiveBinding) {
    el.__clickAwayHandler__ = (event: Event) => {
      const currentId = (event.target as HTMLElement).id;
      const currentClass = (event.target as HTMLElement).className;

      if (
        [
          'toggle-cart-button',
          'close-modal-button',
          'close-modal-button-action',
          'click-away-modal',
        ].includes(currentId)
      )
        return;
      if (currentClass.includes('disabled-close')) return;

      if (!el.contains(event.target as Node)) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.__clickAwayHandler__);
  },
  unmounted(el: ClickAwayElement) {
    document.removeEventListener('click', el.__clickAwayHandler__);
  },
};

export default vClickAway;
