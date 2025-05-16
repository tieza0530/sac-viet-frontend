import { UserAddress } from "@/app/components/type/user.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export function AlertDialogAdd({
  userAddress,
}: {
  userAddress: UserAddress | undefined;
}) {
    
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[var(--color-text-root)] hover:text-[var(--color-text-root)] ml-4 cursor-pointer"
        >
          Thay đổi
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-[var(--color-text-root)]">
        <AlertDialogHeader>
          <AlertDialogTitle>Thay đổi địa chỉ nhận hàng?</AlertDialogTitle>
          <AlertDialogDescription>
            <RadioGroup>
                {userAddress?.list_address.map((value) => {
                    return(
                        <div key={value._id } className="flex items-center space-x-2">
                        <RadioGroupItem value={value._id} id={value._id} />
                        <Label htmlFor={value._id}>{value.name} {value.phone} {value.address}</Label>
                        </div>

                    )
                })}
            </RadioGroup>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
