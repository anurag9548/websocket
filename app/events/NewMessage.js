const emitNewMessageEvent = (newMessage, user) => {
    try {
        global.io.emit('newMessage', {
            from: user.name,
            text: newMessage.text,
            date: newMessage.date,
        });
    } catch (error) {
        console.log(error);
    }
}

export default emitNewMessageEvent;