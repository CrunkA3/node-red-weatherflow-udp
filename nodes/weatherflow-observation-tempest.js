module.exports = function (RED) {
    function UdpListenerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Retrieve the hub node
        node.hub = RED.nodes.getNode(config.hub);

        node.hub.on("status", function (status) {
            node.status(status);
        });

        node.hub.on("obs_st", function (data) {
            data.payload.obs.forEach(ob => {
                try {
                    var msg = {
                        payload: {
                            utcDate: new Date(ob[0] * 1000),
                            windLull: ob[1],
                            windAvg: ob[2],
                            windGust: ob[3],
                            windDirection: ob[4],
                            windSampleInterval: ob[5],
                            stationPressure: ob[6],
                            airTemperature: ob[7],
                            relativeHumidity: ob[8],
                            illuminance: ob[9],
                            uvIndex: ob[10],
                            solarRadiation: ob[11],
                            rainAmountOverPreviousMinute: ob[12],
                            precipitationType: ob[13],
                            lightningStrikeAvgDistance: ob[14],
                            lightningStrikeCount: ob[15],
                            batteryVoltage: ob[16],
                            reportInterval: ob[17]
                        },
                        originalMessage: data.payload,
                        remote: data.remote
                    };

                    node.send(msg);
                } catch (error) {
                    node.error(error, data);
                }
            });

        });
    }

    RED.nodes.registerType("weatherflow-observation-tempest", UdpListenerNode);
}