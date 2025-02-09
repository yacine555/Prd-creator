
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { ComponentA } from '@/components/ComponentA'
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { prds } from "@/lib/db/schema";
import { eq } from "drizzle-orm";



export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const user = await currentUser();
  const isPro = await checkSubscription();
  let listChat;
  let listPrd;
  let firstChat;
  //const {mode} = useAppContext();

  if (userId) {
    listChat = await db.select().from(chats).where(eq(chats.userId, userId));
    listPrd = await db.select().from(prds).where(eq(prds.userId, userId));
    if (listChat) {
      firstChat = listChat[0];
    }
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="text-5xl font-semibold">Another PMday : mode </h1>
          </div>
          <div className="m-5 text-3xl font-semibold">PRDDay tool  </div>
          <p className="mb-10 max-w-xl mt-1 text-lg text-slate-600">
          Create a Product Requirement Document in minutes!
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <>
                <div>Hello {user?.firstName}!</div>

                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started! <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          <div className="flex mt-2">
            {isAuth && (
              <>
                <Link href={`/prdcreator/create`} className="mr-10">
                  <Button>
                  Go to PRD Creator <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href={`/chat/create`}>
                  <Button>
                    Create a PDF Chat <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <ComponentA />
              </>
            )}
          </div>
        
        </div>
      </div>
    </div>
  )

}
