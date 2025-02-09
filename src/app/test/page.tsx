"use client"
import { useAppContext } from "@/contexts";
import { ComponentA } from '@/components/ComponentA'
import { ComponentB } from '@/components/ComponentB';
import { ComponentC } from '@/components/ComponentC';
import { FormProvider } from '@/contexts/PrdFormContext';
import { MyForm } from '@/components/MyForm';



export default function Test() {
    const {mode, setMode} = useAppContext();
    const {chatId} = useAppContext();

    return(

        <>
        
        <div className="mb-10">
            mode: {mode}
            <button onClick={() => setMode('chat')} className="m-4"> Set mode</button>
        </div>
        <div className="mb-10">
            chat ID: {chatId}
        </div>

      <ComponentA />
      <ComponentB />

      <FormProvider >
        <h1 className="mt-10">My Form</h1>
        <MyForm />
        <ComponentC />
      </FormProvider>
  
        </>
    )
}