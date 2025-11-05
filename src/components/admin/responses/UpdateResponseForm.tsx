"use client";

import { useState } from "react";
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
import { dbUpdateDocument } from "@/lib/firebase/actions";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { TGuestItem, TGuestStatus } from "@/typings";
import { Label } from "@/components/ui/label";

// --- Schema ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string(),
  phone: z.string().optional(),
  companions: z.string(),
  kidCompanions: z.string(),
  notes: z.string().optional(),
  guestStatus: z.string({
    error: "Please select your attendance status.",
  }),
});

type TInvitationForm = z.infer<typeof formSchema>;

type UpdateResponseFormProps = {
  guest: TGuestItem;
  setClose: () => void;
};
export default function UpdateResponseForm({
  guest,
  setClose,
}: UpdateResponseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TInvitationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guest.name || "",
      email: guest.email || "",
      phone: guest.phone || "",
      companions: guest.companions?.toString() || "0",
      kidCompanions: guest.kidCompanions?.toString() || "0",
      notes: guest.notes || "",
      guestStatus: guest.status as TGuestStatus,
    },
  });

  async function onSubmit(values: TInvitationForm) {
    setIsSubmitting(true);
    const {
      kidCompanions,
      companions,
      notes,
      guestStatus,
      phone,
      name,
      email,
    } = values;
    try {
      const updates = {
        companions: parseInt(companions),
        kidCompanions: parseInt(kidCompanions),
        notes: (notes || "").trim(),
        status: guestStatus as TGuestStatus,
        phone: phone,
        name: name.trim(),
        email: email.trim(),
      };

      const res = await dbUpdateDocument({
        collectionName: DB_COLLECTION.GUESTS,
        id: guest.id,
        data: updates,
      });

      if (res.status === DB_METHOD_STATUS.ERROR) {
        console.error(res.message);
        toast.error("Error saving response.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Response updated successfully!");
      setClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setClose();
    }
  }

  return (
    <div className=" ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#2d6fca]">Full Name</FormLabel>
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
                <FormLabel className="text-[#2d6fca]">Email Address</FormLabel>
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
                <FormLabel className="text-[#2d6fca]">
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

          <div className="grid grid-cols-1 gap-2">
            <Label className="text-[#2d6fca]">Number of Companions</Label>
            <div className="border rounded-lg p-4 grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="companions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2d6fca]">Adults</FormLabel>
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
                name="kidCompanions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2d6fca]">Kids</FormLabel>
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
            </div>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#2d6fca]">
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
                <FormLabel className="text-[#2d6fca]">Attendance</FormLabel>
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
            className="w-full cursor-pointer bg-[#2d6fca] hover:bg-[#3571c7] text-white font-medium rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Update Response"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
