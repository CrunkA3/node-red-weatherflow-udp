module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("evt_strike", function (data) {
            try {
                var msg = {
                    payload: {
                        utcDate: new Date(data.payload.evt[0] * 1000),
                        distance: data.payload.evt[1],
                        energy: data.payload.evt[2]
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

    RED.nodes.registerType("weatherflow-lightning-strike", UdpListenerNode);
}