import OpenAI from 'openai';
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
const modelname ="gpt-4o-mini"; //"gpt-3.5-turbo"; "gpt-4-turbo";

// /api/chatpdr
export async function POST(req: Request) {
  try {

    const { messages, chatId, prdData } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));

    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);


    const streamResult = await openai.chat.completions.create({
        model: modelname,
        messages: [
          {
            "role": "system",
            "content": `You are an expert product manager for a ${prdData.industry} and your role is to write Product Requirements Documents;` +
                        `You work for ${prdData.company}, it is a company that ${prdData.description};` +
                        `The company strategy is to serve the commercial and sales organization of drug manufacturers ${prdData.strategy};`      
          },
          {
            "role": "user", 
            "content": `Propose a product requirement document  for the user persona ${prdData.persona};` +
                      `The problem the app solves is that ${prdData.problem};` +
                      `Propose a PRD using this document template and answer in mardown language having eaach section title with 3 hash:` +
                      `The contents of a PRD should follow this sections:` +
                      `   Title: Give this project a distinct name and a code name.` +
                      `   Change History: Add an inital description of the PRD change, including who changed it which os PMday Tool, when they changed it which is today date, and what they changed. The initial version should start with 0.1` +
                      `   Problem statement: Briefly, what is this project about?  What problem are we trying to solve? Why are you doing it? Clearly define the problem statement` +
                      `   Success Metrics: What are the success metrics that indicate you're achieving your product goals for the enhancement? Be specific with figures when possible.` + 
                      `   Messaging: What's the product messaging marketing will use to describe this product to customers, both new and existing?` +
                      `   Timeline/Release Planning: What's the overall schedule you're working towards?` +
                      `   Personas: Who are the target persona? For each persona, explain the benefits.` +
                      `   Persona objectives: These are full stories about how various personas will use the product in context. Highlight their goals, pain points and behavior.` +
                      `   User Stories/Features/Requirements: Break down requirements in priority High, Medium, Low. Add Acceptance Criteria for each feature. Add at least six user stories. Use the framework template: As a 'user persona', I want to 'action', so that I can get 'benefits'. Put them in table.` +
                      `   Risks and assumptions: Identify potential risks, integration dependencies and user/market assumptions to mitigate issues early.` +
                      `   Competitive alternatives: Analyze the competitive alternative landscape and differentiation. ` +
                          `Not in Scope: list some ideas that you do not usually develop as a version 1 and why. ` +
                      `   Designs: Include any needed early sketches, and throughout the project, link to the actual designs once they're available.` +
                      `   Open Issues: List at least 3 key factors you still need to figure out?` +
                      `   Other Considerations: This is a catch-all for anything else, such as if you make a key decision to remove or add to the project's scope.`,
          }
        ],
        stream: true,
      });




    // const result = await generateText({
    //     model: openai(modelname),
    //     system:
    //         `You are an expert product manager for a ${prdData.industry} and your role is to write Product Requirements Documents;` +
    //         `You work for ${prdData.company}, it is a company that ${prdData.description};` +
    //         `The company strategy is to serve the commercial and sales organization of drug manufacturers ${prdData.strategy};`,
    //     prompt:
    //         `Propose a product requirement document  for the user persona ${prdData.persona};` +
    //         `The problem the app solves is that ${prdData.problem};` +
    //         `Propose a PRD using this document template and answer in mardown language having eaach section title with 3 hash:` +
    //         `The contents of a PRD should follow this sections:` +
    //         `   Title: Give this project a distinct name and a code name.` +
    //         `   Change History: Add an inital description of the PRD change, including who changed it which os PMday Tool, when they changed it which is today date, and what they changed. The initial version should start with 0.1` +
    //         `   Problem statement: Briefly, what is this project about?  What problem are we trying to solve? Why are you doing it? Clearly define the problem statement` +
    //         `   Success Metrics: What are the success metrics that indicate you're achieving your product goals for the enhancement? Be specific with figures when possible.` + 
    //         `   Messaging: What's the product messaging marketing will use to describe this product to customers, both new and existing?` +
    //         `   Timeline/Release Planning: What's the overall schedule you're working towards?` +
    //         `   Personas: Who are the target persona? For each persona, explain the benefits.` +
    //         `   Persona objectives: These are full stories about how various personas will use the product in context. Highlight their goals, pain points and behavior.` +
    //         `   User Stories/Features/Requirements: Break down requirements in priority High, Medium, Low. Add Acceptance Criteria for each feature. Add at least six user stories. Use the framework template: As a 'user persona', I want to 'action', so that I can get 'benefits'. Put them in table.` +
    //         `   Risks and assumptions: Identify potential risks, integration dependencies and user/market assumptions to mitigate issues early.` +
    //         `   Competitive alternatives: Analyze the competitive alternative landscape and differentiation. ` +
    //             `Not in Scope: list some ideas that you do not usually develop as a version 1 and why. ` +
    //         `   Designs: Include any needed early sketches, and throughout the project, link to the actual designs once they're available.` +
    //         `   Open Issues: List at least 3 key factors you still need to figure out?` +
    //         `   Other Considerations: This is a catch-all for anything else, such as if you make a key decision to remove or add to the project's scope.`,
    //   });

  
      return  streamResult;

  } catch (error) {}
}