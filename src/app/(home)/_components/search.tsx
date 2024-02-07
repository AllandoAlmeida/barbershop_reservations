"use client";
import { Button } from "@/_components/ui/button";

import { Input } from "@/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { useRouter } from "next/navigation";


const formSearchSchema = z.object({
  search: z
  .string({
    required_error: "Campo obrigatório.",
  })
  .trim()
  .min(1, "Campo obrigatório."),
});

interface SearchProps {
  defaultValues?: z.infer<typeof  formSearchSchema>;
}

const Search = ({defaultValues}: SearchProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSearchSchema>>({
    resolver: zodResolver(formSearchSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSearchSchema> ) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className="flex w-full gap-4"  onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Procure uma barbearia aqui..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"default"} size={"icon"} type="submit">
            <SearchIcon size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
