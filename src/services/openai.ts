import {ChatCompletionRequestMessageRoleEnum, Configuration, CreateChatCompletionResponse, OpenAIApi} from "openai";

export class ChatGPT {
    private openai

    constructor() {
        const configuration = new Configuration({
            organization: "org-T0ibHnYUo8jJW3td2j1En4iT",
            apiKey: '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',
        });
        this.openai = new OpenAIApi(configuration);
    }

    prompt(prompts: {role: ChatCompletionRequestMessageRoleEnum, content: string}[] ) {
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