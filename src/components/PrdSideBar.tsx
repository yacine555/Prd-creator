"use client";
import { DrizzlePrd } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAppContext } from '../contexts/index';
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  prds: DrizzlePrd[];
  prdId: number;
  isPro: boolean;
};

const PrdSideBar = ({ prds, prdId, isPro }: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full screen soff p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          Create New PRD Chat
        </Button>
      </Link>

      <div>
      Prd Information:
      

      </div>

      <div className="flex h-screen overflow-y-auto pb-20 flex-col gap-2 mt-4">
        {prds.map((prd) => (
          <Link key={prd.id} href={`/chatprd/${prd.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": prd.id === prdId,
                "hover:text-white": prd.id !== prdId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {prd.prdName}
              </p>
            </div>
          </Link>
        ))}
      </div>

   
    </div>
  );
};

export default PrdSideBar;