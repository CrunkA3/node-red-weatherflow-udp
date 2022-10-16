module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("rapid_wind", function (data) {
            try {
                var msg = {
                    payload: {
                        utcDate: new Date(data.payload.ob[0] * 1000),
                        windSpeed: data.payload.ob[1],
                        windDirection: data.payload.ob[2]
                    },
                    originalMessage: data.payload,
                    remote: data.remote
                };

                node.send(msg);
            } catch (error) {
                node.error(error, data);
            }
        });
    }

    RED.nodes.registerType("weatherflow-rapid-wind", UdpListenerNode);
}