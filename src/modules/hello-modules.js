/**
 * Возвращает приветственное сообщение с именем
 * @param {string} name - имя для приветствия
 * @returns {string} - строка "Hello, <name>"
 */
function getHelloMessage(name) {
    return `Hello, ${name}`;
}

module.exports = {
    getHelloMessage
};

