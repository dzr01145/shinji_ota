import { GoogleGenAI, Chat } from "@google/genai";
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE } from "../constants";

// Construct a system instruction that gives the AI context about the portfolio owner
const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${PERSONAL_INFO.name}'s portfolio website. 
Your role is to answer visitor's questions about ${PERSONAL_INFO.name} based on the following information.
Be professional, friendly, and concise. If asked something outside of this scope, politely steer the conversation back to ${PERSONAL_INFO.name}'s professional background.

Profile:
Name: ${PERSONAL_INFO.name}
Title: ${PERSONAL_INFO.title}
Summary: ${PERSONAL_INFO.about}
Email: ${PERSONAL_INFO.email}

Skills:
${SKILLS.map(s => `- ${s.name} (${s.category})`).join('\n')}

Experience:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.technologies.join(', ')})`).join('\n')}

Tone: Helpful, enthusiastic, technical but accessible.
Language: Answer in the same language as the user (mostly Japanese).
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found. Chat will not function.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
    if (!chatSession) {
      return "Sorry, the AI service is currently unavailable (API Key missing or configuration error).";
    }
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};