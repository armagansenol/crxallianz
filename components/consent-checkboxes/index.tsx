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
              <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                <a
                  target="_blank"
                  rel="norefferer noopener"
                  href="/pdf/citys-residences-kvkk-aydinlatma-metni.pdf"
                  className="text-neutral-950 underline font-medium"
                >
                  a
                </a>
                <a
                  target="_blank"
                  rel="norefferer noopener"
                  href="/pdf/citys-residences-acik-riza-metni.pdf"
                  className="text-neutral-950 underline font-medium"
                >
                  b
                </a>
                <a
                  target="_blank"
                  rel="norefferer noopener"
                  href="/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf"
                  className="text-neutral-950 underline font-medium"
                >
                  c
                </a>
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
                <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                  <a
                    target="_blank"
                    rel="norefferer noopener"
                    href="/pdf/citys-residences-acik-riza-beyani.pdf"
                    className="text-neutral-950 underline font-medium"
                  >
                    d
                  </a>
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
                    <FormLabel className="text-[0.8rem] text-neutral-950 font-normal leading-snug cursor-pointer max-w-[90%]">
                      {name === "consentSms" && (
                        <a
                          target="_blank"
                          rel="norefferer noopener"
                          href="/pdf/kvkk-aydinlatma-metni.pdf"
                          className="text-neutral-950 underline"
                        >
                          dasd
                        </a>
                      )}
                      {name === "consentEmail" && (
                        <a
                          target="_blank"
                          rel="norefferer noopener"
                          href="/pdf/kvkk-aydinlatma-metni.pdf"
                          className="text-neutral-950 underline"
                        >
                          dasd
                        </a>
                      )}
                      {name === "consentPhone" && (
                        <a
                          target="_blank"
                          rel="norefferer noopener"
                          href="/pdf/kvkk-aydinlatma-metni.pdf"
                          className="text-neutral-950 underline"
                        >
                          sadas{" "}
                        </a>
                      )}
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
