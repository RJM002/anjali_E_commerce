const productInfo = require('./productInfo');

function getBotResponse(message) {
  const lowerCaseMessage = message.toLowerCase();
  console.log('message inside getBotResponse',message)

  if (lowerCaseMessage.includes('hello')||lowerCaseMessage.includes('hy') || lowerCaseMessage.includes('hi')) {
    return "Hello! How can I assist you today?";
  } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
    return "Thank you for chatting. Have a great day!";
  } else if (lowerCaseMessage.includes('product') && lowerCaseMessage.includes('info')) {
    return "What product would you like information about?";
  } else if (lowerCaseMessage.includes('shipping')) {
    return "We offer free shipping on orders over $50. Standard shipping usually takes 3-5 business days.";
  } else if (lowerCaseMessage.includes('return policy')) {
    return "We have a 30-day return policy for most items. Please check our Returns page for more details.";
  } else {
    // Check if the message matches any product names
    const productMatch = productInfo.find(product => 
      lowerCaseMessage.includes(product.name.toLowerCase())
    );
    if (productMatch) {
      return `${productMatch.name}: ${productMatch.description}. Price: $${productMatch.price}`;
    }
    return "I'm sorry, I didn't understand that. Can you please rephrase or ask another question?";
  }
}


module.exports = { getBotResponse };