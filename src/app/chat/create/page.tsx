import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { UserButton} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";


export default async function CreateChat() {


    const { userId } = await auth();
    const isAuth = !!userId;
    const user = await currentUser();
    const isPro = await checkSubscription();
    let listChat;
    let firstChat;

    if (!userId) {
      return redirect("/sign-in");
    }

    if (userId) {
        listChat = await db.select().from(chats).where(eq(chats.userId, userId));
        if (listChat) {
            firstChat = listChat[0];
        }
    }

    return (
        <div className="min-h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
                <h1 className="text-5xl font-semibold">Another PMday</h1>
            </div>
            <div className="m-5 text-3xl font-semibold">PRDDay tool  </div>
            <p className="mb-10 max-w-xl mt-1 text-lg text-slate-600">
            Create a Product Requirement Document in minutes
            </p>

            <div className="w-full mt-4">
                {isAuth ? (
                <>
                    <div>Hello {user?.firstName}!</div>

                    <div>
                        {listChat &&
                            listChat.map((item, i) => (
                                <div className="mb-4">

                                    <Link key={i+1} href={"/chat/" + (i+1)} className="mr-10">
                                    <Button>
                                    Go to Chat #{i+1} <ArrowRight className="ml-2" />
                                    </Button>
                                    </Link>
                                </div>
                            
                            ))
                        }
                    </div>


                    <div className="mt-3 mb-8">
                        <SubscriptionButton isPro={isPro} />
                    </div>
                    
                    <p> Upload a PDF to chat against </p>
                    <FileUpload/>
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
                {isAuth && firstChat && (
                <>
                    <Link href={`/chat/${firstChat.id}`}>
                    <Button>
                        Go to First Chats {firstChat.id} <ArrowRight className="ml-2" />
                    </Button>
                    </Link>
                    
                </>
                )}
            </div>
            
            </div>
        </div>
        </div>
    )

}
