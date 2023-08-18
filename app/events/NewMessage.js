const emitNewMessageEvent = (newMessage, results) => {
    try {
        global.io.emit('newMessage', {
            // from: user.name,
            newMessage: newMessage,
            results : results
        });
        
    } catch (error) {
        console.log(error);
    }
}

export default emitNewMessageEvent;