import { COLORS } from "../settings/colors";

let canvasSingleton = (function () {
    var instance;
    function createInstance() {
        var object = document.getElementById('canvas');
        object.style.border = `0px solid ${COLORS.canvasBorder}`;
        object.style.margin = 0;
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