import axios from 'axios';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import flushPromises from 'flush-promises';
import registerDirectives from '../../src/directives'
import { axiosMock } from '../mocks/api';
import { mount, createLocalVue  } from '@vue/test-utils';

import { mockToDoApi } from '../mocks/api/todo.api.mock';

import store from '../../src/store'
import TodoPageComponent from '../../src/views/todoPage/TodoPage.vue';
import * as pageObject from './todo.po';

const localVue = createLocalVue()

localVue.use(Vuex);
localVue.use(ElementUI);
registerDirectives(localVue)

let toDoWrapper;

beforeEach(() => {
  mockToDoApi();
});

beforeEach(() => {
  toDoWrapper = mount(TodoPageComponent, { store, localVue });
});

afterAll(() => {
  axiosMock.reset();
});

describe('api', () => {
  it('should read items', async () => {
    const itemsResponse = await axios.get('/users/1/todos');
    expect(itemsResponse.data).toEqual([
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        }
    ]);
  });

  it('should add items', async () => {
    const newItem = {
      "userId": 1,
      "id": 3,
      "title": "My new item",
      "completed": true
    };
    const itemsResponse = await axios.post('/todos', newItem);
    expect(itemsResponse.data).toEqual(newItem);
  });

  it('should remove items', async () => {
    const itemsResponse = await axios.delete('/todos/2');
    expect(itemsResponse.data).toEqual({
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    });
  });

  it('should update item', async () => {
    const itemsResponse = await axios.put('/todos/2', {
      "title": "Edited Item",
      "completed": true
    });
    expect(itemsResponse.data).toEqual({
      "userId": 1,
      "id": 2,
      "title": "Edited Item",
      "completed": true
    });
  });
});

describe('Todo component', () => {
  it('should pass sanity check', () => {
    expect(toDoWrapper.attributes().class).toBe('todo-page');
  });
  
  it('should match snapshot', () => {
    expect(toDoWrapper.element).toMatchSnapshot()
  });

  it('should add new item', async () => {
    await flushPromises();
    const itemEls = pageObject.getItems(toDoWrapper);
    const newInputEl = pageObject.newItemInput(toDoWrapper);
    const addButton = pageObject.addButton(toDoWrapper);
    expect(itemEls.length).toBe(2);
    newInputEl.setValue('My item from test');
    await localVue.nextTick();
    addButton.trigger('click');
    await flushPromises();
    expect(pageObject.getItems(toDoWrapper).length).toBe(3);
  });
  it('should remove item', async () => {
    await flushPromises();
    const itemEls = pageObject.getItems(toDoWrapper);
    const itemEl = pageObject.getItem(toDoWrapper, 1);
    const deleteButton = pageObject.getDeleteBtn(itemEl);
    expect(itemEls.length).toBe(2);
    deleteButton.trigger('click');
    await flushPromises();
    expect(pageObject.getItems(toDoWrapper).length).toBe(1);
  });
  it('should update checked state', async () => {
    await flushPromises();
    const itemEls = pageObject.getItems(toDoWrapper);
    const itemEl = pageObject.getItem(toDoWrapper, 1);
    const stateCheckboxLabel = pageObject.getStateCheckboxLabel(itemEl);
    const stateCheckbox = pageObject.getStateCheckbox(stateCheckboxLabel);
    expect(itemEls.length).toBe(2);
    expect(stateCheckbox.element.checked).toBe(false);
    stateCheckboxLabel.trigger('click');
    await flushPromises();
    expect(pageObject.getItems(toDoWrapper).length).toBe(2);
    expect(pageObject.getStateCheckbox(itemEl).element.checked).toBe(true);
  });
  it('should update title', async () => {
    await flushPromises();
    let itemEl = pageObject.getItem(toDoWrapper, 1);
    let itemLabel = pageObject.getItemLabel(itemEl);
    const updateTitleBtn = pageObject.getUpdateTitleBtn(itemEl);
    expect(itemLabel.text()).toBe('quis ut nam facilis et officia qui');
    updateTitleBtn.trigger('click');
    await localVue.nextTick();
    const updateTitleInput = pageObject.getUpdateTitleInput(itemEl);
    updateTitleInput.setValue('Updated item');
    updateTitleInput.trigger('keypress', {key: 'Enter'});
    await flushPromises();
    itemEl = pageObject.getItem(toDoWrapper, 1)
    itemLabel = pageObject.getItemLabel(itemEl);
    expect(itemLabel.text()).toBe('Updated item');
  });
});