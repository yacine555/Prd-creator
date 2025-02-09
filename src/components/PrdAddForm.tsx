"use client"
import React from "react";
import { FormEvent } from 'react'
import { useActionState } from "react";
import { createContext, useContext, useState } from 'react';
import { useFormStatus } from "react-dom";
import { useFormState } from 'react-dom'
import { useAppContext } from '../contexts/index';

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createPrd } from "@/app/actions";


type Props = {
    prd: string
    isPro: boolean;
};

const initialState = {
    message: '',
    formVisible: true,
    data: {},
    prdData:''
}

const PrdContext = createContext(initialState);

function SubmitButton() {

    const { pending } = useFormStatus();
    initialState.formVisible=initialState.formVisible;
    return (
        <Button type="submit" aria-disabled={pending}>
        Generate PRD
        </Button>
    );
}
  
  export function PrdAddForm({ prd, isPro }: Props) {
    const [state, formAction] = useFormState(createPrd, initialState);

    const {    
        industry,setIndustry,
        company,setCompany,
        description,setDescription,
        strategy,setStrategy,
        persona,setPersona,
        feature, setFeature } = useAppContext();


    return (
        <div className="text-left">
        {
        state.formVisible && <div className="">
            <h2 className="text-2xl font-semibold">Instructions:</h2>
            <ul className="m-5">
                <li>1: Provide some details about your product and company strategy. The more context you provide, the better the PRD outcome.</li>
                <li>2: Hit 'Generate PRD'</li>
                <li>3: Review the results and refine if needed</li>
            </ul>
            
            <form action={formAction}>
                <label htmlFor="industry">Enter Industry</label>
                <Input className="mb-4"  type="text" id="industry" name="industry" placeholder="technology company" defaultValue="Technology company"  required />

                <label htmlFor="company">Your company name:</label>
                <Input className="mb-4" type="text" id="company" name="company" placeholder="MyCompanyName" defaultValue="Veeva" required />

                <label htmlFor="description">Description of your company activity:</label>
                <Input className="mb-4" type="text" id="description" name="description" placeholder="Sells CRM app for drug manufacturers"  defaultValue="sells CRM app for drug manufacturers"  required />

                <label htmlFor="strategy">Your company strategy:</label>
                <Input className="mb-4" type="text" id="strategy" name="strategy" placeholder="Accelerate sales and commercial execution" defaultValue="Accelerate sales and commercial execution" required />

                <label htmlFor="persona">User persona:</label>
                <Input className="mb-4" type="text" id="persona" name="persona" placeholder="sales rep" defaultValue="sales rep" required />

                <label htmlFor="problem">What does your feature solve:</label>
                <Input className="mb-4" type="text" id="problem" name="problem" placeholder="we want to build a solution to help pharmaceutical sales reps connect remotely with doctors" defaultValue="we want to build a solution to help pharmaceutical sales reps connect remotely with doctors" required />

                <SubmitButton />
            </form>
        </div>
        }

        {!state.formVisible && <div className="">
            <h2 className="text-1xl font-semibold">Your input:</h2>
            <div className="ml-10">
                <div><span className="font-semibold">Industry:</span> {state?.data.industry}</div>
                <div><span className="font-semibold">Company:</span> {state?.data.company}</div>
                <div><span className="font-semibold">Description:</span> {state?.data.description}</div>
                <div><span className="font-semibold">Strategy:</span> {state?.data.strategy}</div>
                <div><span className="font-semibold">Persona:</span> {state?.data.persona}</div>
                <div><span className="font-semibold">Feature:</span> {state?.data.problem}</div>
            </div>
            <div className="mt-10 text-1xl font-semibold">PRD Generated:</div> 
            <div className="bg-slate-200 p-2">
                <p dangerouslySetInnerHTML={{ __html: state?.prdData.replace("\n",'') }}></p>
            </div>
        </div>}
        </div>
    );
  }

// const PrdAddForm = () => {
//     const [state, formAction] = useActionState(createTodo, initialState); 
//     async function onSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault()
        
//         const formData = new FormData(event.currentTarget)persona
//         const response = await fetch('/api/saveprd', {
//             method: 'POST',
//             body: formData,
//         })
//     }

//   let company,industry,description,strategy,persona,feature ="";
//   return (
//     <>
//         <h2 className="text-2xl font-semibold">Instructions:</h2>
//         <p className="mb-10 max-w-xl mt-1 text-lg text-slate-600">
//         Create a Product Requirement Document in minutes
//         </p>
//         <ul>
//             <li>1: Provide some details about your product and company strategy. The more context you provide, the better the PRD outcome.</li>
//             <li>2: Hit 'Generate PRD'</li>
//             <li>3: Review the results and refine if needed</li>
//         </ul>

//         <div className="m-2">
//         <form action={formAction}>
//             <label htmlFor="todo">Enter Task</label>
//             <input type="text" id="todo" name="todo" required />
//             <SubmitButton />
//             <p aria-live="polite" className="sr-only" role="status">
//                 {state?.message}
//             </p>
//         </form>

//             <form onSubmit={onSubmit}>
//                 Industry you work for: (e.g: technology company)
//                 <Input
//                     value={industry}
//                     placeholder="Technology company"
//                     className="w-full"
//                 />

//             <div className="m-2">
//                 Your company name:
//                 <Input
//                     value={company}
//                     placeholder="MyCompany"
//                     className="w-full"
//                 />
//             </div>
//             <div className="m-2">
//                 Description of your company activity:
//                 <Input
//                     value={description}
//                     placeholder="Technology company"
//                     className="w-full"
//                 />
//             </div>
//             <div className="m-2">
//                 Your company strategy:
//                 <Input
//                     value={strategy}
//                     placeholder="Technology company"
//                     className="w-full"
//                 />
//             </div>
//             <div className="m-2">
//                 User persona:
//                 <Input
//                     value={persona}
//                     placeholder="Technology company"
//                     className="w-full"
//                 />
//             </div>
//             <div className="m-2">
//                 What does your feature solve:
//                 <Input
//                     value={feature}
//                     placeholder="Technology company"
//                     className="w-full"
//                 />
//             </div>
//             <Button type="submit">Submit</Button>
//         </form>
            
//         </div>
        
//     </>
//   );
// };


// export default PrdAddForm;