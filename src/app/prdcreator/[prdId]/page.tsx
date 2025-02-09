import React from "react";
import RefinePrd from "@/components/RefinePrd";
import PrdSideBar from "@/components/PrdSideBar";
import {PrdAddForm} from "@/components/PrdAddForm";
import { MyForm } from '@/components/MyForm';
import { db } from "@/lib/db";
import { prds } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { FormProvider } from '@/contexts/PrdFormContext';

type Props = {
  params: {
    prdId: string;
  },
  isPro: boolean,
  prd: string,
  prdId: number,
};

// type Props = {
//   prd: string
//   prdId: number;
//   isPro: boolean;
// };

const PrdPage = async ({ params: { prdId } }: Props) => {

  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _prds = await db.select().from(prds).where(eq(prds.userId, userId));

  if (!_prds) {
    console.log("NO PRD found in DB!");
  }

  const currentPrd = _prds.find((prd) => prd.id === parseInt(prdId));

  if(currentPrd){
    console.log("UserID is: " + userId + " prdId: " + prdId);
    console.log("Current Prd: " + currentPrd?.prdContent);
  }
  else{
    console.log("NO Prd found 2!");
  }

  const isPro = await checkSubscription();

  return (
    <div className="flex h-screen">
      <div className="flex w-full h-screen bh">
      <FormProvider >
        {/* sidebar */}
        <div className="flex-[1] max-w-xs">
          <PrdSideBar prds={_prds} prdId={parseInt(prdId)} isPro={isPro} />
        </div>

        {/* PRD form */}
        <div className="h-screen p-4 flex-[5]">
          <PrdAddForm prd="" isPro={isPro} prdId={parseInt(prdId)}/>
          <MyForm />
        </div>

        {/* Refine component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <RefinePrd prdId={parseInt(prdId)} />
        </div>
        </FormProvider >
      </div>
    </div>
  );
};

export default PrdPage;