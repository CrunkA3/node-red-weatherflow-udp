module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("obs_air", function (data) {
            data.payload.obs.forEach(ob => {
                var msg = {
                    payload: {
                        utcDate: new Date(ob[0] * 1000),
                        stationPressure: ob[1],
                        airTemperature: ob[2],
                        relativeHumidity: ob[3],
                        lightningStrikeCount: ob[4],
                        lightningStrikeAvgDistance: ob[5],
                        batteryVoltage: ob[6],
                        reportInterval: ob[7]
                    },
                    originalMessage: data.payload,
                    remote: data.remote
                };

                node.send(msg);
            });

        });
    }

    RED.nodes.registerType("weatherflow-observation-air", UdpListenerNode);
}