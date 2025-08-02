import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Control, UseFormReturn } from "react-hook-form"

interface ConsentCheckboxesProps {
  control: Control<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function ConsentCheckboxes({ control, className, form }: ConsentCheckboxesProps) {
  const { setValue, getValues, trigger } = form

  const handleConsentElectronicMessageChange = (checked: boolean) => {
    setValue("consentElectronicMessage", checked)
    if (checked) {
      setValue("consentSms", true, { shouldValidate: true })
      setValue("consentEmail", true, { shouldValidate: true })
      setValue("consentPhone", true, { shouldValidate: true })
    } else {
      setValue("consentSms", false, { shouldValidate: true })
      setValue("consentEmail", false, { shouldValidate: true })
      setValue("consentPhone", false, { shouldValidate: true })
    }

    trigger("consentElectronicMessage")
  }

  const handleSubCheckboxChange = (checkboxName: "consentSms" | "consentEmail" | "consentPhone", checked: boolean) => {
    setValue(checkboxName, checked, { shouldValidate: true })

    const otherCheckboxes = ["consentSms", "consentEmail", "consentPhone"].filter(
      (name) => name !== checkboxName
    ) as Array<"consentSms" | "consentEmail" | "consentPhone">

    if (checked) {
      setValue("consentElectronicMessage", true, { shouldValidate: true })
    } else {
      const allUnchecked = otherCheckboxes.every((name) => !getValues(name))
      if (allUnchecked) {
        setValue("consentElectronicMessage", false, { shouldValidate: true })
      }
    }
  }

  return (
    <div className={`space-y-5 ${className}`}>
      <FormField
        control={control}
        name="consent"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row gap-2 space-y-0 group">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-[0.9rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                <span>
                  citysresidences.com uygulaması kapsamında paylaşacağım kişisel verilere ilişkin 
                  <a
                    target="_blank"
                    rel="norefferer noopener"
                    href="https://www.citysresidences.com/pdf/citys-residences-kvkk-aydinlatma-metni.pdf"
                    className="text-neutral-950 underline font-medium inline"
                  >
                    Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni
                  </a>
                  ’ni, 
                  <a
                    target="_blank"
                    rel="norefferer noopener"
                    href="https://www.citysresidences.com/pdf/citys-residences-acik-riza-metni.pdf"
                    className="text-neutral-950 underline font-medium inline"
                  >
                    Açık Rıza Metni
                  </a>
                  ’ni, 
                  <a
                    target="_blank"
                    rel="norefferer noopener"
                    href="https://www.citysresidences.com/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf"
                    className="text-neutral-950 underline font-medium inline"
                  >
                    Ticari Elektronik İleti Aydınlatma Metni
                  </a>
                  ’ni okudum, kabul ediyorum.
                </span>
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-3">
        <FormField
          control={control}
          name="consentElectronicMessage"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row gap-2 space-y-0 group">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      handleConsentElectronicMessageChange(checked as boolean)
                    }}
                  />
                </FormControl>
                <FormLabel className="text-[0.9rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                  <span className="text-neutral-950 font-medium">
                    Tarafıma ticari elektronik ileti gönderilmesine{" "}
                    <a
                      className="underline"
                      target="_blank"
                      rel="norefferer noopener"
                      href="https://www.citysresidences.com/pdf/citys-residences-acik-riza-beyani.pdf"
                    >
                      açık rızam var.
                    </a>
                  </span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          {["consentSms", "consentEmail", "consentPhone"].map((name) => (
            <FormField
              key={name}
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row gap-2 space-y-0 group">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSubCheckboxChange(
                            name as "consentSms" | "consentEmail" | "consentPhone",
                            checked as boolean
                          )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-[0.9rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                      {name === "consentSms" && <span className="text-neutral-950">Sms</span>}
                      {name === "consentEmail" && <span className="text-neutral-950">Email</span>}
                      {name === "consentPhone" && <span className="text-neutral-950">Telefon</span>}
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
