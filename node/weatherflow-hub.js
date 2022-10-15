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
            var messageText = message.toString();
            var messageObject = JSON.parse(messageText);
            
            if (messageObject.type == "rapid_wind") {
                node.emit("rapid_wind", { payload: messageObject, remote: remote });
            }
            else if (messageObject.type == "obs_st") {
                node.emit("obs_st", { payload: messageObject, remote: remote });
            }
            else if (messageObject.type == "obs_air") {
                node.emit("obs_air", { payload: messageObject, remote: remote });
            }
            else if (messageObject.type == "evt_precip") {
                node.emit("evt_precip", { payload: messageObject, remote: remote });
            }
            else if (messageObject.type == "evt_strike") {
                node.emit("evt_strike", { payload: messageObject, remote: remote });
            }
        });

        udpClient.bind({
            address: config.host,
            port: config.port,
            exclusive: false
        });
    }


    RED.nodes.registerType("weatherflow-hub", WeatherFlowHubNode);
}