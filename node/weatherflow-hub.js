module.exports = function (RED) {
    var dgram = require('dgram');

    var udpClient = null;

    function WeatherFlowHubNode(config) {
        RED.nodes.createNode(this, config);
        this.port = config.port;
        var node = this;

        udpClient = dgram.createSocket({ type: 'udp4', reuseAddr: true });

        udpClient.on('close', function () {
            node.emit("status", { fill: "grey", shape: "dot", text: "close" });
        });

        udpClient.on('connect', function () {
            node.emit("status", { fill: "yellow", shape: "dot", text: "connect" });
        });

        udpClient.on('error', function (error) {
            node.error(error);
            node.emit("status", { fill: "red", shape: "ring", text: "error" });
        });

        udpClient.on('listening', function () {
            node.emit("status", { fill: "green", shape: "dot", text: "listening" });
        });

        udpClient.on('message', function (message, remote) {
            //node.log(remote.address + ':' + remote.port + ' - ' + message);
        });

        udpClient.bind({
            address: '0.0.0.0',
            port: config.port,
            exclusive: false
        });
    }


    RED.nodes.registerType("weatherflow-hub", WeatherFlowHubNode);
}