self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

// Get mock list start

var allMocks = {};
var mockList = [];

Object.keys(allMocks).forEach(mockKey => {
  var mock = allMocks[mockKey];
  mockList.push({ url: new URL(mockKey, location), value: mock });
});
// Get mock list end

self.addEventListener('fetch', event => {
  var requestUrl = new URL(event.request.url);

  const mockInfo = mockList.find(
    mock =>
      requestUrl.hostname === mock.url.hostname &&
      requestUrl.pathname === mock.url.pathname
  );

  if (mockInfo) {
    var responseInit = {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    if (typeof mockInfo.value === 'function') {
      event.respondWith(
        Promise.resolve(mockInfo.value()).then(responseBody => {
          return new Response(JSON.stringify(responseBody), responseInit);
        })
      );
    } else {
      var responseBody = mockInfo.value;
      var mockResponse = new Response(
        JSON.stringify(responseBody),
        responseInit
      );
      event.respondWith(mockResponse);
    }
  }
});
