module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });
    }

    RED.nodes.registerType("weatherflow-udp", UdpListenerNode);
}