Following recourses are used in this project:

    https://birdeatsbug.com/blog/object-oriented-programming-in-typescript


Code Example :-
``` var net = require('net');
    var server = net.createServer();

    server.once('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        // port is currently in use
    }
    });

    server.once('listening', function() {
    // close the server if listening doesn't fail
    server.close();
    });

    server.listen(/* put the port to check here */);
```

node-portfinder:-

    https://github.com/http-party/node-portfinder/blob/master/lib/portfinder.js