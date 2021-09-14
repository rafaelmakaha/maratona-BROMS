class EventsManager {
    constructor(){
        this.events = {}
    }

    registerListener(eventType, listener){
        if(this.events[eventType])
            this.events[eventType] = [...this.events[eventType], listener];
        else
            this.events[eventType] = [listener];
    }

    unregisterListener(eventType, listener){
        if(this.events[eventType])
            this.events[eventType].pop(listener)
    }
    
    onEvent(eventType, event){
        this.events[eventType].map(listener => listener.onEvent(eventType, event))
    }
}

let eventsManager = (function () {
    var instance;
    function createInstance() {
        var object = new EventsManager()
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


export default eventsManager;