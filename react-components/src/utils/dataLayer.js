export const sendEventToDataLayer = (data) => {
    // event for datalayer
    const dataLayerEvent = new CustomEvent(data.event, {
        bubbles: true,
        detail: data
    });
    document.dispatchEvent(dataLayerEvent);
};