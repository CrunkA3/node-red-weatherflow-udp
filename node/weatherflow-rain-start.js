module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("evt_precip", function (data) {
            var msg = {
                payload: {
                    utcDate: new Date(data.payload.evt[0] * 1000)
                },
                originalMessage: data.payload,
                remote: data.remote
            };

            node.send(msg);
        });
    }

    RED.nodes.registerType("weatherflow-rain-start", UdpListenerNode);
}