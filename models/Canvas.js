let canvasSingleton = (function () {
    var instance;
    function createInstance() {
        var object = document.getElementById('canvas')
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default canvasSingleton;