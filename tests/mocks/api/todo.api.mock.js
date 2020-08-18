import { axiosMock } from './index';

export const getMockData = () => {
    return [
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
    ]
};

export const mockToDoApi = () => {
    const mockToDoData = getMockData();
    const rootUrl = "/todos";
    const itemUrl = new RegExp(`\\${rootUrl}/\\d+`);
    const getUrl = new RegExp(/\/users\/\d+\/todos/);
    // create resource
    axiosMock.onPost(rootUrl).reply((config) => {
        const itemToAdd = JSON.parse(config.data);
        mockToDoData.push(itemToAdd);
        return [200, itemToAdd];
    }); 
    // read resource
    axiosMock.onGet(getUrl).reply(200, mockToDoData);
    // update resource
    axiosMock.onPut(itemUrl).reply((config) => {
        const itemInMockData = getMockItemByUrlParam(config);
        Object.assign(itemInMockData, JSON.parse(config.data));
        return [200, itemInMockData];
    });
    // delete resource
    axiosMock.onDelete(itemUrl).reply((config) => {
        const itemInMockData = getMockItemByUrlParam(config);
        const itemInMockDataIndex = mockToDoData.indexOf(itemInMockData);
        if (itemInMockDataIndex !== -1) {
            mockToDoData.splice(itemInMockDataIndex, 1);
            return [200, itemInMockData];
        }
        return [400, 'Bad Request'];
    });
    
    function getMockItemByUrlParam(config) {
        let itemId = Number(config.url.slice(config.url.lastIndexOf('/') + 1));
        return mockToDoData.find(item => item.id === itemId);
    }
};
