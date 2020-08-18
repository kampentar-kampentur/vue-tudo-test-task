export const getItems = (wrapper) => wrapper.findAll('.todo-item');
export const getItem = (wrapper, index) => {
  return getItems(wrapper).at(index);
}
export const newItemInput = (wrapper) => wrapper.find('#new-item-input');
export const addButton = (wrapper) => wrapper.find('#add-new-button');
export const getDeleteBtn = (item) => item.find('.todo-item-remove-btn');
export const getUpdateTitleBtn = (item) => item.find('.todo-item-edit-btn');
export const getUpdateTitleInput = (item) => item.find('input[type="text"]');
export const getStateCheckbox = (item) => item.find('input[type="checkbox"]');
export const getStateCheckboxLabel = (itemLabel) => itemLabel.find('.todo-item-checkbox');
export const getItemLabel = (itemLabel) => itemLabel.find('.todo-item-label');
