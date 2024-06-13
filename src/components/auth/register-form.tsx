"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import Select from 'react-select';
import CardWrapper from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Button } from "../ui/button";
import { useState } from "react";
import { register } from "@/actions/register";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { RegisterSchema } from "../../../schemas";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const nationalityOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'egypt', label: 'Egypt' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'india', label: 'India' },
    { value: 'china', label: 'China' },
    { value: 'japan', label: 'Japan' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'south_africa', label: 'South Africa' },
    { value: 'russia', label: 'Russia' },
    { value: 'italy', label: 'Italy' },
    { value: 'spain', label: 'Spain' },
    { value: 'netherlands', label: 'Netherlands' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'norway', label: 'Norway' },
    { value: 'denmark', label: 'Denmark' },
    { value: 'finland', label: 'Finland' },
    { value: 'new_zealand', label: 'New Zealand' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'chile', label: 'Chile' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'peru', label: 'Peru' },
    { value: 'saudi_arabia', label: 'Saudi Arabia' },
    { value: 'uae', label: 'United Arab Emirates' },
    { value: 'turkey', label: 'Turkey' },
    { value: 'israel', label: 'Israel' },
    { value: 'south_korea', label: 'South Korea' },
    { value: 'indonesia', label: 'Indonesia' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'vietnam', label: 'Vietnam' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'morocco', label: 'Morocco' },
    { value: 'algeria', label: 'Algeria' },
    { value: 'tunisia', label: 'Tunisia' },
    { value: 'pakistan', label: 'Pakistan' },
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'sri_lanka', label: 'Sri Lanka' },
    { value: 'nepal', label: 'Nepal' },
    { value: 'iran', label: 'Iran' },
    { value: 'iraq', label: 'Iraq' },
    { value: 'qatar', label: 'Qatar' },
    { value: 'kuwait', label: 'Kuwait' },
    { value: 'oman', label: 'Oman' },
    { value: 'greece', label: 'Greece' },
    { value: 'portugal', label: 'Portugal' },
    { value: 'switzerland', label: 'Switzerland' },
    { value: 'austria', label: 'Austria' },
    { value: 'belgium', label: 'Belgium' },
    { value: 'poland', label: 'Poland' },
    { value: 'czech_republic', label: 'Czech Republic' },
    { value: 'hungary', label: 'Hungary' },
    { value: 'romania', label: 'Romania' },
    { value: 'bulgaria', label: 'Bulgaria' },
    { value: 'ukraine', label: 'Ukraine' },
    { value: 'serbia', label: 'Serbia' },
    { value: 'croatia', label: 'Croatia' },
    { value: 'slovenia', label: 'Slovenia' },
    { value: 'slovakia', label: 'Slovakia' },
    { value: 'lithuania', label: 'Lithuania' },
    { value: 'latvia', label: 'Latvia' },
    { value: 'estonia', label: 'Estonia' },
    { value: 'iceland', label: 'Iceland' },
    { value: 'ireland', label: 'Ireland' },
    { value: 'luxembourg', label: 'Luxembourg' },
    { value: 'malta', label: 'Malta' },
    { value: 'cyprus', label: 'Cyprus' },
    { value: 'lebanon', label: 'Lebanon' },
    { value: 'jordan', label: 'Jordan' },
    { value: 'syria', label: 'Syria' },
    { value: 'yemen', label: 'Yemen' },
    { value: 'afghanistan', label: 'Afghanistan' },
    { value: 'azerbaijan', label: 'Azerbaijan' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'mongolia', label: 'Mongolia' },
    { value: 'kazakhstan', label: 'Kazakhstan' },
    { value: 'uzbekistan', label: 'Uzbekistan' },
    { value: 'turkmenistan', label: 'Turkmenistan' },
    { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
    { value: 'tajikistan', label: 'Tajikistan' },
    // Add more options as needed
  ]; 
   

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
      nationality: "", // Add this line
      passportNumber: "" // Add this line
    }
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true)
    register(data).then((res) => {
      if (res.error) {
          setError(res.error)
          setLoading(false)
      } 
      if (res.success) {
          setSuccess(res.success)
          setLoading(false)
      }
    })
  }

  return (
    <CardWrapper 
    headerLabel="Create an account"
    title="Register"
    backButtonHref="/sign-in"
    backButtonLabel="Already have an account"
    showSocial
    >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" >
         <div className="space-y-4">
        <FormField
         control={form.control}
         name="email"
         render={({ field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="johndoe@email.com" type="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="name"
         render={({ field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="nationality"
         type="select"
         options={nationalityOptions}
         render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>
            <FormControl>
              <Select {...field} options={nationalityOptions} />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="passportNumber"
         render={({ field }) => (
          <FormItem>
            <FormLabel>Passport Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Passport Number" />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="password"
         render={({ field}) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="******" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="passwordConfirmation"   
         render={({ field}) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="******" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
         )}
        />
         </div>
         <FormSuccess message={success} />
         <FormError message={error} />
       <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Register"}
       </Button>
      </form>
    </Form>
    </CardWrapper>
  )
}

export default RegisterForm