export default {
  inserted(el) {
    // focus on new input element
    const focusableEl = el.tagName === 'INPUT' ? el : el.querySelector('input');
    focusableEl.focus();
  }
}
