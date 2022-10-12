module.exports = function (RED) {
    function WeatherFlowHubNode(config) {
        RED.nodes.createNode(this, config);
        this.port = config.port;
    }
    
    RED.nodes.registerType("weatherflow-hub", WeatherFlowHubNode);
}