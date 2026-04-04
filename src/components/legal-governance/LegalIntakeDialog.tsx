import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createIntakeSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  product: z.string().min(1, "Please select a product"),
  jurisdiction: z.string().min(1, "Please enter a jurisdiction"),
  description: z.string().min(1, "Please describe the intake"),
  riskLevel: z.string().min(1, "Please select a risk level"),
  ownerName: z.string().min(1, "Please enter the owner name"),
  relatedEntityRefs: z.string().optional(),
});

export type CreateIntakeFormValues = z.infer<typeof createIntakeSchema>;

const categoryOptions = ["Other", "Contract", "Litigation", "Regulatory"];
const productOptions = [
  "Food",
  "Grocery",
  "Shopping",
  "Internal Creator",
  "Influencer Marketplace",
  "IT Services",
  "Home Services",
];
const riskOptions = ["Critical", "High", "Medium", "Low"];

interface LegalIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: CreateIntakeFormValues) => void;
}

export default function LegalIntakeDialog({
  open,
  onOpenChange,
  onCreate,
}: LegalIntakeDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIntakeFormValues>({
    resolver: zodResolver(createIntakeSchema),
    defaultValues: {
      category: "",
      product: "",
      jurisdiction: "",
      description: "",
      riskLevel: "",
      ownerName: "",
      relatedEntityRefs: "",
    },
  });

  const onSubmit = (values: CreateIntakeFormValues) => {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Legal Intake</DialogTitle>
          <DialogDescription>
            Add a new legal intake to the queue.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full /">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category ? (
              <p className="text-sm text-rose-600">{errors.category.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Controller
              control={control}
              name="product"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full /">
                    <SelectValue placeholder="Select product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.product ? (
              <p className="text-sm text-rose-600">{errors.product.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input
              id="jurisdiction"
              placeholder="Enter jurisdiction..."
              {...register("jurisdiction")}
            />
            {errors.jurisdiction ? (
              <p className="text-sm text-rose-600">
                {errors.jurisdiction.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add description"
              rows={4}
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-rose-600">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Controller
              control={control}
              name="riskLevel"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full /">
                    <SelectValue placeholder="Select level..." />
                  </SelectTrigger>
                  <SelectContent>
                    {riskOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.riskLevel ? (
              <p className="text-sm text-rose-600">
                {errors.riskLevel.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              id="ownerName"
              placeholder="Enter owner name..."
              {...register("ownerName")}
            />
            {errors.ownerName ? (
              <p className="text-sm text-rose-600">
                {errors.ownerName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedEntityRefs">Related Entity Refs</Label>
            <Input
              id="relatedEntityRefs"
              placeholder="Enter..."
              {...register("relatedEntityRefs")}
            />
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
