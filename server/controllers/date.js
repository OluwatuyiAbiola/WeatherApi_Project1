exports.getDate = () =>{
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric"
    }

    return today.toLocaleDateString("en-Us", options);
}

exports.getTime = () => {
    const time = new Date();

    const options = {
        hour12: "false",
        hour: "2-digit",
        minute: "2-digit"
    }
    return time.toLocaleTimeString("en-US", options);
}