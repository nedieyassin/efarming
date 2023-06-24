import {ChatCompletionRequestMessageRoleEnum, Configuration, CreateChatCompletionResponse, OpenAIApi} from "openai";

export class ChatGPT {
    private openai

    organization = ''
    apiKey = ''

    constructor() {
        const configuration = new Configuration({
            organization: this.organization,
            apiKey: this.apiKey
        });
        this.openai = new OpenAIApi(configuration);
    }

    prompt(prompts: { role: ChatCompletionRequestMessageRoleEnum, content: string }[]) {
        return this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            max_tokens: 1000,
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that advise farmers.",
                },
                ...prompts

            ]

        });
    }
}