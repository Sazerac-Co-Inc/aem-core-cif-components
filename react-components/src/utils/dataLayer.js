export const sendEventToDataLayer = (data) => {
    // event for datalayer
    const dataLayerEvent = new CustomEvent(eventName, {
        bubbles: true,
        detail: data
    });
    document.dispatchEvent(dataLayerEvent);
};