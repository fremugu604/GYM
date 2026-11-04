var C="fitrutina-v3",F=["./","./index.html","./icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(new Request(u,{cache:"reload"}))}))}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(m){
    var net=fetch(e.request).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return null});
    if(m){e.waitUntil(net);return m}
    return net.then(function(r){return r||caches.match("./index.html")});
  }));
});
