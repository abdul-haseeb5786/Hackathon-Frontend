import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export const AnotherComponent = () => {
    const { toast } = useToast()

    return (
        <Button
            onClick={() => {
                toast({
                    title: "Action Successful",
                    description: "Your changes have been saved.",
                })
            }}
        >
            Show Toast
        </Button>
    )
}
