"use server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { prds } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function createPrd(prevState: any, formData: FormData) {

  const schema = z.object({
    industry: z.string().min(1),
    company: z.string().min(1),
    description: z.string().min(1),
    strategy: z.string().min(1),
    persona: z.string().min(1),
    problem: z.string().min(1),
  });

  const parse = schema.parse({
    industry: formData.get("industry"),
    company: formData.get("company"),
    description: formData.get("description"),
    strategy: formData.get("strategy"),
    persona: formData.get("persona"),
    problem: formData.get("problem"),
  });

  const { text } = await generateText({
    model:  openai('gpt-4o-mini'),
    system:
        `You are an expert product manager for a ${parse.industry} and your role is to write Product Requirements Documents;` +
        `You work for ${parse.company}, it is a company that ${parse.description};` +
        `The company strategy is to serve the commercial and sales organization of drug manufacturers ${parse.strategy};`,
    prompt:
        `Propose a product requirement document  for the user persona ${parse.persona};` +
        `The problem the app solves is that ${parse.problem};` +
        `Propose a PRD using this document template and answer in html language wrapped in a div tag and having each section title with <h2 class='text-2xl font-semibold pt-10 pb-4'> tag. If a html table is used, add class="table-auto" to it.` +
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
  });

  
  console.log("OPENAI TEXT: " + text);

  revalidatePath("/pdfcreator/[chatId]/page");

  return { message: `Added prd`,
          data: parse,
          formVisible: false,
          prdData: text
        };
}

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    // await sql`
    //   INSERT INTO todos (text)
    //   VALUES (${data.todo})
    // `;

    revalidatePath("/pdfcreator/[chatId]/page");
    return { message: `Added prd ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create prd" };
  }
}





export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    // await sql`
    //   DELETE FROM todos
    //   WHERE id = ${data.id};
    // `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}