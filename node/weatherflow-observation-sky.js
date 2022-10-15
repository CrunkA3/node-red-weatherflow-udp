module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("obs_sky", function (data) {
            data.payload.obs.forEach(ob => {
                var msg = {
                    payload: {
                        utcDate: new Date(ob[0] * 1000),
                        illuminance: ob[1],
                        uvIndex: ob[2],
                        rainAmountOverPreviousMinute: ob[3],
                        windLull: ob[4],
                        windAvg: ob[5],
                        windGust: ob[6],
                        windDirection: ob[7],
                        batteryVoltage: ob[8],
                        reportInterval: ob[9],
                        solarRadiation: ob[10],
                        localDayRainAccumulation: ob[11],
                        precipitationType: ob[12],
                        windSampleInterval: ob[13]
                    },
                    originalMessage: data.payload,
                    remote: data.remote
                };

                node.send(msg);
            });

        });
    }

    RED.nodes.registerType("weatherflow-observation-sky", UdpListenerNode);
}