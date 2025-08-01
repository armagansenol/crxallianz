"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"

import { AnimatedButton } from "@/components/animated-button"
import { ConsentCheckboxes } from "@/components/consent-checkboxes"
import { DropdownMenuCheckboxesRef, DropdownMenuCheckboxesResidences } from "@/components/dropdown-menu-residences"
import { IconCheck } from "@/components/icons"
import { InternationalPhoneInputComponent } from "@/components/international-phone-input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { isPhoneValid } from "@/lib/utils"

const getFormSchema = () =>
  z
    .object({
      name: z.string().min(2, { message: "Name is required" }),
      surname: z.string().min(2, { message: "Surname is required" }),
      countryCode: z.string(),
      phone: z.string().refine(
        (val) => {
          return isPhoneValid(val)
        },
        { message: "Phone is required" }
      ),
      email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
      residenceType: z.string().min(1, { message: "Residence type is required" }),
      howDidYouHearAboutUs: z.string().min(1, { message: "How did you hear about us is required" }),
      message: z.string(),
      consent: z.boolean().refine((data) => data === true, { message: "Consent is required" }),
      consentElectronicMessage: z.boolean().refine((data) => data === true, {
        message: "Consent is required",
      }),
      consentSms: z.boolean(),
      consentEmail: z.boolean(),
      consentPhone: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.consentElectronicMessage) {
          return data.consentSms || data.consentEmail || data.consentPhone
        }
        return true
      },
      {
        message: "Consent is required",
        path: ["consentElectronicMessage"],
      }
    )

export type FormValues = z.infer<ReturnType<typeof getFormSchema>>

const commonInputStyles =
  "bg-transparent text-neutral-950 border-b border-bricky-brick rounded-none px-0 transition-colors duration-300 ease-in-out"

interface FormInputProps {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  type?: string
  className?: string
}

const FormInput = ({ name, control, placeholder, type = "text", className }: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-neutral-950 font-normal leading-none block text-base lg:text-sm">
          {placeholder}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ""}
            className={`${commonInputStyles} h-10 px-2 lg:px-4 border border-bricky-brick rounded-md ${className}`}
            onChange={(e) => {
              const value = e.target.value
              if (name === "name" || name === "surname") {
                // Allow letters including Turkish characters
                const formattedValue = value.replace(/[^a-zA-ZğĞıİöÖüÜşŞçÇ\s]/g, "")
                field.onChange(formattedValue)
              } else {
                field.onChange(value)
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export function ContactForm() {
  const [successDialog, setSuccessDialog] = useState(false)

  const residenceTypeDropdownRef = useRef<DropdownMenuCheckboxesRef>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      name: "",
      surname: "",
      countryCode: "",
      phone: "",
      email: "",
      residenceType: "",
      howDidYouHearAboutUs: "",
      message: "",
      consent: false,
      consentElectronicMessage: false,
      consentSms: false,
      consentEmail: false,
      consentPhone: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const residenceTypeValue = form.watch("residenceType")

  const residenceTypeOptions = useMemo(
    () => [
      { id: "1+1", label: "1+1" },
      { id: "2+1", label: "2+1" },
      { id: "3+1", label: "3+1" },
      { id: "4+1", label: "4+1" },
      { id: "5+1", label: "5+1" },
      { id: "6+1", label: "6+1" },
    ],
    []
  )

  const handleResidenceType = useCallback(
    (id: string, checked: boolean) => {
      const option = residenceTypeOptions.find((opt) => opt.id === id)
      if (!option) return

      const currentValue = form.getValues("residenceType") || ""
      const currentLabels = currentValue ? currentValue.split(",") : []
      const newLabels = checked
        ? [...currentLabels, option.label].filter(Boolean)
        : currentLabels.filter((label) => label !== option.label)

      form.setValue("residenceType", newLabels.join(","), {
        shouldValidate: false,
      })

      form.trigger("residenceType")
    },
    [form, residenceTypeOptions]
  )

  useEffect(() => {
    form.register("phone", {
      onChange: () => form.trigger("phone"), // Validate phone on change
    })
    form.register("email", {
      onChange: () => form.trigger("email"), // Validate email on change
    })
  }, [form])

  return (
    <>
      <Form {...form}>
        <form className="font-primary flex flex-col gap-6 py-10 lg:py-0 px-4" noValidate>
          <div className="grid grid-cols-2 gap-6 lg:gap-2">
            <FormInput control={form.control} name="name" placeholder={`Name*`} />
            <FormInput control={form.control} name="surname" placeholder={`Surname*`} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
            <div className="col-span-1 flex flex-col gap-1">
              <FormLabel
                className="text-neutral-950 font-normal leading-none block text-base lg:text-sm"
                htmlFor="phone"
              >
                Telefon Numarası*
              </FormLabel>
              <InternationalPhoneInputComponent form={form} />
            </div>
            <div className="col-span-1">
              <FormInput
                control={form.control}
                name="email"
                type="email"
                placeholder={`Email*`}
                className="col-span-1 lg:col-span-1"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <input className="border border-bricky-brick rounded-md h-10 px-2 lg:px-4" type="date" />
            <input className="border border-bricky-brick rounded-md h-10 px-2 lg:px-4" type="time" />
            <input className="border border-bricky-brick rounded-md h-10 px-2 lg:px-4" type="datetime-local" />
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-6 lg:gap-4">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="residenceType"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <DropdownMenuCheckboxesResidences
                        placeholder={`Residence Type*`}
                        selectedItems={residenceTypeValue !== "" ? residenceTypeValue.split(",") : []}
                        options={residenceTypeOptions}
                        onChange={(id, checked) => {
                          handleResidenceType(id, checked)
                        }}
                        ref={residenceTypeDropdownRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <ConsentCheckboxes form={form} control={form.control} />
          <button type="submit" className="flex relative w-40 lg:w-48 mt-8">
            <AnimatedButton text="Submit" theme="secondary" size="sm" />
          </button>
        </form>
      </Form>
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent className="font-primary flex flex-col items-center justify-center py-8">
          <DialogHeader>
            <DialogTitle className="text-neutral-950 font-medium leading-none text-base lg:text-2xl flex flex-col items-center gap-2 text-center mb-2">
              <div className="w-9 h-9 flex items-center justify-center">
                <IconCheck />
              </div>
              Success
            </DialogTitle>
            <DialogDescription className="text-neutral-950 font-normal leading-none block text-sm lg:text-base text-center pb-10">
              Your message has been sent successfully.
            </DialogDescription>
            <DialogClose asChild>
              <button className="text-neutral-950 underline text-sm lg:text-base" type="button">
                Close
              </button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
