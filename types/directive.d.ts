import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    autoAnimate(el: HTMLElement, binding: any, vnode: any): void;
  }
}
