import { createChatBotMessage } from 'react-chatbot-kit';
import providence from '../../../public/providence.ico'

const config = {
  initialMessages: [createChatBotMessage(`Welcome to Providence. My name is Chagremattson, how may I help you?`, {})],
  botName: 'Providence',
};

export default config;