import { defineNuxtPlugin } from '#app';
import { DirectiveBinding } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event);
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: HTMLElement) {
      document.removeEventListener('click', el.clickOutsideEvent);
    },
  });
});
