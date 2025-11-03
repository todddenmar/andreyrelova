"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { dbSetDocument } from "@/lib/firebase/actions";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { useAppStore } from "@/lib/store";
import { getAuth, signInAnonymously } from "firebase/auth";
import LoadingComponent from "../custom-ui/LoadingComponent";
import { TGuest, TGuestStatus } from "@/typings";
import { serverTimestamp } from "firebase/firestore";

// --- Schema ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string(),
  phone: z.string().optional(),
  companions: z.string(),
  notes: z.string().optional(),
  guestStatus: z.string({
    error: "Please select your attendance status.",
  }),
});

type TInvitationForm = z.infer<typeof formSchema>;

export default function InvitationForm() {
  const router = useRouter();
  const { googleUser, setGoogleUser } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const form = useForm<TInvitationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companions: "0",
      notes: "",
      guestStatus: "confirmed",
    },
  });

  const onLogin = () => {
    if (!firstName || !lastName) {
      toast.error("Full name required");
      return;
    }
    if (!email) {
      toast.error("Email address required");
      return;
    }

    setIsLoadingLogin(true);

    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        // Signed in..
        setGoogleUser({
          displayName: `${firstName} ${lastName}`,
          email: email,
          uid: uid,
          photoURL: null,
        });
        toast.success("You are now signed in!");
        setIsLoadingLogin(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ...
        setIsLoadingLogin(false);
      });
  };
  async function onSubmit(values: TInvitationForm) {
    setIsSubmitting(true);
    const { companions, notes, guestStatus, phone, name, email } = values;
    try {
      const newGuest: TGuest = {
        id: crypto.randomUUID(),
        companions: parseInt(companions),
        notes: (notes || "").trim(),
        status: guestStatus as TGuestStatus,
        phone: phone,
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
      };

      const res = await dbSetDocument({
        collectionName: DB_COLLECTION.GUESTS,
        id: newGuest.id,
        data: newGuest,
      });

      if (res.status === DB_METHOD_STATUS.ERROR) {
        console.error(res.message);
        toast.error("Error saving RSVP.");
        setIsSubmitting(false);
        return;
      }

      toast.success("RSVP submitted successfully!");
      form.reset();
      // ✅ Redirect to success page
      if (guestStatus === "confirmed") {
        router.push("/responded?status=confirmed");
      } else {
        router.push("/responded?status=declined");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    form.setValue("name", `${googleUser?.displayName}`);
    form.setValue("email", `${googleUser?.email}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser]);
  return (
    <div className="max-w-md p-6 rounded-2xl shadow-md bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-100">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <Image
            src={"/images/andrey-sit.png"}
            alt="andrey-sitting"
            width={600}
            height={600}
            className="object-center object-cover rounded-full aspect-square w-[400px] h-[400px]"
          />
        </div>
        <h2 className="text-2xl font-semibold text-[#3e5e76]">
          Andrey Relova Baptism RSVP
        </h2>
        <p className="text-sm text-[#3e5e76] mt-1">
          We&apos;re so excited to celebrate this special day with you!
        </p>
      </div>

      <div className="space-y-4 bg-white/70 p-4  shadow-sm rounded-xl ">
        {googleUser ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">
                      Phone (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">
                      Number of Companions
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">
                      Notes (optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300 resize-none"
                        placeholder="Add any message or special requests"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />

              {/* Confirm / Decline Select */}
              <FormField
                control={form.control}
                name="guestStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#3e5e76]">Attendance</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-blue-50 border-blue-200 focus-visible:ring-blue-300">
                          <SelectValue placeholder="Select your response" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="confirmed">Will Attend</SelectItem>
                        <SelectItem value="declined">Cannot Attend</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-pink-600" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#3e5e76] hover:bg-[#3e6375] text-white font-medium rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(val) => setFirstName(val.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(val) => setLastName(val.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label>Email Address</Label>
                <Input
                  value={email}
                  onChange={(val) => setEmail(val.target.value)}
                />
              </div>
            </div>

            {isLoadingLogin ? (
              <LoadingComponent />
            ) : (
              <Button
                className="w-full cursor-pointer bg-[#3e5e76] hover:bg-[#3e6375] text-white font-medium rounded-full"
                type="button"
                onClick={onLogin}
              >
                Confirm Details
              </Button>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-[#3e5e76] mt-4">
        Thank you for sharing this moment with us 💖
      </p>
    </div>
  );
}
