module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
    }

    RED.nodes.registerType("weatherflow-udp", UdpListenerNode);
}